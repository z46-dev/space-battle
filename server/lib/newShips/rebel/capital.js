import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC80A_REBEL = {
    name: "MC-80a Home One Type",
    asset: "HOMEONE.png",
    classification: shipTypes.Capital,
    population: 28,
    size: 1100,
    cost: 4500,
    speed: 2.5,
    turnSpeed: .02,
    shield: 14000,
    shieldRegen: 6,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: [-.05, -.15, -.15, -.05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.05, .15, .15, .05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.1, -.1, -.025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_LASER_CANNON,
                    health: weapons.RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .1, .1, .025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_LASER_CANNON,
                    health: weapons.RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.05, -.05, -.025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
                    health: weapons.RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .05, .05, .025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
                    health: weapons.RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "BWING_REBEL"
    }]
};

ships.MC80BLIBERTY_REBEL = {
    name: "MC-80b Liberty",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    population: 17,
    size: 500,
    cost: 2400,
    speed: 3,
    turnSpeed: .025,
    shield: 8000,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: -.4,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }, {
            x: -.3,
            y: -.2,
            weapon: weapons.RED_RAPID_LASER_CANNON
        }, {
            x: -.2,
            y: .05,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY
        }, {
            x: -.075,
            y: .1,
            weapon: weapons.RED_QUAD_LASER_CANNON
        }, {
            x: -.05,
            y: .4,
            weapon: weapons.DOUBLE_ION_CANNON
        }, {
            x: -.025,
            y: .7,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon
            })
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "YWING_REBEL"
    }]
};

ships.STARHAWK_REBEL = {
    name: "Starhawk",
    asset: "STARHAWK.png",
    classification: shipTypes.Capital,
    population: 31,
    size: 750,
    cost: 6540,
    speed: 2,
    turnSpeed: .01,
    shield: 7200,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: .075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: -.3,
            y: .3,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
        }, {
            x: -.225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: .225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: -.15,
            y: -.7,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
        }, {
            x: .15,
            y: -.7,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: .125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.RED_DOUBLE_LASER_CANNON
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "BWING_REBEL"
    }]
};

export default ships;