import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BRUTESUPPORTFRIGATE_HUTT = {
    name: "Brute Hutt Support Frigate",
    asset: "HUTTCORVETTE.png",
    classification: shipTypes.Frigate,
    population: 6,
    size: 240,
    cost: 600,
    speed: 5.5,
    turnSpeed: .02,
    shield: 1400,
    shieldRegen: 2,
    hardpoints: [{
        x: -.4,
        y: .65,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .4,
        y: .65,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.2,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .2,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: .5,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: -.5,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: -.3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 50
    }]
};

ships.JUVARD_HUTT = {
    name: "Juvard Frigate",
    asset: "juvardFrigate.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 210,
    cost: 600,
    speed: 5.5,
    turnSpeed: .02,
    shield: 1300,
    shieldRegen: 1.3,
    hardpoints: [{
        x: -.1,
        y: .7,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .1,
        y: .7,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .1,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.13,
        y: -.5,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .13,
        y: -.5,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 2.25 | 0
        }
    }))
};

ships.BARABBULA_HUTT = {
    name: "Barabbula Frigate",
    asset: "barabbulaFrigate.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 260,
    cost: 890,
    speed: 4.8,
    turnSpeed: .015,
    shield: 1950,
    shieldRegen: 1.9,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 60
    }, {
        x: -.225,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.3,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .3,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.225,
        y: -.2,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: -.2,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.15,
        y: -.7,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: -.7,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 2.334 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

ships.MUNIFICENT_HUTT = templates.frigate.MUNIFICENT({
    color: "PURPLE",
    asset: "MUNIFICENT2.png",
    fighter: "A9VIGILANCE_HUTT"
});

// OLD REPUBLIC ERA HUTTS

ships.JUVARD_ANCIENT_HUTT = {
    name: "Juvard Frigate",
    asset: "juvardFrigate.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 210,
    cost: 650,
    speed: 4,
    turnSpeed: .02,
    shield: 900,
    shieldRegen: .9,
    hardpoints: [{
        x: -.1,
        y: .7,
        weapon: weapons.PURPLE_LASER_CANNON
    }, {
        x: .1,
        y: .7,
        weapon: weapons.PURPLE_LASER_CANNON
    }, {
        x: -.1,
        y: 0,
        weapon: weapons.PURPLE_TURBOLASER_CANNON
    }, {
        x: .1,
        y: 0,
        weapon: weapons.PURPLE_TURBOLASER_CANNON
    }, {
        x: -.13,
        y: -.5,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .13,
        y: -.5,
        weapon: weapons.DOUBLE_ION_CANNON
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 2 | 0
        }
    }))
};

ships.BARABBULA_ANCIENT_HUTT = {
    name: "Barabbula Frigate",
    asset: "barabbulaFrigate.png",
    classification: shipTypes.Frigate,
    population: 14,
    size: 260,
    cost: 1000,
    speed: 4,
    turnSpeed: .015,
    shield: 1600,
    shieldRegen: 1.6,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 250
    }, {
        x: -.225,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.225,
        y: -.2,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: .225,
        y: -.2,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: -.15,
        y: -.7,
        weapon: weapons.ION_CANNON_MEDIUM
    }, {
        x: .15,
        y: -.7,
        weapon: weapons.ION_CANNON_MEDIUM
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 2 | 0
        }
    }))
};

export default ships;