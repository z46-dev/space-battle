import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.RESURGENT_FO = {
    name: "Resurgent Star Destroyer",
    asset: "RESURGENT.png",
    classification: shipTypes.Capital,
    population: 40,
    size: 1450,
    cost: 8200,
    speed: 3.25,
    turnSpeed: .005,
    shield: 23400,
    shieldRegen: 23.4,
    hardpoints: (function () {
        const output = [];
        const types = ["GREEN_ANTI_FIGHTER_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_LASER_CANNON", "ASSAULT_CONCUSSION_MISSILE"];

        for (let i = 0; i < 16; i++) {
            output.push({
                x: -.03 - .031 * i,
                y: .85 - .1 * i,
                weapon: weapons[types[i % 4]],
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .031 * i,
                y: .85 - .1 * i,
                weapon: weapons[types[i % 4]],
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 6; i++) {
            output.push({
                x: -.1 - .015 * i,
                y: -.05 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .1 + .015 * i,
                y: -.05 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.15 - .015 * i,
                y: -.05 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .15 + .015 * i,
                y: -.05 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < output.length; i++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 4
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_FO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_FO"
    }]
};

ships.XYSTON_FO = {
    name: "Xyston Star Destroyer",
    asset: "XYSTON.png",
    classification: shipTypes.Capital,
    population: 50,
    size: 1200, // * 2 star destroyer
    cost: 16000, // * 2 star destroyer
    speed: 4,
    turnSpeed: .005,
    shield: 16000, // * 2 star destroyer
    shieldRegen: 16, // * 2 star destroyer
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 3,
                shotDelay: 300
            }, {
                x: .3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 3,
                shotDelay: 300
            }, {
                x: 0,
                y: .3 - .1 * i,
                weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON
            });
        }

        for (let i = 0; i < 8; i++) {
            output.push({
                x: -.075 - .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < output.length; i++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 2.5
            };
        }

        output.push({
            x: 0,
            y: .5,
            weapon: {
                ...weapons["RED_AXIAL_SUPERLASER"],
                superlaser: {
                    duration: 250,
                    damagePerTick: 300,
                    color: "RED"
                }
            }
        });

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 3,
        squadronKey: "TIEFIGHTER_FO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 3,
        squadronKey: "TIEBOMBER_FO"
    }]
};

export default ships;