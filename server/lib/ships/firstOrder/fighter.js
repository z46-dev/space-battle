import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TIEFIGHTER_FO = {
    name: "Tie Fighter",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 18,
    turnSpeed: .08,
    shield: 50,
    shieldRegen: 1,
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

ships.TIEBOMBER_FO = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .065,
    shield: 80,
    shieldRegen: 1,
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

ships.TIEINTERCEPTOR_FO = {
    name: "Tie Interceptor",
    asset: "TIEINTERCEPTOR.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 22,
    turnSpeed: .09,
    shield: 50,
    shieldRegen: 1,
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

export default ships;