import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.EXECUTORSUPERSTARDESTROYER_FO = templates.superCapital.EXECUTORSUPERSTARDESTROYER({
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEINTERCEPTOR_FO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEBOMBER_FO"
    }]
});

ships.MANDATORSIEGEDREADNOUGHT_FO = {
    name: "Mandator IV-class Siege Dreadnought",
    asset: "MANDATORSIEGEDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 3800,
    cost: 35000,
    speed: 1,
    turnSpeed: .005,
    shield: 80000,
    shieldRegen: 20,
    hardpoints: (function () {
        const output = [{
            x: -.3,
            y: -.4,
            weapon: {
                ...weapons["RED_AXIAL_SUPERLASER"],
                reload: weapons["RED_AXIAL_SUPERLASER"].reload * .25,
                superlaser: {
                    duration: 75,
                    damagePerTick: 300,
                    color: "RED"
                }
            }
        }, {
            x: .3,
            y: -.4,
            weapon: {
                ...weapons["RED_AXIAL_SUPERLASER"],
                reload: weapons["RED_AXIAL_SUPERLASER"].reload * .25,
                superlaser: {
                    duration: 75,
                    damagePerTick: 300,
                    color: "RED"
                }
            }
        }];

        for (let i = 0; i < 12; i++) {
            output.push({
                x: -.0075 - .034 * i,
                y: .9 - .14 * i,
                weapon: i % 2 ? weapons.GREEN_DOUBLE_TURBOLASER_CANNON : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .035 * i,
                y: .9 - .14 * i,
                weapon: i % 2 ? weapons.GREEN_DOUBLE_TURBOLASER_CANNON : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .02 * i,
                y: .875 - .14 * i,
                weapon: i % 2 ? weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .02 * i,
                y: .875 - .14 * i,
                weapon: i % 2 ? weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .01 * i,
                y: .85 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .01 * i,
                y: .85 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 7 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER_FO"
    }]
};

ships.MEGASTARDESTROYER_FO = templates.superCapital.MEGASTARDESTROYER({
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEFIGHTER_FO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEINTERCEPTOR_FO"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_FO"
    }]
});

export default ships;