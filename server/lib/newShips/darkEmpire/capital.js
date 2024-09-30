import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IMPERIALSTARDESTROYER_DARKEMPIRE = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    classification: shipTypes.Capital,
    population: 22,
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
                weapon: i % 2 ? weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY : weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: i % 2 ? weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY : weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: 0,
                y: .3 - .1 * i,
                weapon: weapons.GREEN_ANTI_FIGHTER_LASER_CANNON,
                shotsAtOnce: 1,
                shotDelay: 50
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: i % 2 ? 3 : 2,
                shotDelay: 60
            }, {
                x: .075 + .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: i % 2 ? 3 : 2,
                shotDelay: 60
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 2.5 | 0
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
    population: 38,
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
    size: ships.IMPERIALSTARDESTROYER_DARKEMPIRE.size * 1.05 | 0,
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

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }));
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
    population: 42,
    size: 790,
    cost: 10000,
    speed: 1.5,
    turnSpeed: .001,
    shield: 9580,
    shieldRegen: 9,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: -.05,
            weapon: weapons.GREEN_WEAK_SUPERLASER,
            shotsAtOnce: 2,
            shotDelay: 600
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
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 90
            }, {
                x: .075,
                y: .85 - .15 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 90
            }, {
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 45
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 45
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 45
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? weapons.ION_CANNON : weapons.GREEN_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 45
            });
        }

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.1 - .2 * i,
                y: .9334 - .025 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .1 + .2 * i,
                y: .9334 - .025 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }))
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
    population: 50,
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
            shotsAtOnce: 1000,
            shotDelay: 5
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 3,
                shotDelay: 300
            }, {
                x: .3,
                y: -.325 - .08 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 3,
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
    population: 40,
    size: 1450,
    cost: 8200,
    speed: 1.25,
    turnSpeed: .005,
    shield: 23400,
    shieldRegen: 23.4,
    hardpoints: (function() {
        const output = [];
        const types = ["GREEN_ANTI_FIGHTER_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_LASER_CANNON", "ASSAULT_CONCUSSION_MISSILE"];

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
                health: output[i].weapon.health * 4
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

ships.SORONNAN_DARKEMPIRE = {
    name: "Soronnan Star Destroyer",
    asset: "SORONNAN.png",
    classification: shipTypes.Capital,
    population: 55,
    size: 1300,
    cost: 14300,
    speed: 1,
    turnSpeed: .001,
    shield: 31200,
    shieldRegen: 31,
    hardpoints: [{
        x: -.048,
        y: .795,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .042,
        y: .797,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.09,
        y: .471,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .08,
        y: .473,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.087,
        y: .208,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .077,
        y: .208,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.006,
        y: .03,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.006,
        y: -.032,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.186,
        y: -.144,
        weapon: weapons.ION_CANNON_ULTRA,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.135,
        y: -.092,
        weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .123,
        y: -.093,
        weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .176,
        y: -.145,
        weapon: weapons.ION_CANNON_ULTRA,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.343,
        y: -.124,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.292,
        y: -.193,
        weapon: weapons.QUAD_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.319,
        y: -.292,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.395,
        y: -.319,
        weapon: weapons.QUAD_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .342,
        y: -.127,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .288,
        y: -.195,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .315,
        y: -.296,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .393,
        y: -.325,
        weapon: weapons.GREEN_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.187,
        y: -.588,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.136,
        y: -.540,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .180,
        y: -.593,
        weapon: weapons.GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .126,
        y: -.542,
        weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.006,
        y: -.825,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.006,
        y: -.769,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.051,
        y: -.424,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .041,
        y: -.423,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.043,
        y: .146,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: -.043,
        y: .230,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: -.043,
        y: .301,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: .037,
        y: .301,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: .037,
        y: .232,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: .037,
        y: .147,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 5,
        shotDelay: 75
    }, {
        x: .281,
        y: .091,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .227,
        y: .287,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .117,
        y: .695,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .065,
        y: .891,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.074,
        y: .891,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.126,
        y: .693,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.234,
        y: .287,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.285,
        y: .091,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4 | 0,
            reload: e.weapon.reload * .9 | 0,
            range: e.weapon.range * 1.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }]
};

export default ships;