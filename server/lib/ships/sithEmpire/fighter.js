import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SITH_FIGHTER_SITHEMP = {
    name: "Sith Fighter",
    asset: "SITH_FIGHTER.png",
    classification: shipTypes.Fighter,
    population: 1,
    size: 25,
    cost: 100,
    speed: 18,
    turnSpeed: .05,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_RAPID_FIGHTER_LASER_CANNON,
            health: 55
        },
        shotsAtOnce: 4,
        shotDelay: 60
    }]
};

ships.SITH_BOMBER_SITHEMP = {
    name: "Sith Bomber",
    asset: "SITH_BOMBER.png",
    classification: shipTypes.Bomber,
    population: 1,
    size: 30,
    cost: 160,
    speed: 12,
    turnSpeed: .03,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_RAPID_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 64
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            health: 125
        },
        shotsAtOnce: 4,
        shotDelay: 300
    }]
};

export default ships;