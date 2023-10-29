import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ARC170_REPUBLIC = {
    name: "ARC-170",
    asset: "ARC170.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 6,
    speed: 18,
    turnSpeed: .08,
    shield: 15,
    shieldRegen: 0.5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_LASER_CANNON_HEAVY,
            reload: weapons.BLUE_LASER_CANNON_HEAVY.reload * 1.5
        }
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.YWING_REPUBLIC = {
    name: "Republic Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 22,
    cost: 8,
    speed: 14,
    turnSpeed: .07,
    shield: 25,
    shieldRegen: 0.5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 200
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 200
    }]
};

ships.NTB630_REPUBLIC = {
    name: "NTB-630 Naval Bomber",
    asset: "NTB630.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 26,
    cost: 12,
    speed: 12,
    turnSpeed: .06,
    shield: 50,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_RAPID_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 200
    }]
};

export default ships;