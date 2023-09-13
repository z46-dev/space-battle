import SpatialHashGrid from "./lib/SpatialHashGrid.js";
import { shipTypes, weaponClassifications, weaponProperties, weaponTypes } from "./lib/constants.js";
import ships from "./lib/ships.js";

function angleDifference(a, b) {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

function distance(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;

    return Math.sqrt(dx * dx + dy * dy);
}

function lerp(A, B, w) {
    return (1 - w) * A + w * B;
}

function lerpAngle(A, B, w) {
    let CS = (1 - w) * Math.cos(A) + w * Math.cos(B);
    let SN = (1 - w) * Math.sin(A) + w * Math.sin(B);
    return Math.atan2(SN, CS);
}

class Projectile {
    static id = 0;

    constructor(x, y, angle, ship, hardpoint) {
        this.id = Projectile.id++;

        /**
         * @type {Battle}
         */
        this.battle = ship.battle;

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

        this.battle.projectiles.set(this.id, this);
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
            this.battle.projectiles.delete(this.id);
            return;
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
                case weaponClassifications.GuidedAOE:
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

                            hardpoint.health -= this.hardpoint.damage / (validHardpoints.length * 2.5);
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

            this.battle.projectiles.delete(this.id);
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
        this.targetTypes = config.weapon.targetOverride ?? null;

        this.health = config.weapon.health;
        this.maxHealth = config.weapon.health;
        this.team = ship.team;

        this.classification = weaponProperties[this.projectileType].classification;
        if (this.classification !== weaponClassifications.AreaOfEffect && this.classification !== weaponClassifications.Guided && this.classification !== weaponClassifications.GuidedAOE) {
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

            this.ship.battle.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    if (this.classification === weaponClassifications.IonCannon && ship.shield <= 0) {
                        return;
                    }

                    if (this.targetTypes !== null && this.targetTypes.indexOf(ship.classification) === -1) {
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
                        if (this.health <= 0 || this.target === null) {
                            return;
                        }

                        const inaccuracy = this.classification === weaponClassifications.AreaOfEffect ? 0 : (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2));

                        const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

                        const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
                        projectile.target = this.target;
                        projectile.type = this.projectileType;
                        projectile.isGuided = this.classification === weaponClassifications.Guided || this.classification === weaponClassifications.GuidedAOE;
                        projectile.classification = this.classification;
                    }, i * this.shotDelay);
                }
            } else {
                const inaccuracy = (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2));

                const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

                const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
                projectile.target = this.target;
                projectile.type = this.projectileType;
                projectile.isGuided = this.classification === weaponClassifications.Guided || this.classification === weaponClassifications.GuidedAOE;
                projectile.classification = this.classification;
            }
        }
    }
}

class Squadron {
    static id = 0;

    constructor(ship, hangar, config) {
        this.id = Squadron.id++;

        /**
         * @type {Battle}
         */
        this.battle = ship.battle;

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
            const ship = new Ship(this.battle, ships[config.squadronKey], this.ship.team);
            ship.x = this.ship.x + Math.random() * 100 - 50;
            ship.y = this.ship.y + Math.random() * 100 - 50;
            ship.angle = this.ship.angle;
            ship.squadron = this;

            ship.onDead = () => {
                this.ships.splice(this.ships.indexOf(ship), 1);

                if (this.ships.length === 0) {
                    this.hangar.squadrons.delete(this);
                    this.battle.squadrons.delete(this.id);
                }
            }

            ship.ai = undefined;

            this.ships.push(ship);
        }

        this.hangar.squadrons.add(this);
        this.battle.squadrons.set(this.id, this);
    }

    findTarget() {
        if (this.target !== null) {
            if (this.target.health <= 0) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [];

            this.battle.ships.forEach(ship => {
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

            this.ships[i].angleGoal = Math.atan2($ty - this.ships[i].y, $tx - this.ships[i].x);
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

        return {
            id: this.id,
            x: x,
            y: y,
            health: health
        };
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

            this.ship.battle.ships.forEach(ship => {
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

        switch (this.ship.classification) {
            case shipTypes.Fighter:
            case shipTypes.Bomber:
                this.fighterThinking();
                break;
            case shipTypes.Corvette:
                this.corvetteThinking();
                break;
            case shipTypes.Frigate:
            case shipTypes.HeavyFrigate:
                this.lightFrigateThinking();
                break;
            case shipTypes.Capital:
            case shipTypes.SuperCapital:
                this.capitalShipThinking();
                break;
        }
    }

    fighterThinking() {
        this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
    }

    corvetteThinking() {
        if (this.ship.shield / this.ship.maxShield < .5 && this.ship.health < .75) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else if (distance(this.ship.x, this.ship.y, this.target.x, this.target.y) > 600) {
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
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
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            this.ship.speed = 0;
        }
    }

    capitalShipThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range));

        if (myDistance > range) { // Approach
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            this.ship.speed = 0;

            if (angleDifference(this.ship.angle, Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x)) > Math.PI / 3) {
                this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
            }
        }
    }
}

