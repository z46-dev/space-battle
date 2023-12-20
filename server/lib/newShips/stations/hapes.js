import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MIYTILFIGHTER_HAPAN = {
    name: "Miy'til Starfighter",
    asset: "MIYTILFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 16,
    cost: 3,
    speed: 22,
    turnSpeed: .08,
    shield: 100,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_RAPID_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO
    }]
};

ships.BETACRUISER_HAPAN = {
    name: "Beta Cruiser",
    asset: "BETACRUISER.png",
    classification: shipTypes.Frigate,
    population: 4,
    size: 150,
    cost: 1200,
    speed: 4.5,
    turnSpeed: .01,
    shield: 2000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: -.3,
        y: -.3,
        weapon: weapons.ION_CANNON_HEAVY
    }, {
        x: .3,
        y: -.3,
        weapon: weapons.ION_CANNON_HEAVY
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2,
            reload: e.weapon.reload * .8,
            damage: e.weapon.damage * 1.5
        }
    }))
};

ships.NOVACRUISER_HAPAN = {
    name: "Nova Cruiser",
    asset: "NOVACRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 8,
    size: 220,
    cost: 2500,
    speed: 3.7,
    turnSpeed: .009,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.25,
        y: -.2,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .25,
        y: -.2,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.25,
        y: -.6,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .25,
        y: -.6,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.05,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.05,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2,
            reload: e.weapon.reload * .8,
            damage: e.weapon.damage * 1.5
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

ships.BATTLEDRAGON_HAPAN = {
    name: "Hapan Battle Dragon",
    asset: "HAPANBATTLEDRAGON.png",
    classification: shipTypes.Capital,
    population: 12,
    size: 300,
    cost: 3200,
    speed: 3,
    turnSpeed: .0025,
    shield: 5000,
    shieldRegen: .05,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_TURBOLASER_CANNON,
            reload: 1.25
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ION_CANNON_MEDIUM,
            reload: 1.25
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_LASER_CANNON,
            reload: 1.25
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
            health: e.weapon.health * 3.5
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;