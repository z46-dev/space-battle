import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DRESHDAE_PATROL_CORVETTE_SITHEMP = {
    name: "Dreshdae Patrol Corvette",
    asset: "DRESHDAE_PATROL.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 80,
    cost: 540,
    speed: 6,
    turnSpeed: .03,
    shield: 100,
    shieldRegen: .1,
    hardpoints: [{
        x: -.946,
        y: -.417,
        weapon: weapons.RED_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: .297,
        y: .510,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: .951,
        y: -.161,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 600
    }]
};

export default ships;