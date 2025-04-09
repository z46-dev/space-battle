import { shipTypes, weaponClassifications } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ASCENDANCY_EOTH = {
    name: "Ascendancy Star Destroyer",
    asset: "ASCENDANCY.png",
    classification: shipTypes.Capital,
    population: 25,
    size: 850,
    cost: 5600,
    speed: 2.5,
    turnSpeed: .01,
    shield: 15000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.175,
                y: -.1 - .06 * i,
                weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 60
            }, {
                x: .175,
                y: -.1 - .06 * i,
                weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 60
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .02 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: i % 2 ? 3 : 2,
                shotDelay: 60
            }, {
                x: .075 + .02 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: i % 2 ? 3 : 2,
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
        squadronSize: 8,
        reserveSize: 5,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 5,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.INTEGO_EOTH = {
    name: "Intego Star Destroyer",
    asset: "INTEGO.png",
    classification: shipTypes.Capital,
    population: 35,
    size: 1500,
    cost: 14000,
    speed: 1.2,
    turnSpeed: .001,
    shield: 24000,
    shieldRegen: 24,
    hardpoints: (function() {
        const output = [];

        const initial = [{
            x: -.15,
            y: .22,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.22,
            y: .14,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.29,
            y: .07,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.35,
            y: -.01,
            weapon: weapons.BLACK_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
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
            weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.1,
            y: .903,
            weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }];

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
        squadronSize: 8,
        reserveSize: 5,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 5,
        squadronKey: "SYCA_EOTH"
    }]
};

export default ships;