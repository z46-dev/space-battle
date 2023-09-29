import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC69NOIR_HUTT = {
    name: "MC-69 Noir",
    asset: "MC69NOIR.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 450,
    cost: 3000,
    speed: 2.9,
    turnSpeed: .01,
    shield: 9500,
    shieldRegen: 5,
    hardpoints: [{
        x: -.04,
        y: .85,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .085,
        y: .775,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.12,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: .45,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.18,
        y: .2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .275,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.25,
        y: -.2,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: -.4,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: -.6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .04,
        y: -.8,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.08,
        y: .35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: -.1,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }]
};

export default ships;