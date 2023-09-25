import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDREADNOUGHT_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 44,
    size: 1100,
    cost: 9700,
    speed: 2.25,
    turnSpeed: .025,
    shield: 30000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "HYENABOMBER_CIS"
    }]
};

export default ships;