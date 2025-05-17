import { shipTypes } from "../../constants.js";
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

export default templates;