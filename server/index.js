import SpatialHashGrid from "./lib/SpatialHashGrid.js";
import { shipTypes, weaponClassifications, weaponDrawProperties, weaponProperties, weaponTypes } from "./lib/constants.js";
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
    return A + angleDifference(B, A) * w;
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
        this._collisionRange = hardpoint.collisionRange ?? null;

        this.isGuided = false;

        this.target = null;
        this.range = hardpoint.range + this.speed * 10;

        this.battle.projectiles.set(this.id, this);

        // Get source
        this.source = this.ship.source;
    }

    get collisionRange() {
        if (this._collisionRange !== null) {
            return this._collisionRange;
        }

        if (this.classification === weaponClassifications.AreaOfEffect) {
            return this.speed * 2;
        }

        if (this.classification === weaponClassifications.Turbolaser) {
            return this.speed * .5;
        }

        return this.speed * .75;
    }

    get explosionRange() {
        if (this.hardpoint.explosionRange !== null) {
            return this.hardpoint.explosionRange * this.collisionRange;
        }

        return this.collisionRange * 5;
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
                    if (this.target.ship.shield > 0 && !this.hardpoint.bypassShield) {
                        this.target.ship.shield -= this.hardpoint.damage * .25; // Nuh uh uh
                        this.target.ship.lastHit = performance.now();

                    } else {
                        this.target.ship.lastHit = performance.now();

                        const validHardpoints = [];

                        for (let i = 0; i < this.target.ship.hardpoints.length; i++) {
                            const hardpoint = this.target.ship.hardpoints[i];

                            if (hardpoint.health > 0 && distance(this.x, this.y, hardpoint.x, hardpoint.y) <= this.explosionRange) {
                                validHardpoints.push(hardpoint);
                            }
                        }

                        for (let i = 0; i < validHardpoints.length; i++) {
                            const hardpoint = validHardpoints[i];

                            hardpoint.health -= this.hardpoint.damage / (validHardpoints.length * 1.5);
                        }


                        this.battle.explode(this.target.x, this.target.y, this.collisionRange * 1.25, this.angle, "blueExplosion" + (Math.random() * 5 | 0 + 1));
                    }
                    break;
                default:
                    if (this.target.ship.shield > 0 && !this.hardpoint.bypassShield) {
                        this.target.ship.shield -= this.hardpoint.damage * (this.classification === weaponClassifications.Guided ? 1 : .334); // Nuh uh
                        this.target.ship.lastHit = performance.now();
                    } else {
                        this.target.health -= this.hardpoint.damage;
                        this.target.ship.lastHit = performance.now();
                    }
            }

            this.target.ship.hitBy = this.source;

            this.battle.projectiles.delete(this.id);
        }
    }
}

class Hardpoint {
    static id = 0;

    /**
     * @param {Ship} ship 
     */
    constructor(ship, config) {
        this.id = Hardpoint.id++;
        this.ship = ship;
        this.offset = config.offset;
        this.direction = config.direction;
        this.projectileType = config.weapon.type;

        this.reload = config.weapon.reload * 1.5;
        this.tick = config.weapon.reload * 1.5;
        this.damage = config.weapon.damage;
        this.speed = config.weapon.speed;
        this.range = config.weapon.range;
        this.shotsAtOnce = config.shotsAtOnce ?? 1;
        this.shotDelay = config.shotDelay ?? 500;
        this.targetTypes = config.weapon.targetOverride ?? null;
        this.collisionRange = config.weapon.collisionRange ?? null;
        this.explosionRange = config.weapon.explosionRange ?? null;
        this.bypassShield = config.weapon.bypassShield ?? false;

        this.health = config.weapon.health * 2;
        this.maxHealth = config.weapon.health * 2;
        this.team = ship.team;

        this.classification = weaponProperties[this.projectileType].classification;
        if (this.classification !== weaponClassifications.AreaOfEffect && this.classification !== weaponClassifications.Guided && this.classification !== weaponClassifications.GuidedAOE) {
            this.tick -= Math.random() * this.reload | 0;
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
            const retrievalAABB = this.ship.battle.teams[this.team].spatialHash.getAABB({
                x: this.x,
                y: this.y,
                size: this.range,
                width: 1,
                height: 1
            });

            const validHardpoints = [];

            for (let i = 0; i < this.ship.battle.teams.length; i++) {
                if (i !== this.team) {
                    const retrieval = this.ship.battle.teams[i].spatialHash.retrieve({
                        id: this.ship.id,
                        _AABB: retrievalAABB
                    });

                    retrieval.forEach(object => {
                        if (this.targetTypes !== null && this.targetTypes.indexOf(object.ship.classification) === -1) {
                            return;
                        }

                        validHardpoints.push(object);
                    });
                }
            }

            validHardpoints.sort(() => .5 - Math.random());

            this.target = validHardpoints[0] ?? null;
        }
    }

