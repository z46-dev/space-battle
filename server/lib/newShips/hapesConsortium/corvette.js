import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BAIDAM_HAPAN = {
    name: "Baidam Corvette",
    asset: "BAIDAM_HAPAN.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 85,
    cost: 360,
    speed: 11.2,
    turnSpeed: .03,
    shield: 1675,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 6,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 6,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.5 | 0
        }
    }))
};

ships.FLARE_HAPAN = {
    name: "Flare Corvette",
    asset: "FLARE_HAPAN.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 100,
    cost: 490,
    speed: 8,
    turnSpeed: .02,
    shield: 2000,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.75 | 0
        }
    }))
};

export default ships;