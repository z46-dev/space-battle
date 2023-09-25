import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CR90_REBEL = {
    name: "CR-90",
    asset: "CR90.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 200,
    speed: 12,
    turnSpeed: .045,
    shield: 600,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: .6,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .2,
        weapon: {
            ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
            speed: weapons.RED_DOUBLE_TURBOLASER_CANNON.speed * 1.25,
            damage: weapons.RED_DOUBLE_TURBOLASER_CANNON.damage * 2,
            range: weapons.RED_DOUBLE_TURBOLASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: 0,
        y: -.2,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }]
};

ships.DP20_REBEL = {
    name: "DP-20",
    asset: "DP20REBEL.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 65,
    cost: 225,
    speed: 10,
    turnSpeed: .05,
    shield: 800,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.4,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 80
    }]
};

ships.MARAUDERMISSILECRUISER_REBEL = {
    name: "Marauder Missile Cruiser",
    asset: "MARAUDERCORVETTE.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 105,
    cost: 500,
    speed: 7.25,
    turnSpeed: .05,
    shield: 1100,
    shieldRegen: 2,
    hardpoints: [{
        x: -.55,
        y: -.3,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.55,
        y: -.3,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .6,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

export default ships;