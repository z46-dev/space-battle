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
            health: 75
        },
        shotsAtOnce: 2,
        shotDelay: 50
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
        weapon: weapons.GREEN_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 5,
        shotDelay: 140
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 140
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
            ...weapons.GREEN_RAPID_FIGHTER_LASER_CANNON,
            health: 66
        },
        shotsAtOnce: 4,
        shotDelay: 25
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
    shield: 150,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.TIE_DEFENDER_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 20
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 6,
        shotDelay: 250
    }]
};

export default ships;