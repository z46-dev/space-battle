import { shipTypes, weaponClassifications } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ASCENDANCY_EOTH = {
    name: "Ascendancy Star Destroyer",
    asset: "ASCENDANCY.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 850,
    cost: 7000,
    speed: 2.5,
    turnSpeed: .01,
    shield: 11000,
    shieldRegen: 11,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.175,
                y: -.1 - .06 * i,
                weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: .175,
                y: -.1 - .06 * i,
                weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .02 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: .075 + .02 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 3.25 | 0,
                reload: output[i].weapon.reload * .76 | 0
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.SYNDIC_EOTH = {
    name: "Syndic Destroyer",
    asset: "SYNDIC.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 930,
    cost: 7800,
    speed: 2.1,
    turnSpeed: .0085,
    shield: 10500,
    shieldRegen: 10.5,
    hardpoints: [{
        x: 0,
        y: .950,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 8,
        shotDelay: 500
    }, {
        x: .1,
        y: .68,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.1,
        y: .68,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.05,
        y: .83,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .05,
        y: .83,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .15,
        y: .455,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.15,
        y: .454,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.095,
        y: .315,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .095,
        y: .315,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.115,
        y: .082,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .115,
        y: .082,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .27,
        y: -.06,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.27,
        y: -.06,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.375,
        y: -.336,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .375,
        y: -.336,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .245,
        y: -.585,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.245,
        y: -.585,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.055,
        y: -.795,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: .055,
        y: -.795,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 128
    }, {
        x: -.365,
        y: -.02,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.45,
        y: -.405,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .365,
        y: -.02,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .45,
        y: -.405,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .295,
        y: -.76,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.295,
        y: -.76,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 2.85 | 0 } })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.INTEGO_EOTH = {
    name: "Intego Star Destroyer",
    asset: "INTEGO.png",
    classification: shipTypes.Capital,
    population: 53,
    size: 1500,
    cost: 23000,
    speed: 1.2,
    turnSpeed: .001,
    shield: 18000,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        const initial = [{
            x: -.15,
            y: .22,
            weapon: weapons.BLACK_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.22,
            y: .14,
            weapon: weapons.BLACK_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.29,
            y: .07,
            weapon: weapons.BLACK_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.35,
            y: -.01,
            weapon: weapons.BLACK_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.1,
            y: .01,
            weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.1,
            y: -.073,
            weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.1,
            y: .657,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: -.1,
            y: .903,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 250
        }];

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: .12 + .05 * i,
                y: .65 - .09 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: -.12 - .05 * i,
                y: .65 - .09 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: .52 - .05 * i,
                y: -.09 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            }, {
                x: -.52 + .05 * i,
                y: -.09 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 60
            });
        }

        for (const point of initial) {
            output.push(point, {
                ...point,
                x: -point.x
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 5 | 0,
                reload: output[i].weapon.reload * .7 | 0
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 5,
        squadronKey: "SYCA_EOTH"
    }]
};

export default ships;