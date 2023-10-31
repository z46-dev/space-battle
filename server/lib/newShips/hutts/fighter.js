import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.A9VIGILANCE_HUTT = {
    name: "A-9 Vigilance",
    asset: "A9VIGILANCE.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 0,
    speed: 21,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.PURPLE_LASER_CANNON,
            health: weapons.PURPLE_LASER_CANNON.health * 5
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

ships.SKIPRAYBLASTBOAT_HUTT = {
    name: "Skipray Blastboat",
    asset: "SKIPRAYBLASTBOAT.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 45,
    cost: 0,
    speed: 15,
    turnSpeed: .04,
    shield: 200,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.PURPLE_LASER_CANNON,
            health: weapons.PURPLE_LASER_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

export default ships;