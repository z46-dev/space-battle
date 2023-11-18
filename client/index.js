import SpatialHashGrid from "../server/lib/SpatialHashGrid.js";
import { shipTypeNames, shipTypes, weaponClassifications, weaponDrawProperties, weaponProperties } from "../server/lib/constants.js";
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

    const silhouettes = new Map();

    function generateSilhouette(image, name, r, g, b) {
        const canvas = new OffscreenCanvas(128, 128);
        const ctx = canvas.getContext("2d");

        ctx.drawImage(image, 0, 0, 128, 128);

        const imageData = ctx.getImageData(0, 0, 128, 128);

        function getPixel(x, y) {
            const index = (y * 128 + x) * 4;

            return {
                r: imageData.data[index],
                g: imageData.data[index + 1],
                b: imageData.data[index + 2],
                a: imageData.data[index + 3]
            };

        }

        for (let i = 0; i < imageData.data.length; i += 4) {
            const a = imageData.data[i + 3];

            if (a > 0) {
                imageData.data[i] = r;
                imageData.data[i + 1] = g;
                imageData.data[i + 2] = b;
                imageData.data[i + 3] = 255;
            }
        }

        ctx.putImageData(imageData, 0, 0);

        silhouettes.set(name, canvas.transferToImageBitmap());
    }

    function turnImageIntoShards(image) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = image.width;
        canvas.height = image.height;

        ctx.drawImage(image, 0, 0);

        const shards = [];

        const baseAngle = Math.random() * Math.PI * 2;
        const shardCount = 4 + Math.random() * 7 | 0;

        const x = Math.random() * image.width;
        const y = Math.random() * image.height;

        for (let i = 0; i < shardCount; i++) {
            const startAngle = baseAngle + i / shardCount * Math.PI * 2;
            const endAngle = baseAngle + (i + 1) / shardCount * Math.PI * 2;

            // Clip and paste to a new canvas
            const shardCanvas = new OffscreenCanvas(image.width, image.height);
            const shardCtx = shardCanvas.getContext("2d");

            shardCtx.beginPath();
            shardCtx.moveTo(x, y);
            shardCtx.arc(x, y, image.width, startAngle, endAngle);
            shardCtx.closePath();
            shardCtx.clip();

            shardCtx.drawImage(canvas, 0, 0);

            shards.push(shardCanvas);
        }

        return shards;
    }

    // for (const key in shipConfig) {
    //     loadAsset(`./assets/ships/${shipConfig[key].asset}`, shipConfig[key].asset);
    // }

    const world = {
        width: 4_000,
        height: 4_000,
        minimapData: [],
        starCounter: 0,
        starGrid: new SpatialHashGrid(),
        deathClones: [],
        text: []
    };

    // Add stars
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

    class Sprite {
        static generateFrames(image, xFrames, yFrames) {
            const frames = [];
            const width = image.width / xFrames;
            const height = image.height / yFrames;

            for (let y = 0; y < yFrames; y++) {
                for (let x = 0; x < xFrames; x++) {
                    frames.push({
                        x: x * width,
                        y: y * height,
                        width,
                        height,
                    });
                }
            }

            return frames;
        }

        static configs = {
            explosion1: [4, 4],
            explosion2: [8, 4],
            explosion3: [4, 4],
            explosion4: [8, 6],
            explosion5: [6, 6],
            explosion6: [7, 7],
            explosion7: [3, 3],
            explosion8: [8, 8],
            explosion9: [6, 6],
            explosion10: [6, 6],
            blueExplosion1: [5, 5],
            blueExplosion2: [4, 4, .125],
            blueExplosion3: [16, 8, .35],
            blueExplosion4: [5, 5, .2],
            blueExplosion5: [4, 4, .2],
            fireSprite: [3, 3]
        };

        constructor(name, loop = true) {
            this.image = assets.get(name);
            this.frames = Sprite.generateFrames(this.image, ...Sprite.configs[name]);
            this.currentFrame = 0;
            this.loop = loop;
            this.speed = Sprite.configs[name][2] ?? .25;
        }

        draw(ctx, x, y, width, height) {
            if (this.currentFrame >= this.frames.length - 1) {
                if (this.loop) {
                    this.currentFrame = 0;
                } else {
                    return;
                }
            }

            const frame = this.frames[this.currentFrame | 0];

            ctx.drawImage(
                this.image,
                frame.x,
                frame.y,
                frame.width,
                frame.height,
                x,
                y,
                width,
                height
            );

            this.currentFrame += this.speed;
        }
    }

    for (let i = 1; i <= 10; i++) {
        loadAsset(`./assets/explosions/explosion${i}.png`, `explosion${i}`);
    }

    for (let i = 1; i <= 5; i++) {
        loadAsset(`./assets/explosions/blueExplosion${i}.png`, `blueExplosion${i}`);
    }

    loadAsset("./assets/explosions/fire.png", "fireSprite");

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
        camera.cZoom += event.deltaY / 3000;
        camera.cZoom = Math.max(camera.cZoom, .01);
        camera.cZoom = Math.min(camera.cZoom, 2.75);
        worker.postMessage([0, 0, 0, camera.cZoom]);
    });

    window.holdoManeuver = () => worker.postMessage([1]);

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
    const explosions = new Set();

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

                        if (!assets.has(shipConfig[ship.key].asset)) {
                            loadAsset(`./assets/ships/${shipConfig[ship.key].asset}`, shipConfig[ship.key].asset);
                        }

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

                        if (!assets.has(squadron.asset)) {
                            loadAsset(`./assets/ships/${squadron.asset}`, squadron.asset);
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

                    explosions.add(explosion);
                }

                for (let i = 0; i < deathsSize; i++) {
                    const x = data.shift();
                    const y = data.shift();
                    const size = data.shift();
                    const angle = data.shift();
                    const asset = data.shift();
                    if (!assets.has(asset)) {
                        loadAsset(`./assets/ships/${asset}`, asset);
                        return;
                    }
                    world.deathClones.push(...turnImageIntoShards(assets.get(asset)).map(shard => ({
                        x: x,
                        y: y,
                        size: size,
                        forcedAngle: angle,
                        angle: angle,
                        angleSpeed: Math.random() * .0025 - .00125,
                        image: shard,
                        timer: 250 + Math.random() * 500
                    })));
                }

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

    function generateWeaponSprite(props) {
        const canvas = new OffscreenCanvas(128, 128);
        const ctx = canvas.getContext("2d");

        const size = 16;

        const spacing = size;// * props.strength;

        ctx.save();

        ctx.lineCap = ctx.lineJoin = "round";

        ctx.translate(canvas.width / 2, canvas.height / 2);

        if (props.isCircle) {
            ctx.fillStyle = props.color;
        } else {
            ctx.strokeStyle = props.color;
            ctx.lineWidth = size / 2; //* props.strength / 2;
        }

        if (props.shadows) {
            ctx.shadowBlur = size + 5;
            ctx.shadowColor = mixColors(props.color, "#FFFFFF", .5);
        }

        ctx.beginPath();

        if (props.isCircle) {
            ctx.arc(0, 0, size * props.strength / 2, 0, Math.PI * 2);
        } else {
            for (let i = 0; i < props.count; i++) {
                const x = -spacing * props.count / 2 + spacing * i;

                ctx.moveTo(x, -size/* * props.strength*/ * 2);
                ctx.lineTo(x, size/* * props.strength*/ * 2);
            }
        }

        ctx.closePath();

        if (props.isCircle) {
            ctx.fill();
        } else {
            ctx.stroke();
        }

        if (!props.isCircle) {
            ctx.strokeStyle = mixColors(props.color, "#FFFFFF", .5);
            ctx.lineWidth = size * props.strength * .25;

            ctx.beginPath();

            for (let i = 0; i < props.count; i++) {
                const x = -spacing * props.count / 2 + spacing * i;

                ctx.moveTo(x, -size/* * props.strength*/ * 2.5);
                ctx.lineTo(x, size/* * props.strength*/ * 2.5);
            }

            ctx.closePath();

            ctx.stroke();
        }

        return canvas.transferToImageBitmap();
    }

    weaponDrawProperties.forEach(props => {
        props.sprite = generateWeaponSprite(props);
    });

    let closeByStars = [];

    setInterval(() => {
        const scale = uiScale() * camera.zoom;
        const AABB = world.starGrid.getAABB({
            x: camera.x,
            y: camera.y,
            size: canvas.width / scale,
            width: 1,
            height: 1
        });

        closeByStars = world.starGrid.retrieve({
            _AABB: AABB,
            id: world.starCounter
        });
    }, 1000);

    function draw() {
        requestAnimationFrame(draw);

        camera.x = lerp(camera.x, camera.realX, .2);
        camera.y = lerp(camera.y, camera.realY, .2);
        camera.zoom = lerp(camera.zoom, camera.realZoom, .2);

        worker.postMessage(rmb ? [0, -mouseDirectionX / camera.zoom, -mouseDirectionY / camera.zoom, camera.cZoom] : [0, 0, 0, camera.cZoom]);

        const scale = uiScale() * camera.zoom;
        let hardpointOver = null,
            shipOver = null;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#893135";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-camera.x, -camera.y);

        const realMouseX = (mouseX - canvas.width / 2) / scale + camera.x;
        const realMouseY = (mouseY - canvas.height / 2) / scale + camera.y;

        // Draw world width/height
        ctx.fillStyle = "#1B1B25";
        ctx.fillRect(-world.width, -world.height, world.width * 2, world.height * 2);

        ctx.fillStyle = "#DEDEDE";
        ctx.shadowColor = "#FFFFFF";
        closeByStars.forEach(star => {
            const XYHash = (star.x + star.y) * (.5 + Math.sin(performance.now() / 1000) * .5);
            const size = 15 + (.5 + Math.sin(XYHash / (star.x + star.y))) * 10;

            if (size * scale > 3) {
                ctx.shadowBlur = size * 3;
            }

            ctx.beginPath();
            ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;

        const drawObjects = [];

        world.deathClones.forEach((clone, index) => {
            drawObjects.push({
                type: 1,
                key: index,
                object: clone
            });
        });

        ships.forEach((ship, index) => {
            drawObjects.push({
                type: 0,
                key: index,
                object: ship
            });
        });

        drawObjects.sort((a, b) => b.object.size - a.object.size);
        drawObjects.forEach(({ type, key, object }) => {
            switch (type) {
                case 1: {
                    const clone = object;
                    const index = key;
                    ctx.save();

                    ctx.translate(clone.x, clone.y);
                    ctx.rotate(clone.angle);
                    ctx.drawImage(clone.image, -clone.size / 2, -clone.size / 2, clone.size, clone.size);

                    clone.x += Math.cos(clone.angle) * .5;
                    clone.y += Math.sin(clone.angle) * .5;
                    clone.angle += clone.angleSpeed;
                    clone.size *= .99995;
                    clone.timer--;

                    if ((clone.timer | 0) % 125 === 0 && Math.random() > .75) {
                        explosions.add({
                            x: clone.x + Math.random() * clone.size - clone.size / 2,
                            y: clone.y + Math.random() * clone.size - clone.size / 2,
                            size: clone.size * (Math.random() * .5 + .25),
                            angle: Math.random() * Math.PI * 2,
                            sprite: new Sprite("explosion" + (1 + Math.random() * 10 | 0), false)
                        });
                    }

                    if (clone.timer <= 0) {
                        world.deathClones.splice(index, 1);
                    }

                    ctx.restore();
                } break;
                case 0: {
                    const ship = object;
                    ship.x = lerp(ship.x, ship.realX, .2);
                    ship.y = lerp(ship.y, ship.realY, .2);
                    ship.angle = lerpAngle(ship.angle, ship.realAngle, .2);
                    ship.health = lerp(ship.health, ship.realHealth, .2);
                    ship.shield = lerp(ship.shield, ship.realShield, .2);

                    if (
                        (ship.isPartOfSquadron && ship.size * scale < 5) ||
                        ship.size * scale < 2.5 ||
                        !assets.has(ship.asset)
                    ) {
                        return;
                    }

                    const asset = assets.get(ship.asset);

                    ctx.save();
                    ctx.translate(ship.x, ship.y);
                    ctx.rotate(ship.angle);
                    ctx.drawImage(asset, -ship.size / 2, -ship.size / 2, ship.size, ship.size);

                    // Draw hardpoints
                    if (ship.size >= 150) {
                        const mouseOverShip = Math.abs(realMouseX - ship.x) < ship.size / 2 && Math.abs(realMouseY - ship.y) < ship.size / 2;

                        if (mouseOverShip) {
                            shipOver = ship;
                        }

                        ship.hardpoints.forEach((hardpoint, index) => {
                            if (hardpoint.health <= 0) {
                                if (ship.hardpointSprites[index] === undefined) {
                                    ship.hardpointSprites[index] = [{
                                        x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                        y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                        sprite: new Sprite("fireSprite", false),
                                        hasDoneHalfway: false,
                                        spawnsOnDeath: true,
                                        size: .9 + Math.random()
                                    }];
                                }

                                for (let i = 0; i < ship.hardpointSprites[index].length; i++) {
                                    const sprite = ship.hardpointSprites[index][i];

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length - 1) {
                                        ship.hardpointSprites[index].splice(i, 1);
                                        i--;

                                        if (sprite.spawnsOnDeath) {
                                            ship.hardpointSprites[index].push({
                                                x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                                y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                                sprite: new Sprite("fireSprite", false),
                                                hasDoneQ2: false,
                                                hasDoneQ3: false,
                                                spawnsOnDeath: true,
                                                size: .9 + Math.random()
                                            });

                                            if (Math.random() > .5) {
                                                setTimeout(() => {
                                                    explosions.add({
                                                        x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                                        y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                                        size: 1,
                                                        angle: Math.random() * Math.PI * 2,
                                                        sprite: new Sprite("blueExplosion" + (1 + Math.random() * 5 | 0), false)
                                                    });
                                                }, 500);
                                            }
                                        }
                                        continue;
                                    }

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length / 3 && !sprite.hasDoneQ2) {
                                        sprite.hasDoneQ2 = true;
                                        ship.hardpointSprites[index].push({
                                            x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                            y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                            sprite: new Sprite("explosion" + (7 + Math.random() * 4 | 0), false),
                                            hasDoneQ2: true,
                                            hasDoneQ3: true,
                                            spawnsOnDeath: false,
                                            size: .9 + Math.random()
                                        });
                                    }

                                    if (sprite.sprite.currentFrame >= sprite.sprite.frames.length * 2 / 3 && !sprite.hasDoneQ3) {
                                        sprite.hasDoneQ3 = true;
                                        ship.hardpointSprites[index].push({
                                            x: ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle) + ship.x,
                                            y: ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle) + ship.y,
                                            sprite: new Sprite("fireSprite", false),
                                            hasDoneQ2: true,
                                            hasDoneQ3: true,
                                            spawnsOnDeath: false,
                                            size: .9 + Math.random()
                                        });
                                    }

                                    ctx.save();

                                    ctx.rotate(-ship.angle);
                                    ctx.translate(-ship.x, -ship.y);
                                    ctx.translate(sprite.x, sprite.y);
                                    ctx.scale(15 * sprite.size, 15 * sprite.size);

                                    sprite.sprite.draw(ctx, -1, -1, 2, 2);

                                    ctx.restore();
                                }
                                return;
                            }

                            // Green - Yellow - Red based on hp
                            ctx.fillStyle = hardpoint.health > .667 ? "#00FF00" : hardpoint.health > .333 ? "#FFFF00" : "#FF0000";

                            if (mouseOverShip && Math.abs(realMouseX - (ship.x + ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction + ship.angle))) < 8 && Math.abs(realMouseY - (ship.y + ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction + ship.angle))) < 24) {
                                ctx.strokeStyle = ctx.fillStyle;
                                ctx.lineWidth = 4;

                                ctx.beginPath();
                                ctx.arc(ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction), ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction), 18, 0, Math.PI * 2);
                                ctx.stroke();

                                hardpointOver = {
                                    health: hardpoint.health,
                                    data: shipConfig[ship.key].hardpoints[index]
                                };
                            }

                            ctx.beginPath();
                            ctx.arc(ship.size / 2 * hardpoint.offset * Math.cos(hardpoint.direction), ship.size / 2 * hardpoint.offset * Math.sin(hardpoint.direction), 4, 0, Math.PI * 2);
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
                } break;
            }
        });

        // Draw projectiles
        projectiles.forEach(projectile => {
            projectile.x = lerp(projectile.x, projectile.realX, .2);
            projectile.y = lerp(projectile.y, projectile.realY, .2);

            const props = weaponDrawProperties[projectile.type];

            if (projectile.size * props.strength * 6 * scale < 2) {
                return;
            }

            ctx.save();
            ctx.translate(projectile.x, projectile.y);
            ctx.rotate(projectile.angle - Math.PI / 2);
            ctx.scale(6 * props.strength, 6 * props.strength);

            ctx.drawImage(props.sprite, -projectile.size, -projectile.size, projectile.size * 2, projectile.size * 2);

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

        // Draw explosions
        explosions.forEach(explosion => {

            if (explosion.sprite.currentFrame >= explosion.sprite.frames.length - 1) {
                explosions.delete(explosion);
                return;
            }

            ctx.save();

            ctx.translate(explosion.x, explosion.y);
            ctx.scale(explosion.size, explosion.size);
            ctx.rotate(explosion.angle);

            explosion.sprite.draw(ctx, -1, -1, 2, 2);

            ctx.restore();
        });

        ctx.restore();

        // UI
        const uScale = uiScale();

        ctx.save();
        ctx.scale(uScale, uScale);

        ctx.globalAlpha = .5;

        // Minimap
        ctx.save();
        ctx.translate(10, canvas.height / uScale - 10 - 230);

        ctx.fillStyle = "#111111";
        ctx.fillRect(0, 0, 230, 230);

        ctx.globalAlpha = 1;

        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1;

        // Clip
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, 230, 230);
        ctx.clip();
        ctx.closePath();

        world.minimapData.forEach(data => {
            // The center of the map is (0, 0)
            // Top left corner is (-w, -h)
            // Bottom right corner is (w, h)

            const x = data.x * 115 + 115;
            const y = data.y * 115 + 115;
            const size = data.size * 115;

            ctx.fillStyle = data.team === 0 ? "#FF0000" : "#0000FF";

            if (data.type === 0) {
                if (!assets.has(data.asset)) {
                    loadAsset(`./assets/ships/${data.asset}`, data.asset);
                    return;
                }

                if (!assets.get(data.asset).ready) {
                    return;
                }

                const silhouetteKey = `${data.asset}${data.team}`;
                if (!silhouettes.has(silhouetteKey)) {
                    silhouettes.set(silhouetteKey, false);
                    generateSilhouette(assets.get(data.asset), silhouetteKey, data.team === 0 ? 255 : 0, data.team === 2 ? 255 : 0, data.team === 1 ? 255 : 0);
                }

                const silhouette = silhouettes.get(silhouetteKey);

                if (silhouette === false) {
                    return;
                }

                ctx.save();
                ctx.translate(x, y);
                ctx.rotate(data.angle);
                ctx.drawImage(silhouette, -size / 2, -size / 2, size, size);
                ctx.restore();
            }

            if (data.type === 1) {
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
                ctx.stroke();
            }
        });

        // Draw a viewbox
        ctx.save();
        ctx.translate(115, 115);
        ctx.scale(1 / camera.zoom * 115, 1 / camera.zoom * 115);
        ctx.translate(-camera.x, -camera.y);

        ctx.fillStyle = "#000000";
        ctx.globalAlpha = .25;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = .1 * camera.zoom;

        const width = Math.sqrt(canvas.width) / camera.zoom;
        const height = Math.sqrt(canvas.height) / camera.zoom;

        ctx.fillRect(-width / 2, -height / 2, width, height);
        ctx.strokeRect(-width / 2, -height / 2, width, height);

        ctx.restore();
        ctx.restore();

        ctx.strokeStyle = "#AAAAAA";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, 230, 230);

        ctx.restore();

        if (hardpointOver !== null) {
            const str = hardpointOver.data.weapon.name + " - " + Math.round(hardpointOver.data.weapon.damage) + "dmg";
            const measurement = measureText(str, 18);
            const width = measurement.width + 15;

            ctx.fillStyle = "#AAAAAA";
            ctx.fillRect(mouseX / uScale + 10, mouseY / uScale - 10, width, 50);
            ctx.fillStyle = hardpointOver.health > .667 ? "#00FF00" : hardpointOver.health > .333 ? "#FFFF00" : "#FF0000";
            ctx.fillRect(mouseX / uScale + 15, mouseY / uScale - 5, (width - 10) * hardpointOver.health, 15);
            drawText(str, mouseX / uScale + 15, mouseY / uScale + 25, 18);
        }

        if (shipOver !== null) {
            ctx.save();
            const cfg = shipConfig[shipOver.key];
            const str = cfg.name + " - " + shipTypeNames[cfg.classification];
            const titleMeasure = measureText(str, 28);
            let bigWidth = titleMeasure.width,
                bigHeight = titleMeasure.height;

            const weapons = {};

            cfg.hardpoints.forEach(hardpoint => {
                const text = hardpoint.weapon.name + " - " + (hardpoint.weapon.range / 1000).toFixed(1) + "km";
                if (weapons[text] === undefined) {
                    weapons[text] = 0;
                }

                weapons[text]++;
            });

            let listHeight = 0;

            Object.keys(weapons).forEach(name => {
                const measurement = measureText(name, 18);
                const measurement2 = measureText("x" + weapons[name], 20);

                bigWidth = Math.max(bigWidth, measurement.width + measurement2.width + 5);
                bigHeight = Math.max(bigHeight, measurement.height, measurement2.height);
                listHeight = measurement.height;
            });

            ctx.fillStyle = "#AAAAAA";
            ctx.translate(canvas.width / uScale - bigWidth - 30, 0);
            ctx.fillRect(10, 10, bigWidth + 20, bigHeight + 30 + (listHeight + 5) * Object.keys(weapons).length);

            drawText(str, 20, 35, 28);

            let y = titleMeasure.height + 40;

            for (const name in weapons) {
                drawText(name, 20, y, 18);
                drawText("x" + weapons[name], 20 + measureText(name, 18).width + 5, y, 20, "#C8C8C8");
                y += listHeight + 5;
            }

            ctx.restore();
        }

        let y = 10;
        world.text.forEach((textMessage, i) => {
            const measurement = measureText(textMessage.displayText, 16);

            drawText(textMessage.displayText, 10, y, 16);

            textMessage.i = Math.min(textMessage.i + 1, textMessage.text.length);

            textMessage.displayText = textMessage.text.slice(0, textMessage.i);

            if (textMessage.displayText.length === textMessage.text.length) {
                textMessage.timer --;
            }

            if (textMessage.timer <= 0) {
                world.text.splice(i, 1);
            }

            y += measurement.height + 5;
        });

        ctx.restore();
    }

    function drawText(text, x, y, size, fill = "#FFFFFF", align = "left") {
        ctx.save();
        ctx.globalAlpha = 1;
        ctx.font = `bold ${size}px sans-serif`;
        ctx.textAlign = align;
        ctx.textBaseline = "middle";
        ctx.fillStyle = fill;
        ctx.fillText(text, x, y);
        ctx.restore();
    }

    function measureText(text, size) {
        ctx.save();
        ctx.font = `bold ${size}px sans-serif`;

        const width = ctx.measureText(text).width;
        const height = ctx.measureText("M").width;

        ctx.restore();

        return {
            width: width,
            height: height
        };
    }

    draw();
})();