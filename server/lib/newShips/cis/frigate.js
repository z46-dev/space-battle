import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.C9979_CIS = {
    name: "C9979 Picket Carrier",
    asset: "C9979.png",
    classification: shipTypes.Frigate,
    population: 4,
    size: 149,
    cost: 600,
    speed: 3,
    turnSpeed: .008,
    shield: 1800,
    shieldRegen: 1.8,
    hardpoints: [{
        x: -.8,
        y: .25,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 3,
            reload: weapons.RED_DOUBLE_LASER_CANNON.reload * .3
        }
    }, {
        x: .8,
        y: .25,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 3,
            reload: weapons.RED_DOUBLE_LASER_CANNON.reload * .3
        }
    }, {
        x: -.8,
        y: -.25,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON,
            health: weapons.DOUBLE_ION_CANNON.health * 3
        }
    }, {
        x: .8,
        y: -.25,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON,
            health: weapons.DOUBLE_ION_CANNON.health * 3
        }
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 9,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

ships.MUNIFICENT_CIS = {
    name: "Munificent Frigate",
    asset: "MUNIFICENT.png", // do another with MUNIFICENT2.png
    classification: shipTypes.Frigate,
    population: 10,
    size: 300,
    cost: 1700,
    speed: 3.5,
    turnSpeed: .009,
    shield: 2200,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY
    }, {
        x: -.5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: .5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: -.1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: .1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: -.225,
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: .225,
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 90
    }, {
        x: -.15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 45
    }, {
        x: .15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 45
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 45
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 45
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 1.3 | 0 } })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 1,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;