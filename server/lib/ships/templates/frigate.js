import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.QUASAR = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.interceptor ??= "TIEINTERCEPTOR_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Quasar",
        asset: "QUASAR.png",
        classification: shipTypes.Frigate,
        population: 10,
        size: 250,
        cost: 1700,
        speed: 3,
        turnSpeed: .0025,
        shield: 1950,
        shieldRegen: 1.95,
        hardpoints: [{
            x: -.05,
            y: .95,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .05,
            y: .95,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.175,
            y: .6,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .175,
            y: .6,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.325,
            y: .15,
            weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            x: .325,
            y: .15,
            weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            x: -.55,
            y: -.3,
            weapon: weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 225
        }, {
            x: .55,
            y: -.3,
            weapon: weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 225
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 5,
            reserveSize: 4,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 5,
            reserveSize: 4,
            squadronKey: options.interceptor
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 5,
            reserveSize: 4,
            squadronKey: options.bomber
        }]
    };
}

templates.CARRACK = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Carrack Light Cruiser",
        asset: "CARRACK.png",
        classification: shipTypes.Frigate,
        population: 8,
        size: 200,
        cost: 1900,
        speed: 4.5,
        turnSpeed: .01,
        shield: 2100,
        shieldRegen: 2.1,
        hardpoints: [{
            x: 0,
            y: .9,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.15,
            y: .5,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .15,
            y: .5,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.125,
            y: .2,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .125,
            y: .2,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.1,
            y: -.4,
            weapon: weapons[options.color + "_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .1,
            y: -.4,
            weapon: weapons[options.color + "_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: 0,
            y: -.6,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 3,
            shotDelay: 75
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.5 | 0
            }
        }))
    };
}

templates.LANCER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Lancer Frigate",
        asset: "LANCERFRIGATE.png",
        classification: shipTypes.Frigate,
        population: 10,
        size: 225,
        cost: 2100,
        speed: 3.8,
        turnSpeed: .015,
        shield: 2350,
        shieldRegen: 2.35,
        hardpoints: [{
            x: 0,
            y: .95,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 4,
            shotDelay: 150
        }, {
            x: 0,
            y: .5,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: 0,
            y: .25,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 4,
            shotDelay: 150
        }, {
            x: 0,
            y: 0,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: -.25,
            weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 225
        }, {
            x: -.15,
            y: -.5,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: .15,
            y: -.5,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 3,
            shotDelay: 75
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.75 | 0
            }
        }))
    };
}

templates.STRIKECRUISER = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEINTERCEPTOR_EMPIRE";

    return {
        name: "Strike Cruiser",
        asset: "STRIKECRUISER.png",
        classification: shipTypes.Frigate,
        population: 13,
        size: 250,
        cost: 1500,
        speed: 4.25,
        turnSpeed: .01,
        shield: 1600,
        shieldRegen: 1.6,
        hardpoints: (function () {
            const points = [{
                x: -.102,
                y: .698
            }, {
                x: -.146,
                y: .327
            }, {
                x: -.158,
                y: -.184
            }, {
                x: -.184,
                y: -.731
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[options.color + "_DOUBLE_LASER_CANNON"],
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
                weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 1.5 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 2,
            squadronKey: options.fighter
        }]
    };
}

templates.TONFALKCARRIER = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEINTERCEPTOR_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Ton Falk Escort Carrier",
        asset: "TONFALKESCORTCARRIER.png",
        classification: shipTypes.Frigate,
        population: 10,
        size: 300,
        cost: 1600,
        speed: 2.5,
        turnSpeed: .01,
        shield: 2000,
        shieldRegen: 2,
        tenderAbility: {
            frequency: .5,
            power: .5
        },
        hardpoints: [{
            x: -.130,
            y: .952,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.313,
            y: -.022,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.100,
            y: -.615,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.063,
            y: .061,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.105,
            y: .493,
            weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .133,
            y: .947,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .101,
            y: .490,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .061,
            y: .061,
            weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .315,
            y: -.023,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .101,
            y: -.618,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 2,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 2,
            squadronKey: options.bomber
        }]
    };
}

templates.STAR_GALLEON = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEREAPER_EMPIRE";

    return {
        name: "Star Galleon",
        asset: "STARGALLEON.png",
        classification: shipTypes.Frigate,
        population: 10,
        size: 280,
        cost: 1400,
        speed: 3,
        turnSpeed: .02,
        shield: 2000,
        shieldRegen: 2,
        tenderAbility: {
            frequency: .5,
            power: .5
        },
        hardpoints: (function () {
            const points = [{
                x: -.362,
                y: .084
            }, {
                x: -.370,
                y: -.060
            }, {
                x: -.374,
                y: -.204
            }, {
                x: -.139,
                y: .268
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[options.color + "_DOUBLE_LASER_CANNON"],
                weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
                weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
                weapons.DOUBLE_ION_CANNON_MEDIUM
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 1.5 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 4,
            reserveSize: 4,
            squadronKey: options.fighter
        }]
    };
}

templates.VICTORY_FRIGATE = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Victory II Frigate",
        asset: "VICTORYFRIGATE.png",
        classification: shipTypes.Frigate,
        population: 9,
        size: 300,
        cost: 1300,
        speed: 5,
        turnSpeed: .02,
        shield: 1600,
        shieldRegen: 1.6,
        hardpoints: (function () {
            const points = [{
                x: -.082,
                y: .745
            }, {
                x: -.224,
                y: -.023
            }, {
                x: -.520,
                y: -.671
            }, {
                x: -.114,
                y: -.352
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[options.color + "_QUAD_LASER_CANNON"],
                weapons.QUAD_ION_CANNON
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 1.5 | 0
                }
            }));
        })()
    };
}

templates.MUNIFICENT = function (options = {}) {
    options.color ??= "RED";
    options.asset ??= "MUNIFICENT.png";

    options.fighter ??= "VULTUREDROID_CIS";

    return {
        name: "Munificent-class Star Frigate",
        asset: options.asset,
        classification: shipTypes.Frigate,
        population: 10,
        size: 300,
        cost: 1300,
        speed: 3.5,
        turnSpeed: .01,
        shield: 2200,
        shieldRegen: 2.2,
        hardpoints: [{
            x: 0,
            y: .8,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON_ULTRAHEAVY`]
        }, {
            x: -.5,
            y: -.05,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: .5,
            y: -.05,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: -.1,
            y: 0,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: .1,
            y: 0,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: -.225,
            y: .25,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: .225,
            y: .25,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 90
        }, {
            x: -.15,
            y: .6,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 45
        }, {
            x: .15,
            y: .6,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 45
        }, {
            x: -.15,
            y: -.4,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 45
        }, {
            x: .15,
            y: -.4,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 45
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 1.3 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 5,
            reserveSize: 1,
            squadronKey: options.fighter
        }]
    };
}

export default templates;