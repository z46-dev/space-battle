import { shipTypes, weaponTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.GLADIATOR = function (options = {}) {
    options.name ??= "Gladiator-class Star Destroyer";
    options.population ??= 20;
    options.cost ??= 3000;
    options.speed ??= 4;
    options.turnSpeed ??= .001;
    options.shield ??= 4650;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.fighter
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: options.bomber
    }];

    return {
        name: options.name,
        asset: "GLADIATOR.png",
        classification: shipTypes.HeavyFrigate,
        population: options.population,
        size: 425,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = {
                main: [{
                    x: -.309,
                    y: .109
                }, {
                    x: -.312,
                    y: -.106
                }, {
                    x: -.317,
                    y: -.334
                }],
                aux: [{
                    x: -.601,
                    y: -.674
                }, {
                    x: -.510,
                    y: -.320
                }, {
                    x: -.469,
                    y: -.019
                }, {
                    x: -.399,
                    y: .404
                }, {
                    x: -.347,
                    y: .758
                }],
                torpedo: [{
                    x: -.117,
                    y: .701
                }, {
                    x: -.044,
                    y: .700
                }]
            };

            for (const key in points) {
                for (let i = 0, n = points[key].length; i < n; i++) {
                    points[key].push({
                        x: -points[key][i].x,
                        y: points[key][i].y
                    });
                }
            }

            const output = [];

            for (let i = 0; i < points.main.length; i++) {
                output.push({
                    ...points.main[i],
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 300
                });
            }

            for (let i = 0; i < points.aux.length; i++) {
                output.push({
                    ...points.aux[i],
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 150
                });
            }

            for (let i = 0; i < points.torpedo.length; i++) {
                output.push({
                    ...points.torpedo[i],
                    weapon: weapons.ASSAULT_PROTON_TORPEDO,
                    shotsAtOnce: 4,
                    shotDelay: 1000
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 1.85 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.DREADNOUGHTHEAVYCRUISER = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEINTERCEPTOR_EMPIRE";

    return {
        name: "Dreadnought Heavy Cruiser",
        asset: "DREADNOUGHTHEAVYCRUISER.png",
        classification: shipTypes.HeavyFrigate,
        population: 14,
        size: 350,
        cost: 3000,
        speed: 3,
        turnSpeed: .015,
        shield: 6500,
        shieldRegen: 6.5,
        hardpoints: [{
            x: -.075,
            y: .8,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .075,
            y: .8,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.2,
            y: -.8,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .2,
            y: -.8,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.125,
            y: .4,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .125,
            y: .4,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.15,
            y: -.4,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .15,
            y: -.4,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.175,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .175,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }].map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0,
                reload: e.weapon.reload * .6 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: -.8,
            maxSquadrons: 1,
            squadronSize: 8,
            reserveSize: 2,
            squadronKey: options.fighter
        }]
    };
}

templates.ARQUITENS = function (options = {}) {
    options.color ??= "GREEN";

    return {
        name: "Arquitens-class Light Cruiser",
        asset: "ARQUITENS.png",
        classification: shipTypes.HeavyFrigate,
        population: 12,
        size: 315,
        cost: 1100,
        speed: 5,
        turnSpeed: .0175,
        shield: 3230,
        shieldRegen: 3.23,
        hardpoints: [{
            x: -.225,
            y: .275,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: .225,
            y: .275,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.275,
            y: -.125,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .275,
            y: -.125,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: 0,
            y: .6,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 75
        }, {
            x: -.3,
            y: -.25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .3,
            y: -.25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 75
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3.25 | 0
            }
        }))
    };
}

