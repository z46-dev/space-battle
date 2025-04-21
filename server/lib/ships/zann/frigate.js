import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.LANCERFRIGATE_ZANN = {
    name: "Lancer Frigate",
    asset: "LANCERFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 150,
    cost: 3000,
    speed: 3.9,
    turnSpeed: .018,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .95,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .6,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .35,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.YELLOW_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }, {
        x: -.15,
        y: -.5,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .15,
        y: -.5,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON
    }]
};

export default ships;