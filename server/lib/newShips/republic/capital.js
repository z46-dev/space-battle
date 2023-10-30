import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VENATOR_REPUBLIC = {
    name: "Venator-Class Star Destroyer",
    asset: "VENATOR.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 500,
    cost: 4000,
    speed: 4,
    turnSpeed: .01,
    shield: 3800,
    shieldRegen: 3,
    hardpoints: (function() {
        const output = [{
            x: -.4,
            y: -.55,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .4,
            y: -.55,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: -.275,
            y: .05,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .275,
            y: .05,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: -.25,
            y: .225,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .25,
            y: .225,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1 - .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .1 + .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.175,
                y: 0 - .155 * i,
                weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .15,
                y: 0 - .155 * i,
                weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
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
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "ARC170_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "YWING_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 1,
        squadronKey: "NTB630_REPUBLIC"
    }]
};

export default ships;