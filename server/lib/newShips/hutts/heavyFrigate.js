import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MUNIFICENT_HUTT = {
    name: "Munificent Frigate",
    asset: "MUNIFICENT2.png",
    classification: shipTypes.HeavyFrigate,
    population: 8,
    size: 300,
    cost: 2700,
    speed: 4,
    turnSpeed: .02,
    shield: 2400,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .775,
        weapon: weapons.PURPLE_TURBOLASER_CANNON_ULTRAHEAVY
    }, {
        x: -.475,
        y: -.2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .475,
        y: -.2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: .1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: -.225,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.15,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON
    }, {
        x: .15,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON
    }, {
        x: -.15,
        y: -.45,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .15,
        y: -.45,
        weapon: weapons.DOUBLE_ION_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

ships.RECUSANT_HUTT = {
    name: "Recusant Light Destroyer",
    asset: "RECUSANTDREADNOUGHT.png",
    classification: shipTypes.HeavyFrigate,
    population: 9,
    size: 500,
    cost: 3000,
    speed: 3.5,
    turnSpeed: .01,
    shield: 2600,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: weapons.PURPLE_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.03,
        y: .825,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .03,
        y: .825,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: -.06,
        y: .7,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .06,
        y: .7,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: -.075,
        y: .55,
        weapon: weapons.ION_CANNON_HEAVY
    }, {
        x: .075,
        y: .55,
        weapon: weapons.ION_CANNON_HEAVY
    }, {
        x: -.075,
        y: .35,
        weapon: weapons.PURPLE_QUAD_LASER_CANNON
    }, {
        x: .075,
        y: .35,
        weapon: weapons.PURPLE_QUAD_LASER_CANNON
    }, {
        x: -.06,
        y: 0,
        weapon: weapons.PURPLE_QUAD_LASER_CANNON
    }, {
        x: .06,
        y: 0,
        weapon: weapons.PURPLE_QUAD_LASER_CANNON
    }]
};

ships.ACCLIMATOR_HUTT = {
    name: "Acclimator Assault Cruiser",
    asset: "ACCLIMATOR.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 300,
    cost: 2500,
    speed: 3,
    turnSpeed: .01,
    shield: 2780,
    shieldRegen: 1.5,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 100
        }, {
            x: -.55,
            y: -.35,
            weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .55,
            y: -.35,
            weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 75
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2 - .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.PURPLE_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .2 + .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.PURPLE_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "A9VIGILANCE_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};


export default ships;