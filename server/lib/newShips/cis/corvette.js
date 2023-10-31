import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.LUPUSMISSILEFRIGATE_CIS = {
    name: "Lupus Missile Frigate",
    asset: "LUPUSMISSILEFRIGATE.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 85,
    cost: 400,
    speed: 9,
    turnSpeed: .045,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON_MEDIUM,
            health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 3,
            reload: weapons.DOUBLE_ION_CANNON_MEDIUM.reload * .6
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_CONCUSSION_MISSILE,
            health: weapons.ASSAULT_CONCUSSION_MISSILE.health * 3,
            reload: weapons.ASSAULT_CONCUSSION_MISSILE.reload * .8
        },
        shotsAtOnce: 6,
        shotDelay: 120
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_PROTON_ROCKET,
            health: weapons.ASSAULT_PROTON_ROCKET.health * 3,
            reload: weapons.ASSAULT_PROTON_ROCKET.reload * .8
        },
        shotsAtOnce: 4,
        shotDelay: 120
    }]
};

ships.DIAMOND_CIS = {
    name: "Diamond Cruiser",
    asset: "DIAMONDCRUISER.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 100,
    cost: 350,
    speed: 5.6,
    turnSpeed: .015,
    shield: 1200,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.RED_TURBOLASER_CANNON
    }, {
        x: -.8,
        y: -.5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .8,
        y: -.5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.DOUBLE_ION_CANNON
    }]
};

export default ships;