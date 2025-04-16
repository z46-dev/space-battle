import SpatialHashGrid from "../../server/lib/SpatialHashGrid.js";
import { default as shipConfig } from "../../server/lib/ships.js";
import { uiScale } from "./util.js";
import * as assetsLib from "./graphicalFuncs.js";
import { planet, Sprite } from "./canvas.js";

export const worker = new Worker("../../server/index.js", {
    type: "module"
});

export const camera = {
    realX: 0,
    realY: 0,
    realZoom: 1,
    //
    x: 0,
    y: 0,
    zoom: 3,
    //
    cZoom: 1 // Controlled by the game instance when camera is taken over
};

export const world = {
    width: 24_000,
    height: 24_000,
    minimapData: [],
    starCounter: 0,
    starGrid: new SpatialHashGrid(),
    deathClones: [],
    text: [],
    commanders: [],
    snapshotMode: false,
    acceptDeathClones: false
};

export const ships = new Map();
export const projectiles = new Map();
export const squadrons = new Map();
export const explosions = new Set();

window.addEventListener("wheel", event => {
    camera.cZoom += event.deltaY / 3000;
    camera.cZoom = Math.max(camera.cZoom, .01);
    camera.cZoom = Math.min(camera.cZoom, 2.75);
    worker.postMessage([0, 0, 0, camera.cZoom]);
});

export const inputs = {
    mouseX: 0,
    mouseY: 0,
    mouseDirectionX: 0,
    mouseDirectionY: 0,
    rmb: false,
    shipOver: null,
    squadronOver: null,
    hardpointOver: null
};

export const controllingShipIDs = new Set();

window.addEventListener("mousemove", event => {
    inputs.mouseX = event.clientX * window.devicePixelRatio;
    inputs.mouseY = event.clientY * window.devicePixelRatio;

    inputs.mouseDirectionX = event.movementX;
    inputs.mouseDirectionY = event.movementY;
});

window.addEventListener("mousedown", event => {
    if (event.button === 2) {
        inputs.rmb = true;
    }

    if (event.button === 0) {
        if (inputs.squadronOver) {
            if (inputs.squadronOver.team === 0) {
                if (event.ctrlKey) {
                    squadrons.forEach(squadron => {
                        if (squadron.key === inputs.squadronOver.key && squadron.team === inputs.squadronOver.team) {
                            controllingShipIDs.add(squadron.id);
                        }
                    })
                } else {
                    controllingShipIDs.add(inputs.squadronOver.id);
                }
            }
        } if (inputs.shipOver) {
            if (inputs.shipOver.team === 0) {
                if (event.ctrlKey) {
                    ships.forEach(ship => {
                        if (ship.key === inputs.shipOver.key && ship.team === inputs.shipOver.team) {
                            controllingShipIDs.add(ship.id);
                        }
                    })
                } else {
                    controllingShipIDs.add(inputs.shipOver.id);
                }
            }
        } else {
            controllingShipIDs.clear();
        }
    }
});

window.addEventListener("mouseup", event => {
    if (event.button === 2) {
        inputs.rmb = false;
    }
});

const canvas = document.querySelector("canvas");
window.addEventListener("keydown", event => {
    switch (event.key.toLowerCase()) {
        case "m":
            if (controllingShipIDs.size > 0) {
                const packet = [2];

                controllingShipIDs.forEach(id => {
                    packet.push(id);
                });

                packet.push(-1);

                const scale = uiScale() * camera.zoom
                const realMouseX = (inputs.mouseX - canvas.width / 2) / scale + camera.x;
                const realMouseY = (inputs.mouseY - canvas.height / 2) / scale + camera.y;

                packet.push(realMouseX, realMouseY);

                worker.postMessage(packet);
            }
            break;
        case "a":
            if (controllingShipIDs.size > 0) {
                const packet = [3];

                controllingShipIDs.forEach(id => {
                    packet.push(id);
                });

                packet.push(-1);

                if (inputs.shipOver) {
                    if (inputs.shipOver.team !== 0) {
                        packet.push(inputs.shipOver.id);
                        worker.postMessage(packet);
                    }
                }
            }
            break;
        case "c": { // BattleCam
            worker.postMessage([4]);
        } break;
        case " ": { // BattleCam change
            worker.postMessage([5]);
        } break;
        case "z":
            world.snapshotMode = !world.snapshotMode;
            break;
    }
});

