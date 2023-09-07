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
        this.classification = 0;

        this.isGuided = false;

        this.target = null;
        this.range = hardpoint.range + this.speed * 10;

        Projectile.projectiles.set(this.id, this);
    }

    get collisionRange() {
        if (this.classification === weaponClassifications.AreaOfEffect) {
            return this.speed * 3;
        }

        if (this.classification === weaponClassifications.Turbolaser) {
            return this.speed * .5;
        }

        return this.speed * .75;
    }

    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;

        this.range -= this.speed;

        if (this.range <= 0) {
            Projectile.projectiles.delete(this.id);
        }

        if (this.isGuided && this.target !== null) {
            this.angle = Math.atan2(this.target.y - this.y, this.target.x - this.x);
        }

        if (this.target !== null && distance(this.x, this.y, this.target.x, this.target.y) <= this.collisionRange) {
            switch (this.classification) {
                case weaponClassifications.IonCannon:
                    if (this.target.ship.shield > 0) {
                        this.target.ship.shield -= this.hardpoint.damage;
                        this.target.ship.lastHit = performance.now();
                    }
                    break;
                case weaponClassifications.AreaOfEffect:
                    if (this.target.ship.shield > 0) {
                        this.target.ship.shield -= this.hardpoint.damage * .25; // Nuh uh uh
                        this.target.ship.lastHit = performance.now();
                    } else {
                        this.target.ship.lastHit = performance.now();

                        const validHardpoints = [];

                        for (let i = 0; i < this.target.ship.hardpoints.length; i++) {
                            const hardpoint = this.target.ship.hardpoints[i];

                            if (hardpoint.health > 0 && distance(this.x, this.y, hardpoint.x, hardpoint.y) <= this.collisionRange * 5) {
                                validHardpoints.push(hardpoint);
                            }
                        }

                        for (let i = 0; i < validHardpoints.length; i++) {
                            const hardpoint = validHardpoints[i];

                            hardpoint.health -= this.hardpoint.damage / validHardpoints.length;
                        }
                    }
                    break;
                default:
                    if (this.target.ship.shield > 0) {
                        this.target.ship.shield -= this.hardpoint.damage * (this.classification === weaponClassifications.Guided ? 1 : .334); // Nuh uh
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
        this.projectileType = config.weapon.type;

        this.reload = config.weapon.reload;
        this.tick = config.weapon.reload;
        this.damage = config.weapon.damage;
        this.speed = config.weapon.speed;
        this.range = config.weapon.range;
        this.shotsAtOnce = config.shotsAtOnce ?? 1;
        this.shotDelay = config.shotDelay ?? 500;

        this.health = config.weapon.health;
        this.maxHealth = config.weapon.health;
        this.team = ship.team;

        this.classification = weaponProperties[this.projectileType].classification;
        if (this.classification !== weaponClassifications.AreaOfEffect && this.classification !== weaponClassifications.Guided) {
            this.tick -= Math.random() * this.reload * .5 | 0;
        }

        this.target = null;

        this.firingArc = [-Math.PI / 2, Math.PI / 2];
        this.idleFacing = 0;
    }

    isInArc(tx, ty) {
        const atan2 = Math.atan2(ty - this.y, tx - this.x);

        const diff = angleDifference(atan2, this.ship.angle + this.idleFacing);

        return diff > this.firingArc[0] && diff < this.firingArc[1];
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
                (this.classification === weaponClassifications.IonCannon && this.target.ship.shield <= 0)
            ) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [];

            Ship.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    if (this.classification === weaponClassifications.IonCannon && ship.shield <= 0) {
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

            if (this.shotsAtOnce > 1) {
                for (let i = 0; i < this.shotsAtOnce; i++) {
                    setTimeout(() => {
                        if (this.health <= 0) {
                            return;
                        }

                        const inaccuracy = this.classification === weaponClassifications.AreaOfEffect ? 0 : (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2));

                        const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

                        const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
                        projectile.target = this.target;
                        projectile.type = this.projectileType;
                        projectile.isGuided = this.classification === weaponClassifications.Guided;
                        projectile.classification = this.classification;
                    }, i * this.shotDelay);
                }
            } else {
                const inaccuracy = (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2));

                const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

                const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
                projectile.target = this.target;
                projectile.type = this.projectileType;
                projectile.isGuided = this.classification === weaponClassifications.Guided;
                projectile.classification = this.classification;
            }
        }
    }
}

