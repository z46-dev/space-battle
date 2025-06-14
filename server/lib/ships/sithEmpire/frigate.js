import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.DERRIPHAN_BATTLESHIP_SITHEMP = {
    name: "Derriphan Battleship",
    asset: "DERRIPHAN_BATTLESHIP.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 300,
    cost: 600,
    speed: 4,
    turnSpeed: .02,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: .83,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: -.035,
        y: .242,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: .035,
        y: .242,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: -.05,
        y: -.41,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: .05,
        y: -.41,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: 0,
        y: -.8,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }]
};

ships.SITH_PERSONNEL_CARRIER_SITHEMP = {
    name: "Sith Personnel Carrier",
    asset: "SITH_PERSONNEL_CARRIER.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 375,
    cost: 760,
    speed: 3,
    turnSpeed: .018,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: -.251,
        y: .439,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .251,
        y: .439,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: -.260,
        y: -.019,
        weapon: weapons.ION_CANNON
    }, {
        x: .253,
        y: -.008,
        weapon: weapons.ION_CANNON
    }, {
        x: -.252,
        y: -.521,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .248,
        y: -.530,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .002,
        y: -.835,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }, {
        x: -.002,
        y: .290,
        weapon: weapons.RED_LASER_CANNON_HEAVY
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }]
};

ships.HERAKLON_TRANSPORT_SITHEMP = {
    name: "Heraklon Support Transport",
    asset: "HERAKLON_TRANSPORT.png",
    classification: shipTypes.Frigate,
    population: 15,
    size: 200,
    cost: 1200,
    speed: 5,
    turnSpeed: .03,
    shield: 500,
    shieldRegen: 5,
    tenderAbility: {
        frequency: 3,
        power: 1
    },
    hardpoints: [{
        x: -.098,
        y: .776,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .096,
        y: .773,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .006,
        y: -.595,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON
    }]
};

ships.HERAKLON_MISSILE_BOAT_SITHEMP = {
    name: "Heraklon Missile Boat",
    asset: "HERAKLON_MISSILEBOAT.png",
    classification: shipTypes.Frigate,
    population: 15,
    size: 200,
    cost: 1200,
    speed: 5,
    turnSpeed: .03,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: -.084,
        y: .784,
        weapon: weapons.RED_LASER_CANNON
    }, {
        x: .076,
        y: .792,
        weapon: weapons.RED_LASER_CANNON
    }, {
        x: -.248,
        y: -.714,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 500
    }, {
        x: .219,
        y: -.715,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 500
    }, {
        x: .002,
        y: -.574,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 500
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 1.75 | 0
        }
    }))
};

export default ships;