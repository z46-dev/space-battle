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
                    maneuverability: 1
                },
                shotsAtOnce: 3,
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
                    range: e.weapon.range * 1.5 | 0,
                    health: e.weapon.health * 3.5 | 0
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

            for (let i = 0, n = points.length; i < n; i++) {
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
                shotsAtOnce: 8,
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
                    reload: e.weapon.reload * .45 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.COMMUNICATIONS_BATTLECRUISER = function (options = {}) {
    options.name ??= "Communications Battlecruiser";
    options.population ??= 50;
    options.cost ??= 18500;
    options.speed ??= 3;
    options.turnSpeed ??= .0005;
    options.shield ??= 35000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    options.hangars ??= [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: options.fighter
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
        asset: "COMMUNICATIONS_BATTLECRUISER.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 1400,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.063,
                y: .717
            }, {
                x: -.076,
                y: .676
            }, {
                x: -.146,
                y: .513
            }, {
                x: -.161,
                y: .468
            }, {
                x: -.196,
                y: .327
            }, {
                x: -.213,
                y: .276
            }, {
                x: -.252,
                y: .131
            }, {
                x: -.266,
                y: .085
            }, {
                x: -.385,
                y: -.148
            }, {
                x: -.399,
                y: -.196
            }, {
                x: -.135,
                y: .357
            }, {
                x: -.168,
                y: .269
            }, {
                x: -.111,
                y: .304
            }, {
                x: -.311,
                y: -.147
            }, {
                x: -.262,
                y: -.116
            }, {
                x: -.283,
                y: -.061
            }, {
                x: -.156,
                y: -.142
            }, {
                x: -.153,
                y: -.199
            }, {
                x: -.159,
                y: -.416
            }, {
                x: -.159,
                y: -.473
            }, {
                x: -.074,
                y: -.713
            }, {
                x: -.076,
                y: -.772
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const laserCannon = {
                weapon: weapons[options.color + "_DOUBLE_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 150
            };

            const ionCannon = {
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            };

            const turbolaser = {
                weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 200
            };

            const heavyIonCannon = {
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 200
            };

            const selections = [laserCannon, ionCannon, turbolaser, heavyIonCannon];

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

templates.PRAETOR_I = function (options = {}) {
    options.name ??= "Praetor Mark I";
    options.population ??= 60;
    options.cost ??= 21000;
    options.speed ??= 2;
    options.turnSpeed ??= .0005;
    options.shield ??= 35000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";

    return {
        name: options.name,
        asset: "PRAETOR.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 3000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.654,
                y: -.631
            }, {
                x: -.651,
                y: -.591
            }, {
                x: -.626,
                y: -.565
            }, {
                x: -.639,
                y: -.494
            }, {
                x: -.610,
                y: -.422
            }, {
                x: -.521,
                y: -.319
            }, {
                x: -.518,
                y: -.281
            }, {
                x: -.495,
                y: -.253
            }, {
                x: -.519,
                y: -.209
            }, {
                x: -.405,
                y: -.043
            }, {
                x: -.402,
                y: -.005
            }, {
                x: -.379,
                y: .022
            }, {
                x: -.406,
                y: .055
            }, {
                x: -.392,
                y: .096
            }, {
                x: -.345,
                y: .204
            }, {
                x: -.288,
                y: .336
            }, {
                x: -.227,
                y: .394
            }, {
                x: -.224,
                y: .431
            }, {
                x: -.200,
                y: .458
            }, {
                x: -.216,
                y: .511
            }, {
                x: -.152,
                y: .556
            }, {
                x: -.148,
                y: .595
            }, {
                x: -.125,
                y: .621
            }, {
                x: -.089,
                y: .808
            }, {
                x: -.122,
                y: .318
            }, {
                x: -.110,
                y: .204
            }, {
                x: -.197,
                y: .116
            }, {
                x: -.175,
                y: .021
            }, {
                x: -.103,
                y: -.117
            }, {
                x: -.269,
                y: -.134
            }, {
                x: -.120,
                y: -.345
            }, {
                x: -.131,
                y: -.309
            }, {
                x: -.122,
                y: -.274
            }, {
                x: -.080,
                y: -.291
            }, {
                x: -.070,
                y: -.453
            }, {
                x: -.038,
                y: -.105
            }, {
                x: -.016,
                y: -.077
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons[options.color + "_TURBOLASER_CANNON_HEAVY"], weapons[options.color + "_TURBOLASER_CANNON_HEAVY"],
                weapons.ION_CANNON_HEAVY, weapons.ION_CANNON_HEAVY,
                weapons[options.color + "_QUAD_LASER_CANNON"], weapons[options.color + "_QUAD_LASER_CANNON"],
                weapons.QUAD_ION_CANNON_MEDIUM, weapons.QUAD_ION_CANNON_MEDIUM
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    x: points[i].x,
                    y: points[i].y,
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 5.25 | 0,
                    reload: e.weapon.reload * .75 | 0
                }
            }));
        })()
    };
}

