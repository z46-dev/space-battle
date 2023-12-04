import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.C9979_CIS = {
    name: "C9979 Picket Carrier",
    asset: "C9979.png",
    classification: shipTypes.Frigate,
    population: 2,
    size: 150,
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
    cost: 2200,
    speed: 4,
    turnSpeed: .02,
    shield: 2100,
    shieldRegen: 2.1,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY
    }, {
        x: -.5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .5,
        y: -.05,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: .1,
        y: 0,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM
    }, {
        x: -.225,
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .225,
        y: .25,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .15,
        y: .6,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.DOUBLE_ION_CANNON
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * .667 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;