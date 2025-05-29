import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.GUARDIAN_FREIGHTER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Guardian Freighter",
        asset: "GUARDIAN_FREIGHTER.png",
        classification: shipTypes.FighterBomber,
        population: 1,
        size: 40,
        cost: 10,
        speed: 16,
        turnSpeed: .05,
        shield: 200,
        shieldRegen: .2,
        hardpoints: [{
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_LASER_CANNON`]
        }, {
            x: 0,
            y: 0,
            weapon: weapons.ION_CANNON
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 220
            }
        }))
    };
}

templates.YZ_755 = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "YZ-755 Freighter",
        asset: "YZ-755.png",
        classification: shipTypes.FighterBomber,
        population: 1,
        size: 40,
        cost: 10,
        speed: 14,
        turnSpeed: .05,
        shield: 225,
        shieldRegen: .225,
        hardpoints: [{
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 160
            }
        }))
    };
}

export default templates;