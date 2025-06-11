import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.EXECUTORSUPERSTARDESTROYER = function (options = {}) {
    options.name ??= "Executor-Class Super Star Destroyer";
    options.population ??= 150;
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
                    range: e.weapon.range * 1.5 | 0,
                    reload: e.weapon.reload * .9 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.BELLATORSUPERSTARDESTROYER = function (options = {}) {
    options.name ??= "Bellator-Class Star Dreadnought";
    options.population ??= 110;
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
                    range: e.weapon.range * 1.45 | 0
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.ASSERTORSTARDREADNOUGHT = function (options = {}) {
    options.name ??= "Assertor-Class Star Dreadnought";
    options.population ??= 200;
    options.cost ??= 68500;
    options.speed ??= 3;
    options.turnSpeed ??= .0005;
    options.shield ??= 140000;
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
        size: 6500,
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
                    health: e.weapon.health * 3.25 | 0,
                    range: e.weapon.range * 1.334 | 0
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
    options.population ??= 125;
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
                    options.color + "_QUAD_TURBOLASER_CANNON",
                    options.color + "_LASER_CANNON",
                    options.color + "_DOUBLE_LASER_CANNON_HEAVY",
                    "ION_CANNON",
                    options.color + "_QUAD_TURBOLASER_CANNON",
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
                    reload: e.weapon.reload * .925 | 0,
                }
            }));
        })(),
        hangars: options.hangars
    };
}

