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
        turnSpeed: .01,
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

templates.LIBERATOR = function (options = {}) {
    options.color ??= "RED";

    return {
        name: "Liberator-class Star Frigate",
        asset: "LIBERATOR.png",
        classification: shipTypes.Frigate,
        population: 12,
        size: 350,
        cost: 2350,
        speed: 4,
        turnSpeed: .02,
        shield: 2300,
        shieldRegen: 2.3,
        hardpoints: (function () {
            const points = [{
                x: -.289,
                y: .842
            }, {
                x: -.367,
                y: .277
            }, {
                x: -.500,
                y: -.296
            }, {
                x: -.424,
                y: -.689
            }, {
                x: -.305,
                y: -.270
            }, {
                x: -.151,
                y: -.793
            }, {
                x: -.159,
                y: .160
            }, {
                x: -.075,
                y: -.469
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[options.color + "_LASER_CANNON"],
                weapons.ION_CANNON
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

templates.NEUTRON_STAR = function (options = {}) {
    options.color ??= "RED";

    return {
        name: "Neutron-Star Bulk Cruiser",
        asset: "NEUTRON_STAR.png",
        classification: shipTypes.Frigate,
        population: 14,
        size: 400,
        cost: 3000,
        speed: 2,
        turnSpeed: .01,
        shield: 3000,
        shieldRegen: 3,
        hardpoints: (function () {
            const points = [{
                x: -.120,
                y: .942
            }, {
                x: -.163,
                y: .671
            }, {
                x: -.147,
                y: .554
            }, {
                x: -.117,
                y: .300
            }, {
                x: -.157,
                y: -.048
            }, {
                x: -.205,
                y: -.502
            }, {
                x: -.252,
                y: -.878
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
                weapons[options.color + "_RAPID_LASER_CANNON"],
                weapons.DOUBLE_ION_CANNON
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
                    health: e.weapon.health * 3 | 0
                }
            }));
        })()
    };
}

templates.SUPER_TRANSPORT_XI = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEINTERCEPTOR_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Super Transport XI",
        asset: "SUPER_TRANSPORT_XI.png",
        classification: shipTypes.Frigate,
        population: 14,
        size: 300,
        cost: 1850,
        speed: 2,
        turnSpeed: .005,
        shield: 0,
        shieldRegen: 0,
        hardpoints: (function () {
            const points = [{
                x: -.200,
                y: .790
            }, {
                x: -.233,
                y: -.818
            }, {
                x: -.335,
                y: .321
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
                weapons.ASSAULT_CONCUSSION_MISSILE,
                weapons.DOUBLE_ION_CANNON
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: i % 3 === 1 ? 6 : 2,
                    shotDelay: 200
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 16 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 8,
            reserveSize: 4,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 8,
            reserveSize: 4,
            squadronKey: options.bomber
        }]
    };
}

templates.TARTAN_PATROL_CRUISER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Tartan Patrol Cruiser",
        asset: "TARTAN_PATROL_CRUISER.png",
        classification: shipTypes.Frigate,
        population: 8,
        size: 220,
        cost: 1750,
        speed: 4,
        turnSpeed: .01,
        shield: 2300,
        shieldRegen: 2.3,
        hardpoints: [{
            x: -.132,
            y: .745,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .337,
            y: -.575,
            weapon: weapons[options.color + "_RAPID_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.331,
            y: -.575,
            weapon: weapons[options.color + "_RAPID_LASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .154,
            y: .476,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.144,
            y: .471,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3.25 | 0
            }
        }))
    };
}

templates.TRENCHANT_CRUISER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Trenchant Cruiser",
        asset: "TRENCHANT_CRUISER.png",
        classification: shipTypes.Frigate,
        population: 8,
        size: 250,
        cost: 900,
        speed: 4,
        turnSpeed: .005,
        shield: 2500,
        shieldRegen: 2.5,
        hardpoints: (function () {
            const points = [{
                x: -.094,
                y: .757
            }, {
                x: -.312,
                y: -.610
            }, {
                x: -.352,
                y: -.590
            }, {
                x: -.281,
                y: .287
            }, {
                x: -.610,
                y: -.506
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
                weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons.DOUBLE_ION_CANNON
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
                    health: e.weapon.health * 3 | 0
                }
            }));
        })()
    };
}

templates.VENGEANCE_FRIGATE = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Vengeance Frigate",
        asset: "VENGEANCE_FRIGATE.png",
        classification: shipTypes.Frigate,
        population: 8,
        size: 300,
        cost: 1100,
        speed: 3,
        turnSpeed: .005,
        shield: 2500,
        shieldRegen: 2.5,
        hardpoints: (function () {
            const points = [{
                x: -.716,
                y: .913
            }, {
                x: -.378,
                y: .072
            }, {
                x: -.193,
                y: -.012
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[options.color + "_TURBOLASER_CANNON"],
                weapons[options.color + "_DOUBLE_LASER_CANNON"],
                weapons.DOUBLE_ION_CANNON
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: i % 3 === 0 ? 16 : 2,
                    shotDelay: i % 3 === 0 ? 75 : 200
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3 | 0
                }
            }));
        })()
    };
}

