import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.IMPERIAL_STAR_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter = "TIEFIGHTER_EMPIRE";
    options.interceptor = "TIEINTERCEPTOR_EMPIRE";
    options.bomber = "TIEBOMBER_EMPIRE";

    return {
        name: "Imperial Star Destroyer",
        asset: "ISD.png",
        classification: shipTypes.Capital,
        population: 20,
        size: 675,
        cost: 5000,
        speed: 2.5,
        turnSpeed: .0075,
        shield: 8250,
        shieldRegen: 8.25,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 4; i++) {
                output.push({
                    x: -.3,
                    y: -.4 - .075 * i,
                    weapon: i % 2 ? weapons[`${options.color}_OCTUPLE_TURBOLASER_CANNON_HEAVY`] : weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .3,
                    y: -.4 - .075 * i,
                    weapon: i % 2 ? weapons[`${options.color}_OCTUPLE_TURBOLASER_CANNON_HEAVY`] : weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: 0,
                    y: .3 - .1 * i,
                    weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
                    shotsAtOnce: 2,
                    shotDelay: 50
                });
            }

            for (let i = 0; i < 8; i++) {
                output.push({
                    x: -.075 - .07 * i,
                    y: .7 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_LASER_CANNON`],
                    shotsAtOnce: 2,
                    shotDelay: 60
                }, {
                    x: .075 + .07 * i,
                    y: .7 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_LASER_CANNON`],
                    shotsAtOnce: 2,
                    shotDelay: 60
                });
            }

            for (let i = 0; i < output.length; i++) {
                output[i].weapon = {
                    ...output[i].weapon,
                    health: output[i].weapon.health * 2.8 | 0,
                    reload: output[i].weapon.reload * .85 | 0
                };
            }

            return output;
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 10,
            reserveSize: 3,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 10,
            reserveSize: 3,
            squadronKey: options.interceptor
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 10,
            reserveSize: 3,
            squadronKey: options.bomber
        }]
    };
}

