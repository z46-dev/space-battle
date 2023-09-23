import { shipTypes } from "../constants.js";
import { ASSAULT_CONCUSSION_MISSILE, ION_CANNON, YELLOW_ANTI_FIGHTER_LASER_CANNON, YELLOW_DOUBLE_LASER_CANNON, YELLOW_LASER_CANNON } from "../weapons.js";

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
        weapon: YELLOW_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.5,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 70
    }, {
        x: 0,
        y: 0,
        weapon: YELLOW_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }]
};

export default ships;