    insert() {
        if (this.health <= 0) {
            return;
        }

        // Insert into spatial hash grid
        this._AABB = this.ship.battle.teams[this.team].spatialHash.getAABB({
            x: this.x,
            y: this.y,
            size: 3,
            width: 1,
            height: 1
        });

        this.ship.battle.teams[this.team].spatialHash.insert(this);
    }

    update() {
        if (this.health <= 0) {
            if (!this.hasExploded) {
                this.hasExploded = true;

                if ((this.ship.classification !== shipTypes.Fighter && this.ship.classification !== shipTypes.Bomber) || Math.random() > .8) {
                    this.ship.battle.explode(this.x, this.y, Math.min(this.ship.size / 2, 80), this.angle);
                }
            }

            return;
        }

        this.findTarget();

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
                const target = this.target;
                for (let i = 0; i < this.shotsAtOnce; i++) {
                    setTimeout(() => {
                        if (this.health <= 0 || target === null) {
                            return;
                        }

                        const inaccuracy = (this.classification === weaponClassifications.AreaOfEffect || this.classification === weaponClassifications.GuidedAOE) ? 0 : (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (target.ship.totalHealth / 1.5)) * .5;
                        const angle = Math.atan2(predictedY - this.y, predictedX - this.x) + inaccuracy;

                        const projectile = new Projectile(this.x, this.y, angle, this.ship, this);
                        projectile.target = target;
                        projectile.type = this.projectileType;
                        projectile.isGuided = this.classification === weaponClassifications.Guided || this.classification === weaponClassifications.GuidedAOE;
                        projectile.classification = this.classification;
                    }, i * this.shotDelay);
                }
            } else {
                const inaccuracy = (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2)) * .5;

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

        this.targetTick = 0;

        for (let i = 0; i < config.squadronSize; i++) {
            const ship = new Ship(this.battle, config.squadronKey, this.ship.team);
            const angle = Math.PI * 2 / config.squadronSize * i;
            const distance = ship.size * 1.25;
            ship.x = this.hangar.x + Math.cos(angle) * distance;
            ship.y = this.hangar.y + Math.sin(angle) * distance;
            ship.angle = this.ship.angle;
            ship.squadron = this;
            ship.source = this.ship.source;

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
            if (this.target.health <= 0 || --this.targetTick <= 0) {
                this.target = null;
            }
        }

        if (this.target === null) {
            let validShips = [],
                mediumPriority = [],
                highPriority = [];

            this.battle.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0) {
                    validShips.push(ship);

                    switch (this.ships[0].classification) {
                        case shipTypes.Fighter:
                            if (ship.classification === shipTypes.Bomber) {
                                highPriority.push(ship);
                            }

                            if (ship.classification === shipTypes.Fighter) {
                                mediumPriority.push(ship);
                            }
                            break;
                        case shipTypes.Bomber:
                            if (ship.classification === shipTypes.Capital || ship.classification === shipTypes.SuperCapital) {
                                highPriority.push(ship);
                            }

                            if (ship.classification === shipTypes.Frigate || ship.classification === shipTypes.HeavyFrigate) {
                                mediumPriority.push(ship);
                            }
                            break;
                    }
                }
            });

            if (highPriority.length > 0) {
                validShips = highPriority;
            } else if (mediumPriority.length > 0) {
                validShips = mediumPriority;
            }

            validShips = validShips.sort(() => .5 - Math.random());
            validShips = validShips.sort((a, b) => distance(this.ships[0].x, this.ships[0].y, a.x, a.y) - distance(this.ships[0].x, this.ships[0].y, b.x, b.y));

            this.target = validShips[0] ?? null;
            this.targetTick = 100;
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

        for (let i = 0; i < this.ships.length; i++) {
            const angle = Math.PI * 2 / this.ships.length * i;
            const distance = this.ships[i].size * 2.25;

            const $tx = this.target.x + Math.cos(angle) * distance;
            const $ty = this.target.y + Math.sin(angle) * distance;

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

        this.offset = config.offset;
        this.direction = config.direction;

        this.tick = 0;
        this.reload = config.reload ?? 30;
    }

    get x() {
        return this.ship.x + this.ship.size / 2 * this.offset * Math.cos(this.direction + this.ship.angle);
    }

    get y() {
        return this.ship.y + this.ship.size / 2 * this.offset * Math.sin(this.direction + this.ship.angle);
    }

    update() {
        this.tick++;

        if (this.tick >= this.reload) {
            this.tick = 0;

            if (this.hangarSize > 0 && this.squadrons.size < this.maxSquadrons) {
                this.hangarSize--;
                this.spawn();
            }
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
        this.targetTick = 0;
    }

    findTarget() {
        if (this.target !== null) {
            if (this.target.health <= 0) {
                this.target = null;
            } else {
                this.target = distance(this.ship.x, this.ship.y, this.target.x, this.target.y) >= Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range)) ? null : this.target;
            }
        }

        if (this.target === null) {
            let validShips = [];

            this.ship.battle.ships.forEach(ship => {
                if (ship.team !== this.ship.team && ship.health > 0 && ((ship.classification !== shipTypes.Fighter && ship.classification !== shipTypes.Bomber) || this.ship.classification === shipTypes.Fighter || this.ship.classification === shipTypes.Bomber)) {
                    validShips.push(ship);
                }
            });

            validShips = validShips.sort(() => .5 - Math.random());
            validShips = validShips.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));

            this.target = validShips[0] ?? null;
            this.targetTick = 100;
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
        if (this.ship.shield / this.ship.maxShield < .5 && this.ship.health < .5) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            if (this.wanderGoal === undefined) {
                this.wanderGoal = {
                    x: this.target.x + Math.random() * this.target.size * 4 - this.target.size * 2,
                    y: this.target.y + Math.random() * this.target.size * 4 - this.target.size * 2
                };
            }

            const myDist = distance(this.ship.x, this.ship.y, this.wanderGoal.x, this.wanderGoal.y);
            if (myDist <= this.ship.size * 2.5) {
                this.wanderGoal = {
                    x: this.target.x + Math.random() * this.target.size * 4 - this.target.size * 2,
                    y: this.target.y + Math.random() * this.target.size * 4 - this.target.size * 2
                };
            }

            this.ship.angleGoal = Math.atan2(this.wanderGoal.y - this.ship.y, this.wanderGoal.x - this.ship.x);
        }
    }

    lightFrigateThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range));

        if ((this.ship.shield / this.ship.maxShield < .25 && this.ship.health < .75) || myDistance < range / 3) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x) + Math.PI;
        } else if (myDistance > range) { // Approach
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            this.ship.speed = 0;

            if (angleDifference(this.ship.angle, Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x)) > Math.PI / 2) {
                this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
            }
        }
    }

    capitalShipThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range));

        if (myDistance > range) { // Approach
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            this.ship.speed = 0;

            if (this.target.classification >= shipTypes.HeavyFrigate && angleDifference(this.ship.angle, Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x)) > Math.PI / 3) {
                this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
            }
        }
    }
}