templates.ALLEGIANCE_BATTLECRUISER = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Allegiance Battlecruiser",
        asset: "ALLEGIANCE.png",
        classification: shipTypes.Capital,
        population: 45,
        size: 1200,
        cost: 9500,
        speed: 1.9,
        turnSpeed: .002,
        shield: 12000,
        shieldRegen: 12,
        hardpoints: (function () {
            const output = [{
                x: 0,
                y: .975,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 5,
                shotDelay: 80
            }];

            for (let i = 0; i < 6; i++) {
                output.push({
                    x: -.37 - .02 * i,
                    y: -.37 - .07 * i,
                    weapon: weapons[`${options.color}_OCTUPLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .37 + .02 * i,
                    y: -.37 - .07 * i,
                    weapon: weapons[`${options.color}_OCTUPLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            for (let i = 0; i < 16; i++) {
                output.push({
                    x: -.075 - .0325 * i,
                    y: .75 - .1 * i,
                    weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .075 + .0325 * i,
                    y: .75 - .1 * i,
                    weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            for (let i = 0; i < 4; i++) {
                output.push({
                    x: 0,
                    y: .25 - .05 * i,
                    weapon: i % 2 ? weapons[`${options.color}_OCTUPLE_TURBOLASER_CANNON`] : weapons.ION_CANNON_ULTRA
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3.25 | 0,
                    reload: e.weapon.reload * .6 | 0,
                    range: e.weapon.range * 2 | 0
                }
            }));
        })()
    };
}

templates.VICTORY_STAR_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter = "TIEFIGHTER_EMPIRE";
    options.bomber = "TIEBOMBER_EMPIRE";

    return {
        name: "Victory-I Star Destroyer",
        asset: "VICTORYSTARDESTROYER.png",
        classification: shipTypes.Capital,
        population: 17,
        size: 400,
        cost: 3100,
        speed: 2.5,
        turnSpeed: .015,
        shield: 7000,
        shieldRegen: 7,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 3; i++) {
                output.push({
                    x: -.3,
                    y: -.4 - .1 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .3,
                    y: -.4 - .1 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            for (let i = 0; i < 4; i++) {
                output.push({
                    x: -.525 - .0334 * i,
                    y: -.25 - .15 * i,
                    weapon: weapons.ASSAULT_PROTON_ROCKET,
                    shotsAtOnce: 8,
                    shotDelay: 100,
                    launchAngle: -Math.PI / 2 + Math.PI / 6
                }, {
                    x: .525 + .0334 * i,
                    y: -.25 - .15 * i,
                    weapon: weapons.ASSAULT_PROTON_ROCKET,
                    shotsAtOnce: 8,
                    shotDelay: 100,
                    launchAngle: Math.PI / 2 - Math.PI / 6
                }, {
                    x: -.05 - .05 * i,
                    y: .8 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .05 + .05 * i,
                    y: .8 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 2.25 | 0
                }
            }))
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 8,
            reserveSize: 3,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 8,
            reserveSize: 3,
            squadronKey: options.bomber
        }]
    };
}

templates.CRIMSON_VICTORY_STAR_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter = "TIEFIGHTER_EMPIRE";
    options.interceptor = "TIEINTERCEPTOR_EMPIRE";

    return {
        name: "Crimson Victory-II Star Destroyer",
        asset: "CRIMSONVICTORY.png",
        classification: shipTypes.Capital,
        population: 16,
        size: 400,
        cost: 3300,
        speed: 2.65,
        turnSpeed: .0175,
        shield: 7500,
        shieldRegen: 7.5,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 3; i++) {
                output.push({
                    x: -.3,
                    y: -.4 - .1 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .3,
                    y: -.4 - .1 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            for (let i = 0; i < 4; i++) {
                output.push({
                    x: -.525 - .0334 * i,
                    y: -.25 - .15 * i,
                    weapon: i % 2 ? weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`] : weapons.SIEGE_CONCUSSION_MISSILE,
                    shotsAtOnce: i % 2 ? 2 : 8,
                    shotDelay: 100,
                    launchAngle: i % 2 ? undefined : (-Math.PI / 2 + Math.PI / 6)
                }, {
                    x: .525 + .0334 * i,
                    y: -.25 - .15 * i,
                    weapon: i % 2 ? weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`] : weapons.SIEGE_CONCUSSION_MISSILE,
                    shotsAtOnce: i % 2 ? 2 : 8,
                    shotDelay: 100,
                    launchAngle: i % 2 ? undefined : (Math.PI / 2 - Math.PI / 6)
                }, {
                    x: -.05 - .05 * i,
                    y: .8 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .05 + .05 * i,
                    y: .8 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 2.25 | 0
                }
            }))
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 8,
            reserveSize: 3,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 8,
            reserveSize: 3,
            squadronKey: options.interceptor
        }]
    };
}

