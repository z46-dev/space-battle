import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.QUASAR_EMPIRE = {
    name: "Quasar",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 175,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 1900,
    shieldRegen: 5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: -.175,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .175,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: -.325,
        y: .15,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "TIEBOMBER_EMPIRE"
    }]
};

ships.CARRACK_EMPIRE = {
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

ships.LANCERFRIGATE_EMPIRE = {
    name: "Lancer Frigate",
    asset: "LANCERFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 10,
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

export default ships;