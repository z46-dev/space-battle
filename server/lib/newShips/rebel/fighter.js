import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.XWING_REBEL = {
    name: "X-Wing",
    asset: "XWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 17.5,
    cost: 5,
    speed: 20,
    turnSpeed: .05,
    shield: 25,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 4
        },
        shotsAtOnce: 8,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.YWING_REBEL = {
    name: "Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 20,
    cost: 8,
    speed: 15,
    turnSpeed: .025,
    shield: 65,
    shieldRegen: 1.25,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_ION_CANNON,
            health: weapons.FIGHTER_ION_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * .5,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 1.25,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 1.5,
            health: weapons.FIGHTER_PROTON_BOMB.health * 1.5
        },
        shotsAtOnce: 2,
        shotDelay: 125
    }]
};

ships.AWING_REBEL = {
    name: "A-Wing",
    asset: "AWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 17,
    cost: 6,
    speed: 22.5,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: .9,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            reload: weapons.RED_FIGHTER_LASER_CANNON.reload * .5,
            damage: weapons.RED_FIGHTER_LASER_CANNON.damage * 1.5,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 1.5
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.BWING_REBEL = {
    name: "B-Wing",
    asset: "BWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 22,
    cost: 6,
    speed: 22.5,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: .9,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

export default ships;