class Ship {
    static id = 0;
    constructor(battle, configKey, team) {
        this.id = Ship.id++;
        /**
         * @type {Battle}
         */
        this.battle = battle;
        this.key = configKey;
        const config = ships[configKey];
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

        this.source = this;
        this.explodeOnDeath = true;

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

        this.events = {};

        if (config.events !== undefined) {
            for (const key in config.events) {
                this.events[key] = config.events[key];
            }
        }

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

        if (this.ai !== undefined && this.squadron === null) {
            this.ai.update();
        }

        if (this.health <= 0) {
            this.battle.ships.delete(this.id);

            if (this.explodeOnDeath) {
                if (this.classification !== shipTypes.Fighter && this.classification !== shipTypes.Bomber) {
                    for (let i = 0; i < this.hardpoints.length / 3; i++) {
                        const x = this.hardpoints[i].x + Math.random() * this.size * .2 - this.size * .1;
                        const y = this.hardpoints[i].y + Math.random() * this.size * .2 - this.size * .1;

                        setTimeout(this.battle.explode.bind(this.battle, x, y, this.size / (2 + Math.random() * 2), Math.PI * 2 * Math.random()), i * 75);
                    }

                    this.battle.explode(this.x, this.y, this.size);
                } else {
                    this.battle.explode(this.x, this.y, this.size * 1.25);
                }
            }

            if (this.onDead !== null) {
                this.onDead();
                this.onDead = null;
            }

            if (this.events.onDead !== undefined) {
                this.events.onDead(this, this.battle);
            }

            if (this.hitBy != null && this.hitBy.events.onKill !== undefined) {
                this.hitBy.events.onKill(this.hitBy, this, this.battle);
            }

            if (this.classification >= shipTypes.Frigate) {
                this.battle.dieNerd(this.x, this.y, this.size, this.angle, this.asset);
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

        this.explosionsToRender = [];
        this.deathsToSend = [];

        this.teams = [];
        for (let i = 0; i < teams; i++) {
            this.teams.push({
                i: i,
                spatialHash: new SpatialHashGrid()
            });
        }
    }

    spawn(key, team, x, y) {
        const newShip = new Ship(this, key, team);
        newShip.x = x;
        newShip.y = y;

        return newShip;
    }

    update() {
        for (let i = 0; i < this.teams.length; i++) {
            this.teams[i].spatialHash.clear();
        }

        this.ships.forEach(ship => {
            ship.hardpoints.forEach(hardpoint => {
                hardpoint.insert();
            });
        });

        this.ships.forEach(ship => {
            ship.update();
        });

        this.projectiles.forEach(projectile => {
            projectile.update();
        });

        this.squadrons.forEach(squadron => {
            squadron.update();
        });
    }

    explode(x, y, size, angle = Math.random() * Math.PI * 2, sprite = -1) {
        this.explosionsToRender.push({
            x: x,
            y: y,
            size: size,
            angle: angle,
            sprite: sprite === -1 ? "explosion" + (Math.random() * 10 | 0 + 1) : sprite
        });
    }

    dieNerd(x, y, size, rotation, asset) {
        this.deathsToSend.push({
            x: x,
            y: y,
            size: size,
            rotation: rotation,
            asset: asset
        });
    }
}

function getRandomPointInEllipse(x, y, w, h, angle) {
    // Generate random points within the unrotated ellipse
    const randomAngle = Math.random() * 2 * Math.PI;
    const radiusX = Math.sqrt(Math.random()) * w / 2;
    const radiusY = Math.sqrt(Math.random()) * h / 2;
    const randomX = x + radiusX * Math.cos(randomAngle);
    const randomY = y + radiusY * Math.sin(randomAngle);

    // Apply rotation transformation to the random points
    const rotatedX = Math.cos(angle) * (randomX - x) - Math.sin(angle) * (randomY - y) + x;
    const rotatedY = Math.sin(angle) * (randomX - x) + Math.cos(angle) * (randomY - y) + y;

    return { x: rotatedX, y: rotatedY };
}

const battle = new Battle(100_000, 100_000, 2);

const empireFleet = {
    "CONSOLAR_REPUBLIC": 0,
    "CR90_REPUBLIC": 0,
    "PELTA_REPUBLIC": 0,
    "ARQUITENS_REPUBLIC": 0,
    "CARRACK_REPUBLIC": 0,
    "ACCLIMATOR_REPUBLIC": 0,
    "VENATOR_REPUBLIC": 0,
    "SECUTOR_REPUBLIC": 0,
    "PRAETOR_REPUBLIC": 0,

    "RAIDER_EMPIRE": 0,
    "VIGILCORVETTE_EMPIRE": 0,
    "QUASAR_EMPIRE": 0,
    "CARRACK_EMPIRE": 0,
    "LANCERFRIGATE_EMPIRE": 0,
    "ARQUITENS_EMPIRE": 0,
    "IMOBILIZER_EMPIRE": 0,
    "DREADNOUGHTHEAVYCRUISER_EMPIRE": 0,
    "ACCLIMATOR_EMPIRE": 0,
    "IMPERIALSTARDESTROYER_EMPIRE": 0,
    "ALLEGIANCE_EMPIRE": 0,
    "VICTORYSTARDESTROYER_EMPIRE": 0,
    "AGGRESSORSTARDESTROYER_EMPIRE": 0,
    "EXECUTORSUPERSTARDESTROYER_EMPIRE": 0,
    "ARCHAMMER_EMPIRE": 0,
    "DEATHSTAR_EMPIRE": 0,

    "IPV1_DARKEMPIRE": 0,
    "VIGILCORVETTE_DARKEMPIRE": 0,
    "TONFALKCARRIER_DARKEMPIRE": 0,
    "MTFCRUISER_DARKEMPIRE": 0,
    "CARRACK_DARKEMPIRE": 0,
    "LANCERFRIGATE_DARKEMPIRE": 0,
    "WORLDDEVASTATORFG_DARKEMPIRE": 0,
    "DREADNOUGHTHEAVYCRUISER_DARKEMPIRE": 0,
    "IMPERIALSTARDESTROYER_DARKEMPIRE": 0,
    "ALLEGIANCE_DARKEMPIRE": 0,
    "INTERDICTORSTARDESTROYER_DARKEMPIRE": 0,
    "ONAGER_DARKEMPIRE": 0,
    "XYSTON_DARKEMPIRE": 0,
    "RESURGENT_DARKEMPIRE": 0,
    "WORLDDEVASTATORBC_DARKEMPIRE": 0,
    "BELLATOR_DARKEMPIRE": 0,
    "ASSERTOR_DARKEMPIRE": 0,
    "MANDATORSIEGEDREADNOUGHT_DARKEMPIRE": 0,
    "MEGASTARDESTOYER_DARKEMPIRE": 0
};

const rebelFleet = {
    "LUSANKYA_REBEL": 0,
    "STARHAWK_REBEL": 0,
    "MC85_REBEL": 0,
    "MC75_REBEL": 0,
    "MC80A_REBEL": 0,
    "MC80BLIBERTY_REBEL": 0,
    "MC50_REBEL": 0,
    "MC30C_REBEL": 0,
    "NEBULONB_REBEL": 0,
    "PELTA_REBEL": 0,
    "CR90_REBEL": 0,
    "DP20_REBEL": 0,
    "MARAUDERMISSILECRUISER_REBEL": 0,
    "QUASAR_REBEL": 0,

    "LUPUSMISSILEFRIGATE_CIS": 0,
    "DIAMOND_CIS": 0,
    "HARDCELL_CIS": 0,
    "C9979_CIS": 0,
    "PROVIDENCEDESTROYER_CIS": 0,
    "MUNIFICENT_CIS": 0,
    "RECUSANT_CIS": 0,
    "LUCREHULK_CIS": 0,
    "PROVIDENCEDREADNOUGHT_CIS": 0,
    "RECUSANTDREADNOUGHT_CIS": 0,

    // Hutts
    "CONSOLAR_HUTT": 0,
    "ACTIONVITRANSPORT_HUTT": 0,
    "CR90_HUTT": 0,
    "LUPUSMISSILEFRIGATE_HUTT": 0,
    "BRUTESUPPORTFRIGATE_HUTT": 0,
    "MUNIFICENT_HUTT": 0,
    "RECUSANT_HUTT": 0,
    "ACCLIMATOR_HUTT": 0,
    "MC69NOIR_HUTT": 0,
    "VENATOR_HUTT": 0,

    // Zann Consortium
    "ACTIONVITRANSPORT_ZANN": 0,
    "CRUSADERCORVETTE_ZANN": 0,
    "DP20_ZANN": 0,
    "LANCERFRIGATE_ZANN": 0,
    "BROADSIDECRUISER_ZANN": 0,
    "FREEVIRGILLIABUNKERBUSTER_ZANN": 0,
    "KELDABEBATTLESHIP_ZANN": 0,
    "AGGRESSORSTARDESTROYER_ZANN": 0,
    "VENATOR_ZANN": 0,

    // NEW SHIPS
    "CHIMERA_DESTROYER": 0
};

function spawn(ship, team) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 5000;
    const spawnDistance = 0;

    const newShip = new Ship(battle, ship, team);

    if (team === 0) {
        newShip.x = -spawnDistance + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
    } else {
        newShip.x = spawnDistance + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
        newShip.angle = Math.PI;
    }

    if (spawnDistance === 0) {
        newShip.angle = Math.random() * Math.PI * 2;
    }

    return newShip;
}

const empireShips = [];
for (const ship in empireFleet) {
    if (ship === "DEATHSTAR_EMPIRE" && empireFleet[ship] > 0) {
        const angle = -Math.PI / 2;
        const distance = 0;
        const spawnDistance = 15000;

        const newShip = new Ship(battle, ship, 0);

        newShip.x = -spawnDistance + Math.cos(angle) * distance;
        newShip.y = Math.sin(angle) * distance;
        newShip.angle = Math.PI / 2;
        continue;
    }

    for (let i = 0; i < empireFleet[ship]; i++) {
        empireShips.push(spawn(ship, 0));
    }
}

const rebelShips = [];
for (const ship in rebelFleet) {
    for (let i = 0; i < rebelFleet[ship]; i++) {
        rebelShips.push(spawn(ship, 1));
    }
}

const spawnDistance = 20000;

empireShips.sort(() => .5 - Math.random());
scatterFormation(empireShips, -spawnDistance, -spawnDistance, Math.PI / 4);

rebelShips.sort(() => .5 - Math.random());
scatterFormation(rebelShips, spawnDistance, spawnDistance, -Math.PI + Math.PI / 4);

function scatterFormation(ships, x, y, angle) {
    // Biggest ship to smallest ship
    ships.sort((a, b) => b.size - a.size);
    // Scatter ships around using position sampling, making sure they aren't less than 1.25 * ship size to any other ship
    const positions = [];

    for (let i = 0; i < ships.length; i++) {
        let position = {
            x: 0,
            y: 0
        };

        let valid = false,
            radius = ships[i].size * 2,
            iterations = 0;

        if (i === 0) {
            radius = 0;
        }

        while (!valid && iterations++ < 1000) {
            position = {
                x: x + Math.random() * radius - radius / 2,
                y: y + Math.random() * radius - radius / 2
            };

            valid = true;
            for (let j = 0; j < positions.length; j++) {
                if (distance(position.x, position.y, positions[j].x, positions[j].y) < ships[i].size * .85) {
                    valid = false;
                    if (iterations % 10 === 0) {
                        radius += ships[i].size * .25;
                    }
                    break;
                }
            }
        }

        positions.push(position);
    }

    for (let i = 0; i < ships.length; i++) {
        ships[i].x = positions[i].x;
        ships[i].y = positions[i].y;
        ships[i].angle = angle;
        ships[i].angleGoal = angle;
    }
}

// Makes it possible to translate this to a server, not just having it in a web worker
class Camera {
    static ShipCache = class {
        id = 0;
        key = "";
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
                output.push(this.key, this.x, this.y, this.angle, this.size, this.asset, this.health, this.shield, this.isSquadron, this.hardpoints.length, ...this.hardpoints.flat());
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
        this.locked = false;

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
                if (ship.squadron != null && ship.size < 5 * this.zoom) {
                    return;
                }

                shipsIDs.push(ship.id);

                if (!this.shipsCache.has(ship.id)) {
                    const cache = new Camera.ShipCache();

                    cache.id = ship.id;
                    cache.key = ship.key;
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

        this.battle.projectiles.forEach(proj => {
            /**
             * @type {Projectile}
             */
            const projectile = proj;
            if (this.isInView(projectile.x, projectile.y, projectile.collisionRange)) {
                const props = weaponDrawProperties[projectile.type];

                if (2 * props.strength * 6 * this.zoom < 2 || (projectile.ship.classification <= shipTypes.Bomber && projectile.classification === weaponClassifications.LaserCannon)) {
                    return;
                }

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

        const output = [0, this.x, this.y, this.zoom, shipsIDs.length, projectilesIDs.length, squadronsIDs.length, this.battle.explosionsToRender.length, this.battle.deathsToSend.length];

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

        this.battle.explosionsToRender.forEach(explosion => {
            output.push(explosion.x, explosion.y, explosion.size, explosion.angle, explosion.sprite);
        });

        this.battle.deathsToSend.forEach(death => {
            output.push(death.x, death.y, death.size, death.rotation, death.asset);
        });

        this.connection.talk(output);
    }
}

class Connection {
    static connections = new Map();
    static id = 0;

    static generateMinimapUpdate(battle) {
        const output = [1, battle.width, battle.height, 0, battle.squadrons.size];

        battle.ships.forEach(ship => {
            if (ship.squadron == null) {
                output.push(ship.x / battle.width, ship.y / battle.height, ship.team, ship.size / battle.width, ship.asset, ship.angle);

                output[3] += 1;
            }
        });

        battle.squadrons.forEach(squadron => {
            const data = squadron.packagedData;
            output.push(data.x / battle.width, data.y / battle.height, squadron.ship.team);
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
    }

    talk() { }
}

const connection = new Connection(battle);
connection.talk = function (data) {
    postMessage(data);
}

setInterval(function update() {
    connection.camera.update();
    battle.explosionsToRender = [];
    battle.deathsToSend = [];
}, 1000 / 20);

setInterval(function minimapUpdate() {
    const packet = Connection.generateMinimapUpdate(battle);

    Connection.connections.forEach(connection => {
        connection.talk(packet);
    });
}, 1000);

class HoldoManeuverAI extends ShipAI {
    constructor(holdo, hux) {
        super(holdo);

        /**
         * @type {Ship}
         */
        this.ramTarget = hux;
        this.stage = 0;
        this.timer = 0;
    }

    update() {
        const dist = distance(this.ship.x, this.ship.y, this.ramTarget.x, this.ramTarget.y);
        const angle = Math.atan2(this.ramTarget.y - this.ship.y, this.ramTarget.x - this.ship.x);

        switch (this.stage) {
            case 0: // Flee
                this.ship.speed = 16;
                this.ship.angleGoal = angle + Math.PI;
                this.ship.turnSpeed = .005;

                if (dist >= this.ramTarget.size * 1.25) {
                    this.stage = 1;
                }
                break;
            case 1: // Aim
                this.ship.speed = lerp(this.ship.speed, 0, .2);
                this.ship.angleGoal = angle;

                if (angleDifference(this.ship.angle, angle) <= Math.PI / 15) {
                    this.stage = 2;
                }
                break;
            case 2: // Count down
                this.timer++;

                if (this.timer >= 150) {
                    this.stage = 3;
                    this.ship.speed = dist * .125;
                    this.ship.angle = angle;
                }
                break;
            case 3: // Ram
                this.ship.angle = angle;

                if (dist <= this.ship.size) {
                    this.collide();
                }
                break;
        }
    }

    collide() {
        this.ship.battle.ships.delete(this.ship.id);
        this.ramTarget.shield = 0;

        for (let i = 0; i < 32; i++) {
            const point = getRandomPointInEllipse(this.ship.x, this.ship.y, this.ship.size * 3, this.ship.size / 2, this.ramTarget.angle);
            this.ship.battle.explode(
                point.x,
                point.y,
                this.ship.size * .15 + Math.random() * this.ramTarget.size * .2,
                Math.random() * Math.PI * 2,
                "blueExplosion" + ((Math.random() * 5 | 0) + 1)
            );
        }

        const angle = this.ramTarget.angle + Math.PI;
        for (let i = 0; i < 32; i++) {
            const point = getRandomPointInEllipse(this.ship.x + Math.cos(angle) * this.ship.size, this.ship.y + Math.sin(angle) * this.ship.size, this.ship.size, this.ship.size / 2, this.ramTarget.angle);
            this.ship.battle.explode(
                point.x,
                point.y,
                this.ship.size * .15 + Math.random() * this.ramTarget.size * .2,
                Math.random() * Math.PI * 2,
                "blueExplosion" + ((Math.random() * 5 | 0) + 1)
            );
        }

        setTimeout(() => {
            this.ramTarget.shield = 0;
            this.ramTarget.hardpoints.forEach(h => h.health = 0);
        }, 5000);
    }
}

onmessage = function (e) {
    switch (e.data.shift()) {
        case 0:
            if (!connection.camera.locked) {
                connection.camera.x += e.data[0];
                connection.camera.y += e.data[1];
                connection.camera.zoom = e.data[2];
            }
            break;
        case 1: {
            let holdo, hux;

            battle.ships.forEach(ship => {
                switch (ship.key) {
                    case "MEGASTARDESTOYER_DARKEMPIRE":
                        hux = ship;
                        break;
                    case "MC85_REBEL":
                        holdo = ship;
                }
            });

            if (holdo && hux) {
                holdo.ai = new HoldoManeuverAI(holdo, hux);
            }
        } break;
    }
}

class Scene {
    constructor(battle) {
        /**
         * @type {Battle}
         */
        this.battle = battle;
        this.camera = connection.camera;
    }

    wait(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        });
    }

    async lockCamera() {
        this.camera.locked = true;
    }

    async unlockCamera() {
        this.camera.locked = false;
    }

    moveCamera(x, y, zoom) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                this.camera.x = lerp(this.camera.x, x, .1);
                this.camera.y = lerp(this.camera.y, y, .1);
                this.camera.zoom = lerp(this.camera.zoom, zoom, .1);

                if (distance(this.camera.x, this.camera.y, x, y) < 10 && Math.abs(this.camera.zoom - zoom) < .0001) {
                    clearInterval(interval);
                    resolve();
                }
            }, 1000 / 45);
        });
    }

