import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.EXECUTORSUPERSTARDESTROYER = function (options = {}) {
    options.name ??= "Executor-Class Super Star Destroyer";
    options.population ??= 130;
    options.cost ??= 53000;
    options.speed ??= 2;
    options.turnSpeed ??= .00015;
    options.shield ??= 87500;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "SSD.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 8000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 13; i++) {
                output.push({
                    x: -.02 - .0225 * i,
                    y: .8 - .1 * i,
                    weapon: weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 250
                }, {
                    x: .04 + .02 * i,
                    y: .8 - .1 * i,
                    weapon: weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 250
                }, {
                    x: -.01 - .0225 * i,
                    y: .85 - .1 * i,
                    weapon: weapons.QUAD_ION_CANNON,
                    shotsAtOnce: 3,
                    shotDelay: 250
                }, {
                    x: .03 + .02 * i,
                    y: .85 - .1 * i,
                    weapon: weapons.QUAD_ION_CANNON,
                    shotsAtOnce: 3,
                    shotDelay: 250
                }, {
                    x: -.025 - .0225 * i,
                    y: .8 - .1 * i,
                    weapon: i % 2 ? weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"] : weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 3,
                    shotDelay: 250
                }, {
                    x: .025 + .02 * i,
                    y: .8 - .1 * i,
                    weapon: i % 2 ? weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"] : weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 3,
                    shotDelay: 250
                });
            }

            for (let i = -4; i < 12; i++) {
                output.push({
                    x: -.055 - .01 * i,
                    y: .4 - .075 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: .075 + .00825 * i,
                    y: .4 - .075 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: -.08 - .015 * i,
                    y: .4 - .075 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: .09 + .0125 * i,
                    y: .4 - .075 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });

                i += .5;

                output.push({
                    x: -.055 - .01 * i,
                    y: .4 - .075 * i,
                    weapon: (i | 0) % 2 ? weapons[options.color + "_DOUBLE_LASER_CANNON"] : weapons.DOUBLE_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: .075 + .00825 * i,
                    y: .4 - .075 * i,
                    weapon: (i | 0) % 2 ? weapons[options.color + "_DOUBLE_LASER_CANNON"] : weapons.DOUBLE_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: -.08 - .01 * i,
                    y: .4 - .075 * i,
                    weapon: (i | 0) % 2 ? weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"] : weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                }, {
                    x: .09 + .00825 * i,
                    y: .4 - .075 * i,
                    weapon: (i | 0) % 2 ? weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"] : weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });

                i |= 0;
            }

            for (let i = 0; i < 8; i++) {
                output.push({
                    x: -.13 + .0075 * i,
                    y: -.475 - .0667 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: -.1 + .0075 * i,
                    y: -.5 - .0667 * i,
                    weapon: weapons.OCTUPLE_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: .13 - .0075 * i,
                    y: -.475 - .0667 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: .1 - .0075 * i,
                    y: -.5 - .0667 * i,
                    weapon: weapons.OCTUPLE_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 300
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 5 | 0,
                    range: e.weapon.range * 1.334 | 0,
                    reload: e.weapon.reload * .85 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.BELLATORSUPERSTARDESTROYER = function (options = {}) {
    options.name ??= "Bellator-Class Star Dreadnought";
    options.population ??= 90;
    options.cost ??= 37500;
    options.speed ??= 3;
    options.turnSpeed ??= .0005;
    options.shield ??= 65750;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "BELLATOR.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 5000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 14; i++) {
                output.push({
                    x: -.02 - .02 * i,
                    y: .8 - .1 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"]
                }, {
                    x: .02 + .02 * i,
                    y: .8 - .1 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"]
                }, {
                    x: -.005 - .02 * i,
                    y: .85 - .1 * i,
                    weapon: weapons.OCTUPLE_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .005 + .02 * i,
                    y: .85 - .1 * i,
                    weapon: weapons.OCTUPLE_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: -.02 - .02 * i,
                    y: .85 - .1 * i,
                    weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .02 + .02 * i,
                    y: .85 - .1 * i,
                    weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            for (let i = 0; i < 6; i++) {
                output.push({
                    x: 0,
                    y: .15 - .03 * i,
                    weapon: weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"]
                }, {
                    x: -.05,
                    y: .3 - .1 * i,
                    weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 3,
                    shotDelay: 80
                }, {
                    x: .05,
                    y: .3 - .1 * i,
                    weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 3,
                    shotDelay: 80
                });
            }

            for (let i = 0; i < 8; i++) {
                output.push({
                    x: -.1 - .02 * i,
                    y: .1 - .1 * i,
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 100
                }, {
                    x: .1 + .02 * i,
                    y: .1 - .1 * i,
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 3,
                    shotDelay: 100
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 4.5 | 0,
                    range: e.weapon.range * 1.45 | 0,
                    reload: e.weapon.reload * .85 | 0,
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.ASSERTORSTARDREADNOUGHT = function (options = {}) {
    options.name ??= "Assertor-Class Star Dreadnought";
    options.population ??= 250;
    options.cost ??= 70000;
    options.speed ??= 1.5;
    options.turnSpeed ??= .0001;
    options.shield ??= 175000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "TIEBOMBER_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "ASSERTOR.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 8000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 36; i++) {
                output.push({
                    x: -.03 - .0115 * i,
                    y: .9 - .035 * i,
                    weapon: weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: .03 + .0115 * i,
                    y: .9 - .035 * i,
                    weapon: weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: -.02 - .0115 * i,
                    y: .85 - .035 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .02 + .0115 * i,
                    y: .85 - .035 * i,
                    weapon: weapons[options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: -.01 - .0115 * i,
                    y: .9 - .035 * i,
                    weapon: weapons.ION_CANNON_ULTRA,
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .01 + .0115 * i,
                    y: .9 - .035 * i,
                    weapon: weapons.ION_CANNON_ULTRA,
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: -.01 - .0115 * i,
                    y: .85 - .035 * i,
                    weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .01 + .0115 * i,
                    y: .85 - .035 * i,
                    weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: -.1,
                    y: .45 - .035 * i,
                    weapon: i % 2 ? weapons.OCTUPLE_ION_CANNON_HEAVY : weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 4,
                    shotDelay: 80
                }, {
                    x: .1,
                    y: .45 - .035 * i,
                    weapon: i % 2 ? weapons.OCTUPLE_ION_CANNON_HEAVY : weapons.ASSAULT_CONCUSSION_MISSILE,
                    shotsAtOnce: 4,
                    shotDelay: 80
                });
            }

            for (let i = 0; i < 12; i++) {
                output.push({
                    x: -.002,
                    y: .3 - .05 * i,
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                }, {
                    x: .002,
                    y: .3 - .05 * i,
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 3.5 | 0,
                    range: e.weapon.range * 1.334 | 0,
                    reload: e.weapon.reload * .65 | 0,
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.MEGASTARDESTROYER = function (options = {}) {
    options.name ??= "Mega-Class Star Destroyer";
    options.population ??= 800;
    options.cost ??= 150000;
    options.speed ??= 1;
    options.turnSpeed ??= .00001;
    options.shield ??= 600000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 12,
        squadronSize: 6,
        reserveSize: 1e10,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 12,
        squadronSize: 6,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "MEGASTARDESTROYER.png",
        classification: shipTypes.SpaceStation,
        population: options.population,
        size: 30000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];
            const types = [options.color + "_TURBOLASER_CANNON_ULTRAHEAVY", options.color + "_OCTUPLE_TURBOLASER_CANNON_HEAVY", "ION_CANNON_ULTRA"];
            const types2 = [options.color + "_DOUBLE_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", options.color + "_DOUBLE_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"];
            const types3 = ["ASSAULT_CONCUSSION_MISSILE", "ASSAULT_PROTON_ROCKET", "ASSAULT_PROTON_TORPEDO"];

            for (const type of [types, types2, types3].flat()) {
                if (!weapons[type]) {
                    console.warn(`Weapon ${type} not found`);
                }
            }

            for (let i = 0; i < 64; i++) {
                output.push({
                    x: .015 + .015 * i,
                    y: .225 - .0045 * i,
                    weapon: {
                        ...weapons[types[i % types.length]],
                        range: weapons[types[i % types.length]].range * 2.5
                    },
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: -.015 - .015 * i,
                    y: .225 - .0045 * i,
                    weapon: {
                        ...weapons[types[i % types.length]],
                        range: weapons[types[i % types.length]].range * 2.5
                    },
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .015 + .015 * i,
                    y: .125 - .003 * i,
                    weapon: {
                        ...weapons[types2[i % types2.length]],
                        range: weapons[types2[i % types2.length]].range * 2.5
                    },
                    shotsAtOnce: 2,
                    shotDelay: 75
                }, {
                    x: -.015 - .015 * i,
                    y: .125 - .003 * i,
                    weapon: {
                        ...weapons[types2[i % types2.length]],
                        range: weapons[types2[i % types2.length]].range * 2.5
                    },
                    shotsAtOnce: 2,
                    shotDelay: 75
                });

                if (i % 8 === 0) {
                    output.push({
                        x: .015 + .015 * i,
                        y: .225 - .0045 * i,
                        weapon: {
                            ...weapons[types[i % types.length]],
                            range: weapons[types[i % types.length]].range * 2.5
                        }
                    }, {
                        x: -.015 - .015 * i,
                        y: .225 - .0045 * i,
                        weapon: {
                            ...weapons[types[i % types.length]],
                            range: weapons[types[i % types.length]].range * 2.5
                        }
                    });
                }
            }

            for (let i = 0; i < 16; i++) {
                output.push({
                    x: -.1,
                    y: .175 - .02 * i,
                    weapon: {
                        ...weapons[types3[i % types3.length]],
                        range: weapons[types3[i % types3.length]].range * 2.5,
                        bypassShield: false
                    },
                    shotsAtOnce: 2,
                    shotDelay: 200
                }, {
                    x: .1,
                    y: .175 - .02 * i,
                    weapon: {
                        ...weapons[types3[i % types3.length]],
                        range: weapons[types3[i % types3.length]].range * 2.5,
                        bypassShield: false
                    },
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            return output.map(hp => ({
                ...hp,
                weapon: {
                    ...hp.weapon,
                    health: hp.weapon.health * 4 | 0,
                    range: hp.weapon.range * 2 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.LEGATORSTARDREADNOUGHT = function (options = {}) {
    options.name ??= "Legator-Class Star Dreadnought";
    options.population ??= 110;
    options.cost ??= 33000;
    options.speed ??= 1.8;
    options.turnSpeed ??= .00045;
    options.shield ??= 60000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEBOMBER_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "LEGATORSTARDREADNOUGHT.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 4500,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 19; i++) {
                output.push({
                    x: -.025 - .02 * i,
                    y: .9 - .07 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .0175 + .02 * i,
                    y: .9 - .07 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: -.0175 - .02 * i,
                    y: .95 - .07 * i,
                    weapon: weapons.QUAD_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .025 + .02 * i,
                    y: .95 - .07 * i,
                    weapon: weapons.QUAD_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            for (let i = 0; i < 12; i++) {
                output.push({
                    x: -.385 + .0225 * i,
                    y: -.385 - .0475 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .385 - .0225 * i,
                    y: -.385 - .0475 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: -.325 + .0225 * i,
                    y: -.45 - .0475 * i,
                    weapon: weapons.QUAD_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 150
                }, {
                    x: .325 - .0225 * i,
                    y: -.45 - .0475 * i,
                    weapon: weapons.QUAD_ION_CANNON_MEDIUM,
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            function quadBattery(x, y, r, w) {
                const distance = .005;

                for (let i = 0; i < 4; i++) {
                    output.push({
                        x: x + Math.cos(r + Math.PI / 2 * i) * distance,
                        y: y + Math.sin(r + Math.PI / 2 * i) * distance,
                        weapon: w,
                        shotsAtOnce: 2,
                        shotDelay: 75
                    });
                }
            }

            for (let i = 0; i < 20; i++) {
                const x = .01 + .0125 * i;
                const y = .875 - .0725 * i;

                const weaponSelections = [
                    options.color + "_QUAD_TURBOLASER_CANNON_HEAVY",
                    options.color + "_LASER_CANNON",
                    options.color + "_DOUBLE_LASER_CANNON_HEAVY",
                    "ION_CANNON",
                    options.color + "_QUAD_TURBOLASER_CANNON_HEAVY",
                    options.color + "_LASER_CANNON",
                    options.color + "_DOUBLE_LASER_CANNON_HEAVY",
                    "ION_CANNON",
                    options.color + "_ANTI_FIGHTER_LASER_CANNON",
                ].map(e => weapons[e]);

                quadBattery(x, y, Math.PI / 4, weaponSelections[i % weaponSelections.length]);
                quadBattery(-x, y, Math.PI / 4, weaponSelections[i % weaponSelections.length]);
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 2.4 | 0,
                    range: e.weapon.range * 1.334 | 0,
                    reload: e.weapon.reload * .85 | 0,
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.VENGEANCE = function (options = {}) {
    options.name ??= "Vengeance-Class Super Star Destroyer";
    options.population ??= 130;
    options.cost ??= 53000;
    options.speed ??= 2;
    options.turnSpeed ??= .00015;
    options.shield ??= 83200;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEREAPER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEPUNISHER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEDEFENDER_EMPIRE"
    }];

    return {
        name: options.name,
        asset: "VENGEANCE.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 6575,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 16; i++) {
                output.push({
                    x: -.01 - .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .01 + .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: -.005 - .0125 * i,
                    y: .95 - .08 * i,
                    weapon: weapons.QUAD_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .005 + .0125 * i,
                    y: .95 - .08 * i,
                    weapon: weapons.QUAD_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: -.02 - .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .02 + .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                });
            }

            const concussionMissile = {
                weapon: {
                    ...weapons.ASSAULT_CONCUSSION_MISSILE,
                    range: weapons.ASSAULT_CONCUSSION_MISSILE.range * 2 | 0,
                    speed: weapons.ASSAULT_CONCUSSION_MISSILE.speed * 1.5 | 0,
                    reload: weapons.ASSAULT_CONCUSSION_MISSILE.reload * 3 | 0,
                    explosionRadius: weapons.ASSAULT_CONCUSSION_MISSILE.explosionRadius * 5 | 0,
                    maneuverability: 1
                },
                shotsAtOnce: 5,
                shotDelay: 1000
            };

            const laserCannon = {
                weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 75
            };

            const ionCannon = {
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            };

            for (let i = -4; i < 12; i++) {
                output.push({
                    x: -.055 - .0075 * i,
                    y: .4 - .07 * i,
                    ...concussionMissile
                }, {
                    x: .055 + .0075 * i,
                    y: .4 - .07 * i,
                    ...concussionMissile
                }, {
                    x: -.08 - .0075 * i,
                    y: .4 - .07 * i,
                    ...concussionMissile
                }, {
                    x: .08 + .0075 * i,
                    y: .4 - .07 * i,
                    ...concussionMissile
                });

                output.push({
                    x: -.03,
                    y: .4 - .1 * i,
                    ...ionCannon
                }, {
                    x: .03,
                    y: .4 - .1 * i,
                    ...ionCannon
                }, {
                    x: -.02,
                    y: .45 - .1 * i,
                    ...laserCannon
                }, {
                    x: .02,
                    y: .45 - .1 * i,
                    ...laserCannon
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    range: e.weapon.range * 2 | 0,
                    health: e.weapon.health * 3.5 | 0,
                    reload: e.weapon.reload * .9 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.COMPELLOR = function (options = {}) {
    options.name ??= "Compellor-Class Battlecruiser";
    options.population ??= 85;
    options.cost ??= 29500;
    options.speed ??= 3;
    options.turnSpeed ??= .00015;
    options.shield ??= 35000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";
    options.interceptor ??= "TIEINTERCEPTOR_EMPIRE";

    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: options.fighter
    }, {
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
    }];

    return {
        name: options.name,
        asset: "COMPELLOR.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 2800,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.094,
                y: .632
            }, {
                x: -.103,
                y: .598
            }, {
                x: -.110,
                y: .566
            }, {
                x: -.117,
                y: .533
            }, {
                x: -.169,
                y: .336
            }, {
                x: -.176,
                y: .300
            }, {
                x: -.186,
                y: .268
            }, {
                x: -.193,
                y: .238
            }, {
                x: -.244,
                y: .016
            }, {
                x: -.294,
                y: -.169
            }, {
                x: -.367,
                y: -.438
            }, {
                x: -.241,
                y: -.438
            }, {
                x: -.217,
                y: -.361
            }, {
                x: -.166,
                y: -.315
            }, {
                x: -.163,
                y: -.156
            }, {
                x: -.294,
                y: -.135
            }, {
                x: -.279,
                y: -.077
            }, {
                x: -.160,
                y: .401
            }, {
                x: -.145,
                y: .462
            }, {
                x: -.166,
                y: -.069
            }, {
                x: -.156,
                y: -.037
            }, {
                x: -.152,
                y: -.003
            }, {
                x: -.139,
                y: .032
            }, {
                x: -.268,
                y: -.332
            }, {
                x: -.280,
                y: -.364
            }, {
                x: -.288,
                y: -.397
            }, {
                x: -.295,
                y: -.428
            }, /*{
                x: .058,
                y: -.484
            }, */];

            for (let i = 0, n = points.length; i < n; i ++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            points.push({
                x: .000,
                y: .453
            }, {
                x: .000,
                y: .422
            }, {
                x: .000,
                y: .396
            }, {
                x: -.002,
                y: .366
            }, {
                x: -.002,
                y: -.659
            }, {
                x: -.001,
                y: -.900
            }, {
                x: -.001,
                y: -.923
            }, {
                x: .003,
                y: -.969
            });

            const output = [];

            const laserCannon = {
                weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 75
            };

            const ionCannon = {
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            };

            const protonRocket = {
                weapon: weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 2,
                shotDelay: 75
            };

            const turbolaser = {
                weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 150
            };

            const heavyTurbolaser = {
                weapon: weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                shotsAtOnce: 2,
                shotDelay: 300
            };

            const heavyIonCannon = {
                weapon: weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 300
            };

            const selections = [
                laserCannon, protonRocket, ionCannon,
                turbolaser, heavyTurbolaser, heavyIonCannon
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    ...selections[i % selections.length]
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 5.5 | 0,
                    reload: e.weapon.reload * .55 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

export default templates;