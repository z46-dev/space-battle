import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CENTURION_ZANN = {
    name: "Centurion Class Battlecruiser",
    asset: "CENTURION.png",
    classification: shipTypes.SuperCapital,
    population: 42,
    size: 2000,
    cost: 9200,
    speed: 1,
    turnSpeed: .0025,
    shield: 30000,
    shieldRegen: 30,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.02 - .02 * i,
                y: .9334 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .02 + .02 * i,
                y: .9334 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.05 - .01 * i,
                y: .6 - .08 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .05 + .01 * i,
                y: .6 - .08 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.YELLOW_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

export default ships;