    /**
     * 
     * @param {string} key 
     * @param {number} team 
     * @returns {Ship}
     */
    getShip(key, team) {
        let ship = null;
        this.battle.ships.forEach(s => {
            if (s.key === key && s.team === team) {
                ship = s;
            }
        });

        return ship;
    }

    hyperspaceIn(key, team, x, y, angle, delay = 0) {
        return new Promise(resolve => {
            setTimeout(() => {
                const ship = new Ship(this.battle, key, team);
                const _speed = ship.speed;
                const dist = ship.size * 10;
                const angle2 = angle + Math.PI;

                const _ai = ship.ai;
                ship.ai = undefined;

                ship.x = x + Math.cos(angle2) * dist;
                ship.y = y + Math.sin(angle2) * dist;
                ship.speed = dist / 8;
                ship.angle = ship.angleGoal = angle;

                const interval = setInterval(() => {
                    if (distance(ship.x, ship.y, x, y) < 10) {
                        ship.speed = _speed;
                        ship.ai = _ai;
                        clearInterval(interval);
                        resolve();
                    }
                }, 5);
            }, delay);
        });
    }

    /**
     * @param {Ship} ship 
     * @param {number} zoom 
     */
    lockOnTo(ship, zoom = 1) {
        return new Promise(resolve => {
            this.isLocked = ship.id;

            const interval = setInterval(() => {
                if (ship == null || !this.battle.ships.has(ship.id) || this.isLocked !== ship.id) {
                    clearInterval(interval);
                    this.isLocked = false;
                    resolve();
                    return;
                }

                this.camera.x = ship.x;
                this.camera.y = ship.y;
                this.camera.zoom = zoom;
            }, 1000 / 45);
        });
    }

