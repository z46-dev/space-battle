import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TIEDRONE_DARKEMPIRE = {
    name: "Tie Drone",
    asset: "TIEDRONE.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 14,
    cost: 4,
    speed: 19,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 50
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }]
};

ships.TIEBOMBER_DARKEMPIRE = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .0725,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 1,
        shotDelay: 75
    }]
};

ships.TIEINTERCEPTOR_DARKEMPIRE = {
    name: "Tie Interceptor Elite",
    asset: "TIEINTERCEPTORRED.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 24,
    turnSpeed: .1,
    shield: 50,
    shieldRegen: .1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 60
        },
        shotsAtOnce: 6,
        shotDelay: 75
    }]
};

ships.TIEDEFENDER_DARKEMPIRE = {
    name: "Tie Defender Elite",
    asset: "TIEDEFENDERRED.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 25,
    speed: 21,
    turnSpeed: .125,
    shield: 159,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: weapons.TIE_DEFENDER_ION_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 3,
        shotDelay: 100
    }]
};

export default ships;