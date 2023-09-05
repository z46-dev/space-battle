import ships from "./lib/ships.js";

function angleDifference(a, b) {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
}

class Projectile {
    static id = 0;
    static projectiles = new Map();

    constructor(x, y, angle, ship, hardpoint) {
        this.id = Projectile.id ++;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = hardpoint.speed;
        this.ship = ship;
        this.hardpoint = hardpoint;

        this.target = null;
        this.range = hardpoint.range + this.speed * 10;

        Projectile.projectiles.set(this.id, this);
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.range -= this.speed;

        if (this.range <= 0) {
            Projectile.projectiles.delete(this.id);
        }

        if (this.target !== null && distance(this.x, this.y, this.target.x, this.target.y) <= this.speed) {
            if (this.target.ship.shield > 0) {
                this.target.ship.shield -= this.hardpoint.damage;
                this.target.ship.lastHit = performance.now();
            } else {
                this.target.health -= this.hardpoint.damage;
                this.target.ship.lastHit = performance.now();
            }

            Projectile.projectiles.delete(this.id);
        }
    }
}

class Hardpoint {
    /**
     * @param {Ship} ship 
     */
    constructor(ship, config) {
        this.ship = ship;
        this.offset = config.offset;
        this.direction = config.direction;

        this.reload = config.weapon.reload;
        this.tick = Math.random() * -this.reload | 0;
        this.damage = config.weapon.damage;
        this.speed = config.weapon.speed;
        this.range = config.weapon.range;

        this.health = config.weapon.health;
        this.maxHealth = config.weapon.health;

        this.target = null;
    }

    get x() {
        return this.ship.x + this.ship.size / 2 * this.offset * Math.cos(this.direction + this.ship.angle);
    }

    get y() {
        return this.ship.y + this.ship.size / 2 * this.offset * Math.sin(this.direction + this.ship.angle);
    }

    findTarget() {
        // Find a hardpoint of a ship that is within our range
        if (this.target !== null) {
            // Validate range
            if (this.target.health <= 0 || distance(this.x, this.y, this.target.x, this.target.y) > this.range) {
                this.target = null;
            }
        }

        if (this.target === null) {
            for (const ship of Ship.ships.values()) {
                if (ship === this.ship) {
                    continue;
                }

                if (distance(this.x, this.y, ship.x, ship.y) <= this.range) {
                    for (let i = 0; i < ship.hardpoints.length; i ++) {
                        const hardpoint = ship.hardpoints[i];

                        if (hardpoint.health > 0 && distance(this.x, this.y, hardpoint.x, hardpoint.y) <= this.range) {
                            this.target = hardpoint;
                            break;
                        }
                    }
                    break;
                }
            }
        }
    }

    update() {
        this.findTarget();

        if (this.health <= 0) {
            return;
        }

        if (this.target === null) {
            return;
        }

        this.tick ++;

        if (this.tick >= this.reload) {
            this.tick = 0;

            // Predict where the projectile will be when it reaches the target
            const nowDist = distance(this.x, this.y, this.target.x, this.target.y);
            const predictedX = this.target.x + Math.cos(this.target.ship.angle) * this.target.ship.speed * nowDist / this.speed;
            const predictedY = this.target.y + Math.sin(this.target.ship.angle) * this.target.ship.speed * nowDist / this.speed;

            const angle = Math.atan2(predictedY - this.y, predictedX - this.x);

            const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
            projectile.target = this.target;
        }
    }
}

class Ship {
    static id = 0;
    static ships = new Map();
    constructor(config) {
        this.id = Ship.id ++;
        this.x = 0;
        this.y = 0;
        this.size = config.size;
        this.angle = 0;

        this.shield = config.shield ?? 0;
        this.maxShield = config.shield ?? 0;
        this.shieldRegen = config.shieldRegen ?? 0;
        this.lastHit = 0;
        this.speed = config.speed ?? 0;

        /**
         * @type {Hardpoint[]}
         */
        this.hardpoints = [];

        for (const hardpoint of config.hardpoints) {
            this.hardpoints.push(new Hardpoint(this, hardpoint));
        }

        Ship.ships.set(this.id, this);
    }

    update() {
        this.hardpoints.forEach(hardpoint => {
            hardpoint.update();
        });

        this.shield = Math.max(this.shield, 0);
        if (this.shield < this.maxShield && performance.now() - this.lastHit > 7_500) {
            this.shield += this.shieldRegen;
            this.shield = Math.min(this.shield, this.maxShield);
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
    }

    get health() {
        const totalHealth = this.hardpoints.reduce((total, hardpoint) => total + Math.max(0, hardpoint.health), 0);
        const totalMaxHealth = this.hardpoints.reduce((total, hardpoint) => total + hardpoint.maxHealth, 0);

        return totalHealth / totalMaxHealth;
    }
}

const ISD1 = new Ship(ships.ISD);
ISD1.x = -1250;
ISD1.y = -550;

const ISD2 = new Ship(ships.ISD);
ISD2.x = 1250;
ISD2.y = 550;
ISD2.angle = Math.PI;

function gameTick() {
    Ship.ships.forEach(ship => {
        ship.update();
    });

    Projectile.projectiles.forEach(projectile => {
        projectile.update();
    });
}

setInterval(gameTick, 1000 / 22.5);

function talk() {
    const message = [Ship.ships.size, Projectile.projectiles.size];

    Ship.ships.forEach(ship => {
        message.push(ship.id, ship.x, ship.y, ship.angle, ship.size, ship.health, ship.shield / ship.maxShield, ship.hardpoints.length);

        ship.hardpoints.forEach(hardpoint => {
            message.push(hardpoint.offset, hardpoint.direction, hardpoint.health / hardpoint.maxHealth);
        });
    });

    Projectile.projectiles.forEach(projectile => {
        message.push(projectile.id, projectile.x, projectile.y);
    });

    postMessage(message);
}

setInterval(talk, 1000 / 17.5);