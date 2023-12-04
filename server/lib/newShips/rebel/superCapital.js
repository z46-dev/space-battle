import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC85_REBEL = {
    name: "MC-85",
    asset: "MC85.png",
    classification: shipTypes.SuperCapital,
    population: 74,
    size: 2600,
    cost: 20000,
    speed: 3,
    turnSpeed: .0125,
    shield: 50000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.06 - .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.06 - .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "BWING_REBEL"
    }]
};

ships.LUSANKYA_REBEL = {
    name: "Lusankya",
    asset: "SSD.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 8000,
    cost: 60000,
    speed: .5,
    turnSpeed: .0005,
    shield: 86000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 13; i ++) {
            output.push({
                x: -.02 - .0225 * i,
                y: .8 - .1 * i,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: weapons.QUAD_ION_CANNON,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: weapons.QUAD_ION_CANNON,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: -.025 - .0225 * i,
                y: .8 - .1 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .025 + .02 * i,
                y: .8 - .1 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? weapons.RED_DOUBLE_LASER_CANNON : weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? weapons.RED_DOUBLE_LASER_CANNON : weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON : weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON : weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            });

            i |= 0;
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "BWING_REBEL"
    }]
};

export default ships;