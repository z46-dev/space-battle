import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MAGNETAR_HAPAN = {
    name: "Magnetar Cruiser",
    asset: "MAGNETARCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 300,
    cost: 3120,
    speed: 3,
    turnSpeed: .0125,
    shield: 5560,
    shieldRegen: 5,
    hardpoints: [{
        x: -.15,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.375,
        y: .2,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .375,
        y: .2,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.2,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .5,
        y: -.2,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
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

ships.CORONAL_HAPAN = {
    name: "Coronal Tender",
    asset: "CORONAL_HAPAN.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 400,
    cost: 4590,
    speed: 3.4,
    turnSpeed: .008,
    shield: 7673,
    shieldRegen: 8,
    tenderAbility: {
        frequency: 1,
        power: 1
    },
    hardpoints: [{
        x: -.3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            range: e.weapon.range * 2,
            damage: e.weapon.damage * 1.5,
            health: e.weapon.health * 9.5 + .5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 1,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.MIST_HAPAN = {
    name: "Mist Carrier",
    asset: "MIST_CARRIER_HAPAN.png",
    classification: shipTypes.HeavyFrigate,
    population: 29,
    size: 600,
    cost: 7488,
    speed: 2.6,
    turnSpeed: .008,
    shield: 9800,
    shieldRegen: 9,
    shieldRegenAbility: {
        cooldown: .7,
        regen: 1.5
    },
    hardpoints: [{
        x: -.5,
        y: .6,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: .6,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 9.5 + .5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;