import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.AUREK_STRIKEFIGHTER_OLDREP = {
    name: "Aurek Strikefighter",
    asset: "AUREK_STRIKEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 1,
    size: 25,
    cost: 100,
    speed: 16,
    turnSpeed: .05,
    shield: 40,
    shieldRegen: .04,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_RAPID_FIGHTER_LASER_CANNON,
            health: 40
        },
        shotsAtOnce: 4,
        shotDelay: 64
    }]
};

ships.CHELA_BOMBER_OLDREP = {
    name: "Chela Bomber",
    asset: "CHELA_BOMBER.png",
    classification: shipTypes.Bomber,
    population: 1,
    size: 30,
    cost: 160,
    speed: 12,
    turnSpeed: .03,
    shield: 75,
    shieldRegen: .075,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_RAPID_FIGHTER_LASER_CANNON,
            health: 50
        },
        shotsAtOnce: 2,
        shotDelay: 64
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            health: 50
        },
        shotsAtOnce: 4,
        shotDelay: 500
    }]
};

export default ships;