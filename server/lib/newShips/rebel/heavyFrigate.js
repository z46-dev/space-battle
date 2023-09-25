import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC50_REBEL = {
    name: "MC-50",
    asset: "MC50.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 600,
    cost: 1000,
    speed: 4,
    turnSpeed: .035,
    shield: 6000,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.15,
            y: .75,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .15,
            y: .75,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.3,
            y: .55,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .3,
            y: .55,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.4,
            y: .4,
            weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .4,
            y: .4,
            weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2,
                y: .3 - .2 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .2,
                y: .3 - .2 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: -.2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: .2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "YWING_REBEL"
    }]
};

ships.MC75_REBEL = {
    name: "MC-75",
    asset: "MC75.png",
    classification: shipTypes.HeavyFrigate,
    population: 21,
    size: 500,
    cost: 2400,
    speed: 3,
    turnSpeed: .025,
    shield: 12000,
    shieldRegen: 4,
    hardpoints: [{
        x: 0,
        y: .1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 100
    }, {
        x: 0,
        y: .875,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .7,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .7,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .35,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .35,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .15,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .15,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: -.025,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: -.025,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.25,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.25,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1125,
        y: -.5,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1125,
        y: -.5,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.09,
        y: -.75,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .09,
        y: -.75,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "BWING_REBEL"
    }]
};

export default ships;