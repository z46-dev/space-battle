import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VULTUREDROID_CIS = {
    name: "Vulture Droid",
    asset: "VULTUREDROID.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 3,
    speed: 18,
    turnSpeed: .0875,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 3,
        shotDelay: 100
    }]
};

ships.HYENABOMBER_CIS = {
    name: "Hyena Bomber",
    asset: "HYENABOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 20,
    cost: 5,
    speed: 14,
    turnSpeed: .07,
    shield: 15,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.DROIDTRIFIGHTER_CIS = {
    name: "Tri-Fighter",
    asset: "DROIDTRIFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 6,
    speed: 21,
    turnSpeed: .08,
    shield: 75,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_RAPID_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET_AOE,
            health: 100
        },
        shotsAtOnce: 3,
        shotDelay: 100
    }]
};

export default ships;