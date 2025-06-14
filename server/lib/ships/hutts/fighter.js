import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.A9VIGILANCE_HUTT = {
    name: "A-9 Vigilance",
    asset: "A9VIGILANCE.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 0,
    speed: 21,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_RAPID_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.SKIPRAYBLASTBOAT_HUTT = {
    name: "Skipray Blastboat",
    asset: "SKIPRAYBLASTBOAT.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 45,
    cost: 0,
    speed: 16,
    turnSpeed: .04,
    shield: 150,
    shieldRegen: .15,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * .2
        }
    }]
};

ships.CHAOS_FIGHTER_HUTT = {
    name: "Chaos Fighter",
    asset: "CHAOS_FIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 0,
    speed: 18,
    turnSpeed: .08,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.PURPLE_RAPID_FIGHTER_LASER_CANNON,
            health: 60
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.CHAOS_BOMBER_HUTT = {
    name: "Chaos Bomber",
    asset: "CHAOS_BOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 24,
    cost: 0,
    speed: 16,
    turnSpeed: .06,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.PURPLE_RAPID_FIGHTER_LASER_CANNON,
            health: 60
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            health: 60,
        },
        shotsAtOnce: 4,
        shotDelay: 200
    }]
};

export default ships;