templates.AGGRESSOR_STAR_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";

    options.interceptor = "TIEFIGHTER_EMPIRE";
    options.bomber = "TIEBOMBER_EMPIRE";

    return {
        name: "Aggressor Star Destroyer",
        asset: "AGGRESSORSTARDESTROYER.png",
        classification: shipTypes.Capital,
        population: 30,
        size: 750,
        cost: 5100,
        speed: 3,
        turnSpeed: .01,
        shield: 7000,
        shieldRegen: 7,
        hardpoints: (function () {
            const output = [{
                x: 0,
                y: .95,
                weapon: weapons[`${options.color}_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD`]
            }, {
                x: 0,
                y: .95,
                weapon: weapons.ION_CANNON_ULTRA
            }];

            for (let i = 0; i < 5; i++) {
                output.push({
                    x: -.375 + .04 * i,
                    y: -.15 * i,
                    weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                }, {
                    x: .375 - .035 * i,
                    y: -.15 * i,
                    weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }

            for (let i = 0; i < 6; i++) {
                output.push({
                    x: -.075,
                    y: .5 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`]
                }, {
                    x: .075,
                    y: .5 - .2 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`]
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 1.8 | 0,
                    range: e.weapon.range * 2 | 0,
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: options.interceptor
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: options.bomber
        }]
    };
}

templates.SORONNAN_STAR_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter = "TIEFIGHTER_EMPIRE";
    options.interceptor = "TIEREAPER_EMPIRE";
    options.bomber = "TIEPUNISHER_EMPIRE";
    options.specialist = "TIEDEFENDER_EMPIRE";

    return {
        name: "Soronnan Star Destroyer",
        asset: "SORONNAN.png",
        classification: shipTypes.Capital,
        population: 60,
        size: 1200,
        cost: 13000,
        speed: 1,
        turnSpeed: .001,
        shield: 27500,
        shieldRegen: 27.5,
        hardpoints: [{
            x: -.048,
            y: .795,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .042,
            y: .797,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: .471,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .08,
            y: .473,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.087,
            y: .208,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .077,
            y: .208,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.006,
            y: .03,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.006,
            y: -.032,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.186,
            y: -.144,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.135,
            y: -.092,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON_ULTRAHEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .123,
            y: -.093,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON_ULTRAHEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .176,
            y: -.145,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.343,
            y: -.124,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.292,
            y: -.193,
            weapon: weapons.QUAD_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.319,
            y: -.292,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.395,
            y: -.319,
            weapon: weapons.QUAD_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .342,
            y: -.127,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .288,
            y: -.195,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .315,
            y: -.296,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .393,
            y: -.325,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.187,
            y: -.588,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.136,
            y: -.540,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .180,
            y: -.593,
            weapon: weapons[`${options.color}_TRIPLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .126,
            y: -.542,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.006,
            y: -.825,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.006,
            y: -.769,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.051,
            y: -.424,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .041,
            y: -.423,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.043,
            y: .146,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: -.043,
            y: .230,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: -.043,
            y: .301,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: .037,
            y: .301,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: .037,
            y: .232,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: .037,
            y: .147,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 75
        }, {
            x: .281,
            y: .091,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .227,
            y: .287,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .117,
            y: .695,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .065,
            y: .891,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.074,
            y: .891,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.126,
            y: .693,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.234,
            y: .287,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.285,
            y: .091,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 75
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5 | 0,
                reload: e.weapon.reload * 1.5 | 0,
                range: e.weapon.range * 2 | 0,
                speed: e.weapon.speed * 1.5 | 0,
                damage: e.weapon.damage * 1.5 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: options.interceptor
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: options.bomber
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: options.specialist
        }]
    };
}

templates.TORPEDO_SPHERE = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter = "TIEFIGHTER_EMPIRE";

    return {
        name: "Torpedo Sphere",
        asset: "TORPEDOSPHERE.png",
        classification: shipTypes.Capital,
        population: 35,
        size: 1000,
        cost: 10000,
        speed: 1,
        turnSpeed: .002,
        shield: 15000,
        shieldRegen: 15,
        hardpoints: (function () {
            const output = [];

            const points = [{
                x: -.156,
                y: .924
            }, {
                x: -.314,
                y: .826
            }, {
                x: -.435,
                y: .691
            }, {
                x: -.523,
                y: .559
            }, {
                x: -.600,
                y: .357
            }, {
                x: -.644,
                y: .120
            }, {
                x: -.642,
                y: -.094
            }, {
                x: -.600,
                y: -.320
            }, {
                x: -.539,
                y: -.494
            }, {
                x: -.468,
                y: -.612
            }, {
                x: -.347,
                y: -.759
            }, {
                x: -.087,
                y: -.853
            }, {
                x: -.305,
                y: -.600
            }, {
                x: -.424,
                y: -.392
            }, {
                x: -.484,
                y: -.115
            }, {
                x: -.467,
                y: .229
            }, {
                x: -.416,
                y: .391
            }, {
                x: -.279,
                y: .654
            }, {
                x: -.122,
                y: .707
            }, {
                x: -.168,
                y: .213
            }, {
                x: -.154,
                y: -.206
            }, {
                x: -.256,
                y: -.136
            }, {
                x: -.263,
                y: .110
            }, {
                x: -.296,
                y: -.003
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const selections = [
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`], weapons[`${options.color}_RAPID_LASER_CANNON`]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            for (let i = 0; i < 10; i++) {
                output.push({
                    x: Math.cos(i * Math.PI / 5) * .15,
                    y: .8 + Math.sin(i * Math.PI / 5) * .08,
                    weapon: {
                        ...weapons.ASSAULT_PROTON_TORPEDO,
                        explosionRange: 2000,
                        explosionDamage: 7,
                        speed: weapons.ASSAULT_PROTON_TORPEDO.speed * .9 | 0,
                        range: weapons.ASSAULT_PROTON_TORPEDO.range * 3 | 0,
                        reload: weapons.ASSAULT_PROTON_TORPEDO.reload * .65 | 0,
                    },
                    shotsAtOnce: 3,
                    shotDelay: 200 + 75 * i
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3 | 0
                }
            }))
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: options.fighter
        }]
    };
}

templates.IMPERIAL_CARGO_SHIP = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter = "TIEINTERCEPTOR_EMPIRE";

    return {
        name: "Imperial Cargo Ship",
        asset: "IMPERIALCARGOSHIP.png",
        classification: shipTypes.Capital,
        population: 22,
        size: 550,
        cost: 5000,
        speed: 2.5,
        turnSpeed: .01,
        shield: 7000,
        shieldRegen: 7,
        tenderAbility: {
            frequency: 1,
            power: 1
        },
        hardpoints: (function () {
            const output = [];

            const points = [{
                x: -.220,
                y: -.228
            }, {
                x: -.221,
                y: -.283
            }, {
                x: -.220,
                y: -.338
            }, {
                x: -.218,
                y: -.395
            }, {
                x: -.257,
                y: -.256
            }, {
                x: -.258,
                y: -.305
            }, {
                x: -.258,
                y: -.365
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const selections = [
                weapons[`${options.color}_RAPID_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON`],
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_RAPID_LASER_CANNON`],
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.DOUBLE_ION_CANNON
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
                    health: e.weapon.health * 2.5 | 0
                }
            }))
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: options.fighter
        }]
    };
}

templates.DEFENDER_ASSAULT_CARRIER = function (options = {}) {
    options.color ??= "RED";

    options.fighter = "XWING_REBEL";
    options.interceptor = "AWING_REBEL";
    options.bomber = "YWING_REBEL";

    return {
        name: "Defender Assault Carrier",
        asset: "DEFENDER_ASSAULT_CARRIER.png",
        classification: shipTypes.Capital,
        population: 24,
        size: 500,
        cost: 7000,
        speed: 3,
        turnSpeed: .005,
        shield: 6700,
        shieldRegen: 6.7,
        hardpoints: (function () {
            const output = [];

            const points = [{
                x: -.092,
                y: .794
            }, {
                x: -.120,
                y: .669
            }, {
                x: -.147,
                y: .549
            }, {
                x: -.266,
                y: -.195
            }, {
                x: -.375,
                y: -.198
            }, {
                x: -.190,
                y: -.338
            }, {
                x: -.301,
                y: -.759
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const selections = [
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`], weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[`${options.color}_RAPID_LASER_CANNON`], weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons.DOUBLE_ION_CANNON
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
                    health: e.weapon.health * 4 | 0
                }
            }))
        })(),
        hangars: [{
            x: -.5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.fighter
        }, {
            x: -.5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.interceptor
        }, {
            x: -.5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.bomber
        }, {
            x: .5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.fighter
        }, {
            x: .5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.interceptor
        }, {
            x: .5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
            reserveSize: 2,
            squadronKey: options.bomber
        }]
    };
}

