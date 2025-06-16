import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ZENITH_CRUISER_OLDREP = {
    name: "Zenith Cruiser",
    asset: "ZENITHCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 450,
    cost: 3540,
    speed: 4,
    turnSpeed: .0075,
    shield: 2000,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: .075,
        y: .8,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.075,
        y: .8,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .125,
        y: -.7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: -.125,
        y: -.7,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 125
    }, {
        x: 0,
        y: -.85,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 3,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 3,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

ships.HAMMERHEAD_CRUISER_OLDREP = {
    name: "Hammerhead Cruiser",
    asset: "HAMMERHEAD_CRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 13,
    size: 500,
    cost: 2000,
    speed: 4,
    turnSpeed: .01,
    shield: 2200,
    shieldRegen: 2.2,
    hardpoints: [{
        x: .002,
        y: .882,
        weapon: weapons.GREEN_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 175
    }, {
        x: -.098,
        y: .662,
        weapon: weapons.GREEN_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 175
    }, {
        x: -.113,
        y: .363,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 175
    }, {
        x: -.181,
        y: -.154,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: -.2,
        y: -.634,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
    }, {
        x: .098,
        y: .662,
        weapon: weapons.GREEN_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 175
    }, {
        x: .113,
        y: .363,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 175
    }, {
        x: .181,
        y: -.154,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .2,
        y: -.634,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.6 | 0,
            reload: e.weapon.reload * .85
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

export default ships;