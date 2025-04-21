import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACCLIMATOR_REPUBLIC = {
    name: "Acclimator Assault Cruiser",
    asset: "ACCLIMATOR.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 300,
    cost: 2500,
    speed: 3,
    turnSpeed: .01,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 5,
            shotDelay: 100
        }, {
            x: -.55,
            y: -.35,
            weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            x: .55,
            y: -.35,
            weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 75
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2 - .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .2 + .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "ARC170_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "YWING_REPUBLIC"
    }]
};

ships.DREADNOUGHTHEAVYCRUISER_REPUBLIC = {
    name: "Dreadnought Heavy Cruiser",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 290,
    cost: 2850,
    speed: 3,
    turnSpeed: .015,
    shield: 3500,
    shieldRegen: 3.5,
    hardpoints: [{
        x: -.075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: .4,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .175,
        y: 0,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "V19TORRENT_REPUBLIC"
    }]
};

export default ships;