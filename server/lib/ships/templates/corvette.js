import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.RAIDER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Raider Corvette",
        asset: "RAIDER.png",
        classification: shipTypes.Corvette,
        population: 1,
        size: 85,
        cost: 200,
        speed: 11,
        turnSpeed: .03,
        shield: 450,
        shieldRegen: .4,
        hardpoints: [{
            x: -.15,
            y: .075,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: .15,
            y: .075,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: 0,
            y: -.4,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: 0,
            y: .4,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 50
        }]
    };
}

templates.VIGILCORVETTE = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Vigil Corvette",
        asset: "VIGILCORVETTE.png",
        classification: shipTypes.Corvette,
        population: 4,
        size: 120,
        cost: 400,
        speed: 7,
        turnSpeed: .015,
        shield: 600,
        shieldRegen: .6,
        hardpoints: [{
            x: -.375,
            y: .05,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .4,
            y: .025,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.375,
            y: .05,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 60
        }, {
            x: .4,
            y: .025,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 60
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.25 | 0
            }
        }))
    };
}

templates.IPV1 = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "IPV-1 System Patrol Craft",
        asset: "IPV1.png",
        classification: shipTypes.Corvette,
        population: 1,
        size: 75,
        cost: 200,
        speed: 9,
        turnSpeed: .03,
        shield: 450,
        shieldRegen: .4,
        hardpoints: [{
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }]
    };
}

export default templates;