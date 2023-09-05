
function angleDifference(a, b) {
    return Math.atan2(Math.sin(a - b), Math.cos(a - b));
}

class Hardpoint {
    static WeaponMount = class {
        constructor(hardpoint, config) {
            this.hardpoint = hardpoint;
            this.ship = hardpoint.ship;

            this.reload = config.reload;
            this.tick = Math.max(0, config.reload - Math.random() * (config.reload * .2) | 0);
        }

        update() {}
    }

    constructor(ship, config) {
        this.ship = ship;

        this.offset = config.offset;
        this.angle = config.angle;
        this.facing = this.angle;

        this.maxHealth = config.health;
        this.health = config.health;

        this.weaponMount = null;
        this.hangarMount = null;
    }
}

class Ship {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.angle = 0;
        this.size = 1;
        this.hardpoints = [];
    }
}