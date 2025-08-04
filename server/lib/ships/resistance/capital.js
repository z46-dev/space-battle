import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC80A_RESISTANCE = {
    name: "MC-80a Home One Type",
    asset: "MC80A.png",
    classification: shipTypes.Capital,
    population: 38,
    size: 1450,
    cost: 7800,
    speed: 2.5,
    turnSpeed: .01,
    shield: 14300,
    shieldRegen: 14,
    shieldRegenAbility: {
        cooldown: .55,
        regen: 1.1
    },
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

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0,
                reload: e.weapon.reload * .5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "XWING_RESISTANCE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "AWING_RESISTANCE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "YWING_RESISTANCE"
    }]
};

ships.MC80BLIBERTY_RESISTANCE = {
    name: "MC-80b Liberty",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 500,
    cost: 3900,
    speed: 3,
    turnSpeed: .025,
    shield: 8000,
    shieldRegen: 4,
    shieldRegenAbility: {
        cooldown: .9,
        regen: 1.05
    },
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

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5.6 | 0,
                reload: e.weapon.reload * .55 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "XWING_RESISTANCE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "YWING_RESISTANCE"
    }]
};

ships.STARHAWK_RESISTANCE = {
    name: "Starhawk",
    asset: "STARHAWK.png",
    classification: shipTypes.Capital,
    population: 30,
    size: 950,
    cost: 8000,
    speed: 3,
    turnSpeed: .0025,
    shield: 15600,
    shieldRegen: 15.6,
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 75
        }, {
            x: .075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 75
        }, {
            x: -.3,
            y: .3,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: .3,
            y: .3,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: -.225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 125
        }, {
            x: .225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 125
        }, {
            x: -.15,
            y: -.7,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: .15,
            y: -.7,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: -.15,
            y: -.7,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 4,
            shotDelay: 25
        }, {
            x: .15,
            y: -.7,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 4,
            shotDelay: 25
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: -.125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 90
            }, {
                x: .125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 90
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 6 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AWING_RESISTANCE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "YWING_RESISTANCE"
    }]
};

export default ships;