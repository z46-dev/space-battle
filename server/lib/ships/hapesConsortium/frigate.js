import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BETACRUISER_HAPAN = {
    name: "Beta Cruiser",
    asset: "BETACRUISER.png",
    classification: shipTypes.Frigate,
    population: 5,
    size: 150,
    cost: 1200,
    speed: 4.5,
    turnSpeed: .01,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 60
    }, {
        x: -.8,
        y: -.8,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .8,
        y: -.8,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    }))
};

ships.NOVACRUISER_HAPAN = {
    name: "Nova Cruiser",
    asset: "NOVACRUISER.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 220,
    cost: 2500,
    speed: 3.7,
    turnSpeed: .009,
    shield: 4000,
    shieldRegen: 4,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: -.2,
        y: -.35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .2,
        y: -.35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: -.65,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .65,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    }))
};

ships.STELLA_HAPAN = {
    name: "Stella Frigate",
    asset: "STELLA_HAP.png",
    classification: shipTypes.Frigate,
    population: 7,
    size: 280,
    cost: 2370,
    speed: 4,
    turnSpeed: .01,
    shield: 4000,
    shieldRegen: 4,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: 0,
        y: .2,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 45
    }, {
        x: 0,
        y: -.3,
        weapon: weapons.BLUE_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .2,
        y: -.7,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 45
    }, {
        x: -.2,
        y: -.7,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: -.15,
        y: .6,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }, {
        x: -.15,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }, {
        x: -.15,
        y: -.6,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }, {
        x: .15,
        y: .6,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }, {
        x: .15,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }, {
        x: .15,
        y: -.6,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 500
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    }))
};

ships.CHARUBAH_HAPAN = {
    name: "Charubah Frigate",
    asset: "CHARUBAHFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 13,
    size: 270,
    cost: 3000,
    speed: 3.6,
    turnSpeed: .0125,
    shield: 4560,
    shieldRegen: 4,
    hardpoints: [{
        x: -.1,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .1,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.25,
        y: .15,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .25,
        y: .15,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.375,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .375,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4,
            reload: e.weapon.reload * .2
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;