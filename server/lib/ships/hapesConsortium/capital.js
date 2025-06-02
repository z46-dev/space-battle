import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BATTLEDRAGON_HAPAN = {
    name: "Hapan Battle Dragon",
    asset: "HAPANBATTLEDRAGON.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 300,
    cost: 5700,
    speed: 3,
    turnSpeed: .0025,
    shield: 6780,
    shieldRegen: .05,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_TURBOLASER_CANNON,
            reload: 2
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ION_CANNON_MEDIUM,
            reload: 2
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_LASER_CANNON,
            reload: 2
        }
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 120
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 12
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.TEREPHON_HAPAN = {
    name: "Terephon Cruiser",
    asset: "TEREPHONCRUISER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 550,
    cost: 6000,
    speed: 3,
    turnSpeed: .0125,
    shield: 7890,
    shieldRegen: 7,
    hardpoints: [{
        x: -.1,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: .55,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: .55,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.25,
        y: -.375,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .25,
        y: -.375,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: -.15,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 6,
        shotDelay: 100
    }, {
        x: .2,
        y: -.15,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 6,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 5
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.NEUTRON_HAPAN = {
    name: "Neutron Cruiser",
    asset: "NEUTRONCRUISER.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 600,
    cost: 9850,
    speed: 2.9,
    turnSpeed: .006,
    shield: 14320,
    shieldRegen: 14,
    hardpoints: [{
        x: -.7,
        y: -.7,
        weapon: weapons.ION_CANNON_ULTRA
    }, {
        x: .7,
        y: -.7,
        weapon: weapons.ION_CANNON_ULTRA
    }, {
        x: -.625,
        y: -.375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .625,
        y: -.375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.325,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .325,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .05,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .15,
        y: .05,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.125,
        y: .45,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .45,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .65,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .65,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.45,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: .3,
        y: -.45,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
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
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;