    releaseLock() {
        this.isLocked = false;
    }
}

const scene = new Scene(battle);
async function holdoManeuverScene() {
    const spawnpoint = {
        x: -30000,
        y: -30000,
        angle: 0,
        range: () => Math.random() * 20000 - 10000
    };

    spawnpoint.angle = Math.atan2(spawnpoint.y, spawnpoint.x) + Math.PI;

    await scene.wait(1000);
    await scene.lockCamera();
    await scene.moveCamera(0, 0, .2);

    await scene.hyperspaceIn("MC85_REBEL", 1, 0, 0, spawnpoint.angle - Math.PI, 0);
    await scene.wait(1000);

    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .05);
    await scene.wait(1000);

    const resurgents = [];

    for (let i = 0; i < 8; i++) {
        resurgents.push(scene.hyperspaceIn("RESURGENT_DARKEMPIRE", 0, spawnpoint.x + spawnpoint.range(), spawnpoint.y + spawnpoint.range(), spawnpoint.angle, Math.random() * 3000));
    }

    await Promise.all(resurgents);
    await scene.wait(1000);
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .025);

    await scene.wait(1000);
    await scene.hyperspaceIn("MEGASTARDESTOYER_DARKEMPIRE", 0, spawnpoint.x, spawnpoint.y, spawnpoint.angle, 0);
    await scene.wait(5000);

    const supremacy = scene.getShip("MEGASTARDESTOYER_DARKEMPIRE", 0);
    const raddus = scene.getShip("MC85_REBEL", 1);

    raddus.ai = new HoldoManeuverAI(raddus, supremacy);
    raddus.hardpoints.forEach(h => h.health = h.maxHealth = 1e10);
    await scene.lockOnTo(raddus, .1);
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .015);

    await scene.wait(10000);
}

