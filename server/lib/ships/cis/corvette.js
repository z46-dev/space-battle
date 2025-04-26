import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.LUPUSMISSILEFRIGATE_CIS = {
    name: "Lupus Missile Frigate",
    asset: "LUPUSMISSILEFRIGATE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 85,
    cost: 380,
    speed: 9,
    turnSpeed: .045,
    shield: 350,
    shieldRegen: .35,
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
    population: 2,
    size: 100,
    cost: 350,
    speed: 7,
    turnSpeed: .015,
    shield: 300,
    shieldRegen: .3,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.RED_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.8,
        y: -.5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 30
    }, {
        x: .8,
        y: -.5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 30
    }, {
        x: 0,
        y: 0,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 30
    }]
};

ships.HARDCELL_CIS = {
    name: "Hardcell Transport",
    asset: "HARDCELL.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 76,
    cost: 180,
    speed: 8,
    turnSpeed: .0275,
    shield: 200,
    shieldRegen: .2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            health: weapons.RED_ANTI_FIGHTER_LASER_CANNON.health * .5,
            reload: weapons.RED_ANTI_FIGHTER_LASER_CANNON.reload * .6
        },
        shotsAtOnce: 2,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_LASER_CANNON,
            health: weapons.RED_LASER_CANNON.health * .5,
            reload: weapons.RED_LASER_CANNON.reload * .6
        },
        shotsAtOnce: 2,
        shotDelay: 45
    }, {
        x: -.5,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_CONCUSSION_MISSILE,
            health: weapons.ASSAULT_CONCUSSION_MISSILE.health * .5,
            reload: weapons.ASSAULT_CONCUSSION_MISSILE.reload * .8
        },
        shotsAtOnce: 5,
        shotDelay: 120
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.RED_LASER_CANNON,
            health: weapons.RED_LASER_CANNON.health * .5,
            reload: weapons.RED_LASER_CANNON.reload * .6
        },
        shotsAtOnce: 2,
        shotDelay: 45
    }]
};

export default ships;