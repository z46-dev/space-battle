import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CONSOLAR_REPUBLIC = {
    name: "Consolar Corvette",
    asset: "CONSOLARHUTT.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 70,
    cost: 100,
    speed: 11,
    turnSpeed: .04,
    shield: 250,
    shieldRegen: .25,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .9,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: -.9,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.CR90_REPUBLIC = {
    name: "CR-90",
    asset: "CR90.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 95,
    cost: 230,
    speed: 12,
    turnSpeed: .045,
    shield: 540,
    shieldRegen: .54,
    hardpoints: [{
        x: 0,
        y: .6,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .2,
        weapon: {
            ...weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
            speed: weapons.BLUE_DOUBLE_TURBOLASER_CANNON.speed * 1.25,
            damage: weapons.BLUE_DOUBLE_TURBOLASER_CANNON.damage * 2,
            range: weapons.BLUE_DOUBLE_TURBOLASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: 0,
        y: -.2,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 1.15 | 0 } }))
};

export default ships;