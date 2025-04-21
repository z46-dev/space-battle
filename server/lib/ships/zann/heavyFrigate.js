import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.BROADSIDECRUISER_ZANN = {
    name: "Broadside Cruiser",
    asset: "BROADSIDECRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 24,
    size: 280,
    cost: 4500,
    speed: 2.8,
    turnSpeed: .01,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: [{
        x: -.05,
        y: .35,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .05,
        y: .35,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.15,
        y: .35,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .15,
        y: .35,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.2,
        y: .925,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: .925,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.5,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.5,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.FREEVIRGILLIABUNKERBUSTER_ZANN = {
    name: "Free Virgillia Bunker Buster",
    asset: "FREEVIRGILLIABUNKERBUSTER.png",
    classification: shipTypes.HeavyFrigate,
    population: 28,
    size: 300,
    cost: 6000,
    speed: 2.25,
    turnSpeed: .0175,
    shield: 6000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2 - .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.YELLOW_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .2 + .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.YELLOW_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: 0,
                y: .8 - .4 * i,
                weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: 0,
                y: .6 - .4 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 200
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 3
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }]
};

export default ships;