import { weaponDrawProperties } from "../server/lib/constants.js";
import { default as shipConfig } from "../server/lib/ships.js";

(async function () {
    const assets = new Map();

    function loadAsset(path, name) {
        const image = new Image();
        image.src = path;

        image.ready = false;

        image.onload = () => {
            image.ready = true;
        };

        assets.set(name, image);
    }

    for (const key in shipConfig) {
        loadAsset(`./assets/ships/${shipConfig[key].asset}`, shipConfig[key].asset);
    }

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const camera = {
        realX: 0,
        realY: 0,
        realZoom: 1,
        //
        x: 0,
        y: 0,
        zoom: 3,
        // ControlledZoom
        cZoom: 1
    };

    // CAMERA CONTROLS
    window.addEventListener("wheel", event => {
        camera.cZoom += event.deltaY / 1000;
        camera.cZoom = Math.max(camera.cZoom, .1);
        camera.cZoom = Math.min(camera.cZoom, 3);
        worker.postMessage([0, 0, camera.cZoom]);
    });

    let mouseX = 0,
        mouseY = 0,
        mouseDirectionX = 0,
        mouseDirectionY = 0,
        rmb = false;

    window.addEventListener("mousemove", event => {
        mouseX = event.clientX * window.devicePixelRatio;
        mouseY = event.clientY * window.devicePixelRatio;

        mouseDirectionX = event.movementX;
        mouseDirectionY = event.movementY;
    });

    window.addEventListener("mousedown", event => {
        if (event.button === 2) {
            rmb = true;
        }
    });

    window.addEventListener("mouseup", event => {
        if (event.button === 2) {
            rmb = false;
        }
    });

    function uiScale() {
        if (canvas.height > canvas.width) {
            return canvas.height / 1080;
        }

        return canvas.width / 1920;
    }

    function resize() {
        canvas.width = window.innerWidth * window.devicePixelRatio;
        canvas.height = window.innerHeight * window.devicePixelRatio;

        ctx.textBaseline = "middle";
    }

    window.addEventListener("resize", resize);
    resize();

    const worker = new Worker("./server/index.js", {
        type: "module"
    });

    const ships = new Map();
    const projectiles = new Map();
    const squadrons = new Map();

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

                data = data.slice(6);

                for (let i = 0; i < shipsSize; i++) {
                    const ship = {};
                    ship.id = data.shift();

                    const flags = data.shift();

                    if (flags & 1) {
                        ship.x = data.shift();
                        ship.y = data.shift();
                        ship.angle = data.shift();
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

                newShips.forEach(newShip => {
                    if (!ships.has(newShip.id)) {
                        ships.set(newShip.id, {
                            ...newShip,
                            realX: newShip.x,
                            realY: newShip.y,
                            realAngle: newShip.angle,
                            realHealth: newShip.health,
                            realShield: newShip.shield
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
                console.log(data);
            } break;
        }
    }

    function lerp(A, B, w) {
        return (1 - w) * A + w * B;
    }

    function lerpAngle(A, B, w) {
        let CS = (1 - w) * Math.cos(A) + w * Math.cos(B);
        let SN = (1 - w) * Math.sin(A) + w * Math.sin(B);
        return Math.atan2(SN, CS);
    }

    function drawBar(cx, cy, width, height, pct, color) {
        ctx.save();
        ctx.translate(cx, cy);
        ctx.fillStyle = "#111111";
        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.fillStyle = color;
        ctx.fillRect(-width / 2, -height / 2, width * pct, height);
        ctx.restore();
    }

    const mixColors = (function () {
        const cache = {};
        return function (primary, secondary, x) {
            const target = `${primary}${secondary}${x}`;
            if (cache[target] !== undefined) return cache[target];
            var [primary, a, o] = primary.match(/\w\w/g).map(e => parseInt(e, 16)), [secondary, n, r] = secondary.match(/\w\w/g).map(e => parseInt(e, 16));
            return cache[target] = `#${Math.round(primary + (secondary - primary) * x).toString(16).padStart(2, "0")}${Math.round(a + (n - a) * x).toString(16).padStart(2, "0")}${Math.round(o + (r - o) * x).toString(16).padStart(2, "0")}`;
        }
    })();

    function draw() {
        requestAnimationFrame(draw);

        // if (rmb) {
        //     camera.realX -= mouseDirectionX / camera.zoom;
        //     camera.realY -= mouseDirectionY / camera.zoom;
        // }

        camera.x = lerp(camera.x, camera.realX, .2);
        camera.y = lerp(camera.y, camera.realY, .2);
        camera.zoom = lerp(camera.zoom, camera.realZoom, .2);

        worker.postMessage(rmb ? [-mouseDirectionX / camera.zoom, -mouseDirectionY / camera.zoom, camera.cZoom] : [0, 0, camera.cZoom]);

        const scale = uiScale() * camera.zoom;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#333333";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-camera.x, -camera.y);

        // Draw ships
        ships.forEach(ship => {
            ship.x = lerp(ship.x, ship.realX, .2);
            ship.y = lerp(ship.y, ship.realY, .2);
            ship.angle = lerpAngle(ship.angle, ship.realAngle, .2);
            ship.health = lerp(ship.health, ship.realHealth, .2);
            ship.shield = lerp(ship.shield, ship.realShield, .2);

            if (ship.isPartOfSquadron && ship.size * scale < 5) {
                return;
            }

            const asset = assets.get(ship.asset);

            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle);
            ctx.drawImage(asset, -ship.size / 2, -ship.size / 2, ship.size, ship.size);

            // Draw hardpoints
            if (ship.size >= 150) {
                ship.hardpoints.forEach(hardpoint => {
                    if (hardpoint.health <= 0) return;

                    // Green - Yellow - Red based on hp
                    ctx.fillStyle = hardpoint.health > .667 ? "#00FF00" : hardpoint.health > .333 ? "#FFFF00" : "#FF0000";

                    ctx.beginPath();
                    ctx.arc(
                        ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction),
                        ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction),
                        4,
                        0,
                        Math.PI * 2
                    );
                    ctx.fill();
                });
            }

            if (!ship.isPartOfSquadron || ship.size * scale >= 20) {
                ctx.rotate(-ship.angle);
                const barWidth = Math.max(50, ship.size);

                drawBar(0, -barWidth / 2 - 20, barWidth, 10, ship.health, "#00FFC8");

                if (ship.shield !== -1) {
                    drawBar(0, -barWidth / 2 - 40, barWidth, 10, ship.shield, "#00C8FF");
                }
            }

            ctx.restore();
        });

        // Draw projectiles
        projectiles.forEach(projectile => {
            projectile.x = lerp(projectile.x, projectile.realX, .2);
            projectile.y = lerp(projectile.y, projectile.realY, .2);

            const props = weaponDrawProperties[projectile.type];
            const spacing = projectile.size * props.strength + 2;

            ctx.save();
            ctx.translate(projectile.x, projectile.y);
            ctx.rotate(projectile.angle - Math.PI / 2);

            if (props.isCircle) {
                ctx.fillStyle = props.color;
            } else {
                ctx.strokeStyle = props.color;
                ctx.lineWidth = projectile.size * props.strength;
            }

            if (props.shadows) {
                // Flicker unique to this projectile by ID
                ctx.shadowBlur = props.isCircle ? Math.sin(projectile.id * 2 + performance.now() / 50) * 2.5 + 12.5 : 10;
                ctx.shadowColor = mixColors(props.color, "#FFFFFF", .5);
            }

            ctx.beginPath();

            if (props.isCircle) {
                ctx.arc(0, 0, projectile.size * props.strength, 0, Math.PI * 2);
            } else {
                for (let i = 0; i < props.count; i++) {
                    const x = -spacing * props.count / 2 + spacing * i;

                    ctx.moveTo(x, -projectile.size * 5);
                    ctx.lineTo(x, projectile.size * 5);
                }
            }

            ctx.closePath();

            if (props.isCircle) {
                ctx.fill();
            } else {
                ctx.stroke();
            }

            ctx.restore();
        });

        // Draw squadrons
        squadrons.forEach(squadron => {
            squadron.x = lerp(squadron.x, squadron.realX, .2);
            squadron.y = lerp(squadron.y, squadron.realY, .2);
            squadron.health = lerp(squadron.health, squadron.realHealth, .2);

            if (scale > .6) {
                return;
            }

            ctx.save();
            ctx.translate(squadron.x, squadron.y);

            ctx.fillStyle = squadron.team === 0 ? "#FF0000" : "#0000FF";
            ctx.strokeStyle = mixColors(ctx.fillStyle, "#000000", .5);
            ctx.beginPath();
            ctx.roundRect(-40, -40, 80, 80, 17.5);

            ctx.globalAlpha = .125;
            ctx.fill();

            ctx.globalAlpha = 1;
            ctx.lineWidth = 5;
            ctx.stroke();

            ctx.globalAlpha = .5;
            ctx.drawImage(assets.get(squadron.asset), -30, -30, 60, 60);

            ctx.globalAlpha = 1;
            drawBar(0, 55, 80, 10, squadron.health, "#00FFC8");

            ctx.restore();
        });

        ctx.restore();
    }

    draw();
})();