async function battleOfEndorScene() {
    const spawnpoint = {
        x: -4000,
        y: -4000,
        angle: 0,
        range: () => Math.random() * 15000 - 7500
    };

    const spawnpoint2 = {
        x: 4000,
        y: 4000,
        angle: 0,
        range: () => Math.random() * 7500 - (7500 / 2)
    };

    spawnpoint.angle = Math.atan2(spawnpoint.y, spawnpoint.x) + Math.PI;
    spawnpoint2.angle = Math.atan2(spawnpoint2.y, spawnpoint2.x) + Math.PI;

    await scene.wait(1000);
    await scene.lockCamera();
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .05);

    const empireFleet = {
        "IMPERIALSTARDESTROYER_EMPIRE": 30,
        "ALLEGIANCE_EMPIRE": 1,
        "EXECUTORSUPERSTARDESTROYER_EMPIRE": 1,
        "DEATHSTAR_EMPIRE": 1
    };

    const rebelFleet = {
        "MC80A_REBEL": 4,
        "MC80BLIBERTY_REBEL": 5,
        "MC75_REBEL": 3,
        "MC30C_REBEL": 4,
        "MC50_REBEL": 3,
        "NEBULONB_REBEL": 10,
        "CR90_REBEL": 8,
        "DP20_REBEL": 4,
        "MARAUDERMISSILECRUISER_REBEL": 4
    };

    const empirePromises = [];

    for (const ship in empireFleet) {
        for (let i = 0; i < empireFleet[ship]; i++) {
            empirePromises.push(scene.hyperspaceIn(ship, 0, spawnpoint.x + spawnpoint.range(), spawnpoint.y + spawnpoint.range(), spawnpoint.angle, Math.random() * 3000));
        }
    }

    await Promise.all(empirePromises);

    await scene.wait(1000);
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .05);

    const rebelPromises = [];

    for (const ship in rebelFleet) {
        for (let i = 0; i < rebelFleet[ship]; i++) {
            rebelPromises.push(scene.hyperspaceIn(ship, 1, spawnpoint2.x + spawnpoint2.range(), spawnpoint2.y + spawnpoint2.range(), spawnpoint2.angle, Math.random() * 3000));
        }
    }

    await Promise.all(rebelPromises);
    await scene.wait(1000);
    scene.unlockCamera();
}

