import { weaponClassifications, weaponProperties, weaponTypes } from "./lib/constants.js";
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
        this.id = Projectile.id++;
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = hardpoint.speed;
        this.ship = ship;
        this.hardpoint = hardpoint;
        this.type = 0;
        this.team = ship.team;

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

        if (this.target !== null && distance(this.x, this.y, this.target.x, this.target.y) <= this.speed * .75) {
            switch (weaponProperties[this.type].classification) {
                case weaponClassifications.IonCannon:
                    if (this.target.ship.shield > 0) {
                        this.target.ship.shield -= this.hardpoint.damage;
                        this.target.ship.lastHit = performance.now();
                    }
                    break;
                default:
                    if (this.target.ship.shield > 0) {
                        this.target.ship.shield -= this.hardpoint.damage * .334; // Nuh uh
                        this.target.ship.lastHit = performance.now();
                    } else {
                        this.target.health -= this.hardpoint.damage;
                        this.target.ship.lastHit = performance.now();
                    }
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
        this.projectileType = config.weapon.type;
        this.team = ship.team;

        this.target = null;
    }

    get x() {
        return this.ship.x + this.ship.size / 2 * this.offset * Math.cos(this.direction + this.ship.angle);
    }

    get y() {
        return this.ship.y + this.ship.size / 2 * this.offset * Math.sin(this.direction + this.ship.angle);
    }

    findTarget() {
        if (this.target !== null) {
            if (
                this.target.health <= 0 ||
                distance(this.x, this.y, this.target.x, this.target.y) > this.range ||
                (weaponProperties[this.projectileType].classification === weaponClassifications.IonCannon && this.target.ship.shield <= 0)
            ) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [];

            Ship.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    if (weaponProperties[this.projectileType].classification === weaponClassifications.IonCannon && ship.shield <= 0) {
                        return;
                    }

                    validShips.push(ship);
                }
            });

            validShips = validShips.sort(() => .5 - Math.random());
            validShips = validShips.sort((a, b) => distance(this.x, this.y, a.x, a.y) - distance(this.x, this.y, b.x, b.y));

            const ship = validShips[0] ?? null;

            if (ship !== null) {
                let validHardpoints = [];

                for (let i = 0; i < ship.hardpoints.length; i++) {
                    const hardpoint = ship.hardpoints[i];

                    if (hardpoint.health > 0 && distance(this.x, this.y, hardpoint.x, hardpoint.y) <= this.range) {
                        validHardpoints.push(hardpoint);
                    }
                }

                validHardpoints = validHardpoints.sort(() => .5 - Math.random());
                validHardpoints = validHardpoints.sort((a, b) => distance(this.x, this.y, a.x, a.y) - distance(this.x, this.y, b.x, b.y));

                this.target = validHardpoints[0] ?? null;
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

        this.tick++;

        if (this.tick >= this.reload) {
            this.tick = 0;

            // Predict where the projectile will be when it reaches the target
            const nowDist = distance(this.x, this.y, this.target.x, this.target.y);
            const predictedX = this.target.x + Math.cos(this.target.ship.angle) * this.target.ship.speed * nowDist / this.speed;
            const predictedY = this.target.y + Math.sin(this.target.ship.angle) * this.target.ship.speed * nowDist / this.speed;

            const inaccuracy = (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.maxShield / 2));

            const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

            const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
            projectile.target = this.target;
            projectile.type = this.projectileType;
        }
    }
}

class Squadron {
    constructor(ship, hangar, config) {
        /**
         * @type {Ship}
         */
        this.ship = ship;

        /**
         * @type {Hangar}
         */
        this.hangar = hangar;

        this.target = undefined;

        this.ships = [];

        for (let i = 0; i < config.squadronSize; i++) {
            const ship = new Ship(ships[config.squadronKey], this.ship.team);
            ship.x = this.ship.x + Math.random() * 100 - 50;
            ship.y = this.ship.y + Math.random() * 100 - 50;
            ship.angle = this.ship.angle;

            ship.onDead = () => {
                this.ships.splice(this.ships.indexOf(ship), 1);

                if (this.ships.length === 0) {
                    this.hangar.squadrons.delete(this);
                }
            }

            ship.ai = undefined;

            this.ships.push(ship);
        }

        this.hangar.squadrons.add(this);
    }

