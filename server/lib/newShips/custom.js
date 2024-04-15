import { shipTypes } from "../constants.js";
import * as weapons from "../weapons.js";

const ships = {};

ships.CHIMERA_DESTROYER = {
    name: "Chimera-Class Destroyer",
    asset: "CHIMERA_DESTROYER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 525,
    cost: 7250,
    speed: 4.25,
    turnSpeed: .015,
    shield: 5430,
    shieldRegen: 30,
    hardpoints: [{ // FRONT
        x: -.175,
        y: .725,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.175,
        y: .575,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .175,
        y: .725,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .175,
        y: .575,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // BACK
        x: -.125,
        y: -.8625,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.125,
        y: -.775,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: .125,
        y: -.8625,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .125,
        y: -.775,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 120
    }, { // MIDDLE
        x: 0,
        y: -0.04625,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: -.155,
        y: .01,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.11,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.155,
        y: -.55,
        weapon: weapons.BLACK_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: .01,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.11,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .155,
        y: -.55,
        weapon: weapons.BLACK_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4.5 | 0,
            range: e.weapon.range * 2.5 | 0,
            speed: e.weapon.speed * 2 | 0,
            damage: e.weapon.damage * 1.334 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "SNUB1"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "BLAST2"
    }]
};

ships.SNUB1 = {
    name: "Snub-1",
    asset: "SNUB1.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 8,
    speed: 25,
    turnSpeed: .09,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 150
        },
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 150
    }]
};

ships.BLAST2 = {
    name: "Blast-2",
    asset: "SNUB1.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 25,
    cost: 8,
    speed: 16,
    turnSpeed: .04,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLACK_FIGHTER_LASER_CANNON,
            health: 150
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_ION_CANNON,
            health: 150
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 8,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 120
    }]
};

export default ships;