templates.MAJESTIC_STAR_CRUISER = function (options = {}) {
    options.color ??= "RED";

    options.interceptor = "AWING_REBEL";

    return {
        name: "Majestic Star Cruiser",
        asset: "MAJESTIC_CRUISER.png",
        classification: shipTypes.Capital,
        population: 24,
        size: 500,
        cost: 7000,
        speed: 3,
        turnSpeed: .005,
        shield: 6700,
        shieldRegen: 6.7,
        hardpoints: (function () {
            const output = [];

            const points = [{
                x: -.069,
                y: .811
            }, {
                x: -.088,
                y: .714
            }, {
                x: -.112,
                y: .601
            }, {
                x: -.115,
                y: .492
            }, {
                x: -.173,
                y: .404
            }, {
                x: -.044,
                y: .146
            }, {
                x: -.077,
                y: -.296
            }, {
                x: -.097,
                y: -.634
            }, {
                x: -.033,
                y: -.642
            }, {
                x: -.586,
                y: -.530
            }, {
                x: -.371,
                y: -.583
            }, {
                x: -.242,
                y: -.608
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const selections = [
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`], weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons.ASSAULT_CONCUSSION_MISSILE,
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons.ASSAULT_CONCUSSION_MISSILE, weapons.ASSAULT_CONCUSSION_MISSILE,
                weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`], weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`]
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
                    health: e.weapon.health * 2.8 | 0
                }
            }))
        })(),
        hangars: [{
            x: -.5,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 12,
            reserveSize: 2,
            squadronKey: options.interceptor
        }]
    };
}


export default templates;