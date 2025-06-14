import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CORUSCANT_COURIER_OLDREP = {
    name: "Coruscant Courier",
    asset: "CORUSCANT_COURIER.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 95,
    cost: 350,
    speed: 10,
    turnSpeed: .04,
    shield: 250,
    shieldRegen: .25,
    hardpoints: [{
        x: -.946,
        y: -.417,
        weapon: weapons.GREEN_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: .297,
        y: .510,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON
    }, {
        x: .951,
        y: -.161,
        weapon: weapons.GREEN_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }]
};

ships.FORAY_BLOCKADE_RUNNER_OLDREP = {
    name: "Foray Blockade Runner",
    asset: "FORAY_BLOCKADE_RUNNER.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 200,
    cost: 465,
    speed: 8,
    turnSpeed: .03,
    shield: 450,
    shieldRegen: .45,
    hardpoints: [{
        x: -.083,
        y: .835,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .078,
        y: .838,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: -.337,
        y: -.752,
        weapon: weapons.GREEN_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: .330,
        y: -.764,
        weapon: weapons.GREEN_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: -.003,
        y: .073,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 450
    }]
};

export default ships;