templates.ACCLIMATOR = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";

    return {
        name: "Acclimator-class Assault Cruiser",
        asset: "ACCLIMATOR.png",
        classification: shipTypes.HeavyFrigate,
        population: 14,
        size: 320,
        cost: 2500,
        speed: 3,
        turnSpeed: .01,
        shield: 5500,
        shieldRegen: 5.5,
        hardpoints: (function () {
            const output = [{
                x: 0,
                y: .85,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 5,
                shotDelay: 100
            }, {
                x: -.55,
                y: -.35,
                weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .55,
                y: -.35,
                weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
                shotsAtOnce: 2,
                shotDelay: 100
            }];

            for (let i = 0; i < 4; i++) {
                output.push({
                    x: -.2 - .1 * i,
                    y: .6 - .225 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 80
                }, {
                    x: .2 + .1 * i,
                    y: .6 - .225 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                    shotsAtOnce: 2,
                    shotDelay: 80
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    reload: e.weapon.reload * .85,
                    health: e.weapon.health * 3.5 | 0
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

templates.IMPERIAL_II = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";

    return {
        name: "Imperial II Frigate",
        asset: "IMPERIAL_II_FRIGATE.png",
        classification: shipTypes.HeavyFrigate,
        population: 18,
        size: 400,
        cost: 2750,
        speed: 3,
        turnSpeed: .005,
        shield: 5500,
        shieldRegen: 5.5,
        hardpoints: (() => {
            const points = [{
                x: -.035,
                y: .839
            }, {
                x: -.089,
                y: .666
            }, {
                x: -.137,
                y: .535
            }, {
                x: -.216,
                y: .322
            }, {
                x: -.245,
                y: .243
            }, {
                x: -.333,
                y: -.016
            }, {
                x: -.367,
                y: -.084
            }, {
                x: -.498,
                y: -.446
            }, {
                x: -.224,
                y: -.445
            }, {
                x: -.225,
                y: -.343
            }, {
                x: -.186,
                y: -.015
            }, {
                x: -.111,
                y: .098
            }, {
                x: -.102,
                y: .301
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selection = [
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`], weapons.DOUBLE_ION_CANNON,
                weapons.DOUBLE_ION_CANNON_MEDIUM, weapons[`${options.color}_RAPID_LASER_CANNON`],
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`], weapons.DOUBLE_ION_CANNON,
                weapons.DOUBLE_ION_CANNON_MEDIUM, weapons[`${options.color}_RAPID_LASER_CANNON`]
            ];

            for (let i = 0, n = points.length; i < n; i++) {
                const weapon = selection[i % selection.length];
                output.push({
                    ...points[i],
                    weapon: {
                        ...weapon,
                        health: weapon.health * 3.5 | 0
                    },
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            return output;
        })()
    };
}

templates.IMOBILIZER_418 = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";

    return {
        name: "Imobilizer 418 Cruiser",
        asset: "IMOBILIZER.png",
        classification: shipTypes.HeavyFrigate,
        population: 16,
        size: 325,
        cost: 2650,
        speed: 3,
        turnSpeed: .015,
        shield: 6500,
        shieldRegen: 6.5,
        hardpoints: [{
            x: -.1,
            y: .275,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: .1,
            y: .275,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: -.2,
            y: -.25,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: .2,
            y: -.25,
            weapon: weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: -.35,
            y: -.725,
            weapon: weapons.ION_CANNON_MEDIUM,
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: .35,
            y: -.725,
            weapon: weapons.ION_CANNON_MEDIUM,
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: 0,
            y: .75,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 5,
            shotDelay: 100
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3.5 | 0
            }
        })),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 12,
            reserveSize: 2,
            squadronKey: options.fighter
        }]
    };
}

templates.VINDICATOR = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";

    return {
        name: "Vindicator-class Frigate",
        asset: "VINDICATOR.png",
        classification: shipTypes.HeavyFrigate,
        population: 14,
        size: 325,
        cost: 2700,
        speed: 3,
        turnSpeed: .015,
        shield: 5000,
        shieldRegen: 5,
        hardpoints: (function () {
            const points = [{
                x: -.065,
                y: .759
            }, {
                x: -.194,
                y: .224
            }, {
                x: -.312,
                y: -.281
            }, {
                x: -.445,
                y: -.791
            }, {
                x: -.255,
                y: -.510
            }, {
                x: -.285,
                y: -.169
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[`${options.color}_QUAD_LASER_CANNON`], weapons[`${options.color}_QUAD_TURBOLASER_CANNON`],
                weapons.QUAD_ION_CANNON, weapons[`${options.color}_RAPID_LASER_CANNON`]
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
                    health: e.weapon.health * 2.75 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 4,
            reserveSize: 6,
            squadronKey: options.fighter
        }]
    };
}

templates.PURSUIT_DESTROYER = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Pursuit Destroyer",
        asset: "PURSUIT.png",
        classification: shipTypes.HeavyFrigate,
        population: 18,
        size: 325,
        cost: 2700,
        speed: 3,
        turnSpeed: .015,
        shield: 5000,
        shieldRegen: 5,
        hardpoints: (function () {
            const points = [{
                x: -.282,
                y: .138
            }, {
                x: -.397,
                y: -.477
            }, {
                x: -.336,
                y: .614
            }, {
                x: -.274,
                y: .895
            }, {
                x: -.104,
                y: -.074
            }, {
                x: -.087,
                y: .521
            }, {
                x: .237,
                y: .528
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`],

                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons.DOUBLE_ION_CANNON,
                weapons[`${options.color}_RAPID_LASER_CANNON`], weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`], weapons.DOUBLE_ION_CANNON_MEDIUM
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
                    health: e.weapon.health * 2.75 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 4,
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

templates.RECUSANT_DESTROYER = function (options = {}) {
    options.color ??= "RED";

    return {
        name: "Recusant Light Destroyer",
        asset: "RECUSANT.png",
        classification: shipTypes.HeavyFrigate,
        population: 14,
        size: 500,
        cost: 2400,
        speed: 3.4,
        turnSpeed: .01,
        shield: 3200,
        shieldRegen: 3.2,
        hardpoints: [{
            x: 0,
            y: .9,
            weapon: weapons[`${options.color}_TURBOLASER_CANNON_ULTRAHEAVY`],
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            x: -.03,
            y: .825,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .03,
            y: .825,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.06,
            y: .7,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .06,
            y: .7,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.075,
            y: .55,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .075,
            y: .55,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: -.075,
            y: .35,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 65
        }, {
            x: .075,
            y: .35,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 65
        }, {
            x: -.06,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 80
        }, {
            x: .06,
            y: 0,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON_HEAVY`],
            shotsAtOnce: 2,
            shotDelay: 80
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 2 | 0
            }
        }))
    };
}

templates.SABOATH_DESTROYER = function (options = {}) {
    options.color ??= "RED";

    options.fighter ??= "VULTUREDROID_CIS";

    return {
        name: "Saboath Destroyer Destroyer",
        asset: "SABOATHDESTROYER.png",
        classification: shipTypes.HeavyFrigate,
        population: 18,
        size: 335,
        cost: 2670,
        speed: 3,
        turnSpeed: .015,
        shield: 3500,
        shieldRegen: 3.5,
        hardpoints: [{
            x: -.1125,
            y: .875,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1125,
            y: .875,
            weapon: weapons[`${options.color}_DOUBLE_TURBOLASER_CANNON`],
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1125,
            y: .675,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 65
        }, {
            x: .1125,
            y: .675,
            weapon: weapons[`${options.color}_QUAD_LASER_CANNON`],
            shotsAtOnce: 3,
            shotDelay: 65
        }, {
            x: -.1125,
            y: .475,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1125,
            y: .475,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.3125,
            y: -.675,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 50
        }, {
            x: .3,
            y: -.675,
            weapon: weapons[`${options.color}_ANTI_FIGHTER_LASER_CANNON`],
            shotsAtOnce: 4,
            shotDelay: 50
        }, {
            x: -.25,
            y: .3,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: -.3,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: -.35,
            y: -.1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .25,
            y: .3,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .3,
            y: .1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: .35,
            y: -.1,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }].map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 1.45 | 0
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

templates.ASSAULT_FRIGATE_MK2 = function (options = {}) {
    options.color ??= "RED";

    options.fighter ??= "XWING_REBEL";

    return {
        name: "Assault Frigate Mk. II",
        asset: "ASSAULT_FRIGATE_MK2.png",
        classification: shipTypes.HeavyFrigate,
        population: 16,
        size: 400,
        cost: 4000,
        speed: 4,
        turnSpeed: .02,
        shield: 3000,
        shieldRegen: 3,
        hardpoints: (function () {
            const points = [{
                x: -.104,
                y: .839
            }, {
                x: -.166,
                y: .522
            }, {
                x: -.170,
                y: -.022
            }, {
                x: -.278,
                y: .281
            }, {
                x: -.352,
                y: -.112
            }, {
                x: -.316,
                y: -.444
            }, {
                x: -.571,
                y: -.092
            }, {
                x: -.151,
                y: -.378
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[`${options.color}_DOUBLE_LASER_CANNON`], weapons[`${options.color}_DOUBLE_LASER_CANNON_HEAVY`],
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons.ASSAULT_CONCUSSION_MISSILE, weapons.ASSAULT_PROTON_TORPEDO
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: (() => {
                        switch (selections[i % selections.length].type) {
                            case weaponTypes.AssaultProtonTorpedo:
                                return 8;
                            case weaponTypes.ConcussionMissile:
                                return 6;
                        }

                        return 2;
                    })(),
                    shotDelay: 225
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3 | 0
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

templates.DAUNTLESS_CRUISER = function (options = {}) {
    options.color ??= "RED";

    options.fighter ??= "AWING_REBEL";

    return {
        name: "Dauntless-class Heavy Cruiser",
        asset: "DAUNTLESS.png",
        classification: shipTypes.HeavyFrigate,
        population: 20,
        size: 550,
        cost: 6000,
        speed: 3,
        turnSpeed: .01,
        shield: 4000,
        shieldRegen: 4,
        hardpoints: (function () {
            const points = [{
                x: -.066,
                y: .871
            }, {
                x: -.062,
                y: .561
            }, {
                x: -.182,
                y: .351
            }, {
                x: -.187,
                y: .336
            }, {
                x: -.188,
                y: .319
            }, {
                x: -.186,
                y: .000
            }, {
                x: -.151,
                y: -.410
            }, {
                x: -.092,
                y: -.875
            }, {
                x: -.113,
                y: -.235
            }, {
                x: -.044,
                y: .021
            }, {
                x: -.047,
                y: .121
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`], weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`],
                weapons[`${options.color}_QUAD_LASER_CANNON_HEAVY`], weapons[`${options.color}_QUAD_TURBOLASER_CANNON_HEAVY`],
                weapons.QUAD_ION_CANNON_MEDIUM, weapons.QUAD_ION_CANNON_HEAVY
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3 | 0
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

export default templates;