import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_HUTT = {
    name: "Action-VI Transport",
    asset: "ACTIONVITRANSPORTSTRIPE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 300,
    speed: 8,
    turnSpeed: .02,
    shield: 600,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.CONSOLAR_HUTT = {
    name: "Consolar Corvette",
    asset: "CONSOLARHUTT.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 100,
    speed: 11,
    turnSpeed: .04,
    shield: 400,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .9,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: -.9,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};


export default ships;