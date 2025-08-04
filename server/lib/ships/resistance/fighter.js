import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.XWING_RESISTANCE = {
    name: "T-67 X-Wing",
    asset: "XWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 5,
    speed: 20,
    turnSpeed: .085,
    shield: 15,
    shieldRegen: .015,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.YWING_RESISTANCE = {
    name: "Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 24,
    cost: 8,
    speed: 15,
    turnSpeed: .075,
    shield: 20,
    shieldRegen: .02,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_ION_CANNON,
            health: weapons.FIGHTER_ION_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * .5,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 1.25,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 1.5,
            health: weapons.FIGHTER_PROTON_BOMB.health * 1.5
        },
        shotsAtOnce: 2,
        shotDelay: 125
    }]
};

ships.AWING_RESISTANCE = {
    name: "A-Wing",
    asset: "AWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 14,
    cost: 6,
    speed: 24,
    turnSpeed: .1,
    shield: 10,
    shieldRegen: .01,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            reload: weapons.RED_FIGHTER_LASER_CANNON.reload * .5,
            damage: weapons.RED_FIGHTER_LASER_CANNON.damage * 1.5,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 1.5
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};


ships.MG100STARFORTRESS_RESISTANCE = {
    name: "MG-100 StarFortress SF-17",
    asset: "MG100STARFORTRESS.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 55,
    cost: 16,
    speed: 7.5,
    turnSpeed: .025,
    shield: 125,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 2
        },
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON,
            health: weapons.DOUBLE_ION_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 2
        },
        shotsAtOnce: 3,
        shotDelay: 75,
        launchAngle: Math.PI / 2
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 2
        },
        shotsAtOnce: 3,
        shotDelay: 75,
        launchAngle: -Math.PI / 2
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * .75,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 2,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 3,
            health: weapons.FIGHTER_PROTON_BOMB.health * 6,
            explosionRange: 900
        },
        shotsAtOnce: 12,
        shotDelay: 75
    }]
};

ships.FALCON_RESISTANCE = {
    name: "YT-1300 Light Freighter",
    asset: "FALCON.png",
    classification: shipTypes.FighterBomber,
    population: 5,
    size: 50,
    cost: 600,
    speed: 21,
    turnSpeed: .0667,
    shield: 500,
    shieldRegen: .05,
    tenderAbility: {
        frequency: 1,
        power: .15
    },
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.RED_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 250
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 250
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2
        }
    }))
};

export default ships;