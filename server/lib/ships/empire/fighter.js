import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TIEFIGHTER_EMPIRE = {
    name: "Tie Fighter",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 18,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 75
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }]
};

ships.TIEBOMBER_EMPIRE = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .065,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 5,
        shotDelay: 140
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 140
    }]
};

ships.TIEINTERCEPTOR_EMPIRE = {
    name: "Tie Interceptor",
    asset: "TIEINTERCEPTOR.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 22,
    turnSpeed: .09,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_RAPID_FIGHTER_LASER_CANNON,
            health: 66
        },
        shotsAtOnce: 4,
        shotDelay: 25
    }]
};

ships.TIEDEFENDER_EMPIRE = {
    name: "Tie Defender",
    asset: "TIEDEFENDER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 25,
    speed: 19,
    turnSpeed: .1,
    shield: 150,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.TIE_DEFENDER_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 20
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 6,
        shotDelay: 250
    }]
};

ships.TIEREAPER_EMPIRE = {
    name: "Tie Reaper",
    asset: "TIEREAPER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 21,
    cost: 6,
    speed: 16,
    turnSpeed: .1,
    shield: 50,
    shieldRegen: .05,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_LASER_CANNON,
            health: 250,
            reload: weapons.GREEN_LASER_CANNON.reload * .075 | 0,
            range: weapons.GREEN_LASER_CANNON.range * .2 | 0
        }
    }]
};

ships.TIEPUNISHER_EMPIRE = {
    name: "Tie Punisher",
    asset: "TIE_PUNISHER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 22,
    cost: 12,
    speed: 10,
    turnSpeed: .04,
    shield: 125,
    shieldRegen: .025,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            explosionRange: weapons.FIGHTER_PROTON_BOMB.explosionRange * 2,
            explosionDamage: weapons.FIGHTER_PROTON_BOMB.explosionDamage * 1.5
        },
        shotsAtOnce: 8,
        shotDelay: 200
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 30 | 0 } }))
};

ships.TITAN_SQUADRON_EMPIRE = {
    name: "Titan Squadron",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 23,
    turnSpeed: .05,
    shield: 500,
    shieldRegen: 5,
    tenderAbility: {
        frequency: 1,
        power: 1
    },
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 200,
            reload: weapons.GREEN_FIGHTER_LASER_CANNON.reload * .5 | 0,
            range: weapons.GREEN_FIGHTER_LASER_CANNON.range * 1.5 | 0,
            speed: weapons.GREEN_FIGHTER_LASER_CANNON.speed * 1.5 | 0,
            damage: weapons.GREEN_FIGHTER_LASER_CANNON.damage * 2 | 0
        },
        shotsAtOnce: 4,
        shotDelay: 30
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON,
        shotsAtOnce: 4,
        shotDelay: 30
    }]
};

export default ships;