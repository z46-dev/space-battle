import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IPV1_DARKEMPIRE = {
    name: "IPV-1 System Patrol Craft",
    asset: "IPV1.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 270,
    speed: 8,
    turnSpeed: .015,
    shield: 500,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 90
    }]
};

ships.VIGILCORVETTE_DARKEMPIRE = {
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