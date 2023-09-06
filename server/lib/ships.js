import { weaponTypes } from "./constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, DOUBLE_ION_CANNON_MEDIUM, FIGHTER_ION_CANNON, GREEN_DOUBLE_LASER_CANNON, GREEN_DOUBLE_LASER_CANNON_HEAVY, GREEN_DOUBLE_TURBOLASER_CANNON, GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY, GREEN_LASER_CANNON, GREEN_OCTUPLE_TURBOLASER_CANNON, GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY, GREEN_QUAD_LASER_CANNON_HEAVY, GREEN_QUAD_TURBOLASER_CANNON, GREEN_RAPID_LASER_CANNON, GREEN_TRIPLE_LASER_CANNON_HEAVY, GREEN_TURBOLASER_CANNON, ION_CANNON, ION_CANNON_HEAVY, ION_CANNON_ULTRA, FIGHTER_PROTON_TORPEDO, QUAD_ION_CANNON, QUAD_ION_CANNON_HEAVY, QUAD_ION_CANNON_MEDIUM, RED_DOUBLE_LASER_CANNON, RED_DOUBLE_LASER_CANNON_HEAVY, RED_DOUBLE_TURBOLASER_CANNON, RED_DOUBLE_TURBOLASER_CANNON_HEAVY, RED_FIGHTER_LASER_CANNON, RED_LASER_CANNON, RED_QUAD_LASER_CANNON, RED_RAPID_LASER_CANNON, RED_TRIPLE_LASER_CANNON, RED_TRIPLE_LASER_CANNON_HEAVY, RED_TRIPLE_TURBOLASER_CANNON_HEAVY, RED_TURBOLASER_CANNON, TRIPLE_ION_CANNON_HEAVY } from "./weapons.js";

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

ships.ISD = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    size: 400,
    cost: 3200,
    speed: 1.5,
    turnSpeed: .01,
    shield: 4000,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            }, {
                x: -.125 - .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON
            }, {
                x: .125 + .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON
            });
        }

        return output;
    })()
};

ships.ARQUITENS = {
    name: "Arquitens",
    asset: "ARQUITENS.png",
    size: 85,
    cost: 750,
    speed: 8,
    turnSpeed: .075,
    shield: 1300,
    shieldRegen: 2,
    hardpoints: [{
        x: -.225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: .275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY
    }]
};

ships.RAIDER = {
    name: "Raider",
    asset: "RAIDER.png",
    size: 50,
    cost: 200,
    speed: 10,
    turnSpeed: .1,
    shield: 350,
    shieldRegen: 1,
    hardpoints: [{
        x: -.15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: .15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.4,
        weapon: GREEN_RAPID_LASER_CANNON
    }]
};

ships.QUASAR = {
    name: "Quasar",
    asset: "QUASAR.png",
    size: 100,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 1900,
    shieldRegen: 5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
    }, {
        x: -.175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: -.325,
        y: .15,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }]
};

ships.SSD = {
    name: "Super Star Destroyer",
    asset: "SSD.png",
    size: 3000,
    cost: 60000,
    speed: .5,
    turnSpeed: .0005,
    shield: 72000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 13; i ++) {
            output.push({
                x: -.02 - .0225 * i,
                y: .8 - .1 * i,
                weapon: GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_TRIPLE_LASER_CANNON_HEAVY : QUAD_ION_CANNON_HEAVY
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_TRIPLE_LASER_CANNON_HEAVY : QUAD_ION_CANNON_HEAVY
            });

            i |= 0;
        }

        return output;
    })()
};

ships.HOMEONE = {
    name: "Home One",
    asset: "HOMEONE.png",
    size: 750,
    cost: 3750,
    speed: 2.5,
    turnSpeed: .02,
    shield: 9000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: [-.05, -.15, -.15, -.05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: [.05, .15, .15, .05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: RED_TRIPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: [-.025, -.1, -.1, -.025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [.025, .1, .1, .025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [-.025, -.05, -.05, -.025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            }, {
                x: [.025, .05, .05, .025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : RED_LASER_CANNON
            });
        }

        return output;
    })()
};

ships.MC80LIBERTY = {
    name: "MC80 Liberty",
    asset: "MC80LIBERTY.png",
    size: 600,
    cost: 2400,
    speed: 3,
    turnSpeed: .025,
    shield: 5500,
    shieldRegen: 5,
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: -.4,
            weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }, {
            x: -.3,
            y: -.2,
            weapon: RED_RAPID_LASER_CANNON
        }, {
            x: -.2,
            y: .05,
            weapon: DOUBLE_ION_CANNON_HEAVY
        }, {
            x: -.075,
            y: .1,
            weapon: RED_QUAD_LASER_CANNON
        }, {
            x: -.05,
            y: .4,
            weapon: DOUBLE_ION_CANNON
        }, {
            x: -.025,
            y: .7,
            weapon: RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon
            })
        }

        return output;
    })()
};

ships.NEBULONB = {
    name: "Nebulon-B",
    asset: "NEBULONB.png",
    size: 150,
    cost: 500,
    speed: 4.5,
    turnSpeed: .05,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: RED_TURBOLASER_CANNON
    }, {
        x: .1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: -.1,
        y: .5,
        weapon: RED_DOUBLE_LASER_CANNON_HEAVY
    }, {
        x: 0,
        y: .3,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .125,
        y: -.7,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: -.125,
        y: -.7,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: 0,
        y: -.85,
        weapon: DOUBLE_ION_CANNON
    }]
};

ships.PELTA = {
    name: "Pelta Frigate",
    asset: "PELTA.png",
    size: 90,
    cost: 600,
    speed: 3.4,
    turnSpeed: .04,
    shield: 1600,
    shieldRegen: 3,
    hardpoints: [{
        x: -.2,
        y: .85,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: .2,
        y: .85,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: -.125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: .125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: -.25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .25,
        y: -.6,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 12,
        reserveSize: 3,
        squadronKey: "XWING"
    }]
};

ships.CR90 = {
    name: "CR-90",
    asset: "CR90.png",
    size: 60,
    cost: 200,
    speed: 12,
    turnSpeed: .075,
    shield: 300,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: .6,
        weapon: RED_RAPID_LASER_CANNON
    }, {
        x: 0,
        y: .2,
        weapon: RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.2,
        weapon: RED_RAPID_LASER_CANNON
    }]
};

ships.XWING = {
    name: "X-Wing",
    asset: "XWING.png",
    size: 17.5,
    cost: 5,
    speed: 20,
    turnSpeed: .1,
    shield: 25,
    shieldRegen: 0.1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: RED_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO
    }]
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