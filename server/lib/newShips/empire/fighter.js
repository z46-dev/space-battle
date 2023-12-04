import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TIEFIGHTER_EMPIRE = {
    name: "Tie Fighter",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 18,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }]
};

ships.TIEBOMBER_EMPIRE = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .065,
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
        weapon: weapons.FIGHTER_CONCUSSION_MISSILE,
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

ships.TIEINTERCEPTOR_EMPIRE = {
    name: "Tie Interceptor",
    asset: "TIEINTERCEPTOR.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 22,
    turnSpeed: .09,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 30
        },
        shotsAtOnce: 4,
        shotDelay: 75
    }]
};

ships.TIEDEFENDER_EMPIRE = {
    name: "Tie Defender",
    asset: "TIEDEFENDER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 25,
    speed: 19,
    turnSpeed: .1,
    shield: 100,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: weapons.TIE_DEFENDER_ION_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 250
    }]
};

export default ships;