    findTarget() {
        if (this.target !== null) {
            if (this.target.health <= 0) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [];

            Ship.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    validShips.push(ship);
                }
            });

            validShips = validShips.sort(() => .5 - Math.random());
            validShips = validShips.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));

            this.target = validShips[0] ?? null;
        }
    }

    update() {
        this.findTarget();

        if (this.target === null) {
            this.ships.forEach(ship => {
                ship.speed = 0;
            });
            return;
        }

        this.ships.forEach(ship => {
            ship.speed = ship.maxSpeed;
            ship.angleGoal = Math.atan2(this.target.y - ship.y, this.target.x - ship.x) + Math.PI;
        });
    }
}

class Hangar {
    constructor(ship, config) {
        /**
         * @type {Ship}
         */
        this.ship = ship;

        this.squadrons = new Set();

        this.maxSquadrons = config.maxSquadrons;
        this.reserveSize = config.reserveSize;
        this.config = config;

        for (let i = 0; i < this.maxSquadrons; i++) {
            this.spawn();
        }
    }

    update() {
        if (this.reserveSize > 0 && this.squadrons.size < this.maxSquadrons) {
            this.reserveSize--;
            this.spawn();
        }
    }

    spawn() {
        new Squadron(this.ship, this, this.config);
    }
}

class ShipAI {
    constructor(ship) {
        /**
         * @type {Ship}
         */
        this.ship = ship;

        /**
         * @type {Ship}
         */
        this.target = null;

        this.orbitAngle = 0;
    }

    findTarget() {
        if (this.target !== null) {
            if (this.target.health <= 0) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [];

            Ship.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    validShips.push(ship);
                }
            });

            validShips = validShips.sort(() => .5 - Math.random());
            validShips = validShips.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));

            this.target = validShips[0] ?? null;
        }
    }

    update() {
        this.findTarget();

        if (this.target === null || this.ship.hangars.length > 0) {
            this.ship.speed = 0;
            return;
        }

        this.ship.speed = this.ship.maxSpeed;

        if (this.ship.size <= 45) {
            this.fighterThinking();
        } else if (this.ship.size <= 100) {
            this.corvetteThinking();
        } else if (this.ship.size <= 300) {
            this.lightFrigateThinking();
        } else {
            this.capitalShipThinking();
        }
    }

    fighterThinking() {
        this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
    }

    corvetteThinking() {
        if (this.ship.shield / this.ship.maxShield < .5 && this.ship.health < .75) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else if (distance(this.ship.x, this.ship.y, this.target.x, this.target.y) > 600) {
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
            this.orbitAngle = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else if (distance(this.ship.x, this.ship.y, this.target.x, this.target.y) < 500) {
            const gx = this.target.x + Math.cos(this.orbitAngle) * 400;
            const gy = this.target.y + Math.sin(this.orbitAngle) * 400;

            this.ship.angleGoal = Math.atan2(gy - this.ship.y, gx - this.ship.x);
            this.orbitAngle = this.ship.angleGoal + Math.PI / 16;
            this.ship.speed = this.ship.maxSpeed;
        }
    }

    lightFrigateThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range));

        if ((this.ship.shield / this.ship.maxShield < .25 && this.ship.health < .75) || myDistance < range / 3) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else if (myDistance > range) { // Approach
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
        } else {
            this.ship.speed = 0;
        }
    }

    capitalShipThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range));

        if (myDistance > range) { // Approach
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
        } else {
            this.ship.speed = 0;

            if (angleDifference(this.ship.angle, Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI) > Math.PI / 3) {
                this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
            }
        }
    }
}