const handlers = {};
const oneTimeHandlers = {};

export const EVENTS = {
    BATTLE_END: 0
};

export function on(event, handler, once = false) {
    if (once) {
        oneTimeHandlers[event] = oneTimeHandlers[event] || [];
        oneTimeHandlers[event].push(handler);
        return;
    }

    if (!handlers[event]) {
        handlers[event] = [];
    }

    handlers[event].push(handler);
}

export function off(event, handler) {
    if (!handlers[event]) {
        return;
    }

    handlers[event] = handlers[event].filter(h => h !== handler);
}

worker.onmessage = event => {
    let data = event.data;

    switch (data.shift()) {
        case 0: {
            camera.realX = data[0];
            camera.realY = data[1];
            camera.realZoom = data[2];

            const newShips = [];
            const newProjectiles = [];
            const newSquadrons = [];

            const shipsSize = data[3];
            const projectilesSize = data[4];
            const squadronsSize = data[5];
            const explosionsSize = data[6];
            const deathsSize = data[7];

            data = data.slice(8);

            for (let i = 0; i < shipsSize; i++) {
                const ship = {};
                ship.id = data.shift();

                const flags = data.shift();

                if (flags & 1) {
                    ship.key = data.shift();

                    if (!assetsLib.assets.has(shipConfig[ship.key].asset)) {
                        assetsLib.loadAsset(`./assets/ships/${shipConfig[ship.key].asset}`, shipConfig[ship.key].asset);
                    }

                    ship.x = data.shift();
                    ship.y = data.shift();
                    ship.angle = data.shift();
                    ship.team = data.shift();
                    ship.size = data.shift();
                    ship.asset = data.shift();
                    ship.health = data.shift();
                    ship.shield = data.shift();
                    ship.isPartOfSquadron = data.shift();

                    const hardpointsSize = data.shift();
                    ship.hardpoints = [];

                    for (let j = 0; j < hardpointsSize; j++) {
                        ship.hardpoints.push({
                            offset: data.shift(),
                            direction: data.shift(),
                            health: data.shift()
                        });
                    }
                }

                if (flags & 2) {
                    ship.x = data.shift();
                }

                if (flags & 4) {
                    ship.y = data.shift();
                }

                if (flags & 8) {
                    ship.angle = data.shift();
                }

                if (flags & 16) {
                    ship.health = data.shift();
                }

                if (flags & 32) {
                    ship.shield = data.shift();
                }

                if (flags & 64) {
                    const hardpointsSize = data.shift();

                    ship.hardpoints = [];

                    for (let j = 0; j < hardpointsSize; j++) {
                        ship.hardpoints.push({
                            offset: data.shift(),
                            direction: data.shift(),
                            health: data.shift()
                        });
                    }
                }

                if (flags & 128) {
                    ship.commanderName = data.shift();
                }

                if (flags & 256) {
                    ship.team = data.shift();
                }

                if (flags & 512) {
                    ship.shieldAbility = true;
                } else {
                    ship.shieldAbility = false;
                }

                newShips.push(ship);
            }

            for (let i = 0; i < projectilesSize; i++) {
                const projectile = {};
                projectile.id = data.shift();

                const flags = data.shift();

                if (flags & 1) {
                    projectile.x = data.shift();
                    projectile.y = data.shift();
                    projectile.type = data.shift();
                    projectile.angle = data.shift();
                    projectile.size = 2;
                }

                if (flags & 2) {
                    projectile.x = data.shift();
                }

                if (flags & 4) {
                    projectile.y = data.shift();
                }

                if (flags & 8) {
                    projectile.angle = data.shift();
                }

                newProjectiles.push(projectile);
            }

            for (let i = 0; i < squadronsSize; i++) {
                const squadron = {};
                squadron.id = data.shift();

                const flags = data.shift();

                if (flags & 1) {
                    squadron.health = data.shift();
                    squadron.x = data.shift();
                    squadron.y = data.shift();
                    squadron.team = data.shift();
                    squadron.asset = data.shift();

                    if (!assetsLib.assets.has(squadron.asset)) {
                        assetsLib.loadAsset(`./assets/ships/${squadron.asset}`, squadron.asset);
                    }
                }

                if (flags & 2) {
                    squadron.health = data.shift();
                }

                if (flags & 4) {
                    squadron.x = data.shift();
                }

                if (flags & 8) {
                    squadron.y = data.shift();
                }

                newSquadrons.push(squadron);
            }

            for (let i = 0; i < explosionsSize; i++) {
                const explosion = {};
                explosion.x = data.shift();
                explosion.y = data.shift();
                explosion.size = data.shift() * (Math.sin(Math.random()) * .5 + .5);
                explosion.angle = data.shift();
                explosion.sprite = new Sprite(data.shift(), false);

                if (world.acceptDeathClones) {
                    explosions.add(explosion);
                }
            }

            for (let i = 0; i < deathsSize; i++) {
                const x = data.shift();
                const y = data.shift();
                const size = data.shift();
                const angle = data.shift();
                const asset = data.shift();
                if (!assetsLib.assets.has(asset)) {
                    assetsLib.loadAsset(`./assets/ships/${asset}`, asset);
                    return;
                }

                if (world.acceptDeathClones) {
                    world.deathClones.push(...assetsLib.turnImageIntoShards(assetsLib.assets.get(asset)).map(shard => ({
                        x: x,
                        y: y,
                        size: size,
                        forcedAngle: angle,
                        angle: angle,
                        angleSpeed: Math.random() * .0025 - .00125,
                        image: shard,
                        timer: 250 + Math.random() * 500
                    }))); // TODO: Consider making this use the ship's last x and y to determine velocity to make the split more interesting
                }
            }

            const commandersSize = data.shift();
            const commanders = [];

            for (let i = 0; i < commandersSize; i++) {
                commanders.push({
                    name: data.shift(),
                    health: data.shift()
                });
            }

            world.commanders = commanders;

            newShips.forEach(newShip => {
                if (!ships.has(newShip.id)) {
                    ships.set(newShip.id, {
                        ...newShip,
                        realX: newShip.x,
                        realY: newShip.y,
                        realAngle: newShip.angle,
                        realHealth: newShip.health,
                        realShield: newShip.shield,
                        hardpointSprites: []
                    });
                } else {
                    const ship = ships.get(newShip.id);

                    if (newShip.x !== undefined) {
                        ship.realX = newShip.x;
                    }

                    if (newShip.y !== undefined) {
                        ship.realY = newShip.y;
                    }

                    if (newShip.angle !== undefined) {
                        ship.realAngle = newShip.angle;
                    }

                    if (newShip.size !== undefined) {
                        ship.size = newShip.size;
                    }

                    if (newShip.health !== undefined) {
                        ship.realHealth = newShip.health;
                    }

                    if (newShip.shield !== undefined) {
                        ship.realShield = newShip.shield;
                    }

                    if (newShip.hardpoints !== undefined) {
                        ship.hardpoints = newShip.hardpoints;
                    }

                    if (newShip.commanderName !== undefined) {
                        ship.commanderName = newShip.commanderName;
                    }

                    ship.shieldAbility = newShip.shieldAbility;

                    ships.set(newShip.id, ship);
                }
            });

            newProjectiles.forEach(newProjectile => {
                if (!projectiles.has(newProjectile.id)) {
                    projectiles.set(newProjectile.id, {
                        ...newProjectile,
                        realX: newProjectile.x,
                        realY: newProjectile.y
                    });
                } else {
                    const projectile = projectiles.get(newProjectile.id);

                    if (newProjectile.x !== undefined) {
                        projectile.realX = newProjectile.x;
                    }

                    if (newProjectile.y !== undefined) {
                        projectile.realY = newProjectile.y;
                    }

                    if (newProjectile.angle !== undefined) {
                        projectile.angle = newProjectile.angle;
                    }

                    projectiles.set(newProjectile.id, projectile);
                }
            });

            newSquadrons.forEach(newSquadron => {
                if (!squadrons.has(newSquadron.id)) {
                    squadrons.set(newSquadron.id, {
                        ...newSquadron,
                        realX: newSquadron.x,
                        realY: newSquadron.y,
                        realHealth: newSquadron.health,
                        hardpoints: []
                    });
                } else {
                    const squadron = squadrons.get(newSquadron.id);

                    if (newSquadron.x !== undefined) {
                        squadron.realX = newSquadron.x;
                    }

                    if (newSquadron.y !== undefined) {
                        squadron.realY = newSquadron.y;
                    }

                    if (newSquadron.health !== undefined) {
                        squadron.realHealth = newSquadron.health;
                    }

                    squadrons.set(newSquadron.id, squadron);
                }
            });

            // Delete non-existent ships
            ships.forEach(ship => {
                if (!newShips.some(newShip => newShip.id === ship.id)) {
                    ships.delete(ship.id);
                }
            });

            // Delete non-existent projectiles
            projectiles.forEach(projectile => {
                if (!newProjectiles.some(newProjectile => newProjectile.id === projectile.id)) {
                    projectiles.delete(projectile.id);
                }
            });

            // Delete non-existent squadrons
            squadrons.forEach(squadron => {
                if (!newSquadrons.some(newSquadron => newSquadron.id === squadron.id)) {
                    squadrons.delete(squadron.id);
                }
            });
        } break;
        case 1: {
            world.width = data.shift();
            world.height = data.shift();
            const shipsSize = data.shift();
            const squadronsSize = data.shift();

            world.minimapData = [];

            for (let i = 0; i < shipsSize; i++) {
                const x = data.shift();
                const y = data.shift();
                const team = data.shift();
                const size = data.shift();
                const asset = data.shift();
                const angle = data.shift();

                world.minimapData.push({
                    type: 0,
                    x: x,
                    y: y,
                    size: size,
                    team: team,
                    asset: asset,
                    angle: angle
                });
            }

            for (let i = 0; i < squadronsSize; i++) {
                const x = data.shift();
                const y = data.shift();
                const team = data.shift();

                world.minimapData.push({
                    type: 1,
                    x: x,
                    y: y,
                    size: .02,
                    team: team
                });
            }
        } break;
        case 2: {
            const content = data.shift();
            world.text.push({
                text: content,
                displayText: "",
                i: 0,
                timer: 5 * content.length
            });
        } break;
        case 3: { // Battle over
            const battleData = data.shift();

            handlers[EVENTS.BATTLE_END]?.forEach(handler => handler(battleData));
            oneTimeHandlers[EVENTS.BATTLE_END]?.forEach(handler => handler(battleData));
            oneTimeHandlers[EVENTS.BATTLE_END] = undefined;

            world.deathClones = [];
            explosions.clear();
            ships.clear();
            projectiles.clear();
            squadrons.clear();

            world.acceptDeathClones = false;
        } break;
    }
}

export async function initWorld() {
    return await Promise.all([
        (async () => {
            planet.generate();
            return 1;
        })(),
        (async () => {
            while (true) {
                let i = 0;
                findPos: while (i < 96) {
                    const x = Math.random() * world.width * 2 - world.width;
                    const y = Math.random() * world.width * 2 - world.width;

                    const AABB = world.starGrid.getAABB({
                        x: x,
                        y: y,
                        size: 300 + Math.random() * 1000,
                        width: 1,
                        height: 1
                    });

                    const closeBy = world.starGrid.retrieve({
                        _AABB: AABB,
                        id: world.starCounter
                    });

                    if (closeBy.size > 0) {
                        i++;
                        continue findPos;
                    }

                    world.starGrid.insert({
                        x: x,
                        y: y,
                        _AABB: AABB,
                        id: world.starCounter
                    });

                    world.starCounter++;

                    break findPos;
                }

                if (i === 10) {
                    break;
                }
            }
        })()
    ])
}