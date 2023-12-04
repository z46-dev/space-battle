import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IMPERIALSTARDESTROYER_DARKEMPIRE = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 600,
    cost: 3200,
    speed: 2.5,
    turnSpeed: .01,
    shield: 8000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: 0,
                y: .3 - .1 * i,
                weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 2
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

ships.ALLEGIANCE_DARKEMPIRE = {
    name: "Allegiance Star Destroyer",
    asset: "ALLEGIANCE.png",
    classification: shipTypes.Capital,
    population: 54,
    size: 1000,
    cost: 8900,
    speed: 1.9,
    turnSpeed: .01,
    shield: 11000,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .975,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 80
        }];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.37 - .02 * i,
                y: -.37 - .07 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .37 + .02 * i,
                y: -.37 - .07 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: 0,
                y: .3 - .05 * i,
                weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON
            });
        }

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.075 - .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: 0,
                y: .25 - .05 * i,
                weapon: i % 2 ? weapons.GREEN_OCTUPLE_TURBOLASER_CANNON : weapons.ION_CANNON_ULTRA
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3.25 | 0
            }
        }));
    })()
};

ships.INTERDICTORSTARDESTROYER_DARKEMPIRE = {
    name: "Interdictor Star Destroyer",
    asset: "INTERDICTORSTARDESTROYER.png",
    classification: shipTypes.Capital,
    population: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.population,
    size: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.size,
    cost: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.cost * 1.1 | 0,
    speed: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.speed * .95,
    turnSpeed: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.turnSpeed * .99,
    shield: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.shield * 1.1 | 0,
    shieldRegen: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.shieldRegen * 1.1 | 0,
    hardpoints: (function() {
        const output = [{
            x: -.3,
            y: -.55,
            weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: .3,
            y: -.55,
            weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: -.3,
            y: -.55,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: .3,
            y: -.55,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.075 - .06 * i,
                y: .7 - .25 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .06 * i,
                y: .7 - .25 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEDEFENDER_DARKEMPIRE"
    }]
};

ships.ONAGER_DARKEMPIRE = {
    name: "Onager Star Destroyer",
    asset: "ONAGER.png",
    classification: shipTypes.Capital,
    population: 31,
    size: 950,
    cost: 10000,
    speed: 1.5,
    turnSpeed: .01,
    shield: 13000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: -.05,
            weapon: weapons.GREEN_WEAK_SUPERLASER,
            shotsAtOnce: 40,
            shotDelay: 18
        }, {
            x: -.65,
            y: .8,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: .65,
            y: .8,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 80
        }];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.175,
                y: -.12 - .04 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .175,
                y: -.12 - .04 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.075,
                y: .85 - .15 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: .075,
                y: .85 - .15 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON
            });
        }

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.1 - .2 * i,
                y: .9334 - .025 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .1 + .2 * i,
                y: .9334 - .025 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER_DARKEMPIRE"
    }]
};

ships.XYSTON_DARKEMPIRE = {
    name: "Xyston Star Destroyer",
    asset: "XYSTON.png",
    classification: shipTypes.Capital,
    population: 38,
    size: 1200, // * 2 star destroyer
    cost: 8200, // * 2 star destroyer
    speed: 1.25,
    turnSpeed: .005,
    shield: 16000, // * 2 star destroyer
    shieldRegen: 16, // * 2 star destroyer
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: 0,
            weapon: weapons.RED_LIGHT_SUPERLASER2,
            shotsAtOnce: 100,
            shotDelay: 5
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: .3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: 0,
                y: .3 - .1 * i,
                weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 2
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }]
};

ships.RESURGENT_DARKEMPIRE = {
    name: "Resurgent Star Destroyer",
    asset: "RESURGENT.png",
    classification: shipTypes.Capital,
    population: 32,
    size: 1450,
    cost: 8200,
    speed: 1.25,
    turnSpeed: .005,
    shield: 21570,
    shieldRegen: 21.57,
    hardpoints: (function() {
        const output = [];
        const types = ["GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_LASER_CANNON", "ASSAULT_CONCUSSION_MISSILE"];

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.03 - .031 * i,
                y: .85 - .1 * i,
                weapon: weapons[types[i % 4]],
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .031 * i,
                y: .85 - .1 * i,
                weapon: weapons[types[i % 4]],
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.1 - .015 * i,
                y: -.05 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .1 + .015 * i,
                y: -.05 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.15 - .015 * i,
                y: -.05 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .15 + .015 * i,
                y: -.05 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 3
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

export default ships;