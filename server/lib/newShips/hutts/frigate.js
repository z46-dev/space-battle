import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BRUTESUPPORTFRIGATE_HUTT = {
    name: "Brute Hutt Support Frigate",
    asset: "HUTTCORVETTE.png",
    classification: shipTypes.Frigate,
    population: 6,
    size: 240,
    cost: 600,
    speed: 5.5,
    turnSpeed: .02,
    shield: 1400,
    shieldRegen: 2,
    hardpoints: [{
        x: -.4,
        y: .65,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .4,
        y: .65,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.2,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .2,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: .5,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: -.5,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: -.3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 50
    }]
};

export default ships;