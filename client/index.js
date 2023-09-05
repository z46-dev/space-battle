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
        zoom: .5
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

    class Vector {
        constructor(x = 0, y = 0) {
            this.x = x;
            this.y = y;
        }

        get length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        get angle() {
            return Math.atan2(this.y, this.x);
        }
    }

    class Hardpoint {
        constructor(ship, config) {
            this.ship = ship;

            const vector = new Vector(config.y, config.x);

            this.offset = vector.length;
            this.direction = vector.angle;

            this.reload = config.weapon.reload;
            this.tick = Math.random() * -this.reload | 0;
            this.damage = config.weapon.damage;
            this.speed = config.weapon.speed;
            this.range = config.weapon.range;

            this.target = null;
        }

        get x() {
            return this.ship.x + this.ship.size / 2 * this.offset * Math.cos(this.direction);
        }

        get y() {
            return this.ship.y + this.ship.size / 2 * this.offset * Math.sin(this.direction);
        }

        findTarget() {
            // Find a hardpoint of a ship that is within our range
            if (this.target !== null) {
                // Validate range
                if (this.target.health <= 0 || this.target.distanceTo(this.ship) > this.range) {
                    this.target = null;
                }
            }

            if (this.target === null) {
                for (const ship of Ship.ships.values()) {
                    if (ship === this.ship) {
                        continue;
                    }

                    if (ship.distanceTo(this.ship) <= this.range) {
                        this.target = ship.hardpoints[Math.random() * ship.hardpoints.length | 0];
                        break;
                    }
                }
            }
        }

        distanceTo(ship) {
            const dx = this.ship.x - ship.x;
            const dy = this.ship.y - ship.y;

            return Math.sqrt(dx * dx + dy * dy);
        }

        update() {
            this.findTarget();

            if (this.target !== null) {
                this.tick ++;

                if (this.tick >= this.reload) {
                    this.tick = 0;

                    const dx = this.target.ship.x - this.ship.x;
                    const dy = this.target.ship.y - this.ship.y;

                    const angle = Math.atan2(dy, dx);

                    const projectile = new Projectile(this.ship, this, angle);
                    projectile.x = this.x;
                    projectile.y = this.y;
                    projectile.target = this.target;
                }
            }
        }
    }

    class Projectile {
        static projectiles = new Map();

        constructor(ship, hardpoint, angle) {
            this.ship = ship;
            this.hardpoint = hardpoint;

            this.x = 0;
            this.y = 0;

            this.angle = angle;
            this.speed = hardpoint.speed;

            this.target = null;
            this.range = hardpoint.range + this.speed * 10;

            Projectile.projectiles.set(this, this);
        }

        update() {
            this.x += Math.cos(this.angle) * this.speed;
            this.y += Math.sin(this.angle) * this.speed;

            this.range -= this.speed;

            if (this.range <= 0) {
                Projectile.projectiles.delete(this);
            }

            if (this.target !== null) {
                const dx = this.target.ship.x - this.ship.x;
                const dy = this.target.ship.y - this.ship.y;

                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist <= this.speed) {
                    this.target.ship.shield -= this.hardpoint.damage;

                    Projectile.projectiles.delete(this);
                }
            }

            ctx.save();
            ctx.translate(this.ship.x, this.ship.y);
            ctx.rotate(this.angle);
            ctx.fillStyle = "#00FF00";
            ctx.fillRect(this.x - 2, this.y - 2, 4, 4);
            ctx.restore();
        }

        distanceTo(ship) {
            const dx = this.ship.x - ship.x;
            const dy = this.ship.y - ship.y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    class Ship {
        static ships = new Map();
        static id = 0;

        constructor(name) {
            this.id = Ship.id++;

            this.x = 0;
            this.y = 0;
            this.angle = 0;
            this.size = config.ships[name].size;
            this.hardpoints = config.ships[name].hardpoints.map(hardpoint => new Hardpoint(this, hardpoint));

            this.asset = assets.get(name);

            Ship.ships.set(this.id, this);
        }

        update() {
            // this.x += Math.cos(this.angle) * 5;
            // this.y += Math.sin(this.angle) * 5;

            // this.angle += Math.PI / 180 / 10;

            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.drawImage(this.asset, -this.size / 2, -this.size / 2, this.size, this.size);

            ctx.strokeStyle = "#00FF00";
            ctx.lineWidth = 2;

            this.hardpoints.forEach(hardpoint => {
                hardpoint.update();

                ctx.save();
                
                ctx.translate(hardpoint.x, hardpoint.y);

                ctx.beginPath();
                ctx.arc(0, 0, 5, 0, Math.PI * 2);
                ctx.stroke();

                ctx.restore();
            });

            ctx.restore();
        }
        
        distanceTo(ship) {
            const dx = this.x - ship.x;
            const dy = this.y - ship.y;

            return Math.sqrt(dx * dx + dy * dy);
        }
    }

    const ship = new Ship("ISD");
    ship.x = -1000;
    ship.y = -250;

    const ship2 = new Ship("ISD");
    ship2.x = 750;
    ship2.y = 750;

    function drawLoop() {
        requestAnimationFrame(drawLoop);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#222222";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const scale = uiScale() * camera.zoom;

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.scale(scale, scale);
        ctx.translate(-camera.x, -camera.y);

        Ship.ships.forEach(ship => ship.update());

        Projectile.projectiles.forEach(projectile => projectile.update());

        ctx.restore();
    }

    drawLoop();
})();