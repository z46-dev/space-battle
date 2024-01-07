import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../templates/superCapital.js";

const ships = {};

ships.EXECUTORSUPERSTARDESTROYER_EMPIRE = templates.EXECUTORSUPERSTARDESTROYER();
ships.BELLATORSUPERSTARDESTROYER_EMPIRE = templates.BELLATORSUPERSTARDESTROYER();
ships.ASSERTORSTARDREADNOUGHT_EMPIRE = templates.ASSERTORSTARDREADNOUGHT();

ships.MEGASTARDESTROYER_EMPIRE = templates.MEGASTARDESTROYER();

ships.ARCHAMMER_EMPIRE = {
    name: "Arch Hammer",
    asset: "ARCHAMMER.png",
    classification: shipTypes.SuperCapital,
    population: 100,
    size: 2300,
    cost: 16000,
    speed: 2,
    turnSpeed: .01,
    shield: 37500,
    shieldRegen: 37.5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.001 - .005 * i,
                y: .8 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .015 + .0025 * i,
                y: .8 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.00065 - .0025 * i,
                y: .6 - .05 * i,
                weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            }, {
                x: .0065 + .00125 * i,
                y: .6 - .05 * i,
                weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDEFENDER_EMPIRE"
    }],
    production: [{
        x: 0,
        y: 0,
        maxAlive: 6,
        reserve: 1e10,
        key: "RAIDER_EMPIRE",
        cooldown: 80
    }, {
        x: 0,
        y: 0,
        maxAlive: 6,
        reserve: 1e10,
        key: "VIGILCORVETTE_EMPIRE",
        cooldown: 80
    }, {
        x: 0,
        y: 0,
        maxAlive: 4,
        reserve: 1e10,
        key: "ARQUITENS_EMPIRE",
        cooldown: 80
    }]
};

ships.DEATHSTAR_EMPIRE = {
    name: "Death Star",
    asset: "DEATHSTAR.png",
    classification: shipTypes.SuperCapital,
    population: 600,
    size: 20000,
    cost: 10000000,
    speed: .01,
    turnSpeed: .0001,
    shield: 10_000_000,
    shieldRegen: 100,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 64; i ++) {
            const angle = i * Math.PI / 32;

            output.push({
                x: Math.cos(angle) * .9,
                y: Math.sin(angle) * .9,
                weapon: {
                    ...weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                    range: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY.range * 3
                }
            }, {
                x: Math.cos(angle + Math.PI / 64) * .7,
                y: Math.sin(angle + Math.PI / 64) * .7,
                weapon: {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    range: weapons.DOUBLE_ION_CANNON_MEDIUM.range * 3
                }
            }, {
                x: Math.cos(angle) * .5,
                y: Math.sin(angle) * .5,
                weapon: {
                    ...weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                    range: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY.range * 3
                }
            }, {
                x: Math.cos(angle + Math.PI / 64) * .3,
                y: Math.sin(angle + Math.PI / 64) * .3,
                weapon: {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    range: weapons.DOUBLE_ION_CANNON_MEDIUM.range * 3
                }
            });
        }

        output.push({
            x: -.5,
            y: .4125,
            weapon: {
                ...weapons.GREEN_SUPERLASER,
                range: weapons.GREEN_SUPERLASER.range * 3
            },
            shotsAtOnce: 50,
            shotDelay: 22.5
        });

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 10,
        reserveSize: 55,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 10,
        reserveSize: 55,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 10,
        reserveSize: 55,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 2,
        reserveSize: 3,
        squadronKey: "IMPERIALSTARDESTROYER_EMPIRE"
    }]
};

ships.LEGATORSTARDREADNOUGHT_EMPIRE = templates.LEGATORSTARDREADNOUGHT();

ships.CONSOLIDATORASSAULTSHIP_EMPIRE = {
    name: "Consolidator Assault Ship",
    asset: "CONSOLIDATORASSAULTSHIP.png",
    classification: shipTypes.SuperCapital,
    population: 85,
    size: 1900,
    cost: 28570,
    speed: 1.2,
    turnSpeed: .00025,
    shield: 38500,
    shieldRegen: 38.5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.07 - .0625 * i,
                y: .925 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: .07 + .0625 * i,
                y: .925 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: -.03 - .0625 * i,
                y: .925 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: .03 + .0625 * i,
                y: .925 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.285 - .0425 * i,
                y: -.925 + .085 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: .285 + .0425 * i,
                y: -.925 + .085 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: -.2 - .0425 * i,
                y: -.925 + .085 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            }, {
                x: .2 + .0425 * i,
                y: -.925 + .085 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 250
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
    })(),
    hangars: [{
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
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER_EMPIRE"
    }]
};

export default ships;