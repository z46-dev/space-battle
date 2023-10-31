import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MUNIFICENT_CIS = {
    name: "Munificent Frigate",
    asset: "MUNIFICENT.png", // do another with MUNIFICENT2.png
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
        y: .8,
        weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY
    }, {
        x: -.5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
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
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

ships.RECUSANT_CIS = {
    name: "Recusant Light Destroyer",
    asset: "RECUSANT.png",
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
        weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.03,
        y: .825,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .03,
        y: .825,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: -.06,
        y: .7,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
    }, {
        x: .06,
        y: .7,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
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
        weapon: weapons.RED_QUAD_LASER_CANNON
    }, {
        x: .075,
        y: .35,
        weapon: weapons.RED_QUAD_LASER_CANNON
    }, {
        x: -.06,
        y: 0,
        weapon: weapons.RED_QUAD_LASER_CANNON
    }, {
        x: .06,
        y: 0,
        weapon: weapons.RED_QUAD_LASER_CANNON
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;