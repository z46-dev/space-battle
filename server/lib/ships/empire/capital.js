import { shipTypes, weaponClassifications } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IMPERIALSTARDESTROYER_EMPIRE = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    classification: shipTypes.Capital,
    population: 20,
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
                health: output[i].weapon.health * 2.5 | 0,
                reload: output[i].weapon.reload * .8 | 0
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
        squadronKey: "TIEFIGHTER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEBOMBER_EMPIRE"
    }]
};

ships.ALLEGIANCE_EMPIRE = {
    name: "Allegiance Star Destroyer",
    asset: "ALLEGIANCE.png",
    classification: shipTypes.Capital,
    population: 48,
    size: 1200,
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
                weapon: weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .37 + .02 * i,
                y: -.37 - .07 * i,
                weapon: weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.075 - .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? weapons.QUAD_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
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
                health: e.weapon.health * 3.25 | 0,
                reload: e.weapon.reload * .8 | 0
            }
        }));
    })()
};

ships.VICTORYSTARDESTROYER_EMPIRE = {
    name: "Victory-I Star Destroyer",
    asset: "VICTORYSTARDESTROYER.png",
    classification: shipTypes.Capital,
    population: 17,
    size: 400,
    cost: 3000,
    speed: 2.5,
    turnSpeed: .015,
    shield: 7000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.525 - .0334 * i,
                y: -.25 - .15 * i,
                weapon: weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 8,
                shotDelay: 100,
                launchAngle: -Math.PI / 2 + Math.PI / 6
            }, {
                x: .525 + .0334 * i,
                y: -.25 - .15 * i,
                weapon: weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 8,
                shotDelay: 100,
                launchAngle: Math.PI / 2 - Math.PI / 6
            }, {
                x: -.05 - .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .05 + .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }]
};

ships.CRIMSONCOMMAND_EMPIRE = {
    name: "Crimson Victory-II Star Destroyer",
    asset: "CRIMSONVICTORY.png",
    classification: shipTypes.Capital,
    population: 16,
    size: 400,
    cost: 3100,
    speed: 2.65,
    turnSpeed: .01667,
    shield: 7500,
    shieldRegen: 7.5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.525 - .0334 * i,
                y: -.25 - .15 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.SIEGE_CONCUSSION_MISSILE,
                shotsAtOnce: i % 2 ? 2 : 8,
                shotDelay: 100,
                launchAngle: i % 2 ? undefined : (-Math.PI / 2 + Math.PI / 6)
            }, {
                x: .525 + .0334 * i,
                y: -.25 - .15 * i,
                weapon: i % 2 ? weapons.GREEN_QUAD_TURBOLASER_CANNON_HEAVY : weapons.SIEGE_CONCUSSION_MISSILE,
                shotsAtOnce: i % 2 ? 2 : 8,
                shotDelay: 100,
                launchAngle: i % 2 ? undefined : (Math.PI / 2 - Math.PI / 6)
            }, {
                x: -.05 - .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .05 + .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEBOMBER_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 3,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }]
};

ships.AGGRESSORSTARDESTROYER_EMPIRE = {
    name: "Aggressor Star Destroyer",
    asset: "AGGRESSORSTARDESTROYER.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 750,
    cost: 5000,
    speed: 3,
    turnSpeed: .025,
    shield: 7000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .95,
            weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD
        }, {
            x: 0,
            y: .95,
            weapon: weapons.ION_CANNON_ULTRA
        }];

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.375 + .04 * i,
                y: -.15 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .375 - .035 * i,
                y: -.15 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.075,
                y: .5 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON
            }, {
                x: .075,
                y: .5 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON
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
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEBOMBER_EMPIRE"
    }]
};

export default ships;