templates.NEBULON_B = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";

    const rlc = weapons[options.color + "_RAPID_LASER_CANNON"];

    return {
        name: "Nebulon-B",
        asset: "NEBULONB.png",
        classification: shipTypes.Frigate,
        population: 10,
        size: 250,
        cost: 1200,
        speed: 4.5,
        turnSpeed: .0175,
        shield: 1000,
        shieldRegen: 1,
        shieldRegenAbility: {
            duration: .7,
            cooldown: 2,
            regen: .6
        },
        hardpoints: [{
            x: 0,
            y: .85,
            weapon: weapons[options.color + "_TURBOLASER_CANNON"],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: .5,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: .5,
            weapon: weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: .3,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .125,
            y: -.7,
            weapon: {
                ...rlc,
                speed: rlc.speed * 1.25,
                damage: rlc.damage * 2,
                range: rlc.range * 1.1
            },
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.125,
            y: -.7,
            weapon: {
                ...rlc,
                speed: rlc.speed * 1.25,
                damage: rlc.damage * 2,
                range: rlc.range * 1.1
            },
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: -.85,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: 0,
            weapon: weapons[options.color + "_ANTI_FIGHTER_LASER_CANNON"],
            shotsAtOnce: 4,
            shotDelay: 60
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
            maxSquadrons: 1,
            squadronSize: 5,
            reserveSize: 2,
            squadronKey: options.fighter
        }]
    };
}

templates.PELTA = function (options = {}) {
    options.color ??= "RED";
    options.fighter ??= "AWING_REBEL";

    return {
        name: "Pelta-class Support Frigate",
        asset: "PELTA.png",
        classification: shipTypes.Frigate,
        population: 6,
        size: 145,
        cost: 1700,
        speed: 4,
        turnSpeed: .015,
        shield: 2500,
        shieldRegen: 2.5,
        tenderAbility: {
            frequency: .75,
            power: .75
        },
        hardpoints: [{
            x: -.2,
            y: .85,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: .2,
            y: .85,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: -.125,
            y: .2,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: .125,
            y: .2,
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: -.25,
            y: -.6,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: .25,
            y: -.6,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 80
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
            maxSquadrons: 1,
            squadronSize: 5,
            reserveSize: 2,
            squadronKey: options.fighter
        }]
    };
}

templates.CLASS_C_FRIGATE = function (options = {}) {
    options.color ??= "RED";

    return {
        name: "Class-C Frigate",
        asset: "CLASSC.png",
        classification: shipTypes.Frigate,
        population: 5,
        size: 210,
        cost: 1650,
        speed: 3,
        turnSpeed: .01,
        shield: 2750,
        shieldRegen: 2.75,
        hardpoints: [{
            x: .001,
            y: .962,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.086,
            y: .409,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .095,
            y: .035,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 50
        }, {
            x: -.083,
            y: -.268,
            weapon: weapons[`${options.color}_RAPID_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .117,
            y: -.946,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.152,
            y: -.977,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }))
    };
}

templates.SUPER_TRANSPORT_VI = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Super Transport VI",
        asset: "SUPER_TRANSPORT_VI.png",
        classification: shipTypes.Frigate,
        population: 7,
        size: 180,
        cost: 1800,
        speed: 3.5,
        turnSpeed: .005,
        shield: 0,
        shieldRegen: 0,
        hardpoints: [{
            x: -.264,
            y: .419,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 750
        }, {
            x: .251,
            y: .411,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 750
        }, {
            x: -.274,
            y: -.290,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .267,
            y: -.297,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.167,
            y: -.836,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .167,
            y: -.842,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 6 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 3,
            reserveSize: 2,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.bomber
        }]
    };
}

templates.SUPER_TRANSPORT_VII = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Super Transport VII",
        asset: "SUPER_TRANSPORT_VII.png",
        classification: shipTypes.Frigate,
        population: 13,
        size: 300,
        cost: 2450,
        speed: 3.5,
        turnSpeed: .005,
        shield: 0,
        shieldRegen: 0,
        hardpoints: [{
            x: -.264,
            y: .419,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 750
        }, {
            x: .251,
            y: .411,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 750
        }, {
            x: -.274,
            y: -.290,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .267,
            y: -.297,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: -.167,
            y: -.836,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .167,
            y: -.842,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 150
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 9 | 0,
                reload: e.weapon.reload * .85
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 3,
            reserveSize: 2,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.bomber
        }]
    };
}

export default templates;