class Squadron {
    static squadrons = new Set();
    static id = 0;

    constructor(ship, hangar, config) {
        this.id = Squadron.id++;

        /**
         * @type {Ship}
         */
        this.ship = ship;

        /**
         * @type {Hangar}
         */
        this.hangar = hangar;

        this.target = null;

        this.ships = [];

        this.squadronKey = ships[config.squadronKey].asset;

        for (let i = 0; i < config.squadronSize; i++) {
            const ship = new Ship(ships[config.squadronKey], this.ship.team);
            ship.x = this.ship.x + Math.random() * 100 - 50;
            ship.y = this.ship.y + Math.random() * 100 - 50;
            ship.angle = this.ship.angle;
            ship.squadron = this;

            ship.onDead = () => {
                this.ships.splice(this.ships.indexOf(ship), 1);

                if (this.ships.length === 0) {
                    this.hangar.squadrons.delete(this);
                    Squadron.squadrons.delete(this);
                }
            }

            ship.ai = undefined;

            this.ships.push(ship);
        }

        this.hangar.squadrons.add(this);
        Squadron.squadrons.add(this);
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

        const angle = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        const tx = this.target.x + Math.cos(angle) * 100;
        const ty = this.target.y + Math.sin(angle) * 100;

        for (let i = 0; i < this.ships.length; i++) {
            const angle = Math.PI * 2 / this.ships.length * i;
            const distance = this.ships[i].size * 2.25;

            const $tx = tx + Math.cos(angle) * distance;
            const $ty = ty + Math.sin(angle) * distance;

            this.ships[i].angleGoal = Math.atan2($ty - this.ships[i].y, $tx - this.ships[i].x) + Math.PI;
            this.ships[i].speed = this.ships[i].maxSpeed;
        }
    }

    get packagedData() {
        let health = 0,
            x = 0,
            y = 0;

        this.ships.forEach(ship => {
            health += ship.health;
            x += ship.x;
            y += ship.y;
        });
        
        health /= this.ships.length;
        x /= this.ships.length;
        y /= this.ships.length;

        return [this.id, health, x, y, this.ship.team, this.squadronKey];
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
        this.hangarSize = config.reserveSize + config.maxSquadrons;
        this.config = config;

        this.tick = 0;
    }

    update() {
        this.tick++;

        if (this.tick >= 30) {
            this.tick = 0;

            if (this.hangarSize > 0 && this.squadrons.size < this.maxSquadrons) {
                this.hangarSize--;
                this.spawn();
            }
        }

        this.squadrons.forEach(squadron => {
            squadron.update();
        });
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

        if (this.target === null) {
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
        this.totalHealth = 0;

        this.ai = new ShipAI(this);
        this.squadron = null;

        /**
         * @type {Hardpoint[]}
         */
        this.hardpoints = [];

        this.hangars = [];

        for (const hardpoint of config.hardpoints) {
            this.hardpoints.push(new Hardpoint(this, hardpoint));

            this.totalHealth += hardpoint.weapon.health;
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
    "ISD": 8,
    "QUASAR": 0,
    "ARQUITENS": 0,
    "RAIDER": 0,

    "DUMMY_CARRIER": 0
};

const rebelFleet = {
    "HOMEONE": 0,
    "MC80LIBERTY": 8,
    "NEBULONB": 0,
    "PELTA": 0,
    "CR90": 0,

    "DUMMY_TARGET": 0
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
    const message = [Ship.ships.size, Projectile.projectiles.size, Squadron.squadrons.size];

    Ship.ships.forEach(ship => {
        message.push(ship.id, ship.x, ship.y, ship.angle, ship.size, ship.asset, ship.health, ship.maxShield === 0 ? -1 : ship.shield / ship.maxShield, ship.squadron !== null, ship.hardpoints.length);

        ship.hardpoints.forEach(hardpoint => {
            message.push(hardpoint.offset, hardpoint.direction, hardpoint.health / hardpoint.maxHealth);
        });
    });

    Projectile.projectiles.forEach(projectile => {
        message.push(projectile.id, projectile.x, projectile.y, projectile.type, projectile.angle);
    });

    Squadron.squadrons.forEach(squadron => {
        message.push(...squadron.packagedData);
    });

    postMessage(message);
}

setInterval(talk, 1000 / 17.5);