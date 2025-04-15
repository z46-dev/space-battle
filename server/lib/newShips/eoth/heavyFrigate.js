import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ORMOS_EOTH = {
    name: "Ormos Frigate",
    asset: "ORMOS.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 450,
    cost: 3200,
    speed: 5,
    turnSpeed: .015,
    shield: 4300,
    shieldRegen: 4,
    hardpoints: [{
        x: -.125,
        y: -.045,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .125,
        y: -.045,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .13,
        y: -.17,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: -.13,
        y: -.17,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: -.31,
        y: -.7,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .31,
        y: -.7,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: -.318,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: .215,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.11,
        y: .5,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .11,
        y: .5,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }].map(hp => ({
        ...hp, weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 1.8 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.CHAF_EOTH = {
    name: "Chaf Cruiser",
    asset: "CHAF.png",
    classification: shipTypes.HeavyFrigate,
    population: 19,
    size: 520,
    cost: 3500,
    speed: 4,
    turnSpeed: .01,
    shield: 5400,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: .73,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: .45,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: -.025,
        y: .205,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: .025,
        y: .205,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: -.025,
        y: .12,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: .025,
        y: .12,
        weapon: weapons.BLACK_RAPID_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: -.025,
        y: .035,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .025,
        y: .035,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: -.2,
        y: -.28,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: -.14,
        y: -.35,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .14,
        y: -.35,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .2,
        y: -.28,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: 0,
        y: -.9,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 120
    }].map(hp => ({
        ...hp, weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 2.3 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.EFODIO_EOTH = {
    name: "Efodio Carrier",
    asset: "EFODIO.png",
    classification: shipTypes.HeavyFrigate,
    population: 25,
    size: 750,
    cost: 5400,
    speed: 1,
    turnSpeed: .001,
    shield: 13000,
    shieldRegen: 1,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.2,
                y: .7 - (i * .2),
                weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 40
            }, {
                x: .2,
                y: .7 - (i * .2),
                weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 40
            });
        }

        return output.map(hp => ({
            ...hp, weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 4 | 0
            }
        }));
    }()),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "KRSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "SYCA_EOTH"
    }]
};

export default ships;