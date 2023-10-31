import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDREADNOUGHT_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 44,
    size: 1100,
    cost: 9700,
    speed: 2.25,
    turnSpeed: .025,
    shield: 30000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.RECUSANTDREADNOUGHT_CIS = {
    name: "Recusant Destroyer",
    asset: "RECUSANTDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 38,
    size: 1200,
    cost: 6500,
    speed: 3,
    turnSpeed: .01,
    shield: 15000,
    shieldRegen: 6,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .95,
            weapon: {
                ...weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
                damage: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD.damage * 3,
                bypassShield: false
            }
        }, {
            x: 0,
            y: .9,
            weapon: weapons.ION_CANNON_ULTRA
        }];

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.05 - .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .05 + .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.025 - .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .025 + .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.03 - .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY
            }, {
                x: .03 + .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY
            }, {
                x: -.03 - .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY
            }, {
                x: .03 + .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

export default ships;