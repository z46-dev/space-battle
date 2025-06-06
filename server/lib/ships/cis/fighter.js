import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VULTUREDROID_CIS = {
    name: "Vulture Droid",
    asset: "VULTUREDROID.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 3,
    speed: 18,
    turnSpeed: .0875,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: 30
        },
        shotsAtOnce: 2,
        shotDelay: 30
    }]
};

ships.HYENABOMBER_CIS = {
    name: "Hyena Bomber",
    asset: "HYENABOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 20,
    cost: 5,
    speed: 14,
    turnSpeed: .07,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: 30
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 3,
        shotDelay: 350
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 120,
        launchAngle: Math.PI / 2
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 120,
        launchAngle: -Math.PI / 2
    }]
};

ships.DROIDTRIFIGHTER_CIS = {
    name: "Tri-Fighter",
    asset: "DROIDTRIFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 6,
    speed: 21,
    turnSpeed: .08,
    shield: 30,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_RAPID_FIGHTER_LASER_CANNON,
            health: 25
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: 15
        },
        shotsAtOnce: 3,
        shotDelay: 256
    }]
};

ships.DROIDGUNSHIP_CIS = {
    name: "Droid Gunship",
    asset: "DROIDGUNSHIP.png",
    classification: shipTypes.FighterBomber,
    population: 0,
    size: 40,
    cost: 20,
    speed: 15,
    turnSpeed: .04,
    shield: 75,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.6,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .6,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.6,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .6,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 100
    }].map(hardpoint => ({
        ...hardpoint,
        weapon: {
            ...hardpoint.weapon,
            health: hardpoint.weapon.health * .4
        }
    }))
};

export default ships;