class Ship {
    static id = 0;
    constructor(battle, config, team) {
        this.id = Ship.id++;
        /**
         * @type {Battle}
         */
        this.battle = battle;
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
        this.classification = config.classification ?? shipTypes.Capital;

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

        this.battle.ships.set(this.id, this);
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
        this.angle = lerpAngle(this.angle, this.angleGoal, this.turnSpeed);

        if (this.ai !== undefined) {
            this.ai.update();
        }

        if (this.health <= 0) {
            this.battle.ships.delete(this.id);

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

class Battle {
    constructor(width, height, teams) {
        this.ships = new Map();
        this.projectiles = new Map();
        this.squadrons = new Map();

        this.width = width;
        this.height = height;

        this.updateInterval = setInterval(this.update.bind(this), 1000 / 22.5);
    }

    update() {
        this.ships.forEach(ship => {
            ship.update();
        });

        this.projectiles.forEach(projectile => {
            projectile.update();
        });
    }
}

const battle = new Battle(7_500, 7_500, 2);

const empireFleet = {
    "SSD": 0,
    "ISD": 0,
    "IMOBILIZER": 0,
    "QUASAR": 0,
    "ARQUITENS": 5,
    "RAIDER": 10,

    "DUMMY_CARRIER": 0,
    "THRAWN_QUASAR": 0
};

const rebelFleet = {
    "STARHAWK": 0,
    "HOMEONE": 0,
    "MC80LIBERTY": 0,
    "NEBULONB": 0,
    "PELTA": 0,
    "CR90": 0,

    "DUMMY_TARGET": 0,
    "REBEL_QUASAR": 0,
    "LUPUSMISSILEFRIGATE": 6,
    "PROVIDENCEDESTROYER": 1,
    

    // NEW SHIPS
    "CHIMERA_DESTROYER": 0
};

function spawn(ship, team) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 2000 * Math.random();

    const newShip = new Ship(battle, ships[ship], team);

    if (team === 0) {
        newShip.x = -8000 + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
    } else {
        newShip.x = 8000 + Math.cos(angle) * distance;
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

// Makes it possible to translate this to a server, not just having it in a web worker
class Camera {
    static ShipCache = class {
        id = 0;
        x = 0;
        y = 0;
        angle = 0;
        size = 0;
        asset = "";
        health = 0;
        shield = 0;
        isSquadron = false;
        hardpoints = [];

        updateX = false;
        updateY = false;
        updateAngle = false;
        updateHealth = false;
        updateShield = false;

        isNew = true;

        /**
         * @param {Ship} newShip 
         */
        update(newShip) {
            if (newShip.x !== this.x) {
                this.x = newShip.x;
                this.updateX = true;
            }

            if (newShip.y !== this.y) {
                this.y = newShip.y;
                this.updateY = true;
            }

            if (newShip.angle !== this.angle) {
                this.angle = newShip.angle;
                this.updateAngle = true;
            }

            if (newShip.health !== this.health) {
                this.health = newShip.health;
                this.updateHealth = true;
            }

            const shield = newShip.maxShield === 0 ? -1 : newShip.shield / newShip.maxShield;
            if (shield !== this.shield) {
                this.shield = shield;
                this.updateShield = true;
            }

            this.hardpoints = newShip.hardpoints.map(hardpoint => [hardpoint.offset, hardpoint.direction, hardpoint.health / hardpoint.maxHealth]);
        }

        getOutput() {
            const output = [this.id, this.isNew ? 1 : 0];

            if (this.isNew) {
                this.isNew = false;

                // Send everything
                output.push(this.x, this.y, this.angle, this.size, this.asset, this.health, this.shield, this.isSquadron, this.hardpoints.length, ...this.hardpoints.flat());
            } else {
                // Send only what changed
                if (this.updateX) {
                    output.push(this.x);
                    this.updateX = false;
                    output[1] += 2;
                }

                if (this.updateY) {
                    output.push(this.y);
                    this.updateY = false;
                    output[1] += 4;
                }

                if (this.updateAngle) {
                    output.push(this.angle);
                    this.updateAngle = false;
                    output[1] += 8;
                }

                if (this.updateHealth) {
                    output.push(this.health);
                    this.updateHealth = false;
                    output[1] += 16;
                }

                if (this.updateShield) {
                    output.push(this.shield);
                    this.updateShield = false;
                    output[1] += 32;
                }

                if (this.hardpoints.length > 0) {
                    output[1] += 64;
                    output.push(this.hardpoints.length, ...this.hardpoints.flat()); // idc about the performance here, not an issue except for like, 20 executors, which should never happen
                }
            }

            return output;
        }
    }

    static ProjectileCache = class {
        id = 0;
        x = 0;
        y = 0;
        type = 0;
        angle = 0;

        updateX = false;
        updateY = false;
        updateAngle = false;

        isNew = true;

        /**
         * @param {Projectile} newProjectile
         */
        update(newProjectile) {
            if (newProjectile.x !== this.x) {
                this.x = newProjectile.x;
                this.updateX = true;
            }

            if (newProjectile.y !== this.y) {
                this.y = newProjectile.y;
                this.updateY = true;
            }

            if (newProjectile.angle !== this.angle) {
                this.angle = newProjectile.angle;
                this.updateAngle = true;
            }
        }

        getOutput() {
            const output = [this.id, this.isNew ? 1 : 0];

            if (this.isNew) {
                this.isNew = false;

                // Send everything
                output.push(this.x, this.y, this.type, this.angle);
            } else {
                // Send only what changed
                if (this.updateX) {
                    output.push(this.x);
                    this.updateX = false;
                    output[1] += 2;
                }

                if (this.updateY) {
                    output.push(this.y);
                    this.updateY = false;
                    output[1] += 4;
                }

                if (this.updateAngle) {
                    output.push(this.angle);
                    this.updateAngle = false;
                    output[1] += 8;
                }
            }

            return output;
        }
    }

    static SquadronCache = class {
        id = 0;
        health = 0;
        x = 0;
        y = 0;
        team = 0;
        asset = "";

        updateHealth = false;
        updateX = false;
        updateY = false;

        isNew = true;

        /**
         * @param {Squadron} newSquadron
         */
        update(newSquadron) {
            const data = newSquadron.packagedData;
            if (data.health !== this.health) {
                this.health = data.health;
                this.updateHealth = true;
            }

            if (data.x !== this.x) {
                this.x = data.x;
                this.updateX = true;
            }

            if (data.y !== this.y) {
                this.y = data.y;
                this.updateY = true;
            }
        }

        getOutput() {
            const output = [this.id, this.isNew ? 1 : 0];

            if (this.isNew) {
                this.isNew = false;

                // Send everything
                output.push(this.health, this.x, this.y, this.team, this.asset);
            } else {
                // Send only what changed
                if (this.updateHealth) {
                    output.push(this.health);
                    this.updateHealth = false;
                    output[1] += 2;
                }

                if (this.updateX) {
                    output.push(this.x);
                    this.updateX = false;
                    output[1] += 4;
                }

                if (this.updateY) {
                    output.push(this.y);
                    this.updateY = false;
                    output[1] += 8;
                }
            }

            return output;
        }
    }

    constructor(connection) {
        /**
         * @type {Connection}
         */
        this.connection = connection;

        this.x = 0;
        this.y = 0;
        this.zoom = 1;

        this.shipsCache = new Map();
        this.projectilesCache = new Map();
        this.squadronsCache = new Map();

        /**
         * @type {Battle}
         */
        this.battle = connection.battle;
    }

    get fov() {
        return 1920 / this.zoom;
    }

    isInView(x, y, size) {
        return distance(x, y, this.x, this.y) < this.fov / 2 + size / 2;
    }

    update() {
        const shipsIDs = [];
        const projectilesIDs = [];
        const squadronsIDs = [];

        this.battle.ships.forEach(ship => {
            if (this.isInView(ship.x, ship.y, ship.size)) {
                shipsIDs.push(ship.id);

                if (!this.shipsCache.has(ship.id)) {
                    const cache = new Camera.ShipCache();

                    cache.id = ship.id;
                    cache.x = ship.x;
                    cache.y = ship.y;
                    cache.angle = ship.angle;
                    cache.size = ship.size;
                    cache.asset = ship.asset;
                    cache.health = ship.health;
                    cache.shield = ship.maxShield === 0 ? -1 : ship.shield / ship.maxShield;
                    cache.isSquadron = ship.squadron !== null;
                    cache.hardpoints = ship.hardpoints.map(hardpoint => [hardpoint.offset, hardpoint.direction, hardpoint.health / hardpoint.maxHealth]);

                    this.shipsCache.set(ship.id, cache);
                }

                this.shipsCache.get(ship.id).update(ship);
            }
        });

        this.battle.projectiles.forEach(projectile => {
            if (this.isInView(projectile.x, projectile.y, projectile.collisionRange)) {
                projectilesIDs.push(projectile.id);

                if (!this.projectilesCache.has(projectile.id)) {
                    const cache = new Camera.ProjectileCache();

                    cache.id = projectile.id;
                    cache.x = projectile.x;
                    cache.y = projectile.y;
                    cache.type = projectile.type;
                    cache.angle = projectile.angle;

                    this.projectilesCache.set(projectile.id, cache);
                }

                this.projectilesCache.get(projectile.id).update(projectile);
            }
        });

        this.battle.squadrons.forEach(squadron => {
            const data = squadron.packagedData;
            if (this.isInView(data.x, data.y, 50)) {
                squadronsIDs.push(squadron.id);

                if (!this.squadronsCache.has(squadron.id)) {
                    const cache = new Camera.SquadronCache();

                    cache.id = squadron.id;
                    cache.health = data.health;
                    cache.x = data.x;
                    cache.y = data.y;
                    cache.team = squadron.ship.team;
                    cache.asset = squadron.squadronKey;

                    this.squadronsCache.set(squadron.id, cache);
                }

                this.squadronsCache.get(squadron.id).update(squadron);
            }
        });

        const output = [0, this.x, this.y, this.zoom, shipsIDs.length, projectilesIDs.length, squadronsIDs.length];

        this.shipsCache.forEach(ship => {
            if (!shipsIDs.includes(ship.id)) {
                this.shipsCache.delete(ship.id);
                return;
            }

            output.push(...ship.getOutput());
        });

        this.projectilesCache.forEach(projectile => {
            if (!projectilesIDs.includes(projectile.id)) {
                this.projectilesCache.delete(projectile.id);
                return;
            }

            output.push(...projectile.getOutput());
        });

        this.squadronsCache.forEach(squadron => {
            if (!squadronsIDs.includes(squadron.id)) {
                this.squadronsCache.delete(squadron.id);
                return;
            }

            output.push(...squadron.getOutput());
        });

        this.connection.talk(output);
    }
}

class Connection {
    static connections = new Map();
    static id = 0;

    static generateMinimapUpdate(battle) {
        const output = [1, 0, battle.squadrons.size];

        battle.ships.forEach(ship => {
            if (ship.squadron === null) {
                output.push(ship.id, ship.x, ship.y, ship.team);

                output[1] += 1;
            }
        });

        battle.squadrons.forEach(squadron => {
            const data = squadron.packagedData;
            output.push(squadron.id, data.x, data.y, squadron.ship.team);
        });

        return output;
    }

    constructor(battle) {
        this.id = Connection.id++;

        /**
         * @type {Battle}
         */
        this.battle = battle;
        
        this.team = 0;
        this.ships = new Map();

        this.camera = new Camera(this);

        Connection.connections.set(this.id, this);

        setInterval(() => this.camera.update(), 1000 / 12.5);
    }

    talk() {}
}

const connection = new Connection(battle);
connection.talk = function (data) {
    postMessage(data);
}

setInterval(function minimapUpdate() {
    const packet = Connection.generateMinimapUpdate(battle);

    Connection.connections.forEach(connection => {
        connection.talk(packet);
    });
}, 1000);

onmessage = function (e) {
    connection.camera.x += e.data[0];
    connection.camera.y += e.data[1];
    connection.camera.zoom = e.data[2];
}