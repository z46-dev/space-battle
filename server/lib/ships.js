import { weaponTypes } from "./constants.js";

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

const ships = {};

const ISD_Turbo = {
    reload: 75,
    damage: 50,
    speed: 50,
    range: 4000,
    type: weaponTypes.GreenQuadTurbolaser,
    health: 100
};

const ISD_Ion = {
    reload: 50,
    damage: 125,
    speed: 50,
    range: 4000,
    type: weaponTypes.DoubleIonCannon,
    health: 100
};

const ISD_Laser = {
    reload: 15,
    damage: 10,
    speed: 60,
    range: 3000,
    type: weaponTypes.GreenLaserCannon,
    health: 100
};

ships.ISD = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    size: 400,
    cost: 3200,
    speed: 1.5,
    turnSpeed: .01,
    shield: 5500,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: ISD_Turbo
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: ISD_Turbo
            }, {
                x: -.125 - .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? ISD_Ion : ISD_Laser
            }, {
                x: .125 + .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? ISD_Ion : ISD_Laser
            });
        }

        return output;
    })()
};

const SSD_Turbo = {
    reload: 150,
    damage: 125,
    speed: 50,
    range: 6000,
    type: weaponTypes.GreenOctupleLaserCannon,
    health: 80
};

const SSD_Ion = {
    reload: 75,
    damage: 200,
    speed: 50,
    range: 6500,
    type: weaponTypes.TripleIonCannon,
    health: 100
};

const SSD_Laser = {
    reload: 30,
    damage: 25,
    speed: 60,
    range: 4500,
    type: weaponTypes.GreenDoubleLaserCannon,
    health: 100
};

ships.SSD = {
    name: "Super Star Destroyer",
    asset: "SSD.png",
    size: 3000,
    cost: 60000,
    speed: .5,
    turnSpeed: .001,
    shield: 130000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 13; i ++) {
            output.push({
                x: -.02 - .0225 * i,
                y: .8 - .1 * i,
                weapon: SSD_Ion
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: SSD_Ion
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: SSD_Laser
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: SSD_Laser
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: SSD_Turbo
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: SSD_Turbo
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? SSD_Laser : SSD_Ion
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? SSD_Laser : SSD_Ion
            });

            i |= 0;
        }

        return output;
    })()
};

for (const ship in ships) {
    ships[ship].hardpoints.forEach(hardpoint => {
        const vector = new Vector(hardpoint.y, hardpoint.x);

        hardpoint.offset = vector.length;
        hardpoint.direction = vector.angle;
    });
}

export default ships;

/*
 * TODO:
 * AI Stuff
 * Focus Fire on Ship/Hardpoint
 * Weapon Types in a separate file, no more ISD_Turbo, just GREEN_QUAD_TURBO_HEAVY
 */