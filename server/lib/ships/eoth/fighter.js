import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.NSSIS_EOTH = {
    name: "Nssis Starfighter",
    asset: "NSSIS.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 5,
    speed: 19,
    turnSpeed: .06,
    shield: 10,
    shieldRegen: .1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 40
        }
    }]
};

ships.KRSSIS_EOTH = {
    name: "Krssis Interceptor",
    asset: "KRSSIS.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 8,
    speed: 22,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: .2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 8
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_LASER_CANNON_HEAVY,
            health: 16
        }
    }]
};

ships.SYCA_EOTH = {
    name: "Syca Bomber",
    asset: "SYCA.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 20,
    cost: 7,
    speed: 16,
    turnSpeed: .05,
    shield: 40,
    shieldRegen: .4,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLACK_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            range: weapons.FIGHTER_PROTON_BOMB.range * 1.2,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 1.5
        },
        shotsAtOnce: 4,
        shotDelay: 250
    }]
};

export default ships;