import SpatialHashGrid from "./lib/SpatialHashGrid.js";
import { shipTypes, weaponClassifications, weaponDrawProperties, weaponProperties, weaponTypes } from "./lib/constants.js";
import heroes from "./lib/heroes.js";
import ships from "./lib/ships.js";
import { TENDER_FREQUENCY_SECONDS, TENDER_HEAL_PULSE_AMOUNT } from "./lib/weapons.js";

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

    /**
     * @param {Ship} ship 
     * @param {Hardpoint} hardpoint 
     */
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
        this.type = hardpoint.projectileType;
        this.team = ship.team;
        this.classification = hardpoint.classification;
        this.collisionRange = hardpoint.config.collisionRange ?? this.speed * .75;
        this.explosionRange = hardpoint.config.explosionRange ?? this.collisionRange * 1.5;
        this.explosionDamage = hardpoint.config.explosionDamage ?? this.hardpoint.damage * .25;

        this.explodes = hardpoint.config.explodes || this.classification === weaponClassifications.AreaOfEffect || this.classification === weaponClassifications.GuidedAOE;
        this.isGuided = hardpoint.config.seeks || this.classification === weaponClassifications.Guided || this.classification === weaponClassifications.GuidedAOE;
        this.maneuverability = 0;
        this.realManeuverability = hardpoint.config.maneuverability ?? .05;

        this.target = hardpoint.target ?? null;
        this.range = hardpoint.range + this.speed * 10;

        this.battle.projectiles.set(this.id, this);

        // Get source
        this.source = this.ship.source;

        //this.x -= Math.cos(this.angle) * this.speed;
        //this.y -= Math.sin(this.angle) * this.speed;
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
            this.maneuverability = lerp(this.maneuverability, this.realManeuverability, .05);
            this.angle = lerpAngle(this.angle, Math.atan2(this.target.y - this.y, this.target.x - this.x), this.maneuverability);
        }

        if (this.target !== null && distance(this.x, this.y, this.target.x, this.target.y) <= this.collisionRange) {
            if (this.classification === weaponClassifications.IonCannon) {
                if (this.target.ship.shield > 0) {
                    this.target.ship.shield -= this.hardpoint.damage * 1.25;
                    this.target.ship.lastHit = performance.now();
                } else {
                    this.target.tick -= Math.random() * 3 | 0;
                }
            } else if (this.explodes) {
                if (this.target.ship.shield > 0 && !this.hardpoint.bypassShield) {
                    this.target.ship.shield -= this.hardpoint.damage * (this.hardpoint.projectileType === weaponTypes.ProtonBomb ? 3 : 1); // Nuh uh uh
                    this.target.ship.lastHit = performance.now();

                    if (Math.random() > .9 && this.explosionRange <= 1000) {
                        this.battle.explode(this.target.x, this.target.y, this.explosionRange * .667, this.angle, Math.random() > .3 ? "explosion" + (Math.random() * 10 | 0 + 1) : ("blueExplosion" + (Math.random() * 5 | 0 + 1)));
                    }
                } else {
                    this.target.ship.lastHit = performance.now();
                    this.target.health -= this.hardpoint.damage;

                    const validHardpoints = [];

                    for (let i = 0; i < this.target.ship.hardpoints.length; i++) {
                        const hardpoint = this.target.ship.hardpoints[i];

                        if (hardpoint.health > 0 && distance(this.x, this.y, hardpoint.x, hardpoint.y) <= this.explosionRange) {
                            validHardpoints.push(hardpoint);
                        }
                    }

                    for (let i = 0; i < validHardpoints.length; i++) {
                        const hardpoint = validHardpoints[i];

                        hardpoint.health -= this.explosionDamage;
                    }

                    if (Math.random() > .5 && this.explosionRange <= 1000) {
                        this.battle.explode(this.target.x, this.target.y, this.explosionRange * .667, this.angle, Math.random() > .5 ? "explosion" + (Math.random() * 10 | 0 + 1) : ("blueExplosion" + (Math.random() * 5 | 0 + 1)));
                    }
                }
            } else {
                if (this.target.ship.shield > 0 && !this.hardpoint.bypassShield) {
                    this.target.ship.shield -= this.hardpoint.damage * (this.classification === weaponClassifications.Guided ? 1 : .45); // Nuh uh
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

        this.reload = config.weapon.reload * 4;
        this.tick = config.weapon.reload * 4;
        this.damage = config.weapon.damage;
        this.speed = config.weapon.speed;
        this.range = config.weapon.range;
        this.shotsAtOnce = config.shotsAtOnce ?? 1;
        this.shotDelay = config.shotDelay ?? 500;
        this.targetTypes = config.weapon.targetOverride ?? null;
        this.collisionRange = config.weapon.collisionRange ?? null;
        this.explosionRange = config.weapon.explosionRange ?? null;
        this.bypassShield = config.weapon.bypassShield ?? false;
        this.launchAngle = config.launchAngle ?? 0;

        this.config = config.weapon;

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

        this.lastForcedTargetID = -1;
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
        let forceTarget = null;
        if (this.target !== null) {
            if (
                this.target.health <= 0 ||
                distance(this.x, this.y, this.target.x, this.target.y) > this.range ||
                (this.classification === weaponClassifications.IonCannon && this.target.ship.shield <= 0)
            ) {
                this.target = null;
            }

            if (this.target !== null) {
                if (this.ship?.ai?.target) {
                    if (this.targetTypes !== null && this.targetTypes.indexOf(this.ship?.ai?.target.classification) > -1) {
                        forceTarget = this.ship?.ai?.target;

                        if (this.target.ship.id !== forceTarget.id) {
                            this.target = null;
                        }
                    }
                }
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

            if (forceTarget !== null) {
                const reallyValid = [];

                for (let i = 0; i < validHardpoints.length; i++) {
                    const hardpoint = validHardpoints[i];

                    if (hardpoint.ship.id === forceTarget.id) {
                        reallyValid.push(hardpoint);
                    }
                }

                if (reallyValid.length === 1) {
                    this.target = reallyValid[0];
                    return;
                }

                if (reallyValid.length > 1) {
                    this.target = reallyValid.sort((a, b) => {
                        return distance(a.x, a.y, this.x, this.y) - distance(b.x, b.y, this.x, this.y);
                    })[0];
                    return;
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

                if ((this.ship.classification !== shipTypes.Fighter && this.ship.classification !== shipTypes.FighterBomber && this.ship.classification !== shipTypes.Bomber) || Math.random() > .5) {
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
                        const angle = (this.launchAngle === 0 ? Math.atan2(predictedY - this.y, predictedX - this.x) : (this.launchAngle + this.ship.angle)) + inaccuracy;

                        new Projectile(this.x, this.y, angle, this.ship, this);
                    }, i * this.shotDelay);
                }
            } else {
                const inaccuracy = (Math.random() * Math.PI / 32 - Math.PI / 64) * (this.damage / (this.target.ship.totalHealth / 2)) * .5;

                const angle = (this.launchAngle === 0 ? Math.atan2(predictedY - this.y, predictedX - this.x) : (this.launchAngle + this.ship.angle)) + inaccuracy;

                new Projectile(this.x, this.y, angle, this.ship, this);
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
            ship.dogfightAngle = 0;

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
                            if (ship.classification === shipTypes.Bomber || ship.classification === shipTypes.FighterBomber) {
                                if (Math.random() > .5) {
                                    highPriority.push(ship);
                                } else {
                                    mediumPriority.push(ship);
                                }
                            }

                            if (ship.classification === shipTypes.Fighter) {
                                if (Math.random() > .15) {
                                    mediumPriority.push(ship);
                                } else {
                                    highPriority.push(ship);
                                }
                            }
                            break;
                        case shipTypes.FighterBomber:
                            if (ship.classification === shipTypes.Capital || ship.classification === shipTypes.SuperCapital || ship.classification === shipTypes.SpaceStation) {
                                highPriority.push(ship);
                            }

                            if (ship.classification === shipTypes.Frigate || ship.classification === shipTypes.HeavyFrigate) {
                                mediumPriority.push(ship);
                            }

                            if (ship.classification === shipTypes.Bomber || ship.classification === shipTypes.FighterBomber || ship.classification === shipTypes.Fighter) {
                                if (Math.random() > .85) {
                                    highPriority.push(ship);
                                } else {
                                    mediumPriority.push(ship);
                                }
                            }
                            break;
                        case shipTypes.Bomber:
                            if (ship.classification === shipTypes.Capital || ship.classification === shipTypes.SuperCapital || ship.classification === shipTypes.SpaceStation) {
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

        if (this.target == null) {
            this.ships.forEach(ship => {
                ship.speed = 0;
            });
            return;
        }

        const dist = distance(this.ships[0].x, this.ships[0].y, this.target.x, this.target.y);

        if ((this.target.classification > shipTypes.Corvette && dist > this.target.size * 4) && dist > this.target.size * 1.5) {
            for (let i = 0; i < this.ships.length; i++) {
                const angle = Math.PI * 2 / this.ships.length * i;
                const distance = this.ships[i].size * 4 + Math.random() * 2;

                const $tx = this.target.x + Math.cos(angle) * distance;
                const $ty = this.target.y + Math.sin(angle) * distance;

                this.ships[i].angleGoal = Math.atan2($ty - this.ships[i].y, $tx - this.ships[i].x);
                this.ships[i].speed = this.ships[i].maxSpeed * 1.1;
                this.ships[i].turnSpeed = this.ships[i].realTurnSpeed;
                this.ships[i].dogfightAngle = 0;
            }

            return;
        }

        for (let i = 0; i < this.ships.length; i++) {
            this.ships[i].dogfightAngle += .05 / (this.target.size / 750);

            if (Math.random() * .95) {
                this.ships[i].dogfightAngle += Math.random() * Math.PI * 2;
            }

            const d = this.target.size * Math.sin(performance.now() / 1000);
            const $tx = this.target.x + Math.cos(this.ships[i].dogfightAngle) * d;
            const $ty = this.target.y + Math.sin(this.ships[i].dogfightAngle) * d;

            this.ships[i].angleGoal = Math.atan2($ty - this.ships[i].y, $tx - this.ships[i].x);
            this.ships[i].speed = this.ships[i].maxSpeed;
            this.ships[i].turnSpeed = (.75 + .25 * Math.sin(performance.now() / 1000 + this.ships[i].id)) * this.ships[i].realTurnSpeed;
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

class Production {
    constructor(ship, config) {
        /**
         * @type {Ship}
         */
        this.ship = ship;

        this.ticker = 0;
        this.cooldown = config.cooldown;

        this.offset = config.offset;
        this.direction = config.direction;

        this.maxAlive = config.maxAlive;
        this.reserveSize = config.reserve + this.maxAlive;
        this.key = config.key;

        this.currAlive = 0;
    }

    get x() {
        return this.ship.x + this.ship.size / 2 * this.offset * Math.cos(this.direction + this.ship.angle);
    }

    get y() {
        return this.ship.y + this.ship.size / 2 * this.offset * Math.sin(this.direction + this.ship.angle);
    }

    update() {
        this.ticker++;

        if (this.ticker >= this.cooldown && this.reserveSize > 0 && this.currAlive < this.maxAlive) {
            this.ticker = 0;

            const ship = new Ship(this.ship.battle, this.key, this.ship.team);
            ship.x = this.x + Math.random() * this.ship.size - this.ship.size / 2;
            ship.y = this.y + Math.random() * this.ship.size - this.ship.size / 2;
            ship.source = this.ship;

            ship.onDead = () => this.currAlive--;
            this.currAlive++;
        }
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

        this.orbitAngle = Math.random();
        this.targetTick = 0;

        /**
         * @type {{goal: {x: number, y: number} | null, target: Ship | null}}
         */
        this.override = null;
    }

    findTarget() {
        if (this.target !== null) {
            if (this.target.health <= 0) {
                this.target = null;
            } else {
                this.target = distance(this.ship.x, this.ship.y, this.target.x, this.target.y) >= Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range)) ? null : this.target;
            }
        }

        if (this.target !== null) {
            return;
        }

        const validShips = [];
        const highPriority = [];
        const mediumPriority = [];

        this.ship.battle.ships.forEach(ship => {
            if (ship.team === this.ship.team || ship.health <= 0) {
                return;
            }

            validShips.push(ship);

            switch (this.ship.classification) {
                case shipTypes.Corvette:
                    switch (ship.classification) {
                        case shipTypes.Fighter:
                        case shipTypes.FighterBomber:
                        case shipTypes.Bomber:
                            if (Math.random() > .667) {
                                highPriority.push(ship);
                            } else {
                                mediumPriority.push(ship);
                            }
                            break;
                        case shipTypes.Corvette:
                            if (Math.random() > .667) {
                                mediumPriority.push(ship);
                            } else {
                                highPriority.push(ship);
                            }
                            break;
                        default:
                            mediumPriority.push(ship);
                            break;
                    }
                    break;
                case shipTypes.Frigate:
                    switch (ship.classification) {
                        case shipTypes.Corvette:
                        case shipTypes.Frigate:
                            highPriority.push(ship);
                            break;
                        case shipTypes.Fighter:
                        case shipTypes.FighterBomber:
                        case shipTypes.Bomber:
                            if (Math.random() > .95) {
                                mediumPriority.push(ship);
                            }
                            break;
                        case shipTypes.HeavyFrigate:
                        case shipTypes.Capital:
                            mediumPriority.push(ship);
                            break;
                    }
                    break;
                case shipTypes.HeavyFrigate:
                    switch (ship.classification) {
                        case shipTypes.Frigate:
                        case shipTypes.HeavyFrigate:
                        case shipTypes.Capital:
                            highPriority.push(ship);
                            break;
                        case shipTypes.Corvette:
                            mediumPriority.push(ship);
                            break;
                    }
                    break;
                case shipTypes.Capital:
                    switch (ship.classification) {
                        case shipTypes.Frigate:
                        case shipTypes.HeavyFrigate:
                        case shipTypes.Capital:
                        case shipTypes.SuperCapital:
                            highPriority.push(ship);
                            break;
                        case shipTypes.Corvette:
                        case shipTypes.SpaceStation:
                            mediumPriority.push(ship);
                            break;
                    }
                    break;
                case shipTypes.SuperCapital:
                case shipTypes.SpaceStation:
                    switch (ship.classification) {
                        case shipTypes.Capital:
                        case shipTypes.SuperCapital:
                        case shipTypes.SpaceStation:
                            highPriority.push(ship);
                            break;
                        case shipTypes.Frigate:
                        case shipTypes.HeavyFrigate:
                            if (Math.random() > .5) {
                                highPriority.push(ship);
                            } else {
                                mediumPriority.push(ship);
                            }
                            break;
                    }
                    break;
            }


            // Sort all by distance
            validShips.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));
            highPriority.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));
            mediumPriority.sort((a, b) => distance(this.ship.x, this.ship.y, a.x, a.y) - distance(this.ship.x, this.ship.y, b.x, b.y));

            if (highPriority.length > 0) {
                this.target = highPriority[0];
                this.targetTick = 100;
                return;
            }

            if (mediumPriority.length > 0) {
                this.target = mediumPriority[0];
                this.targetTick = 100;
                return;
            }

            if (validShips.length > 0) {
                this.target = validShips[0];
                this.targetTick = 100;
                return;
            }

            this.target = null;
            this.targetTick = 75;
        });
    }

    update() {
        if (this.override !== null && this.override.target !== null) {
            this.target = this.override.target;
        } else {
            this.findTarget();
        }

        if (this.target === null) {
            this.ship.speed = 0;
            return;
        }

        if (this.override !== null && this.override.goal !== null) {
            const dist = distance(this.ship.x, this.ship.y, this.override.goal.x, this.override.goal.y);

            if (dist <= this.ship.size * 2) {
                this.ship.speed = lerp(this.ship.speed, 0, .05);
                return;
            }

            this.ship.angleGoal = Math.atan2(this.override.goal.y - this.ship.y, this.override.goal.x - this.ship.x);
            this.ship.speed = lerp(this.ship.speed, this.ship.maxSpeed, .05);
        } else {
            this.ship.speed = this.ship.maxSpeed;

            switch (this.ship.classification) {
                case shipTypes.Fighter:
                case shipTypes.FighterBomber:
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
    }

    fighterThinking() {
        this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
    }

    corvetteThinking() {
        if (this.ship.shield / this.ship.maxShield < .2 && this.ship.health < .5) { // Kite
            this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
        } else {
            // if (this.wanderGoal === undefined) {
            //     this.wanderGoal = {
            //         x: this.target.x + Math.random() * this.target.size * 2 - this.target.size * 1,
            //         y: this.target.y + Math.random() * this.target.size * 2 - this.target.size * 1
            //     };
            // }

            // const myDist = distance(this.ship.x, this.ship.y, this.wanderGoal.x, this.wanderGoal.y);
            // if (myDist <= this.ship.size * 4) {
            //     this.wanderGoal = {
            //         x: this.target.x + Math.random() * this.target.size * 2 - this.target.size * 1,
            //         y: this.target.y + Math.random() * this.target.size * 2 - this.target.size * 1
            //     };
            // }

            // this.ship.angleGoal = Math.atan2(this.wanderGoal.y - this.ship.y, this.wanderGoal.x - this.ship.x);

            if ((performance.now() + this.ship.id) % 10000 > (5000 + (this.ship.id * 234) % 2350)) {
                this.ship.angleGoal = Math.atan2(this.target.y - this.ship.y, this.target.x - this.ship.x);
            }
        }
    }

    lightFrigateThinking() {
        const myDistance = distance(this.ship.x, this.ship.y, this.target.x, this.target.y);
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range)) * .5;

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
        const range = Math.min(...this.ship.hardpoints.map(hardpoint => hardpoint.range)) * .667;

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

class ShipFleeAI extends ShipAI {
    constructor(ship, flee, angleModifier) {
        super(ship);

        this.flee = flee;
        this.angleModifier = angleModifier;
    }

    update() {
        if (this.flee == null || this.flee.health <= 0) {
            this.ship.ai = new ShipAI(this.ship);
            return;
        }

        this.ship.angleGoal = Math.atan2(this.ship.y - this.flee.y, this.ship.x - this.flee.x) + this.angleModifier;
        this.ship.speed = this.ship.maxSpeed;
    }
}

class Commander {
    /**
     * @param {Object} config
     * @param {Ship} ship
     */
    constructor(config, ship) {
        this.config = config;
        this.ship = ship;

        this.name = config.key;
        this.description = config.tooltip;
        this.image = config.image;
        this.onTick = config.onTick;

        config.modifications(this.ship);
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
        this.realTurnSpeed = config.turnSpeed ?? 0;

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

        this.disabled = false;
        this.disableHangars = false;

        /**
         * @type {Commander}
         */
        this.commander = null;

        /**
         * @type {Hardpoint[]}
         */
        this.hardpoints = [];

        /**
         * @type {Production[]}
         */
        this.production = [];

        this.hangars = [];

        for (const hardpoint of config.hardpoints) {
            this.hardpoints.push(new Hardpoint(this, hardpoint));

            this.totalHealth += hardpoint.weapon.health;
        }

        for (const hangar of (config.hangars ?? [])) {
            this.hangars.push(new Hangar(this, hangar));
        }

        for (const prod of (config.production ?? [])) {
            this.production.push(new Production(this, prod));
        }

        this.onDead = null;

        this.events = {};

        if (config.events !== undefined) {
            for (const key in config.events) {
                this.events[key] = config.events[key];
            }
        }

        this.battle.ships.set(this.id, this);

        this.shieldAbility = {
            exists: false
        };

        if (config.shieldRegenAbility !== undefined) {
            this.shieldAbility = {
                exists: true,
                enabled: false,
                duration: (config.shieldRegenAbility.duration ?? 1) * 25 * 6,
                cooldown: (config.shieldRegenAbility.cooldown ?? 1) * 25 * 24,
                regen: (config.shieldRegenAbility.regen ?? 1) * .0015,
                ticker: 0
            };

            this.shieldAbility.ticker = Math.random() * this.shieldAbility.cooldown * .15 | 0;
        }

        this.tenderAbility = {
            exists: false
        };

        if (config.tenderAbility !== undefined) {
            this.tenderAbility = {
                exists: true,
                enabled: false,
                frequency: 25 * TENDER_FREQUENCY_SECONDS / (config.tenderAbility.frequency ?? 1),
                power: config.tenderAbility.power ?? 1,
                ticker: 0
            };

            this.tenderAbility.ticker = Math.random() * this.tenderAbility.frequency * .5 | 0;
        }
    }

    addHangar(config) {
        this.hangars.push(new Hangar(this, config));
    }

    repelMissiles() {
        const radius = this.size * 1.2;

        this.battle.projectiles.forEach(projectile => {
            if (projectile.explodes) {
                const dist = distance(this.x, this.y, projectile.x, projectile.y);

                if (dist < radius) {
                    projectile.angle = Math.atan2(projectile.y - this.y, projectile.x - this.x);
                }
            }
        });
    }

    update() {
        if (!this.disabled) {
            this.hardpoints.forEach(hardpoint => {
                hardpoint.update();
            });

            if (!this.disableHangars) {
                this.hangars.forEach(hangar => {
                    hangar.update();
                });

                this.production.forEach(production => {
                    production.update();
                });
            }
        }

        if (this.commander && this.commander.onTick) {
            this.commander.onTick(this);
        }

        this.shield = Math.max(this.shield, 0);
        if (this.shield < this.maxShield && performance.now() - this.lastHit > 7_500) {
            this.shield += this.shieldRegen;
            this.shield = Math.min(this.shield, this.maxShield);
        }

        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        // Move to the angle
        if (!this.disabled) {
            this.angle = lerpAngle(this.angle, this.angleGoal, this.turnSpeed);

            if (this.ai !== undefined && this.squadron === null) {
                this.ai.update();
            }
        }

        if (this.shieldAbility.exists) {
            this.shieldAbility.ticker++;

            if (this.shieldAbility.enabled) {
                this.shield = Math.min(this.shield + this.shieldAbility.regen * this.maxShield, this.maxShield);

                if (this.shieldAbility.ticker >= this.shieldAbility.duration) {
                    this.shieldAbility.enabled = false;
                    this.shieldAbility.ticker = 0;
                }
            } else {
                if (this.shieldAbility.ticker >= this.shieldAbility.cooldown && this.shield < this.maxShield * .5 && this.shield > 0) {
                    this.shieldAbility.enabled = true;
                    this.shieldAbility.ticker = 0;
                }
            }
        }

        if (this.tenderAbility.exists) {
            this.tenderAbility.ticker++;

            if (this.tenderAbility.ticker >= this.tenderAbility.frequency) {
                this.tenderAbility.ticker = 0;

                const radius = this.size * 5.5;

                this.battle.ships.forEach(ship => {
                    if (ship.team === this.team && distance(this.x, this.y, ship.x, ship.y) <= radius) {
                        for (let i = 0; i < ship.hardpoints.length; i++) {
                            if (ship.hardpoints[i].health > 0) {
                                ship.hardpoints[i].health = Math.min(ship.hardpoints[i].maxHealth, Math.max(0, ship.hardpoints[i].health + TENDER_HEAL_PULSE_AMOUNT * this.tenderAbility.power));
                            }
                        }
                    }
                });
            }
        }

        if (this.health <= 0) {
            this.battle.ships.delete(this.id);

            if (this.explodeOnDeath) {
                if (this.classification !== shipTypes.Fighter && this.classification !== shipTypes.FighterBomber && this.classification !== shipTypes.Bomber) {
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
        /**
         * @type {Map<number, Ship>}
         */
        this.ships = new Map();

        /**
         * @type {Map<number, Projectile>}
         */
        this.projectiles = new Map();
        this.squadrons = new Map();

        this.width = width;
        this.height = height;

        this.explosionsToRender = [];
        this.deathsToSend = [];

        this.teams = [];
        for (let i = 0; i < teams; i++) {
            this.teams.push({
                i: i,
                spatialHash: new SpatialHashGrid()
            });
        }

        this.fps = 0;
        this.mspt = 0;

        this.frames = 0;
        this.totalTime = 0;

        this.updateInterval = setInterval(this.update.bind(this), 1000 / 22.5);

        const performanceMetrics = {};

        setInterval(() => {
            if (this.frames > 0) {
                this.fps = this.frames;
                this.mspt = this.totalTime / this.frames;
                this.frames = 0;
                this.totalTime = 0;
            }

            if (this.mspt > 15 && (this.ships.size + this.projectiles.size) > 100) {
                console.log(this.fps, this.mspt, this.ships.size + this.projectiles.size);
            }

            if (this.ships.size === 0) {
                return;
            }

            const teamsAlive = new Set();

            for (const ship of this.ships.values()) {
                if (ship.classification >= shipTypes.Corvette) {
                    teamsAlive.add(ship.team);
                }
            }

            if (teamsAlive.size > 1) {
                return;
            }

            // Kill everything
            this.ships.forEach(ship => {
                ship.shield = 0;
                ship.lastHit = Infinity;

                for (const hardpoint of ship.hardpoints) {
                    hardpoint.health = 0;
                }
            });

            const packet = {};

            for (const team of this.teams) {    
                packet[team.i] = {
                    survived: this.shipsStartedWith[team.i].filter(ship => this.ships.has(ship.id)).map(ship => ship.key),
                    died: this.shipsStartedWith[team.i].filter(ship => !this.ships.has(ship.id)).map(ship => ship.key)
                };
            }

            connection.camera.shipsCache.clear();
            connection.camera.squadronsCache.clear();
            connection.camera.projectilesCache.clear();

            connection.talk([3, packet]);
        }, 1E3);

        this.shipsStartedWith = [];
    }

    spawn(key, team, x, y) {
        const newShip = new Ship(this, key, team);
        newShip.x = x;
        newShip.y = y;

        return newShip;
    }

    update() {
        const start = performance.now();
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

        this.frames++;
        this.totalTime += performance.now() - start;
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

    randomShipOfType(typeInt) {
        const possible = Array.from(this.ships.values()).filter(ship => ship.classification === typeInt);

        if (possible.length === 0) {
            return null;
        }

        return possible[Math.random() * possible.length | 0];
    }

    async displayText(text) {
        connection.talk([2, text]);

        return true;
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

const size = 24_000;
const battle = new Battle(size, size, 2);

class Fleet {
    // All non-fighter/bomber ships
    static ships = Object.keys(ships).filter(key => ships[key].classification >= shipTypes.Corvette && ships[key].classification < shipTypes.SpaceStation && !key.includes("SHIPYARD"));
    static random(pop, faction = -1, base = []) {
        const possible = Fleet.ships.filter(key => faction === -1 || key.endsWith("_" + faction));
        const avgPop = possible.reduce((total, key) => total + ships[key].population, 0) / possible.length;

        const output = [...(base ?? [])];

        let fails = 0;
        while (pop > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < possible.length * 5) {
                possible.sort((b, a) => {
                    if (Math.random() > .5) {
                        return .5 - Math.random();
                    }

                    const A = ships[a];
                    const B = ships[b];

                    return A.population - B.population;
                });

                const unit = ships[possible[0]];

                if (unit == null) {
                    console.log("NULL SHIP", possible[0]);
                    continue;
                }

                if (
                    unit.population <= pop &&
                    (unit.population <= avgPop * 1.1 || Math.random() > .9) &&
                    (!unit.uniqueUnit || !output.includes(possible[0]))
                ) {
                    ship = possible[0];
                    break miniLoop;
                }

                i++;
            }

            if (ship !== undefined) {
                output.push(ship);
                pop -= ships[ship].population;
            } else {
                fails++;
            }
        }

        return output;
    }

    static katanaFleet(pop) {
        const output = [];

        const dreadnoughtPop = pop / 4 | 0;

        let fails = 0;
        while (pop > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < 5) {
                const unitName = pop > dreadnoughtPop ? "DREADNOUGHTHEAVYCRUISER_REPUBLIC" : "CARRACK_REPUBLIC";

                const unit = ships[unitName];

                if (unit.population <= pop) {
                    ship = unitName;
                    break miniLoop;
                }

                i++;
            }

            if (ship !== undefined) {
                output.push(ship);
                pop -= ships[ship].population;
            } else {
                fails++;
            }
        }

        return output;
    }

    static moncala(pop) {
        const options = ["MC30C_REBEL", "MC50_REBEL", "MC75_REBEL", "MC80BLIBERTY_REBEL", "MC80B_REBEL", "MC80A_REBEL", "MC85_REBEL", "MC90_REBEL", "BLUEDIVER_REBEL", "MEDIATOR_REBEL", "VISCOUNT_PROTOTYPE_REBEL"];
        const output = [];

        let fails = 0;

        while (pop > 0 && fails < 256) {
            let ship = undefined,
                i = 0;

            miniLoop: while (i < 5) {
                const unitName = options[Math.random() * options.length | 0];

                const unit = ships[unitName];

                if (unit.population <= pop) {
                    ship = unitName;
                    break miniLoop;
                }

                i++;
            }

            if (ship !== undefined) {
                output.push(ship);
                pop -= ships[ship].population;
            } else {
                fails++;
            }
        }

        return output;
    }

    static standardImperial(pop) {
        // Put as many ISDs and then add arquitens and quasars to fill it up
        const output = [];

        const isdPop = ships["IMPERIALSTARDESTROYER_EMPIRE"].population;
        const arquitensPop = ships["ARQUITENS_EMPIRE"].population;
        const quasarPop = ships["QUASAR_EMPIRE"].population;

        const isdCount = pop / isdPop | 0;
        const arquitensCount = (pop - isdCount * isdPop) / arquitensPop | 0;
        const quasarCount = (pop - isdCount * isdPop - arquitensCount * arquitensPop) / quasarPop | 0;

        for (let i = 0; i < isdCount; i++) {
            output.push("IMPERIALSTARDESTROYER_EMPIRE");
        }

        for (let i = 0; i < arquitensCount; i++) {
            output.push("ARQUITENS_EMPIRE");
        }

        for (let i = 0; i < quasarCount; i++) {
            output.push("QUASAR_EMPIRE");
        }

        return output;
    }
}

const remainingCommanders = Object.values(heroes);

function spawn(ship, team) {
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 10000;
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

    if (remainingCommanders.length > 0 && allowHeroes) {
        for (let i = 0; i < remainingCommanders.length; i++) {
            if (remainingCommanders[i].ships.includes(ship)) {
                newShip.commander = new Commander(remainingCommanders[i], newShip);
                remainingCommanders.splice(i, 1);
                break;
            }
        }
    }

    return newShip;
}

function randomFaction() {
    const factions = ["AURUM", "EMPIRE", "REBEL", "REPUBLIC", "CIS", "DARKEMPIRE", "HUTT", "ZANN", "HAPAN", -1];
    return factions[Math.random() * factions.length | 0];
}

const spawnDistance = 4000;
// const fleetFactions = ["AURUM", "EMPIRE", "REBEL", "REPUBLIC", "CIS", "DARKEMPIRE", "HUTT", "ZANN", "HAPAN"].sort(() => .5 - Math.random()).slice(0, 2);
// const pop = 128;
const allowHeroes = false;
// const fleetOverrides = [null, null];
// for (let i = 0; i < 2; i++) {
//     const ships = fleetOverrides[i] ?? Fleet.random(pop, fleetFactions[i]);

//     const spawned = [];

//     for (const ship of ships) {
//         if (ship === "DEATHSTAR_EMPIRE") {
//             const angle = -Math.PI / 2;
//             const distance = 0;
//             const spawnDistance = 32_000;

//             const newShip = new Ship(battle, ship, i);

//             newShip.x = -spawnDistance + Math.cos(angle) * distance;
//             newShip.y = Math.sin(angle) * distance;
//             newShip.angle = Math.PI / 2;
//             continue;
//         }

//         spawned.push(spawn(ship, i));
//     }

//     spawned.sort(() => .5 - Math.random());

//     let x, y, angle;

//     switch (i) {
//         case 1:
//             x = -spawnDistance;
//             y = 0;
//             angle = 0;
//             break;
//         case 0:
//             x = spawnDistance;
//             y = 0;
//             angle = Math.PI;
//             break;
//     }

//     scatterFormation(spawned, x, y, angle);
// }

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
            radius = ships[i].size * 2.5,
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
                if (distance(position.x, position.y, positions[j].x, positions[j].y) < ships[i].size) {
                    valid = false;
                    if (iterations % 10 === 0) {
                        radius += ships[i].size * .5;
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
        team = -1;
        isSquadron = false;
        hardpoints = [];
        commander = null;

        updateX = false;
        updateY = false;
        updateAngle = false;
        updateHealth = false;
        updateShield = false;
        updateCommander = false;
        updateTeam = false;

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

            if (newShip.team !== this.team) {
                this.team = newShip.team;
                this.updateTeam = true;
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

            if (newShip.commander !== this.commander) {
                this.commander = newShip.commander;
                this.updateCommander = true;
            }

            this.shieldAbility = newShip.shieldAbility?.enabled;
        }

        getOutput() {
            const output = [this.id, this.isNew ? 1 : 0];

            if (this.isNew) {
                this.isNew = false;

                // Send everything
                output.push(this.key, this.x, this.y, this.angle, this.team, this.size, this.asset, this.health, this.shield, this.isSquadron, this.hardpoints.length, ...this.hardpoints.flat());
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

                if (this.updateCommander) {
                    output.push(this.commander.name);
                    this.updateCommander = false;
                    output[1] += 128;
                }

                if (this.updateTeam) {
                    output.push(this.team);
                    this.updateTeam = false;
                    output[1] += 256;
                }

                if (this.shieldAbility) {
                    output[1] += 512;
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

        /**
         * @type {Ship|null}
         */
        this.shipLockedOnTo = null;
    }

    get fov() {
        return 1920 / this.zoom;
    }

    isInView(x, y, size) {
        return distance(x, y, this.x, this.y) < this.fov / 2 + size / 2;
    }

    update() {
        if (this.shipLockedOnTo !== null) {
            this.x = this.shipLockedOnTo.x;
            this.y = this.shipLockedOnTo.y;
        }

        const shipsIDs = [];
        const projectilesIDs = [];
        const squadronsIDs = [];
        const commanders = [];

        this.battle.ships.forEach(ship => {
            if (ship.commander !== null) {
                commanders.push(ship.commander);
            }
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
                    cache.team = ship.team;
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

                if (2 * props.strength * 6 * this.zoom < 2/* || (projectile.ship.classification <= shipTypes.Bomber && projectile.classification === weaponClassifications.LaserCannon)*/) {
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

        output.push(commanders.length);
        commanders.forEach(commander => {
            output.push(commander.name, commander.ship.health);
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
        case 1: { // Broad commandings
            switch (e.data.shift()) {
                case 0: { // Initialize battle
                    // battle.ships.forEach(ship => {
                    //     ship.shield = 0;
                    //     ship.lastHit = Infinity;
                    //     ship.hardpoints.forEach(hardpoint => {
                    //         hardpoint.health = 0;
                    //     });
                    // });

                    battle.ships.clear();
                    battle.squadrons.clear();
                    battle.explosionsToRender = [];
                    battle.deathsToSend = [];

                    battle.shipsStartedWith = [];

                    battle.projectiles.forEach(projectile => {
                        projectile.battle.projectiles.delete(projectile.id);
                    });

                    for (let i = 0; i < 2; i++) {
                        const ships = JSON.parse(e.data.shift()) ?? Fleet.random(128, randomFaction());
                        const spawned = ships.map(ship => spawn(ship, i)).sort(() => .5 - Math.random());
        
                        let x, y, angle;
        
                        switch (i) {
                            case 1:
                                x = -spawnDistance;
                                y = 0;
                                angle = 0;
                                break;
                            case 0:
                                x = spawnDistance;
                                y = 0;
                                angle = Math.PI;
                                break;
                        }

                        if (e.data[e.data.length - 1]) {
                            x *= -1;
                            angle += Math.PI;
                        }
        
                        scatterFormation(spawned, x, y, angle);

                        battle.shipsStartedWith.push(spawned);
                    }
                } break;
                case 1: {

                } break;
            }
        } break;
        case 2: {
            const shipIDs = [];

            while (e.data[0] > -1) {
                shipIDs.push(e.data.shift());
            }

            e.data.shift();

            const x = e.data.shift();
            const y = e.data.shift();

            for (const id of shipIDs) {
                /**
                 * @type {Ship}
                 */
                const ship = battle.ships.get(id);
                if (ship != null) {
                    ship.ai.override ??= {
                        goal: null,
                        target: null
                    };

                    ship.ai.override.goal = {
                        x: x,
                        y: y
                    };
                }
            }
        } break;
        case 3: {
            const shipIDs = [];

            while (e.data[0] > -1) {
                shipIDs.push(e.data.shift());
            }

            e.data.shift();

            const toAttack = battle.ships.get(e.data.shift());

            if (toAttack) {
                for (const id of shipIDs) {
                    /**
                     * @type {Ship}
                     */
                    const ship = battle.ships.get(id);
                    if (ship != null) {
                        ship.ai.override ??= {
                            goal: null,
                            target: null
                        };

                        ship.ai.override.goal = null;
                        ship.ai.override.target = toAttack;
                    }
                }
            }
        } break;
        case 4: {
            scene.battleCam(-1);
        } break;
        case 5: {
            scene.lastBattleCamLock = performance.now();
        } break;
    }
}

class Scene {
    #battleCamOn = false;

    constructor(battle) {
        /**
         * @type {Battle}
         */
        this.battle = battle;
        this.camera = connection.camera;
        this.#battleCamOn = false;

        setInterval(this.#battleCamTick.bind(this), 1000 / 60);
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
        this.camera.shipLockedOnTo = null;
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

    hyperspaceIn(key, team, x, y, angle, delay = 0, cb = () => { }) {
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

                cb(ship);

                const interval = setInterval(() => {
                    if (distance(ship.x, ship.y, x, y) < 10) {
                        ship.speed = _speed;
                        ship.ai = _ai;
                        clearInterval(interval);
                        resolve(ship);
                    }
                }, 5);
            }, delay);
        });
    }

    hyperspaceOut(ship, angle) {
        return new Promise(resolve => {
            ship.ai = undefined;
            ship.angleGoal = angle;
            ship.disabled = false;
            ship.disableHangars = true;

            if (this.isLocked === ship.id) {
                this.releaseLock();
            }

            const interval = setInterval(() => {
                if (Math.abs(angleDifference(ship.angle, ship.angleGoal)) < .05) {
                    clearInterval(interval);
                    ship.maxSpeed = 2000;
                    ship.speed = 2000;

                    setTimeout(() => {
                        ship.shield = 0;
                        ship.hardpoints.forEach(h => h.health = 0);
                        resolve();
                    }, 5000);
                }
            }, 1000 / 45);
        });
    }

    /**
     * @param {Ship} ship 
     * @param {number} zoom 
     */
    lockOnTo(ship, zoom = 1) {
        // return new Promise(resolve => {
        //     this.isLocked = ship.id;

        //     const interval = setInterval(() => {
        //         if (ship == null || !this.battle.ships.has(ship.id) || this.isLocked !== ship.id) {
        //             clearInterval(interval);
        //             this.isLocked = false;
        //             resolve();
        //             return;
        //         }

        //         this.camera.x = ship.x;
        //         this.camera.y = ship.y;
        //         this.camera.zoom = zoom;
        //     }, 1000 / 120);
        // });

        this.isLocked = ship.id;
        this.camera.shipLockedOnTo = ship;
        this.camera.zoom = zoom;
    }

    releaseLock() {
        this.isLocked = false;
        this.camera.shipLockedOnTo = null;
    }

    async displayText(text) {
        connection.talk([2, text]);

        await this.wait(50 * text.length);

        return true;
    }

    /**
     * @param {Hardpoint} target 
     * @param {Ship} ship 
     */
    destroyWith(target, ship) {
        return new Promise(resolve => {
            const interval = setInterval(() => {
                ship.angle = ship.angleGoal = Math.atan2(target.y - ship.y, target.x - ship.x);

                if (distance(ship.x, ship.y, target.x, target.y) < ship.size * 5) {
                    target.health = -1;
                    clearInterval(interval);
                    resolve();
                }
            }, 1000 / 45);
        });
    }

    battleCam(on = -1) {
        this.#battleCamOn = on === -1 ? !this.#battleCamOn : on;

        if (this.#battleCamOn) {
            this.lockCamera();
        } else {
            this.unlockCamera();
            this.isLocked = false;
            this.camera.shipLockedOnTo = null;
        }

        this.displayText("BattleCam: " + (this.#battleCamOn ? "On" : "Off"));
    }

    #battleCamTick() {
        if (!this.#battleCamOn) {
            return;
        }

        if (!this.isLocked || performance.now() > this.lastBattleCamLock) {
            if (this.battle.ships.size === 0) {
                return;
            }

            let ship;

            for (let i = shipTypes.SuperCapital; i >= shipTypes.Fighter; i--) {
                if (Math.random() > .2 && i > shipTypes.Fighter) {
                    continue;
                }

                let j = 0;
                do {
                    ship = this.battle.randomShipOfType(i);
                    j++;
                } while ((ship == null || ship.id === this.lastBattleCamID) && j < 5);

                if (ship) {
                    break;
                }
            }

            if (ship) {
                this.lockOnTo(ship, Math.min(2, 1 / (ship.size / 200)));
                this.lastBattleCamLock = performance.now() + 3000 + Math.random() * 7000 | 0;
                this.lastBattleCamID = ship.id;
            }
        }
    }
}

const scene = new Scene(battle);
// Consider adding the Ackbar dialogue from HISHE cuz it's funny
// IT"S A TRAPPPPP
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
    await scene.hyperspaceIn("MEGASTARDESTROYER_DARKEMPIRE", 0, spawnpoint.x, spawnpoint.y, spawnpoint.angle, 0);
    await scene.wait(5000);

    const supremacy = scene.getShip("MEGASTARDESTROYER_DARKEMPIRE", 0);
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

    await scene.hyperspaceIn("DEATHSTAR_EMPIRE", 0, -16000, -16000, spawnpoint.angle);
    await scene.wait(1000);
    await scene.lockCamera();
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .05);

    const empireFleet = {
        "IMPERIALSTARDESTROYER_EMPIRE": 30,
        "ALLEGIANCE_EMPIRE": 1,
        "EXECUTORSUPERSTARDESTROYER_EMPIRE": 1
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
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .1);

    await scene.hyperspaceIn("VENATOR_REPUBLIC", 1, spawnpoint2.x / 3, spawnpoint2.y / 3, spawnpoint2.angle, 0);

    await scene.wait(1000);

    const eathKoth = scene.getShip("VENATOR_REPUBLIC", 1);
    eathKoth.shield = eathKoth.maxShield = 100;
    eathKoth.hardpoints.forEach(h => h.health = h.maxHealth = 10);

    await scene.wait(1000);
    await scene.moveCamera(eathKoth.x, eathKoth.y, .2);
    await scene.displayText("Eath Koth's Venator-Class Star Destroyer...");
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .1);

    await scene.wait(500);
    scene.displayText("[Clone Trooper]: Sir! We're detecting a Seperatist fleet on long range scanners!");

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
    scene.displayText("[Clone Admiral]: Prepare to jump to hyperspace! Fighters-- cover us. All batteries open fire!");
    await scene.wait(2500);

    scene.wait(1500).then(() => {
        scene.displayText("[Clone Tech]: The hyperdrive has been disabled! Systems are failing!");
    });

    await scene.lockOnTo(eathKoth, .25);

    await scene.displayText("[Tactical Droid]: General, we are detecting a Republic fleet coming out of hyperspace.");
    await scene.displayText("[General Grievous]: Bahh! Raise deflectors and prepare to engage!");

    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .1);

    const RepublicFleet = {
        "VENATOR_REPUBLIC": 3,
        "ARQUITENS_REPUBLIC": 1,
        "CONSOLAR_REPUBLIC": 3
    };

    const RepublicPromises = [];

    for (const ship in RepublicFleet) {
        for (let i = 0; i < RepublicFleet[ship]; i++) {
            RepublicPromises.push(scene.hyperspaceIn(ship, 1, spawnpoint2.x + spawnpoint2.range(), spawnpoint2.y + spawnpoint2.range(), spawnpoint2.angle, Math.random() * 3000, ship => {
                ship.maxShield *= 10;
                ship.shield = ship.maxShield;
            }));
        }
    }

    await Promise.all(RepublicPromises);

    await scene.displayText("[General Kenobi]: All ships, form up and begin your attack runs, we must rescue master Eath Koth.");

    const kenobiArquitens = scene.getShip("CONSOLAR_REPUBLIC", 1);
    kenobiArquitens.turnSpeed /= 3;
    scene.battleCam(true);
}

async function escapeFromDqar() {
    const FOSpawn = {
        x: -8750,
        y: 12400,
        angle: 0,
        range: () => Math.random() * 3000 - 1500
    };
    const ResistanceSpawn = {
        x: 3000,
        y: -5000,
        angle: 0,
        range: () => Math.random() * 1000 - 500
    };

    FOSpawn.angle = Math.atan2(FOSpawn.y, FOSpawn.x) + Math.PI;
    ResistanceSpawn.angle = Math.atan2(ResistanceSpawn.y, ResistanceSpawn.x) + Math.PI;

    await scene.hyperspaceIn("XWING_REBEL", 1, ResistanceSpawn.x, ResistanceSpawn.y, 0, 0);
    const poe = scene.getShip("XWING_REBEL", 1);
    poe.shield = poe.maxShield = 1e10;
    poe.ai = undefined;
    poe.speed = 0;

    function disable(ship) {
        ship.disabled = true;
    }

    await Promise.all([
        scene.hyperspaceIn("MC85_REBEL", 1, ResistanceSpawn.x, ResistanceSpawn.y, ResistanceSpawn.angle, 0, disable),
        scene.hyperspaceIn("FREEVIRGILLIABUNKERBUSTER_ZANN", 1, ResistanceSpawn.x + ResistanceSpawn.range(), ResistanceSpawn.y + ResistanceSpawn.range(), ResistanceSpawn.angle, 0, disable),
        scene.hyperspaceIn("NEBULONB_REBEL", 1, ResistanceSpawn.x + ResistanceSpawn.range(), ResistanceSpawn.y + ResistanceSpawn.range(), ResistanceSpawn.angle, 0, disable),
    ]);

    await scene.lockCamera();
    await scene.moveCamera(ResistanceSpawn.x, ResistanceSpawn.y, .1);
    await scene.displayText("[Resistance Naval Officer]: They've found us.");
    await scene.displayText("[Poe Dameron]: Well, we knew that was coming.");
    await scene.wait(1000);
    (async function () {
        await scene.displayText("[Resistance Supply Officer]: We're not clear yet there's still thirty paletts of munitions.");
        await scene.displayText("[Lieutenant Connix]: Forget the munitions! There's no time! Just get everyone on the transports we've got to go NOW!");
    })();
    await scene.moveCamera(ResistanceSpawn.x, ResistanceSpawn.y, .6);
    await scene.wait(5000);

    const raddus = scene.getShip("MC85_REBEL", 1);
    const nebulonFrigate = scene.getShip("NEBULONB_REBEL", 1);
    const bunkerBuster = scene.getShip("FREEVIRGILLIABUNKERBUSTER_ZANN", 1);

    scene.moveCamera(FOSpawn.x, FOSpawn.y, .1);
    await Promise.all([
        scene.hyperspaceIn("RESURGENT_DARKEMPIRE", 0, FOSpawn.x + FOSpawn.range(), FOSpawn.y + FOSpawn.range(), FOSpawn.angle, 1000, disable),
        scene.hyperspaceIn("RESURGENT_DARKEMPIRE", 0, FOSpawn.x + FOSpawn.range(), FOSpawn.y + FOSpawn.range(), FOSpawn.angle, 3000, disable),
        scene.hyperspaceIn("RESURGENT_DARKEMPIRE", 0, FOSpawn.x + FOSpawn.range(), FOSpawn.y + FOSpawn.range(), FOSpawn.angle, 4000, disable)
    ]);

    await scene.displayText("[Captain Peavey]: We've caught them in the middle of their evacuation.");
    await scene.wait(500);
    await scene.moveCamera(FOSpawn.x * .7, FOSpawn.y * .7, .1);
    await scene.displayText("[General Hux]: I have my orders from Supreme Leader Snoke himself. This is where snuff out the resistance once and for all.");
    await scene.displayText("[General Hux]: Tell Captain Canady to prime his dreadnought. Incinerate their base, destroy their transports, and obliterate their fleet.");
    await scene.hyperspaceIn("MANDATORSIEGEDREADNOUGHT_DARKEMPIRE", 0, FOSpawn.x * .7, FOSpawn.y * .7, FOSpawn.angle, 500, ship => {
        ship.disableHangars = true;
        ship.maxSpeed = 0;
        ship.shield = 0;
        ship.shieldRegen = 0;
        ship.maxShield = 0;
    });
    await scene.displayText("[First Order Monitor]: General, Resistance ship approaching. Guns and shields in attack mode.");

    const canady = scene.getShip("MANDATORSIEGEDREADNOUGHT_DARKEMPIRE", 0);

    // Poe's flight
    poe.speed = poe.maxSpeed * .334;
    poe.angle = Math.atan2(canady.y - poe.y, canady.x - poe.x);
    poe.angleGoal = Math.atan2(canady.y - poe.y, canady.x - poe.x);

    scene.lockOnTo(poe, .65);

    await scene.displayText("[BB-8]: *nervous beeps*");
    await scene.displayText("[Poe Dameron]: Happy beeps, buddy, come on. We've pulled off crazier stunts than this.");
    await scene.displayText("[Leia Organa Solo]: For the record Commander Dameron, I'm with the droid on this one.");
    await scene.displayText("[Poe Dameron]: Thank you, for your support, general. *sigh* Happy beeps.");
    await scene.displayText("[Poe Dameron]: Attention, this is commander Poe Dameron of the Republic fleet. I have an urgent communique for General Hux.");
    await scene.displayText("[General Hux]: This is General Hux of the First Order. The Republic is no more. Your fleet are rebel scum and war criminals.");
    await scene.displayText("[General Hux]: Tell your precious princess there will be no terms, there will be no surrender.");
    await scene.displayText("[Poe Dameron]: Hi, I'm holding for General Hux.");
    await scene.displayText("[General Hux]: This is Hux. You and your friends are doomed. We will wipe your filth from the galaxy.");
    await scene.displayText("[Poe Dameron]: Okay. I'll hold.");
    await scene.displayText("[General Hux]: Hello?");
    await scene.displayText("[Poe Dameron]: Hello? Yup, I'm still here.");
    await scene.displayText("[General Hux]: Can you--? Can he hear me?");
    await scene.displayText("[Poe Dameron]: Hux? With an H? Skinny guy? Kinda pasty?");
    await scene.displayText("[General Hux]: I can hear you. Can you hear me?");
    await scene.displayText("[Poe Dameron]: Look I can't hold forever. If you reach him, tell him Leia has an urgent message for him.");
    await scene.displayText("[Captain Peavey]: I believe he's tooling with you, sir.");
    await scene.displayText("[Poe Dameron]: About his mother.");
    await scene.displayText("[General Hux]: OPEN FIRE!!");
    await scene.displayText("[Poe Dameron]: BB-8, punch it!");
    await scene.displayText("[BB-8]: *happy beeps*");

    poe.speed = poe.maxSpeed * 2.5;

    await scene.wait(1000);
    await scene.displayText("[Captain Peavey]: He's going for the dreadnought.");
    await scene.displayText("[General Hux]: *scoffs* He's insane.");

    await new Promise(resolve => {
        const interval = setInterval(() => {
            poe.angle = Math.atan2(canady.y - poe.y, canady.x - poe.x);

            if (distance(canady.x, canady.y, poe.x, poe.y) < canady.size) {
                clearInterval(interval);
                resolve();
            }
        }, 1000 / 30);
    });
    poe.speed = poe.maxSpeed;

    await new Promise(resolve => {
        const hardpoints = canady.hardpoints.filter(h => h.classification == weaponClassifications.LaserCannon);

        function next() {
            hardpoints.sort((a, b) => distance(a.x, a.y, poe.x, poe.y) - distance(b.x, b.y, poe.x, poe.y));
            const hardpoint = hardpoints.shift();
            if (hardpoint == null) {
                resolve();
                return;
            }

            scene.destroyWith(hardpoint, poe).then(next);
        }

        next();
    });

    await scene.displayText("[Poe Dameron]: Woo! Tallie, start your run!");
    poe.hardpoints.forEach(h => h.health = 0);
    poe.shield = 0;

    await scene.moveCamera(canady.x, canady.y, .2);
    await scene.displayText("[First Order Bridge Officer]: He's taken out our cannons!");
    canady.hardpoints.forEach(h => (h.classification === weaponClassifications.LaserCannon || h.classification === weaponClassifications.IonCannon) && (h.health = 0));

    canady.hangars.forEach(h => {
        h.config = {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
        };
    });

    await scene.displayText("[Captain Canady]: Launch Fighters!!");
    canady.disableHangars = false;

    battle.ships.forEach(ship => {
        if (ship.team !== canady.team) {
            ship.ai = new ShipFleeAI(ship, canady, 0);
            ship.disableHangars = true;
            ship.disabled = false;
        }
    });

    // Let's spawn some star fortresses

    const bigGuns = canady.hardpoints.filter(h => h.health > 0);

    const bombers = new Map();
    for (let i = 0; i < 6; i++) {
        const bomber = new Ship(battle, "MG100STARFORTRESS_ESCAPEFROMDQAR_REBEL", 1);
        bomber.x = raddus.x + Math.random() * 300 - 150;
        bomber.y = raddus.y + Math.random() * 300 - 150;

        bomber.ai.target = bigGuns[i % bigGuns.length];
        bomber.ai.findTarget = () => {
            const valid = bigGuns.filter(h => h.health > 0);

            if (valid.length === 0) {
                return null;
            }

            return valid[Math.random() * valid.length | 0];
        }

        bomber.turnSpeed *= .75;
        bomber.speed = bomber.maxSpeed;

        bombers.set(bomber.id, bomber);

        bomber.onDead = () => {
            bombers.delete(bomber.id);

            if (bombers.size === 1) {
                bombers.forEach(b => {
                    b.maxShield = 10000;
                    b.shield = 10000;
                    b.maxSpeed *= 1.5;
                    b.speed = b.maxSpeed;
                    b.hardpoints.forEach(h => h.health = h.maxHealth);
                });

            }
        }
    }

    raddus.hangars.length = 2; // (usually 3)
    raddus.hangars.forEach((h, i) => {
        h.config = {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: [7, 5][i],
            reserveSize: 3,
            squadronKey: ["XWING_REBEL", "AWING_REBEL"][i]
        };
    });
    raddus.disableHangars = false;

    await scene.displayText("[Tallisian Lintra]: All wings, form up on me. We're going in.");


    canady.onDead = async () => {
        bombers.forEach(bomber => {
            bomber.hardpoints.forEach(h => h.health = 0);
        });

        await scene.displayText("[Poe Dameron]: Woo! We did it!");
        await scene.displayText("[Tallisian Lintra]: Dreadnought down!");
        await scene.displayText("[Leia Organa Solo]: All craft, return to the Raddus. It's time for us to leave.");

        raddus.hangars.forEach(h => {
            h.squadrons.forEach(squadron => {
                squadron.ships.forEach(ship => {
                    ship.shield = 0;
                    ship.hardpoints.forEach(h => h.health = 0);
                });
            });
        });

        await scene.wait(1000);

        await scene.moveCamera(raddus.x, raddus.y, .05);

        // Jump all of them away
        await Promise.all([
            scene.hyperspaceOut(nebulonFrigate, nebulonFrigate.angle + Math.PI),
            scene.hyperspaceOut(bunkerBuster, bunkerBuster.angle + Math.PI),
            scene.hyperspaceOut(raddus, raddus.angle + Math.PI)
        ]);

        // Hux and Snoke dialogue
    }

    scene.unlockCamera();
}

async function battleOfEndorScene2() {
    const spawnpoint = {
        x: -4000,
        y: -4000,
        angle: 0,
        range: () => Math.random() * 7500 - (7500 / 2)
    };

    const spawnpoint2 = {
        x: 1500,
        y: 1500,
        angle: 0,
        range: () => Math.random() * 7500 - (7500 / 2)
    };

    spawnpoint.angle = Math.atan2(spawnpoint.y, spawnpoint.x) + Math.PI;
    spawnpoint2.angle = Math.atan2(spawnpoint2.y, spawnpoint2.x) + Math.PI;

    //await scene.hyperspaceIn("DEATHSTAR_EMPIRE", 0, -16000, -16000, spawnpoint.angle);
    await scene.wait(1000);
    await scene.lockCamera();
    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .05);

    const empireFleet = {
        "IMPERIALSTARDESTROYER_EMPIRE": 12,
        "ALLEGIANCE_EMPIRE": 1,
        "EXECUTORSUPERSTARDESTROYER_EMPIRE": 1
    };

    const rebelFleet = {
        "MC80A_REBEL": 1,
        "MC80BLIBERTY_REBEL": 1,
        "MC75_REBEL": 1,
        "MC30C_REBEL": 2,
        "MC50_REBEL": 1,
        "NEBULONB_REBEL": 3,
        "CR90_REBEL": 2,
        "DP20_REBEL": 4,
        "MARAUDERMISSILECRUISER_REBEL": 3
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

async function battleOfOrinda() {
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

    await scene.lockCamera();
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .075);
    await scene.hyperspaceIn("EXECUTORSUPERSTARDESTROYER_EMPIRE", 0, spawnpoint2.x, spawnpoint2.y, spawnpoint2.angle, 0, ship => {
        ship.commander = new Commander(heroes.AdmiralPellaeon, ship);
    });
    await scene.hyperspaceIn("IMPERIALSTARDESTROYER_EMPIRE", 0, spawnpoint2.x - 2000, spawnpoint2.y + 100, spawnpoint2.angle, 0);
    await scene.hyperspaceIn("IMPERIALSTARDESTROYER_EMPIRE", 0, spawnpoint2.x + 800, spawnpoint2.y - 500, spawnpoint2.angle, 0);

    await scene.wait(1000);

    const rebelShips = [
        "MC80BLIBERTY_REBEL",
        "MC80BLIBERTY_REBEL",
        "MC80BLIBERTY_REBEL",
        "MC80BLIBERTY_REBEL",
        "MC80BLIBERTY_REBEL",
        "MC50_REBEL",
        "MC50_REBEL",
        "MC30C_REBEL",
        "MC30C_REBEL",
        "MC30C_REBEL",
        "NEBULONB_REBEL",
        "NEBULONB_REBEL",
        "NEBULONB_REBEL",
        "NEBULONB_REBEL",
        "CR90_REBEL",
        "CR90_REBEL",
        "CR90_REBEL",
        "DP20_REBEL",
        "DP20_REBEL",
        "MARAUDERMISSILECRUISER_REBEL",
        "MARAUDERMISSILECRUISER_REBEL",
        "MARAUDERMISSILECRUISER_REBEL",
        "MARAUDERMISSILECRUISER_REBEL"
    ];

    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .1);

    const rebelPromises = [scene.hyperspaceIn("MC80A_REBEL", 1, spawnpoint.x, spawnpoint.y, spawnpoint.angle, 0, ship => {
        ship.commander = new Commander(heroes.AdmiralAckbar, ship);
    })];

    for (const ship of rebelShips) {
        rebelPromises.push(scene.hyperspaceIn(ship, 1, spawnpoint.x + spawnpoint.range(), spawnpoint.y + spawnpoint.range(), spawnpoint.angle, Math.random() * 3000));
    }

    await Promise.all(rebelPromises);

    await scene.wait(1000);
    await scene.unlockCamera();
    await scene.wait(15000);
    await scene.lockCamera();
    await scene.moveCamera(spawnpoint2.x + 1000, spawnpoint2.y - 3000, .08);
    await scene.hyperspaceIn("BELLATORSUPERSTARDESTROYER_EMPIRE", 0, spawnpoint2.x + 1000, spawnpoint2.y - 3000, spawnpoint2.angle, 0, ship => {
        ship.commander = new Commander(heroes.CapBrandei, ship);
    });

    await scene.wait(1000);
    await scene.unlockCamera();
}

async function heroBattles() {
    const faction1 = "EMPIRE";
    const faction2 = "REBEL";

    function pos() {
        return [Math.random() * 10000 - 5000, Math.random() * 10000 - 5000, Math.random() * Math.PI * 2];
    }

    await scene.lockCamera();

    await scene.moveCamera(0, 0, .1);
    const promises = [];

    for (const key in heroes) {
        const ships = heroes[key].ships;

        const ship = ships[Math.random() * ships.length | 0];

        if (ship.endsWith("_" + faction2)) {
            promises.push(scene.hyperspaceIn(ship, 1, ...pos(), Math.random() * 3000, ship => {
                ship.commander = new Commander(heroes[key], ship);
            }));
        }
    }

    for (const key in heroes) {
        const ships = heroes[key].ships;

        const ship = ships[Math.random() * ships.length | 0];

        if (ship.endsWith("_" + faction1)) {
            promises.push(scene.hyperspaceIn(ship, 0, ...pos(), Math.random() * 3000, ship => {
                ship.commander = new Commander(heroes[key], ship);
            }));
        }
    }

    await Promise.all(promises);

    await scene.wait(1000);
    await scene.unlockCamera();
}

async function falconEscape() {
    /**
     * @type {Ship}
     */
    const falcon = await scene.hyperspaceIn("FALCON_REBEL", 0, -2000, -2000, Math.atan2(-2000, -2000), 0, ship => {
        ship.commander = new Commander(heroes.HanAndChewie, ship);
    });

    const ISDPromises = [];
    /**
     * @type {Ship[]}
     */
    const ISDs = [];

    await scene.lockCamera();
    await scene.moveCamera(1000, 1000, .35);

    for (let i = 0; i < 3; i++) {
        const x = 1000 + Math.cos(Math.PI / 1.5 * i) * 0;
        const y = 1000 + Math.sin(Math.PI / 1.5 * i) * 0;
        const angle = Math.atan2(falcon.y - y, falcon.x - x);
        ISDPromises.push(scene.hyperspaceIn("QUASAR_EMPIRE", 1, x, y, angle, 3000, ship => {
            ISDs.push(ship);

            if (i === 0) {
                ship.commander = new Commander(heroes.AdmiralPiett, ship);
            }
        }));
    }

    for (let i = 0; i < 6; i++) {
        const x = 1000 + Math.cos(Math.PI / 3 * i) * 400;
        const y = 1000 + Math.sin(Math.PI / 3 * i) * 400;
        const angle = Math.atan2(falcon.y - y, falcon.x - x);
        ISDPromises.push(scene.hyperspaceIn("LANCERFRIGATE_EMPIRE", 1, x, y, angle, (i % 3) * 500, ship => {
            ISDs.push(ship);
        }));
    }

    await Promise.all(ISDPromises);

    function repositionDestroyers() {
        const positions = [];

        for (let i = 0; i < ISDs.length; i++) {
            let x = 0, y = 0;

            do {
                x = falcon.x + Math.random() * 10000 - 5000;
                y = falcon.y + Math.random() * 10000 - 5000;
            } while (positions.some(p => distance(p.x, p.y, x, y) < 1000));

            positions.push({ x, y });
            ISDs[i].ai.override ??= {
                goal: null,
                target: null
            };

            ISDs[i].ai.override.goal = {
                x: x,
                y: y
            };
        }
    }

    setInterval(repositionDestroyers, 10000);

    await scene.wait(1000);
    await scene.lockOnTo(falcon, .5);
    await scene.unlockCamera();
}

async function theEndOfDalla() {
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

    await scene.lockCamera();
    await scene.moveCamera(spawnpoint2.x, spawnpoint2.y, .075);
    await scene.hyperspaceIn("EXECUTORSUPERSTARDESTROYER_EMPIRE", 0, spawnpoint2.x, spawnpoint2.y, spawnpoint2.angle, 0, ship => {
        ship.commander = new Commander(heroes.GeneralDelvarus, ship);
    });
    await scene.hyperspaceIn("IMPERIALSTARDESTROYER_EMPIRE", 0, spawnpoint2.x - 2000, spawnpoint2.y + 100, spawnpoint2.angle, 0);
    await scene.hyperspaceIn("IMPERIALSTARDESTROYER_EMPIRE", 0, spawnpoint2.x + 800, spawnpoint2.y - 500, spawnpoint2.angle, 0);

    await scene.wait(1000);

    await scene.moveCamera(spawnpoint.x, spawnpoint.y, .1);

    await Promise.all([
        scene.hyperspaceIn("MC80A_REBEL", 1, spawnpoint.x, spawnpoint.y, spawnpoint.angle, 0, ship => {
            ship.commander = new Commander(heroes.AdmiralAckbar, ship);
        }),
        ...["MC50_REBEL", "MC30C_REBEL", "MC80BLIBERTY_REBEL", "MC50_REBEL", "MC30C_REBEL", "MC80BLIBERTY_REBEL", "MC50_REBEL", "MC30C_REBEL", "MC80BLIBERTY_REBEL"].map(key => scene.hyperspaceIn(key, 1, spawnpoint.x + spawnpoint.range(), spawnpoint.y + spawnpoint.range(), spawnpoint.angle, Math.random() * 3000))
    ]);

    await scene.wait(1000);
    await scene.unlockCamera();
}

async function aurumAttacks() {
    const station = spawn("STARBASE02_HAPAN", 0);
    station.x = 0;
    station.y = -500;
    await scene.lockCamera();
    await scene.moveCamera(0, 0, .2);
    [
        "MAGNETAR_HAPAN",
        "MAGNETAR_HAPAN",
        "TEREPHON_HAPAN",
        "BATTLEDRAGON_HAPAN",
        "NEUTRON_HAPAN",
        "CORONAL_HAPAN",
        "CORONAL_HAPAN"
    ].forEach(ship => {
        scene.hyperspaceIn(ship, 0, Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, 0, Math.random() * 3000);
    });
    await scene.displayText("[Hapan Queen Mother]: We must protect the planet at all costs. It is crucial to the survival of our people.");
    await scene.displayText("[Hapan Tech]: Scanners are picking up a fleet of unidentified ships. Their energy signatures are unlike anything we've seen before.");
    await scene.moveCamera(1000, 0, .2);
    await Promise.all([
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "ARGENTUMBATTLESHIP_AURUM"
    ].map(ship => scene.hyperspaceIn(ship, 1, 4000 + Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, Math.PI, Math.random() * 3000)));
    await scene.wait(1000);
    await scene.displayText("[Hapan Queen Mother]: All ships, attack formation.");
    scene.battleCam(true);
    await scene.wait(12000);
    scene.battleCam(false);
    await scene.lockCamera();
    scene.moveCamera(-1000, 0, .2);
    await scene.displayText("[Hapan Tech]: Sir, another group of ships is coming out of hyperspace behind us! We're surrounded!");
    await Promise.all([
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "CHIMERADESTROYER_AURUM",
        "ARGENTUMBATTLESHIP_AURUM"
    ].map(ship => scene.hyperspaceIn(ship, 1, -1500 + Math.random() * 2000 - 1000, Math.random() * 2000 - 1000, 0, Math.random() * 3000)));
    await scene.wait(1000);
    scene.battleCam(true);
}

async function katanaFleet() {
    const leia = spawn("MC80BLIBERTY_REBEL", 0);
    leia.x = -1500;
    leia.y = -1500;
    leia.commander = new Commander(heroes.GeneralLeiaOrganaSolo, leia);

    await scene.lockCamera();
    await scene.moveCamera(-1500, -1500, .2);
    await scene.displayText("[Mon Calamari Officer]: General, we're detecting a fleet of Imperial Star Destroyers coming out of hyperspace.");
    scene.displayText("[General Leia Organa Solo]: All ships, prepare for battle. We have to hold out until help arrives."); // let it happen as camera moves

    const ISDs = [{
        x: 4500,
        y: 4500
    }, {
        x: 3340,
        y: 4300,
        commander: heroes.CapBrandei
    }];

    await scene.moveCamera(4000, 4000, .2);

    const promises = [];

    let i = 0;
    for (const ISD of ISDs) {
        promises.push(scene.hyperspaceIn("IMPERIALSTARDESTROYER_EMPIRE", 1, ISD.x, ISD.y, Math.atan2(-ISD.y, -ISD.x), (i++) * 2500, ship => {
            if (ISD.commander) {
                ship.commander = new Commander(ISD.commander, ship);
            }
        }));
    }

    await Promise.all(promises);

    await scene.wait(1000);
    scene.battleCam(true);

    await scene.wait(20_000);
    await scene.displayText("[General Garm Bel Iblis]: General Organa Solo, may we offer our assistance?");
    scene.battleCam(false);
    await scene.lockCamera();
    scene.lockOnTo(leia, .15);
    await scene.displayText("[General Leia Organa Solo]: General Bel Iblis, join the fight. We need all the help we can get.");

    promises.length = 0;

    for (let i = 0; i < 6; i++) {
        const offA = Math.PI / 6 * i;
        const d = 1500 + Math.sin(Math.random()) * 500;
        promises.push(scene.hyperspaceIn("DREADNOUGHTHEAVYCRUISER_REBEL", 0, leia.x + Math.cos(offA) * d, leia.y + Math.sin(offA) * d, leia.angle, Math.random() * 6000, ship => {
            if (i === 0) {
                ship.commander = new Commander(heroes.GarmBelIblis, ship);
            }
        }));
    }

    await Promise.all(promises);
    await scene.wait(1000);
    scene.battleCam(true);
}