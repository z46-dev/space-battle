import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_ZANN = {
    name: "Action-VI Transport",
    asset: "ACTIONVITRANSPORTGREY.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 300,
    speed: 8,
    turnSpeed: .02,
    shield: 700,
    shieldRegen: 7,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON,
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
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 70
    }, {
        x: 0,
        y: 0,
        weapon: weapons.YELLOW_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }]
};

ships.CRUSADERCORVETTE_ZANN = {
    name: "Action-VI Transport",
    asset: "CRUSADERCORVETTE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 150,
    cost: 300,
    speed: 6,
    turnSpeed: .02,
    shield: 1200,
    shieldRegen: 10,
    hardpoints: [{
        x: -.15,
        y: .3,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.3,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .3,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: -.3,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.3,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.DP20_ZANN = templates.corvette.DP20({
    color: "YELLOW"
});

export default ships;