templates.VENGEANCE = function (options = {}) {
    options.name ??= "Vengeance-Class Super Star Destroyer";
    options.population ??= 140;
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
        size: 6000,
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
                    weapon: weapons[options.color + "_TRIPLE_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .01 + .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_TRIPLE_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: -.005 - .0125 * i,
                    y: .95 - .08 * i,
                    weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .005 + .0125 * i,
                    y: .95 - .08 * i,
                    weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: -.02 - .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_TRIPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                }, {
                    x: .02 + .0125 * i,
                    y: .9 - .08 * i,
                    weapon: weapons[options.color + "_TRIPLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 250
                });
            }

            const protonRocket = {
                weapon: {
                    ...weapons.ASSAULT_PROTON_ROCKET,
                    range: weapons.ASSAULT_PROTON_ROCKET.range * 2 | 0,
                    speed: weapons.ASSAULT_PROTON_ROCKET.speed * 1.5 | 0,
                    reload: weapons.ASSAULT_PROTON_ROCKET.reload * 3 | 0,
                    maneuverability: 1
                },
                shotsAtOnce: 3,
                shotDelay: 1000
            };

            const laserCannon = {
                weapon: weapons[options.color + "_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 75
            };

            const ionCannon = {
                weapon: weapons.ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            };

            for (let i = -4; i < 12; i++) {
                output.push({
                    x: -.055 - .0075 * i,
                    y: .4 - .07 * i,
                    ...protonRocket
                }, {
                    x: .055 + .0075 * i,
                    y: .4 - .07 * i,
                    ...protonRocket
                }, {
                    x: -.08 - .0075 * i,
                    y: .4 - .07 * i,
                    ...protonRocket
                }, {
                    x: .08 + .0075 * i,
                    y: .4 - .07 * i,
                    ...protonRocket
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
                    health: e.weapon.health * 3.4 | 0
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

templates.ECLIPSE = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Eclipse-Class Star Dreadnought",
        asset: "ECLIPSE_SSD.png",
        classification: shipTypes.SuperCapital,
        population: 200,
        size: 7500,
        cost: 100000,
        speed: 3,
        turnSpeed: .0015,
        shield: 100000,
        shieldRegen: 100,
        hardpoints: (function () {
            const points = [{
                x: -.447,
                y: -.988
            }, {
                x: -.417,
                y: -.988
            }, {
                x: -.363,
                y: -.967
            }, {
                x: -.335,
                y: -.962
            }, {
                x: -.292,
                y: -.964
            }, {
                x: -.261,
                y: -.969
            }, {
                x: -.255,
                y: -.934
            }, {
                x: -.325,
                y: -.938
            }, {
                x: -.393,
                y: -.967
            }, {
                x: -.416,
                y: -.958
            }, {
                x: -.390,
                y: -.896
            }, {
                x: -.361,
                y: -.891
            }, {
                x: -.360,
                y: -.912
            }, {
                x: -.398,
                y: -.928
            }, {
                x: -.411,
                y: -.888
            }, {
                x: -.350,
                y: -.810
            }, {
                x: -.363,
                y: -.793
            }, {
                x: -.375,
                y: -.783
            }, {
                x: -.314,
                y: -.775
            }, {
                x: -.321,
                y: -.820
            }, {
                x: -.399,
                y: -.836
            }, {
                x: -.399,
                y: -.863
            }, {
                x: -.363,
                y: -.844
            }, {
                x: -.380,
                y: -.822
            }, {
                x: -.345,
                y: -.844
            }, {
                x: -.306,
                y: -.869
            }, {
                x: -.296,
                y: -.898
            }, {
                x: -.271,
                y: -.909
            }, {
                x: -.340,
                y: -.904
            }, {
                x: -.320,
                y: -.889
            }, {
                x: -.306,
                y: -.932
            }, {
                x: -.378,
                y: -.946
            }, {
                x: -.365,
                y: -.874
            }, {
                x: -.287,
                y: -.840
            }, {
                x: -.273,
                y: -.875
            }, {
                x: -.346,
                y: -.870
            }, {
                x: -.295,
                y: -.950
            }, {
                x: -.285,
                y: -.935
            }, {
                x: -.335,
                y: -.929
            }, {
                x: -.291,
                y: -.796
            }, {
                x: -.208,
                y: -.905
            }, {
                x: -.192,
                y: -.965
            }, {
                x: -.252,
                y: -.985
            }, {
                x: -.255,
                y: -.978
            }, {
                x: -.219,
                y: -.895
            }, {
                x: -.220,
                y: -.792
            }, {
                x: -.178,
                y: -.753
            }, {
                x: -.159,
                y: -.789
            }, {
                x: -.196,
                y: -.850
            }, {
                x: -.248,
                y: -.826
            }, {
                x: -.226,
                y: -.777
            }, {
                x: -.168,
                y: -.700
            }, {
                x: -.315,
                y: -.800
            }, {
                x: -.350,
                y: -.742
            }, {
                x: -.262,
                y: -.625
            }, {
                x: -.174,
                y: -.474
            }, {
                x: -.227,
                y: -.400
            }, {
                x: -.302,
                y: -.455
            }, {
                x: -.275,
                y: -.682
            }, {
                x: -.306,
                y: -.713
            }, {
                x: -.315,
                y: -.621
            }, {
                x: -.288,
                y: -.578
            }, {
                x: -.227,
                y: -.560
            }, {
                x: -.181,
                y: -.629
            }, {
                x: -.227,
                y: -.695
            }, {
                x: -.284,
                y: -.758
            }, {
                x: -.243,
                y: -.738
            }, {
                x: -.219,
                y: -.694
            }, {
                x: -.254,
                y: -.638
            }, {
                x: -.252,
                y: -.560
            }, {
                x: -.227,
                y: -.490
            }, {
                x: -.185,
                y: -.541
            }, {
                x: -.180,
                y: -.594
            }, {
                x: -.256,
                y: -.510
            }, {
                x: -.232,
                y: -.457
            }, {
                x: -.233,
                y: -.451
            }, {
                x: -.302,
                y: -.514
            }, {
                x: -.337,
                y: -.588
            }, {
                x: -.351,
                y: -.664
            }, {
                x: -.357,
                y: -.690
            }, {
                x: -.329,
                y: -.676
            }, {
                x: -.329,
                y: -.672
            }, {
                x: -.150,
                y: -.848
            }, {
                x: -.110,
                y: -.658
            }, {
                x: -.099,
                y: -.599
            }, {
                x: -.092,
                y: -.533
            }, {
                x: -.083,
                y: -.448
            }, {
                x: -.071,
                y: -.367
            }, {
                x: -.048,
                y: -.201
            }, {
                x: -.052,
                y: -.071
            }, {
                x: -.058,
                y: -.014
            }, {
                x: -.038,
                y: .063
            }, {
                x: -.015,
                y: .126
            }, {
                x: -.090,
                y: .043
            }, {
                x: -.120,
                y: -.195
            }, {
                x: -.144,
                y: -.495
            }, {
                x: -.157,
                y: -.561
            }, {
                x: -.092,
                y: -.305
            }, {
                x: -.088,
                y: -.138
            }, {
                x: -.078,
                y: -.051
            }, {
                x: -.117,
                y: -.053
            }, {
                x: -.178,
                y: -.366
            }, {
                x: -.155,
                y: -.464
            }, {
                x: -.143,
                y: -.284
            }, {
                x: -.152,
                y: -.233
            }, {
                x: -.145,
                y: -.139
            }, {
                x: -.125,
                y: -.002
            }, {
                x: -.132,
                y: .036
            }, {
                x: -.222,
                y: -.310
            }, {
                x: -.164,
                y: -.319
            }, {
                x: -.124,
                y: -.447
            }, {
                x: -.181,
                y: -.468
            }, {
                x: -.158,
                y: -.400
            }, {
                x: -.157,
                y: -.400
            }, {
                x: -.121,
                y: -.412
            }, {
                x: -.288,
                y: -.444
            }, {
                x: -.262,
                y: -.355
            }, {
                x: -.263,
                y: -.321
            }, {
                x: -.213,
                y: -.149
            }, {
                x: -.170,
                y: -.117
            }, {
                x: -.201,
                y: -.176
            }, {
                x: -.212,
                y: -.235
            }, {
                x: -.186,
                y: -.268
            }, {
                x: -.204,
                y: -.276
            }, {
                x: -.251,
                y: -.265
            }, {
                x: -.245,
                y: -.201
            }, {
                x: -.223,
                y: -.187
            }, {
                x: -.214,
                y: -.030
            }, {
                x: -.174,
                y: -.022
            }, {
                x: -.176,
                y: -.070
            }, {
                x: -.218,
                y: -.096
            }, {
                x: -.190,
                y: -.039
            }, {
                x: -.188,
                y: .048
            }, {
                x: -.172,
                y: .092
            }, {
                x: -.130,
                y: .134
            }, {
                x: -.118,
                y: .126
            }, {
                x: -.118,
                y: .094
            }, {
                x: -.079,
                y: .103
            }, {
                x: -.148,
                y: .076
            }, {
                x: -.190,
                y: .023
            }, {
                x: -.166,
                y: .007
            }, {
                x: -.155,
                y: .002
            }, {
                x: -.134,
                y: -.102
            }, {
                x: -.135,
                y: -.067
            }, {
                x: -.105,
                y: -.159
            }, {
                x: -.105,
                y: -.246
            }, {
                x: -.101,
                y: -.299
            }, {
                x: -.076,
                y: -.276
            }, {
                x: -.052,
                y: -.134
            }, {
                x: -.033,
                y: .007
            }, {
                x: -.026,
                y: .044
            }, {
                x: -.043,
                y: -.219
            }, {
                x: -.052,
                y: -.378
            }, {
                x: -.060,
                y: -.601
            }, {
                x: -.062,
                y: -.671
            }, {
                x: -.076,
                y: -.734
            }, {
                x: -.076,
                y: -.773
            }, {
                x: -.052,
                y: -.793
            }, {
                x: -.036,
                y: -.731
            }, {
                x: -.037,
                y: -.588
            }, {
                x: -.038,
                y: -.451
            }, {
                x: -.035,
                y: -.419
            }, {
                x: -.128,
                y: -.853
            }, {
                x: -.094,
                y: -.785
            }, {
                x: -.088,
                y: -.884
            }, {
                x: -.052,
                y: -.957
            }, {
                x: -.087,
                y: -.970
            }, {
                x: -.149,
                y: -.934
            }, {
                x: -.149,
                y: -.928
            }, {
                x: -.120,
                y: -.956
            }, {
                x: -.151,
                y: -.933
            }, {
                x: -.162,
                y: -.886
            }, {
                x: -.202,
                y: -.956
            }, {
                x: -.228,
                y: -.948
            }, {
                x: -.140,
                y: -.973
            }, {
                x: -.132,
                y: -.725
            }, {
                x: -.136,
                y: -.625
            }, {
                x: -.172,
                y: -.621
            }, {
                x: -.220,
                y: -.643
            }, {
                x: -.190,
                y: -.668
            }, {
                x: -.160,
                y: .167
            }, {
                x: -.088,
                y: .366
            }, {
                x: -.063,
                y: .491
            }, {
                x: -.046,
                y: .651
            }, {
                x: -.028,
                y: .743
            }, {
                x: -.012,
                y: .802
            }, {
                x: -.026,
                y: .836
            }, {
                x: -.050,
                y: .661
            }, {
                x: -.050,
                y: .610
            }, {
                x: -.034,
                y: .568
            }, {
                x: -.039,
                y: .521
            }, {
                x: -.045,
                y: .466
            }, {
                x: -.017,
                y: .353
            }, {
                x: -.028,
                y: .278
            }, {
                x: -.027,
                y: .218
            }, {
                x: -.034,
                y: .159
            }, {
                x: -.072,
                y: .139
            }, {
                x: -.103,
                y: .156
            }, {
                x: -.128,
                y: .193
            }, {
                x: -.117,
                y: .276
            }, {
                x: -.097,
                y: .271
            }, {
                x: -.075,
                y: .232
            }, {
                x: -.102,
                y: .211
            }, {
                x: -.091,
                y: .178
            }, {
                x: -.075,
                y: .176
            }, {
                x: -.065,
                y: .261
            }, {
                x: -.068,
                y: .281
            }, {
                x: -.071,
                y: .309
            }, {
                x: -.057,
                y: .363
            }, {
                x: -.054,
                y: .392
            }, {
                x: -.075,
                y: .430
            }, {
                x: -.092,
                y: .451
            }, {
                x: -.099,
                y: .443
            }, {
                x: -.136,
                y: .337
            }, {
                x: -.148,
                y: .252
            }, {
                x: -.149,
                y: .212
            }, {
                x: -.132,
                y: .218
            }, {
                x: -.128,
                y: .223
            }, {
                x: -.108,
                y: .404
            }, {
                x: -.048,
                y: .323
            }, {
                x: -.048,
                y: .327
            }, {
                x: -.073,
                y: .539
            }, {
                x: -.035,
                y: .657
            }, {
                x: -.029,
                y: .686
            }, {
                x: -.031,
                y: .465
            }, {
                x: -.019,
                y: .376
            }, {
                x: -.029,
                y: .418
            }, {
                x: -.023,
                y: .582
            }, {
                x: -.025,
                y: .613
            }, {
                x: -.057,
                y: .591
            }, {
                x: -.074,
                y: .556
            }, {
                x: -.022,
                y: .774
            }, {
                x: -.051,
                y: .722
            }, {
                x: -.027,
                y: .707
            }, {
                x: -.010,
                y: .678
            }, {
                x: -.003,
                y: .968
            }, {
                x: -.002,
                y: .940
            }, {
                x: -.010,
                y: .930
            }, {
                x: -.005,
                y: .919
            }, {
                x: -.011,
                y: .895
            }, {
                x: -.002,
                y: .895
            }, {
                x: -.011,
                y: .907
            }, {
                x: -.016,
                y: .880
            }, {
                x: -.004,
                y: .869
            }, {
                x: -.021,
                y: .860
            }, {
                x: -.011,
                y: .829
            }, {
                x: -.008,
                y: .847
            }, {
                x: -.030,
                y: .842
            }, {
                x: -.034,
                y: .808
            }, {
                x: -.024,
                y: .795
            }, {
                x: -.004,
                y: .806
            }, {
                x: -.017,
                y: .821
            }, {
                x: -.021,
                y: .797
            }, {
                x: -.008,
                y: .748
            }, {
                x: .002,
                y: .753
            }, {
                x: -.013,
                y: .764
            }, {
                x: -.038,
                y: .765
            }, {
                x: -.041,
                y: .761
            }, {
                x: -.013,
                y: .785
            }, {
                x: -.036,
                y: .753
            }, {
                x: -.050,
                y: .728
            }, {
                x: -.021,
                y: .737
            }, {
                x: -.017,
                y: .718
            }, {
                x: -.036,
                y: .719
            }, {
                x: -.038,
                y: .726
            }, {
                x: -.030,
                y: .694
            }, {
                x: -.015,
                y: .699
            }, {
                x: -.011,
                y: .705
            }, {
                x: -.042,
                y: .703
            }, {
                x: -.049,
                y: .703
            }, {
                x: -.059,
                y: .686
            }, {
                x: -.016,
                y: .220
            }, {
                x: -.024,
                y: .119
            }, {
                x: -.033,
                y: .038
            }, {
                x: -.039,
                y: -.024
            }, {
                x: -.045,
                y: -.072
            }, {
                x: -.055,
                y: .111
            }, {
                x: -.059,
                y: .073
            }, {
                x: -.089,
                y: -.071
            }, {
                x: -.088,
                y: -.082
            }, {
                x: -.040,
                y: -.759
            }, {
                x: -.040,
                y: -.725
            }, {
                x: -.036,
                y: -.678
            }, {
                x: -.033,
                y: -.595
            }, {
                x: -.032,
                y: -.560
            }, {
                x: -.031,
                y: -.476
            }, {
                x: -.030,
                y: -.427
            }, {
                x: -.030,
                y: -.420
            }, {
                x: -.029,
                y: -.330
            }, {
                x: -.029,
                y: -.285
            }, {
                x: -.028,
                y: -.166
            }, {
                x: -.024,
                y: -.097
            }, {
                x: -.025,
                y: -.069
            }, {
                x: -.075,
                y: -.172
            }, {
                x: -.091,
                y: -.568
            }, {
                x: -.103,
                y: -.723
            }, {
                x: -.106,
                y: -.839
            }, {
                x: -.045,
                y: -.795
            }, {
                x: -.035,
                y: -.825
            }, {
                x: -.058,
                y: -.865
            }, {
                x: -.060,
                y: -.894
            }, {
                x: -.036,
                y: -.909
            }, {
                x: -.010,
                y: -.909
            }, {
                x: -.055,
                y: -.959
            }, {
                x: -.105,
                y: -.947
            }, {
                x: -.157,
                y: -.903
            }, {
                x: -.143,
                y: -.805
            }, {
                x: -.109,
                y: -.722
            }, {
                x: -.093,
                y: -.668
            }, {
                x: -.110,
                y: -.565
            }, {
                x: -.109,
                y: -.317
            }, {
                x: -.086,
                y: -.220
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [{
                weapon: weapons.ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons.ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons.ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_TURBOLASER_CANNON_HEAVY"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_TURBOLASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_LASER_CANNON_HEAVY"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_TURBOLASER_CANNON_ULTRAHEAVY"],
                shotsAtOnce: 2,
                shotDelay: 1000
            }, {
                weapon: weapons.ION_CANNON_ULTRA,
                shotsAtOnce: 2,
                shotDelay: 1000
            }];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    ...selections[i % selections.length]
                });
            }

            output.push({
                x: 0,
                y: .5,
                weapon: {
                    ...weapons[options.color + "_AXIAL_SUPERLASER"],
                    superlaser: {
                        duration: 250,
                        damagePerTick: 1000,
                        color: options.color
                    }
                },
                shotsAtOnce: 500,
                shotDelay: 20
            });

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 2.5 | 0,
                    range: e.weapon.range * 1.5 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 8,
            squadronSize: 5,
            reserveSize: 16,
            squadronKey: options.fighter
        }]
    };
}

templates.SOVEREIGN = function (options = {}) {
    options.color ??= "GREEN";
    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEBOMBER_EMPIRE";

    return {
        name: "Sovereign-Class Star Dreadnought",
        asset: "SOVEREIGN.png",
        classification: shipTypes.SuperCapital,
        population: 150,
        size: 6000,
        cost: 70000,
        speed: 3,
        turnSpeed: .0015,
        shield: 80000,
        shieldRegen: 80,
        hardpoints: (function () {
            const points = [{
                x: -.472,
                y: -.716
            }, {
                x: -.395,
                y: -.724
            }, {
                x: -.320,
                y: -.751
            }, {
                x: -.246,
                y: -.789
            }, {
                x: -.173,
                y: -.895
            }, {
                x: -.123,
                y: -.948
            }, {
                x: -.211,
                y: -.826
            }, {
                x: -.278,
                y: -.688
            }, {
                x: -.379,
                y: -.686
            }, {
                x: -.454,
                y: -.669
            }, {
                x: -.380,
                y: -.575
            }, {
                x: -.293,
                y: -.593
            }, {
                x: -.365,
                y: -.626
            }, {
                x: -.336,
                y: -.623
            }, {
                x: -.329,
                y: -.434
            }, {
                x: -.179,
                y: -.339
            }, {
                x: -.288,
                y: -.559
            }, {
                x: -.360,
                y: -.528
            }, {
                x: -.259,
                y: -.457
            }, {
                x: -.182,
                y: -.595
            }, {
                x: -.175,
                y: -.875
            }, {
                x: -.132,
                y: -.835
            }, {
                x: -.244,
                y: -.718
            }, {
                x: -.165,
                y: -.748
            }, {
                x: -.337,
                y: -.687
            }, {
                x: -.255,
                y: -.649
            }, {
                x: -.194,
                y: -.686
            }, {
                x: -.250,
                y: -.588
            }, {
                x: -.193,
                y: -.473
            }, {
                x: -.143,
                y: -.505
            }, {
                x: -.316,
                y: -.472
            }, {
                x: -.379,
                y: -.482
            }, {
                x: -.274,
                y: -.328
            }, {
                x: -.196,
                y: -.426
            }, {
                x: -.147,
                y: -.417
            }, {
                x: -.309,
                y: -.381
            }, {
                x: -.228,
                y: -.402
            }, {
                x: -.304,
                y: -.530
            }, {
                x: -.201,
                y: -.537
            }, {
                x: -.092,
                y: -.903
            }, {
                x: -.067,
                y: -.724
            }, {
                x: -.025,
                y: -.517
            }, {
                x: -.032,
                y: -.336
            }, {
                x: -.096,
                y: -.195
            }, {
                x: -.105,
                y: -.304
            }, {
                x: -.074,
                y: -.439
            }, {
                x: -.085,
                y: -.561
            }, {
                x: -.139,
                y: -.671
            }, {
                x: -.152,
                y: -.628
            }, {
                x: -.100,
                y: -.569
            }, {
                x: -.045,
                y: -.629
            }, {
                x: -.051,
                y: -.872
            }, {
                x: -.040,
                y: -.928
            }, {
                x: -.043,
                y: -.797
            }, {
                x: -.040,
                y: -.674
            }, {
                x: -.003,
                y: -.612
            }, {
                x: -.074,
                y: -.481
            }, {
                x: -.118,
                y: -.764
            }, {
                x: -.090,
                y: -.848
            }, {
                x: -.015,
                y: -.983
            }, {
                x: -.010,
                y: -.855
            }, {
                x: -.103,
                y: -.811
            }, {
                x: -.185,
                y: -.784
            }, {
                x: -.202,
                y: -.742
            }, {
                x: -.218,
                y: -.597
            }, {
                x: -.132,
                y: -.534
            }, {
                x: -.231,
                y: -.492
            }, {
                x: -.073,
                y: -.383
            }, {
                x: -.027,
                y: -.454
            }, {
                x: -.070,
                y: -.353
            }, {
                x: -.206,
                y: -.392
            }, {
                x: -.324,
                y: -.335
            }, {
                x: -.266,
                y: -.114
            }, {
                x: -.224,
                y: .047
            }, {
                x: -.168,
                y: .068
            }, {
                x: -.202,
                y: -.069
            }, {
                x: -.226,
                y: -.200
            }, {
                x: -.258,
                y: -.272
            }, {
                x: -.300,
                y: -.244
            }, {
                x: -.286,
                y: -.187
            }, {
                x: -.273,
                y: -.163
            }, {
                x: -.232,
                y: -.057
            }, {
                x: -.237,
                y: -.017
            }, {
                x: -.234,
                y: .009
            }, {
                x: -.260,
                y: -.056
            }, {
                x: -.200,
                y: -.243
            }, {
                x: -.207,
                y: -.334
            }, {
                x: -.255,
                y: -.339
            }, {
                x: -.260,
                y: -.393
            }, {
                x: -.222,
                y: -.288
            }, {
                x: -.136,
                y: -.281
            }, {
                x: -.193,
                y: -.295
            }, {
                x: -.132,
                y: -.213
            }, {
                x: -.254,
                y: -.235
            }, {
                x: -.233,
                y: -.164
            }, {
                x: -.211,
                y: -.109
            }, {
                x: -.167,
                y: -.142
            }, {
                x: -.200,
                y: -.172
            }, {
                x: -.169,
                y: -.207
            }, {
                x: -.163,
                y: -.249
            }, {
                x: -.079,
                y: -.262
            }, {
                x: -.141,
                y: -.356
            }, {
                x: -.115,
                y: -.136
            }, {
                x: -.207,
                y: -.054
            }, {
                x: -.200,
                y: -.005
            }, {
                x: -.131,
                y: -.028
            }, {
                x: -.150,
                y: -.060
            }, {
                x: -.173,
                y: -.093
            }, {
                x: -.140,
                y: -.108
            }, {
                x: -.172,
                y: -.025
            }, {
                x: -.082,
                y: -.076
            }, {
                x: -.031,
                y: -.210
            }, {
                x: -.064,
                y: -.220
            }, {
                x: -.096,
                y: -.098
            }, {
                x: -.140,
                y: .019
            }, {
                x: -.219,
                y: .064
            }, {
                x: -.192,
                y: .134
            }, {
                x: -.189,
                y: .054
            }, {
                x: -.050,
                y: -.156
            }, {
                x: -.039,
                y: .040
            }, {
                x: -.039,
                y: .227
            }, {
                x: -.036,
                y: .345
            }, {
                x: -.039,
                y: .518
            }, {
                x: -.036,
                y: .639
            }, {
                x: -.034,
                y: .720
            }, {
                x: -.059,
                y: .750
            }, {
                x: -.072,
                y: .666
            }, {
                x: -.094,
                y: .572
            }, {
                x: -.110,
                y: .457
            }, {
                x: -.136,
                y: .364
            }, {
                x: -.165,
                y: .236
            }, {
                x: -.189,
                y: .158
            }, {
                x: -.225,
                y: .107
            }, {
                x: -.154,
                y: .106
            }, {
                x: -.210,
                y: .186
            }, {
                x: -.116,
                y: .202
            }, {
                x: -.176,
                y: .317
            }, {
                x: -.119,
                y: .268
            }, {
                x: -.176,
                y: .266
            }, {
                x: -.122,
                y: .314
            }, {
                x: -.164,
                y: .352
            }, {
                x: -.118,
                y: .405
            }, {
                x: -.145,
                y: .415
            }, {
                x: -.098,
                y: .492
            }, {
                x: -.122,
                y: .506
            }, {
                x: -.084,
                y: .555
            }, {
                x: -.101,
                y: .602
            }, {
                x: -.076,
                y: .626
            }, {
                x: -.071,
                y: .691
            }, {
                x: -.053,
                y: .704
            }, {
                x: -.076,
                y: .366
            }, {
                x: -.061,
                y: .205
            }, {
                x: -.068,
                y: .076
            }, {
                x: -.077,
                y: -.065
            }, {
                x: -.098,
                y: -.180
            }, {
                x: -.121,
                y: .039
            }, {
                x: -.083,
                y: -.042
            }, {
                x: -.101,
                y: .023
            }, {
                x: -.063,
                y: .050
            }, {
                x: -.120,
                y: .085
            }, {
                x: -.079,
                y: .168
            }, {
                x: -.149,
                y: .173
            }, {
                x: -.182,
                y: .207
            }, {
                x: -.098,
                y: .119
            }, {
                x: -.146,
                y: .139
            }, {
                x: -.089,
                y: .228
            }, {
                x: -.072,
                y: .266
            }, {
                x: -.106,
                y: .296
            }, {
                x: -.076,
                y: .320
            }, {
                x: -.072,
                y: .384
            }, {
                x: -.108,
                y: .349
            }, {
                x: -.076,
                y: .437
            }, {
                x: -.067,
                y: .483
            }, {
                x: -.094,
                y: .463
            }, {
                x: -.058,
                y: .578
            }, {
                x: -.069,
                y: .530
            }, {
                x: -.056,
                y: .665
            }, {
                x: -.051,
                y: .570
            }, {
                x: -.047,
                y: .743
            }, {
                x: -.034,
                y: .777
            }, {
                x: -.017,
                y: .890
            }, {
                x: -.005,
                y: .974
            }, {
                x: -.010,
                y: .919
            }, {
                x: -.016,
                y: .854
            }, {
                x: -.027,
                y: .783
            }, {
                x: -.050,
                y: .791
            }, {
                x: -.032,
                y: .811
            }, {
                x: -.038,
                y: .846
            }, {
                x: -.044,
                y: .820
            }, {
                x: -.013,
                y: .937
            }, {
                x: -.046,
                y: .435
            }, {
                x: -.056,
                y: .379
            }, {
                x: -.057,
                y: .328
            }, {
                x: -.044,
                y: .303
            }, {
                x: -.052,
                y: .143
            }, {
                x: -.039,
                y: .107
            }, {
                x: -.072,
                y: .099
            }, {
                x: -.078,
                y: .020
            }, {
                x: -.045,
                y: -.030
            }, {
                x: -.043,
                y: -.069
            }, {
                x: -.072,
                y: -.123
            }, {
                x: -.088,
                y: -.160
            }, {
                x: -.059,
                y: -.176
            }, {
                x: -.063,
                y: -.016
            }, {
                x: -.014,
                y: .646
            }, {
                x: -.016,
                y: .555
            }, {
                x: -.028,
                y: .409
            }, {
                x: -.012,
                y: .313
            }, {
                x: -.048,
                y: .011
            }, {
                x: -.020,
                y: -.099
            }, {
                x: -.021,
                y: -.228
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];

            const selections = [{
                weapon: weapons.ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons.ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons.ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_TURBOLASER_CANNON_HEAVY"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_TURBOLASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_LASER_CANNON_HEAVY"],
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                weapon: weapons[options.color + "_LASER_CANNON"],
                shotsAtOnce: 2,
                shotDelay: 250
            }];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    ...selections[i % selections.length]
                });
            }

            output.push({
                x: 0,
                y: .5,
                weapon: {
                    ...weapons[options.color + "_AXIAL_SUPERLASER"],
                    superlaser: {
                        duration: 250,
                        damagePerTick: 500,
                        color: options.color
                    }
                },
                shotsAtOnce: 150,
                shotDelay: 30
            });

            return output.map(e => ({
                ...e,
                weapon: {
                    ...e.weapon,
                    health: e.weapon.health * 2.5 | 0,
                    range: e.weapon.range * 1.5 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 12,
            squadronSize: 4,
            reserveSize: 24,
            squadronKey: options.fighter
        }]
    };
}

templates.MAELSTROM = function (options = {}) {
    options.color ??= "BLUE";
    options.fighter ??= "V19TORRENT_REPUBLIC";
    options.bomber ??= "YWING_REPUBLIC";

    return {
        name: "Maelstrom-Class Battlecruiser",
        asset: "MAELSTROM_BATTLECRUISER.png",
        classification: shipTypes.SuperCapital,
        population: 50,
        size: 1313,
        cost: 11200,
        speed: 2,
        turnSpeed: .01,
        shield: 16000,
        shieldRegen: 7,
        hardpoints: (function () {
            const output = [];


            for (const point of [{
                x: -.151,
                y: -.621
            }, {
                x: -.198,
                y: -.616
            }, {
                x: -.246,
                y: -.612
            }, {
                x: -.293,
                y: -.606
            }].map(p => ([p, {
                x: -p.x,
                y: p.y
            }])).flat()) {
                output.push({
                    ...point,
                    weapon: weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                });
            }

            let i = 0;
            for (const point of [{
                x: -.001,
                y: -.388
            }, {
                x: -.004,
                y: -.343
            }, {
                x: -.003,
                y: -.300
            }, {
                x: -.001,
                y: -.259
            }, {
                x: -.004,
                y: -.218
            }, {
                x: -.004,
                y: -.174
            }]) {
                output.push({
                    ...point,
                    weapon: i++ % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons[options.color + "_TRIPLE_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 300
                });
            }

            for (const point of [{
                x: -.089,
                y: .859
            }, {
                x: -.129,
                y: .666
            }, {
                x: -.180,
                y: .450
            }, {
                x: -.222,
                y: .276
            }, {
                x: -.266,
                y: .102
            }, {
                x: -.255,
                y: -.111
            }, {
                x: -.296,
                y: -.288
            }, {
                x: -.445,
                y: -.466
            }, {
                x: -.486,
                y: -.627
            }, {
                x: -.091,
                y: .351
            }, {
                x: -.058,
                y: .774
            }].map(p => ([p, {
                x: -p.x,
                y: p.y
            }])).flat()) {
                output.push({
                    ...point,
                    weapon: [
                        weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                        weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"],
                        weapons.DOUBLE_ION_CANNON,
                        weapons.DOUBLE_ION_CANNON_MEDIUM
                    ][i++ % 4],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(hardpoint => ({
                ...hardpoint,
                weapon: {
                    ...hardpoint.weapon,
                    health: hardpoint.weapon.health * 4 | 0
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 6,
            reserveSize: 6,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 3,
            squadronSize: 6,
            reserveSize: 6,
            squadronKey: options.bomber
        }]
    };
}

export default templates;