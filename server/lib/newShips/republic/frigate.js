import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PELTA_REPUBLIC = {
    name: "Pelta Frigate",
    asset: "PELTA.png",
    classification: shipTypes.Frigate,
    population: 7,
    size: 180,
    cost: 640,
    speed: 4,
    turnSpeed: .03,
    shield: 2000,
    shieldRegen: 2,
    tenderAbility: {
        frequency: 2,
        power: 2
    },
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

ships.ARQUITENS_REPUBLIC = {
    name: "Arquitens",
    asset: "ARQUITENS.png",
    classification: shipTypes.HeavyFrigate,
    population: 10,
    size: 275,
    cost: 900,
    speed: 6,
    turnSpeed: .02,
    shield: 2100,
    shieldRegen: 2.1,
    hardpoints: [{
        x: -.225,
        y: .275,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .225,
        y: .275,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.275,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .275,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .6,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.CARRACK_REPUBLIC = {
    name: "Carrack Cruiser",
    asset: "CARRACK.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 170,
    cost: 1200,
    speed: 4.5,
    turnSpeed: .02,
    shield: 1750,
    shieldRegen: 1.75,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .2,
        weapon: weapons.ION_CANNON
    }, {
        x: .125,
        y: .2,
        weapon: weapons.ION_CANNON
    }, {
        x: -.1,
        y: -.4,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }, {
        x: .1,
        y: -.4,
        weapon: weapons.BLUE_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

export default ships;