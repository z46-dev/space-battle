import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../templates/superCapital.js";

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
    shieldRegenAbility: {
        duration: 1.25,
        cooldown: 1.2,
        regen: 1.5
    },
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

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 6 | 0
            }
        }));
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

ships.LUSANKYA_REBEL = templates.EXECUTORSUPERSTARDESTROYER({
    name: "Lusankya",
    color: "RED",
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
});

export default ships;