async function battleOfSaleucami() {
    const spawnpoint = {
        x: -4000,
        y: -4000,
        angle: 0,
        range: () => Math.random() * 5000 - 2500
    };

    const spawnpoint2 = {
        x: 4000,
        y: 4000,
        angle: 0,
        range: () => Math.random() * 5000 - 2500
    };

    spawnpoint.angle = Math.atan2(spawnpoint.y, spawnpoint.x) + Math.PI;
    spawnpoint2.angle = Math.atan2(spawnpoint2.y, spawnpoint2.x) + Math.PI;

    await scene.wait(1000);
    await scene.lockCamera();
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .05);

    await scene.hyperspaceIn("VENATOR_REPUBLIC", 1, spawnpoint2.x / 3, spawnpoint2.y / 3, spawnpoint2.angle, 0);

    await scene.wait(1000);

    const eathKoth = scene.getShip("VENATOR_REPUBLIC", 1);
    eathKoth.shield = eathKoth.maxShield = 100;
    eathKoth.hardpoints.forEach(h => h.health = h.maxHealth = 10);

    await scene.wait(1000);
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .1);

    const CISFleet = {
        "RECUSANTDREADNOUGHT_CIS": 1,
        "MUNIFICENT_CIS": 3
    };

    const CISPromises = [];

    for (const ship in CISFleet) {
        for (let i = 0; i < CISFleet[ship]; i++) {
            CISPromises.push(scene.hyperspaceIn(ship, 0, spawnpoint.x + spawnpoint.range(), spawnpoint.y + spawnpoint.range(), spawnpoint.angle, Math.random() * 3000));
        }
    }

    await Promise.all(CISPromises);

    await scene.lockOnTo(eathKoth, .25);

    await scene.wait(1000);
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .1);

    const RepublicFleet = {
        "VENATOR_REPUBLIC": 3,
        "ARQUITENS_REPUBLIC": 1,
        "CONSOLAR_REPUBLIC": 3
    };

    const RepublicPromises = [];

    for (const ship in RepublicFleet) {
        for (let i = 0; i < RepublicFleet[ship]; i++) {
            RepublicPromises.push(scene.hyperspaceIn(ship, 1, spawnpoint2.x + spawnpoint2.range(), spawnpoint2.y + spawnpoint2.range(), spawnpoint2.angle, Math.random() * 3000));
        }
    }

    await Promise.all(RepublicPromises);

    const kenobiArquitens = scene.getShip("ARQUITENS_REPUBLIC", 1);
    kenobiArquitens.shield = kenobiArquitens.maxShield = 1e10;
    await scene.lockOnTo(kenobiArquitens, .45);
}

holdoManeuverScene();