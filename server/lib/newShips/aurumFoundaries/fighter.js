import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.SNUB1_AURUM = {
    name: "Snub-1",
    asset: "SNUB1.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 8,
    speed: 25,
    turnSpeed: .09,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 150
        },
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 150
    }]
};

ships.BLAST2_AURUM = {
    name: "Blast-2",
    asset: "SNUB1.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 25,
    cost: 8,
    speed: 16,
    turnSpeed: .04,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 150
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_ION_CANNON,
            health: 150
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 8,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 120
    }]
};

export default ships;