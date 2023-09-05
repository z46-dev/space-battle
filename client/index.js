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

    const config = await (await fetch("./assets/config.json")).json();

    for (const key in config.ships) {
        const ship = config.ships[key];
        loadAsset(`./assets/ships/${ship.asset}`, key);
    }

    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    const camera = {
        x: 0,
        y: 0,
        zoom:.5
    };

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

    worker.onmessage = event => {
        const data = event.data;

        const newShips = [];
        const newProjectiles = [];

        const shipsSize = data.shift();
        const projectilesSize = data.shift();

        for (let i = 0; i < shipsSize; i ++) {
            const ship = {
                id: data.shift(),
                x: data.shift(),
                y: data.shift(),
                angle: data.shift(),
                size: data.shift(),
                health: data.shift(),
                shield: data.shift(),
                hardpoints: []
            };

            const hardpointsSize = data.shift();

            for (let j = 0; j < hardpointsSize; j ++) {
                ship.hardpoints.push({
                    offset: data.shift(),
                    direction: data.shift(),
                    health: data.shift()
                });
            }

            newShips.push(ship);
        }

        for (let i = 0; i < projectilesSize; i ++) {
            newProjectiles.push({
                id: data.shift(),
                x: data.shift(),
                y: data.shift(),
                size: 4
            });
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

                ship.realX = newShip.x;
                ship.realY = newShip.y;
                ship.realAngle = newShip.angle;
                ship.realHealth = newShip.health;
                ship.realShield = newShip.shield;
                ship.hardpoints = newShip.hardpoints;
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

                projectile.realX = newProjectile.x;
                projectile.realY = newProjectile.y;
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
    };

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

            const asset = assets.get("ISD");

            ctx.save();
            ctx.translate(ship.x, ship.y);
            ctx.rotate(ship.angle);
            ctx.drawImage(asset, -ship.size / 2, -ship.size / 2, ship.size, ship.size);

            // Draw hardpoints
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

            // Draw shield
            ctx.rotate(-ship.angle);
            drawBar(0, -ship.size / 2 - 20, ship.size, 10, ship.health, "#00FFC8");
            drawBar(0, -ship.size / 2 - 40, ship.size, 10, ship.shield, "#00C8FF");

            ctx.restore();
        });

        // Draw projectiles
        projectiles.forEach(projectile => {
            projectile.x = lerp(projectile.x, projectile.realX, .2);
            projectile.y = lerp(projectile.y, projectile.realY, .2);

            ctx.beginPath();
            ctx.fillStyle = "#00FF00";
            ctx.arc(projectile.x, projectile.y, projectile.size, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.restore();
    }

    draw();
})();