class Ship {
    static id = 0;
    static ships = new Map();
    constructor(config, team) {
        this.id = Ship.id++;
        this.x = 0;
        this.y = 0;
        this.size = config.size;
        this.angle = 0;
        this.angleGoal = 0;
        this.turnSpeed = config.turnSpeed ?? 0;

        this.shield = config.shield ?? 0;
        this.maxShield = config.shield ?? 0;
        this.shieldRegen = config.shieldRegen ?? 0;
        this.lastHit = 0;
        this.speed = 0;
        this.maxSpeed = config.speed ?? 0;
        this.team = team;
        this.asset = config.asset;

        this.ai = new ShipAI(this);

        /**
         * @type {Hardpoint[]}
         */
        this.hardpoints = [];

        this.hangars = [];

        for (const hardpoint of config.hardpoints) {
            this.hardpoints.push(new Hardpoint(this, hardpoint));
        }

        for (const hangar of (config.hangars ?? [])) {
            this.hangars.push(new Hangar(this, hangar));
        }

        this.onDead = null;

        Ship.ships.set(this.id, this);
    }

    update() {
        this.hardpoints.forEach(hardpoint => {
            hardpoint.update();
        });

        this.hangars.forEach(hangar => {
            hangar.update();
        });

        this.shield = Math.max(this.shield, 0);
        if (this.shield < this.maxShield && performance.now() - this.lastHit > 7_500) {
            this.shield += this.shieldRegen;
            this.shield = Math.min(this.shield, this.maxShield);
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // Move to the angle
        this.angle = angleDifference(this.angle, this.angleGoal) > 0 ? this.angle + this.turnSpeed : this.angle - this.turnSpeed;

        if (this.ai !== undefined) {
            this.ai.update();
        }

        if (this.health <= 0) {
            Ship.ships.delete(this.id);

            if (this.onDead !== null) {
                this.onDead();
                this.onDead = null;
            }
        }
    }

    get health() {
        const totalHealth = this.hardpoints.reduce((total, hardpoint) => total + Math.max(0, hardpoint.health), 0);
        const totalMaxHealth = this.hardpoints.reduce((total, hardpoint) => total + hardpoint.maxHealth, 0);

        return totalHealth / totalMaxHealth;
    }
}

const empireFleet = {
    "SSD": 0,
    "ISD": 0,
    "ARQUITENS": 0,
    "RAIDER": 0,
    "QUASAR": 1
};

const rebelFleet = {
    "HOMEONE": 0,
    "MC80LIBERTY": 0,
    "NEBULONB": 0,
    "CR90": 0,
    "PELTA": 1
};

function spawn(ship, team) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 1000 * Math.random();

    const newShip = new Ship(ships[ship], team);

    if (team === 0) {
        newShip.x = -4000 + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
    } else {
        newShip.x = 4000 + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
        newShip.angle = Math.PI;
    }
}

for (const ship in empireFleet) {
    for (let i = 0; i < empireFleet[ship]; i++) {
        spawn(ship, 0);
    }
}

for (const ship in rebelFleet) {
    for (let i = 0; i < rebelFleet[ship]; i++) {
        spawn(ship, 1);
    }
}

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
        message.push(ship.id, ship.x, ship.y, ship.angle, ship.size, ship.asset, ship.health, ship.shield / ship.maxShield, ship.hardpoints.length);

        ship.hardpoints.forEach(hardpoint => {
            message.push(hardpoint.offset, hardpoint.direction, hardpoint.health / hardpoint.maxHealth);
        });
    });

    Projectile.projectiles.forEach(projectile => {
        message.push(projectile.id, projectile.x, projectile.y, projectile.type, projectile.angle);
    });

    postMessage(message);
}

setInterval(talk, 1000 / 17.5);