templates.PRAETOR_II = function (options = {}) {
    options.name ??= "Praetor Mark II";
    options.population ??= 75;
    options.cost ??= 28000;
    options.speed ??= 2;
    options.turnSpeed ??= .0005;
    options.shield ??= 40000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";

    return {
        name: options.name,
        asset: "PRAETOR_II.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 3000,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.120,
                y: .659
            }, {
                x: -.142,
                y: .635
            }, {
                x: -.145,
                y: .599
            }, {
                x: -.192,
                y: .507
            }, {
                x: -.213,
                y: .483
            }, {
                x: -.215,
                y: .447
            }, {
                x: -.359,
                y: .097
            }, {
                x: -.380,
                y: .069
            }, {
                x: -.383,
                y: .034
            }, {
                x: -.468,
                y: -.163
            }, {
                x: -.489,
                y: -.189
            }, {
                x: -.491,
                y: -.225
            }, {
                x: -.588,
                y: -.457
            }, {
                x: -.609,
                y: -.480
            }, {
                x: -.616,
                y: -.517
            }, {
                x: -.260,
                y: -.055
            }, {
                x: -.171,
                y: .095
            }, {
                x: -.189,
                y: .183
            }, {
                x: -.107,
                y: .270
            }, {
                x: -.116,
                y: .375
            }, {
                x: -.105,
                y: -.039
            }, {
                x: -.120,
                y: -.202
            }, {
                x: -.131,
                y: -.233
            }, {
                x: -.120,
                y: -.271
            }, {
                x: -.079,
                y: -.397
            }, {
                x: -.076,
                y: -.226
            }, {
                x: -.039,
                y: -.036
            }, {
                x: -.019,
                y: -.005
            }, {
                x: -.174,
                y: -.546
            }, {
                x: -.457,
                y: -.517
            }, {
                x: -.362,
                y: -.158
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA,
                weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"], weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"],
                weapons[options.color + "_QUAD_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 5.5 | 0,
                    reload: e.weapon.reload * .75 | 0
                }
            }));
        })()
    };
}

