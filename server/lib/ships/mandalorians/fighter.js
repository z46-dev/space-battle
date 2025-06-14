import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BASILISK_FIGHTER_MANDO = {
    name: "Basilisk Fighter",
    asset: "BASILISK_STARFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 1,
    size: 20,
    cost: 100,
    speed: 20,
    turnSpeed: .05,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_FIGHTER_LASER_CANNON,
            health: 60
        },
        shotsAtOnce: 2,
        shotDelay: 60
    }]
};

ships.DAVAAB_INTERCEPTOR_MANDO = {
    name: "Davaab Interceptor",
    asset: "DAVAAB_INTERCEPTOR.png",
    classification: shipTypes.Fighter,
    population: 1,
    size: 20,
    cost: 100,
    speed: 25,
    turnSpeed: .05,
    shield: 10,
    shieldRegen: .01,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_RAPID_FIGHTER_LASER_CANNON,
            health: 30
        },
        shotsAtOnce: 4,
        shotDelay: 60
    }]
};

ships.BASILISK_BOMBER_MANDO = {
    name: "Basilisk Bomber",
    asset: "BASILISK_BOMBER.png",
    classification: shipTypes.Bomber,
    population: 1,
    size: 30,
    cost: 160,
    speed: 15,
    turnSpeed: .03,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_FIGHTER_LASER_CANNON,
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
        shotsAtOnce: 5,
        shotDelay: 300
    }]
};

export default ships;