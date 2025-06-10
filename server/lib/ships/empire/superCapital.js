import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.EXECUTORSUPERSTARDESTROYER_EMPIRE = templates.superCapital.EXECUTORSUPERSTARDESTROYER();
ships.BELLATORSUPERSTARDESTROYER_EMPIRE = templates.superCapital.BELLATORSUPERSTARDESTROYER();
ships.ASSERTORSTARDREADNOUGHT_EMPIRE = templates.superCapital.ASSERTORSTARDREADNOUGHT();

ships.MEGASTARDESTROYER_EMPIRE = templates.superCapital.MEGASTARDESTROYER();

ships.ARCHAMMER_EMPIRE = {
    name: "Arch Hammer",
    asset: "ARCHAMMER.png",
    classification: shipTypes.SuperCapital,
    population: 145,
    size: 3450,
    cost: 23400,
    speed: 3,
    turnSpeed: .01,
    shield: 54340,
    shieldRegen: 54,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 18; i++) {
            output.push({
                x: -.01 - .0025 * i,
                y: .85 - .099 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.01 - .0025 * i,
                y: .85 - .099 / 2 - .099 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 0, l = output.length; i < l; i++) {
            output.push(structuredClone(output[i]));
            output[output.length - 1].x *= -1;
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5.63 | 0,
                reload: e.weapon.reload * .5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 1e10,
        squadronKey: "TIEDEFENDER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 1e10,
        squadronKey: "TIEPUNISHER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 1e10,
        squadronKey: "TIEREAPER_EMPIRE"
    }],
    production: [{
        x: 0,
        y: 0,
        maxAlive: 6,
        reserve: 1e10,
        key: "RAIDER_EMPIRE",
        cooldown: 50
    }, {
        x: 0,
        y: 0,
        maxAlive: 2,
        reserve: 1e10,
        key: "VIGILCORVETTE_EMPIRE",
        cooldown: 150
    }]
};

ships.DEATHSTAR_EMPIRE = {
    name: "Death Star",
    asset: "DEATHSTAR.png",
    classification: shipTypes.SuperCapital,
    population: 300,
    size: 10000,
    cost: 10_000_000,
    speed: 0,
    turnSpeed: .00025,
    shield: 300_000,
    shieldRegen: 300,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 64; i++) {
            const angle = i * Math.PI / 32;

            output.push({
                x: Math.cos(angle) * .9,
                y: Math.sin(angle) * .9,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: Math.cos(angle + Math.PI / 64) * .7,
                y: Math.sin(angle + Math.PI / 64) * .7,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: Math.cos(angle) * .5,
                y: Math.sin(angle) * .5,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: Math.cos(angle + Math.PI / 64) * .3,
                y: Math.sin(angle + Math.PI / 64) * .3,
                weapon: weapons.ION_CANNON_ULTRA,
                shotsAtOnce: 2,
                shotDelay: 500
            }, {
                x: Math.cos(angle + Math.PI / 48) * .8,
                y: Math.sin(angle + Math.PI / 48) * .8,
                weapon: weapons.GREEN_RAPID_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 50
            });
        }

        output.push({
            x: -.5,
            y: .4125,
            weapon: {
                ...weapons.GREEN_SUPERLASER,
                superlaser: {
                    duration: 500,
                    damagePerTick: 1500,
                    color: "GREEN"
                }
            }
        });

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 12.5 | 0
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
    }]
};

ships.LEGATORSTARDREADNOUGHT_EMPIRE = templates.superCapital.LEGATORSTARDREADNOUGHT();

ships.VENGEANCE_EMPIRE = templates.superCapital.VENGEANCE();

ships.CONSOLIDATORASSAULTSHIP_EMPIRE = {
    name: "Consolidator Assault Ship",
    asset: "CONSOLIDATORASSAULTSHIP.png",
    classification: shipTypes.SuperCapital,
    population: 85,
    size: 2150,
    cost: 28570,
    speed: 1.2,
    turnSpeed: .00025,
    shield: 38500,
    shieldRegen: 38.5,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 8; i++) {
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

        for (let i = 0; i < 4; i++) {
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
                health: e.weapon.health * 3 | 0
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

ships.COMPELLOR_EMPIRE = templates.superCapital.COMPELLOR();

ships.COMMUNICATIONS_BATTLECRUISER_EMPIRE = templates.superCapital.COMMUNICATIONS_BATTLECRUISER();

ships.PRAETOR_II_EMPIRE = templates.superCapital.PRAETOR_II();

ships.PRAETOR_CARRIER_EMPIRE = templates.superCapital.PRAETOR_CARRIER();

ships.TAGGE_BATTLECRUISER_EMPIRE = templates.superCapital.TAGGE_BATTLECRUISER();

ships.SORONNAN_EMPIRE = templates.capital.SORONNAN_STAR_DESTROYER();

ships.SECUTOR_EMPIRE = templates.superCapital.SECUTOR();

ships.ECLIPSE_EMPIRE = templates.superCapital.ECLIPSE();
ships.SOVEREIGN_EMPIRE = templates.superCapital.SOVEREIGN();

ships.MAELSTROM_EMPIRE = templates.superCapital.MAELSTROM({
    color: "GREEN",
    fighter: "TIEFIGHTER_EMPIRE",
    bomber: "TIEBOMBER_EMPIRE"
});

export default ships;