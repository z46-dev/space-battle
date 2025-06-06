import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IMPERIALSTARDESTROYER_DARKEMPIRE = templates.capital.IMPERIAL_STAR_DESTROYER({
    fighter: "TIEDRONE_DARKEMPIRE",
    interceptor: "TIEINTERCEPTOR_DARKEMPIRE",
    bomber: "TIEBOMBER_DARKEMPIRE"
});

ships.ALLEGIANCE_DARKEMPIRE = templates.capital.ALLEGIANCE_BATTLECRUISER();

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
    hardpoints: (function () {
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

        for (let i = 0; i < 6; i++) {
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
        reserveSize: 4,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "TIEDRONE_DARKEMPIRE"
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
    hardpoints: (function () {
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

        for (let i = 0; i < 3; i++) {
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

        for (let i = 0; i < 6; i++) {
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

        for (let i = 0; i < 8; i++) {
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

        for (let i = 0; i < 3; i++) {
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
    hardpoints: (function () {
        const output = [{
            x: 0,
            y: 0,
            weapon: weapons.RED_LIGHT_SUPERLASER2,
            shotsAtOnce: 333,
            shotDelay: 5
        }];

        for (let i = 0; i < 4; i++) {
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

        for (let i = 0; i < 8; i++) {
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

        for (let i = 0; i < output.length; i++) {
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
    hardpoints: (function () {
        const output = [];
        const types = ["GREEN_ANTI_FIGHTER_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_LASER_CANNON", "ASSAULT_CONCUSSION_MISSILE"];

        for (let i = 0; i < 16; i++) {
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

        for (let i = 0; i < 6; i++) {
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

        for (let i = 0; i < output.length; i++) {
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

ships.SORONNAN_DARKEMPIRE = templates.capital.SORONNAN_STAR_DESTROYER({
    fighter: "TIEDRONE_DARKEMPIRE",
    interceptor: "TIEREAPER_DARKEMPIRE",
    bomber: "TIEPUNISHER_DARKEMPIRE",
    specialist: "TIEDEFENDER_DARKEMPIRE"
});

ships.TORPEDOSPHERE_DARKEMPIRE = templates.capital.TORPEDO_SPHERE({
    fighter: "TIEDRONE_DARKEMPIRE"
});

export default ships;