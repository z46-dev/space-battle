import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PELTA_REPUBLIC = {
    name: "Pelta Frigate",
    asset: "PELTA.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 160,
    cost: 640,
    speed: 4.2,
    turnSpeed: .03,
    shield: 2000,
    shieldRegen: 4,
    hardpoints: [{
        x: -.2,
        y: .85,
        weapon: {
            ...weapons.BLUE_RAPID_LASER_CANNON,
            speed: weapons.BLUE_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.BLUE_RAPID_LASER_CANNON.damage * 2,
            range: weapons.BLUE_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .2,
        y: .85,
        weapon: {
            ...weapons.BLUE_RAPID_LASER_CANNON,
            speed: weapons.BLUE_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.BLUE_RAPID_LASER_CANNON.damage * 2,
            range: weapons.BLUE_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.125,
        y: .2,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .125,
        y: .2,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.25,
        y: -.6,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .25,
        y: -.6,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }]
};


export default ships;