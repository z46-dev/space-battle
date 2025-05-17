import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TONFALKCARRIER_DARKEMPIRE = templates.frigate.TONFALKCARRIER({
    fighter: "TIEDRONE_DARKEMPIRE",
    bomber: "TIEBOMBER_DARKEMPIRE"
});

ships.MTFCRUISER_DARKEMPIRE = {
    name: "Modular Task Force Cruiser",
    asset: "MTFCRUISER.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 400,
    cost: 850,
    speed: 3.9,
    turnSpeed: .015,
    shield: 5400,
    shieldRegen: 5.4,
    hardpoints: [{
        x: 0,
        y: .95,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: -.03,
        y: .7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .03,
        y: .7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.2,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.2,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: -.9125,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: -.9125,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(h => ({ ...h, weapon: { ...h.weapon, health: h.weapon.health * 3 } })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 1,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }]
};

ships.CARRACK_DARKEMPIRE = templates.frigate.CARRACK();

ships.LANCERFRIGATE_DARKEMPIRE = templates.frigate.LANCER();

ships.INTERDICTORCRUISER_DARKEMPIRE = {
    name: "Interdictor Cruiser",
    asset: "SITHINTERDICTOR.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 450,
    cost: 5500,
    speed: 2.6,
    turnSpeed: .0075,
    shield: 0,
    shieldRegen: 0,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.025 - .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .025 + .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: -.025 - .05 * Math.pow(i, 1.035),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .025 + .05 * Math.pow(i, 1.035),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 7
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 12,
        reserveSize: 3,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }]
};

ships.STARGALLEON_DARKEMPIRE = templates.frigate.STAR_GALLEON({
    fighter: "TIEREAPER_DARKEMPIRE"
});

ships.VICTORYFRIGATE_DARKEMPIRE = templates.frigate.VICTORY_FRIGATE();
ships.STRIKECRUISER_DARKEMPIRE = templates.frigate.STRIKECRUISER({
    fighter: "TIEINTERCEPTOR_DARKEMPIRE"
});

export default ships;