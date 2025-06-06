import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.TIEDRONE_DARKEMPIRE = {
    name: "Tie Drone",
    asset: "TIEDRONE.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 14,
    cost: 4,
    speed: 19,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 50
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }]
};

ships.TIEBOMBER_DARKEMPIRE = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .0725,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 1,
        shotDelay: 75
    }]
};

ships.TIEINTERCEPTOR_DARKEMPIRE = {
    name: "Tie Interceptor Elite",
    asset: "TIEINTERCEPTORRED.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 24,
    turnSpeed: .1,
    shield: 50,
    shieldRegen: .1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.GREEN_FIGHTER_LASER_CANNON,
            health: 60
        },
        shotsAtOnce: 6,
        shotDelay: 75
    }]
};

ships.TIEDEFENDER_DARKEMPIRE = {
    name: "Tie Defender Elite",
    asset: "TIEDEFENDERRED.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 100,
    speed: 22,
    turnSpeed: .2,
    shield: 200,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.GREEN_FIGHTER_LASER_CANNON,
        shotsAtOnce: 6,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: weapons.TIE_DEFENDER_ION_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 3,
        shotDelay: 75
    }]
};

ships.TIEREAPER_DARKEMPIRE = {
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

ships.TIEPUNISHER_DARKEMPIRE = {
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

export default ships;