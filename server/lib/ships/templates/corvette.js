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

templates.CR90 = function (options = {}) {
    options.color ??= "RED";

    const turbo = weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`];

    return {
        name: "CR-90 Corvette",
        asset: "CR90.png",
        classification: shipTypes.Corvette,
        population: 1,
        size: 95,
        cost: 220,
        speed: 14,
        turnSpeed: .06,
        shield: 430,
        shieldRegen: .43,
        hardpoints: [{
            x: 0,
            y: .6,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: 0,
            y: .2,
            weapon: {
                ...turbo,
                speed: turbo.speed * 1.25,
                damage: turbo.damage * 2,
                range: turbo.range * 1.1
            },
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            x: 0,
            y: -.2,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 50
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 380
            }
        }))
    };
}

templates.CONSOLAR = function (options = {}) {
    options.color ??= "BLUE";

    return {
        name: "Consolar Corvette",
        asset: "CONSOLARHUTT.png",
        classification: shipTypes.Corvette,
        population: 1,
        size: 70,
        cost: 150,
        speed: 11,
        turnSpeed: .04,
        shield: 300,
        shieldRegen: .3,
        hardpoints: [{
            x: 0,
            y: .8,
            weapon: weapons[`${options.color}_LASER_CANNON_HEAVY`],
            shotsAtOnce: 4,
            shotDelay: 80
        }, {
            x: 0,
            y: .4,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 80
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 80
        }, {
            x: 0,
            y: -.4,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 80
        }, {
            x: 0,
            y: -.8,
            weapon: weapons[`${options.color}_LASER_CANNON_HEAVY`],
            shotsAtOnce: 4,
            shotDelay: 80
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 230
            }
        }))
    };
}

templates.DP20 = function (options = {}) {
    options.color ??= "BLUE";
    options.asset ??= "DP20.png";

    return {
        name: "DP-20 Corellian Gunship",
        asset: options.asset,
        classification: shipTypes.Corvette,
        population: 1,
        size: 80,
        cost: 225,
        speed: 10,
        turnSpeed: .05,
        shield: 550,
        shieldRegen: .55,
        hardpoints: [{
            x: 0,
            y: .8,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: .4,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: -.4,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: -.8,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 6,
            shotDelay: 150
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 400
            }
        }))
    };
}

templates.ACTION_VI_TRANSPORT = function (options = {}) {
    options.color ??= "BLUE";
    options.asset ??= "ACTIONVITRANSPORTGREY.png";

    return {
        name: "Action VI Transport",
        asset: options.asset,
        classification: shipTypes.Corvette,
        population: 1,
        size: 100,
        cost: 150,
        speed: 8,
        turnSpeed: .02,
        shield: 200,
        shieldRegen: .2,
        hardpoints: [{
            x: 0,
            y: .8,
            weapon: weapons[`${options.color}_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: .4,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: 0,
            weapon: weapons[`${options.color}_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: -.4,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 80
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: 130
            }
        }))
    };
}

templates.LUPUS_MISSILE_FRIGATE = function (options = {}) {
    options.color ??= "RED";

    return {
        name: "Lupus Missile Frigate",
        asset: "LUPUSMISSILEFRIGATE.png",
        classification: shipTypes.Corvette,
        population: 3,
        size: 90,
        cost: 450,
        speed: 9,
        turnSpeed: .04,
        shield: 800,
        shieldRegen: .8,
        hardpoints: [{
            x: 0,
            y: .8,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: .8,
            weapon: weapons.QUAD_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: .4,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 200
        }, {
            x: 0,
            y: 0,
            weapon: weapons.ASSAULT_PROTON_ROCKET,
            shotsAtOnce: 5,
            shotDelay: 200
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 2 | 0,
                reload: hp.weapon.reload * .7 | 0
            }
        }))
    };
}

export default templates;