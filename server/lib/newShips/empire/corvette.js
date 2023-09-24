import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.RAIDER_EMPIRE = {
    name: "Raider",
    asset: "RAIDER.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 200,
    speed: 10,
    turnSpeed: .035,
    shield: 400,
    shieldRegen: 1,
    hardpoints: [{
        x: -.15,
        y: .075,
        weapon: weapons.GREEN_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .075,
        weapon: weapons.GREEN_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.4,
        weapon: weapons.GREEN_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.VIGILCORVETTE_EMPIRE = {
    name: "Vigil Corvette",
    asset: "VIGILCORVETTE.png",
    classification: shipTypes.Corvette,
    population: 5,
    size: 120,
    cost: 1000,
    speed: 5,
    turnSpeed: .01,
    shield: 1100,
    shieldRegen: 2,
    hardpoints: [{
        x: -.375,
        y: .05,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .4,
        y: .025,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.375,
        y: .05,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .4,
        y: .025,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }]
};

export default ships;