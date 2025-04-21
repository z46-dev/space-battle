import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BAOMU_EOTH = {
    name: "Baomu Tender",
    asset: "BAOMU.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 320,
    cost: 2400,
    speed: 3,
    turnSpeed: .01,
    shield: 2500,
    shieldRegen: 2.5,
    tenderAbility: {
        frequency: 1.2,
        power: 1
    },
    hardpoints: [{
        x: -.35,
        y: .41,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .58,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .35,
        y: .41,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .32,
        y: -.74,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.32,
        y: -.74,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.BLACK_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 40
    }].map(h => ({
        ...h,
        weapon: {
            ...h.weapon,
            health: h.weapon.health * 1.185 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "SYCA_EOTH"
    }]
};

ships.FRUORO_EOTH = {
    name: "Fruoro",
    asset: "FRUORO.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 330,
    cost: 850,
    speed: 5,
    turnSpeed: .02,
    shield: 1950,
    shieldRegen: 1.95,
    hardpoints: [{
        x: -.07,
        y: -.35,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .07,
        y: -.35,
        weapon: weapons.BLACK_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .07,
        y: -.52,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.07,
        y: -.52,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.13,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .13,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .93,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 1.25 | 0
        }
    }))
};

ships.KYNIGOS_EOTH = {
    name: "Kynigos Frigate",
    asset: "KYNIGOS.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 400,
    cost: 2300,
    speed: 4,
    turnSpeed: .02,
    shield: 3200,
    shieldRegen: 3.2,
    hardpoints: [{
        x: -.19,
        y: .11,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .19,
        y: .11,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .71,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .71,
        weapon: weapons.BLACK_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .17,
        y: -.31,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.17,
        y: -.31,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.18,
        y: -.89,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .18,
        y: -.89,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .4,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 1.45 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "KRSSIS_EOTH"
    }]
};

ships.PROLIPSI_EOTH = {
    name: "Prolipsi Interdictor",
    asset: "PROLIPSI.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 400,
    cost: 2400,
    speed: 4,
    turnSpeed: .01,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: -.007,
        y: .629,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: -.217,
        y: .323,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: .220,
        y: .329,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: .260,
        y: -.074,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: .279,
        y: -.398,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: .006,
        y: -.674,
        weapon: weapons.BLACK_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }, {
        x: -.251,
        y: -.539,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 4 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "NSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "KRSSIS_EOTH"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "SYCA_EOTH"
    }]
};

export default ships;