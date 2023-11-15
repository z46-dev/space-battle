import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TONFALKCARRIER_DARKEMPIRE = {
    name: "Ton Falk Carrier",
    asset: "TONFALKESCORTCARRIER.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 200,
    cost: 1650,
    speed: 3,
    turnSpeed: .025,
    shield: 2000,
    shieldRegen: 5,
    hardpoints: [{
        x: -.1,
        y: .6,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .1,
        y: .6,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.3,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .3,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.3,
        y: -.7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .3,
        y: -.7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

ships.MTFCRUISER_DARKEMPIRE = {
    name: "Modular Task Force Cruiser",
    asset: "MTFCRUISER.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 400,
    cost: 5000,
    speed: 3.9,
    turnSpeed: .015,
    shield: 4000,
    shieldRegen: 10,
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
    }],
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

ships.CARRACK_DARKEMPIRE = {
    name: "Carrack Cruiser",
    asset: "CARRACK.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 170,
    cost: 1900,
    speed: 4.5,
    turnSpeed: .02,
    shield: 2100,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .2,
        weapon: weapons.ION_CANNON
    }, {
        x: .125,
        y: .2,
        weapon: weapons.ION_CANNON
    }, {
        x: -.1,
        y: -.4,
        weapon: weapons.GREEN_TURBOLASER_CANNON
    }, {
        x: .1,
        y: -.4,
        weapon: weapons.GREEN_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

ships.LANCERFRIGATE_DARKEMPIRE = {
    name: "Lancer Frigate",
    asset: "LANCERFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 150,
    cost: 3000,
    speed: 3.9,
    turnSpeed: .018,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .95,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .6,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .35,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }, {
        x: -.15,
        y: -.5,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .15,
        y: -.5,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON
    }]
};

ships.INTERDICTORCRUISER_DARKEMPIRE = {
    name: "Interdictor Cruiser",
    asset: "SITHINTERDICTOR.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 600,
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
                health: output[i].weapon.health * 14
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

export default ships;