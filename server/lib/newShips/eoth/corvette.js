import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.KUURO_EOTH = {
    name: "Kuuro Corvette",
    asset: "KUURO.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 80,
    cost: 200,
    speed: 16,
    turnSpeed: .04,
    shield: 250,
    shieldRegen: 2.5,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: .25,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }]
};

ships.ASDONI_EOTH = {
    name: "Asdoni Corvette",
    asset: "ASDONI.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 70,
    cost: 200,
    speed: 14,
    turnSpeed: .025,
    shield: 300,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: -.4,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }]
};

ships.SYZYGOS_EOTH = {
    name: "Syzygos Transport",
    asset: "SYZYGOS.png",
    classification: shipTypes.Corvette,
    population: 6,
    size: 99,
    cost: 350,
    speed: 12,
    turnSpeed: .025,
    shield: 350,
    shieldRegen: 3.5,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.BLACK_TRIPLE_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: -.4,
        weapon: weapons.BLACK_TRIPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.8,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 2,
        reserveSize: 1,
        squadronKey: "NSSIS_EOTH"
    }]
};

export default ships;