templates.PRAETOR_CARRIER = function (options = {}) {
    options.name ??= "Praetor Carrier";
    options.population ??= 75;
    options.cost ??= 28000;
    options.speed ??= 2;
    options.turnSpeed ??= .0005;
    options.shield ??= 40000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";
    options.interceptor ??= "TIEINTERCEPTOR_EMPIRE";
    options.freighter ??= "GUARDIAN_FREIGHTER_EMPIRE";

    options.hangars ??= [{
        x: -.25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.fighter
    }, {
        x: -.25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.interceptor
    }, {
        x: -.25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.bomber
    }, {
        x: .25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.fighter
    }, {
        x: .25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.interceptor
    }, {
        x: .25,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: options.bomber
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 4,
        squadronKey: options.freighter
    }];

    return {
        name: options.name,
        asset: "PRAETOR_CARRIER.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 2500,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.465,
                y: .421
            }, {
                x: -.497,
                y: .388
            }, {
                x: -.493,
                y: .344
            }, {
                x: -.606,
                y: .088
            }, {
                x: -.633,
                y: .052
            }, {
                x: -.633,
                y: .004
            }, {
                x: -.761,
                y: -.298
            }, {
                x: -.792,
                y: -.327
            }, {
                x: -.797,
                y: -.375
            }, {
                x: -.247,
                y: .535
            }, {
                x: -.291,
                y: .751
            }, {
                x: -.220,
                y: .421
            }, {
                x: -.340,
                y: .222
            }, {
                x: -.428,
                y: -.423
            }, {
                x: -.461,
                y: -.031
            }, {
                x: -.132,
                y: .243
            }, {
                x: -.155,
                y: .042
            }, {
                x: -.168,
                y: -.004
            }, {
                x: -.151,
                y: -.055
            }, {
                x: -.101,
                y: -.218
            }, {
                x: -.103,
                y: .008
            }, {
                x: -.050,
                y: .249
            }, {
                x: -.023,
                y: .287
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons.ION_CANNON_ULTRA,
                weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"],
                weapons.QUAD_ION_CANNON_MEDIUM,
                weapons[options.color + "_QUAD_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 7 | 0,
                    reload: e.weapon.reload * .75 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.TAGGE_BATTLECRUISER = function (options = {}) {
    options.name ??= "Tagge Battlecruiser";
    options.population ??= 60;
    options.cost ??= 22000;
    options.speed ??= 1.5;
    options.turnSpeed ??= .001;
    options.shield ??= 25000;
    options.shieldRegen ??= options.shield / 1000;
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";
    options.freighter ??= "GUARDIAN_FREIGHTER_EMPIRE";

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
        squadronSize: 3,
        reserveSize: 4,
        squadronKey: options.freighter
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
        asset: "TAGGE_BATTLECRUISER.png",
        classification: shipTypes.SuperCapital,
        population: options.population,
        size: 1850,
        cost: options.cost,
        speed: options.speed,
        turnSpeed: options.turnSpeed,
        shield: options.shield,
        shieldRegen: options.shieldRegen,
        hardpoints: (function () {
            const points = [{
                x: -.030,
                y: .846
            }, {
                x: -.097,
                y: .611
            }, {
                x: -.100,
                y: .551
            }, {
                x: -.177,
                y: .312
            }, {
                x: -.228,
                y: .229
            }, {
                x: -.275,
                y: .086
            }, {
                x: -.337,
                y: -.105
            }, {
                x: -.336,
                y: -.170
            }, {
                x: -.403,
                y: -.378
            }, {
                x: -.453,
                y: -.551
            }, {
                x: -.501,
                y: -.614
            }, {
                x: -.559,
                y: -.803
            }, {
                x: -.344,
                y: -.869
            }, {
                x: -.263,
                y: -.639
            }, {
                x: -.119,
                y: -.256
            }, {
                x: -.254,
                y: -.305
            }, {
                x: -.151,
                y: .017
            }, {
                x: -.060,
                y: .126
            }, {
                x: -.043,
                y: .450
            }, {
                x: -.144,
                y: -.637
            }, {
                x: -.191,
                y: -.899
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [
                weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                weapons[options.color + "_QUAD_LASER_CANNON"],
                weapons.QUAD_ION_CANNON_MEDIUM
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 10 | 0,
                    reload: e.weapon.reload * .8 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.SECUTOR = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.interceptor ??= "TIEINTERCEPTOR_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";
    options.heavyBomber ??= "TIEPUNISHER_EMPIRE";

    return {
        name: "Secutor-Class Star Destroyer",
        asset: "SECUTOR.png",
        classification: shipTypes.SuperCapital,
        population: 65,
        size: 1334,
        cost: 14000,
        speed: 2,
        turnSpeed: .01,
        shield: 18000,
        shieldRegen: 18,
        hardpoints: (function () {
            const output = [];

            for (let i = 0; i < 20; i++) {
                output.push({
                    x: -.025 - .01 * i,
                    y: .7 - .075 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 60
                }, {
                    x: .025 + .01 * i,
                    y: .7 - .075 * i,
                    weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons[options.color + "_DOUBLE_LASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 60
                }, {
                    x: -.1 - .035 * i,
                    y: .9 - .095 * i,
                    weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 120
                }, {
                    x: .1 + .035 * i,
                    y: .9 - .095 * i,
                    weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 120
                });
            }

            return output.map(hardpoint => ({
                ...hardpoint,
                weapon: {
                    ...hardpoint.weapon,
                    health: hardpoint.weapon.health * 2.5 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 6,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 6,
            squadronKey: options.interceptor
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 6,
            squadronKey: options.bomber
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 6,
            squadronKey: options.heavyBomber
        }]
    };
}

templates.MANDATOR_ONE = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Mandator-I-Class Star Dreadnought",
        asset: "MANDATOR1.png",
        classification: shipTypes.SuperCapital,
        population: 80,
        size: 4500,
        cost: 17500,
        speed: 1,
        turnSpeed: .005,
        shield: 45000,
        shieldRegen: 45,
        hardpoints: (function () {
            const points = [{
                x: -.032,
                y: -.676
            }, {
                x: -.112,
                y: -.593
            }, {
                x: -.057,
                y: -.559
            }, {
                x: -.171,
                y: -.339
            }, {
                x: -.132,
                y: .000
            }, {
                x: -.095,
                y: .601
            }, {
                x: -.122,
                y: .441
            }, {
                x: -.140,
                y: .360
            }, {
                x: -.020,
                y: .929
            }, {
                x: -.056,
                y: .728
            }, {
                x: -.176,
                y: .191
            }, {
                x: -.202,
                y: .058
            }, {
                x: -.220,
                y: -.022
            }, {
                x: -.287,
                y: -.453
            }, {
                x: -.282,
                y: -.426
            }, {
                x: -.287,
                y: -.657
            }, {
                x: -.282,
                y: -.680
            }, {
                x: -.315,
                y: -.555
            }, {
                x: -.266,
                y: -.271
            }, {
                x: -.233,
                y: -.112
            }, {
                x: -.014,
                y: -.330
            }, {
                x: -.075,
                y: -.876
            }, {
                x: -.187,
                y: -.647
            }, {
                x: -.077,
                y: .186
            }, {
                x: -.035,
                y: .501
            }, {
                x: -.020,
                y: .794
            }, {
                x: .000,
                y: .262
            }, {
                x: .000,
                y: .136
            }, {
                x: -.001,
                y: .091
            }, {
                x: -.002,
                y: -.133
            }];

            for (let i = 0, n = points.length - 4; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 7.5 | 0,
                    range: e.weapon.range * 1.5 | 0,
                    reload: e.weapon.reload * .75 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 6,
            squadronKey: options.bomber
        }]
    };
}

templates.MANDATOR_TWO = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Mandator-II-Class Star Dreadnought",
        asset: "MANDATOR2.png",
        classification: shipTypes.SuperCapital,
        population: 110,
        size: 4500,
        cost: 20000,
        speed: 1.5,
        turnSpeed: .0075,
        shield: 60000,
        shieldRegen: 60,
        hardpoints: (function () {
            const points = [{
                x: -.029,
                y: -.745
            }, {
                x: -.030,
                y: -.676
            }, {
                x: -.054,
                y: -.560
            }, {
                x: -.129,
                y: -.580
            }, {
                x: -.211,
                y: -.463
            }, {
                x: -.169,
                y: -.338
            }, {
                x: -.055,
                y: -.228
            }, {
                x: -.169,
                y: -.122
            }, {
                x: -.105,
                y: -.088
            }, {
                x: -.134,
                y: .002
            }, {
                x: -.283,
                y: -.679
            }, {
                x: -.288,
                y: -.655
            }, {
                x: -.287,
                y: -.451
            }, {
                x: -.282,
                y: -.427
            }, {
                x: -.277,
                y: -.402
            }, {
                x: -.272,
                y: -.378
            }, {
                x: -.267,
                y: -.357
            }, {
                x: -.262,
                y: -.331
            }, {
                x: -.166,
                y: .128
            }, {
                x: -.162,
                y: .153
            }, {
                x: -.067,
                y: .305
            }, {
                x: -.077,
                y: .354
            }, {
                x: -.051,
                y: .469
            }, {
                x: -.042,
                y: .507
            }, {
                x: -.052,
                y: -.862
            }, {
                x: -.174,
                y: -.644
            }, {
                x: -.247,
                y: -.559
            }, {
                x: -.217,
                y: -.218
            }, {
                x: -.077,
                y: .117
            }, {
                x: -.202,
                y: -.015
            }, {
                x: -.091,
                y: .465
            }, {
                x: -.044,
                y: .723
            }, {
                x: -.098,
                y: .225
            }, {
                x: -.012,
                y: -.328
            }, {
                x: -.000,
                y: .262
            }, {
                x: -.002,
                y: .137
            }, {
                x: -.000,
                y: .091
            }, {
                x: -.000,
                y: -.131
            }];

            for (let i = 0, n = points.length - 4; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons.DOUBLE_ION_CANNON_HEAVY,
                weapons.ION_CANNON_ULTRA,
                weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 500
                });
            }

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 6.5 | 0,
                    range: e.weapon.range * 1.5 | 0,
                    reload: e.weapon.reload * .75 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 6,
            squadronKey: options.bomber
        }]
    };
}

export default templates;