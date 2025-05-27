import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.KELDABEBATTLESHIP_ZANN = {
    name: "Keldabe Battleship",
    asset: "KELDABEBATTLESHIP.png",
    classification: shipTypes.Capital,
    population: 35,
    size: 980,
    cost: 7200,
    speed: 2.5,
    turnSpeed: .01,
    shield: 9000,
    shieldRegen: 8,
    hardpoints: [{
        x: -.075,
        y: .9,
        weapon: weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .9,
        weapon: weapons.YELLOW_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .7,
        weapon: weapons.YELLOW_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .7,
        weapon: weapons.YELLOW_OCTUPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .5,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .05,
        y: .5,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: -.075,
        y: .3,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .05,
        y: .3,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .175,
        weapon: weapons.OCTUPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .175,
        weapon: weapons.OCTUPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.05,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: -.05,
        weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.4,
        y: -.15,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .4,
        y: -.15,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.3,
        weapon: weapons.YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.3,
        weapon: weapons.YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.6,
        y: -.45,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .6,
        y: -.45,
        weapon: weapons.YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.6,
        weapon: weapons.YELLOW_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: -.6,
        weapon: weapons.YELLOW_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.4,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .4,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 3,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 6 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

ships.AGGRESSORSTARDESTROYER_ZANN = {
    name: "Aggressor Star Destroyer",
    asset: "AGGRESSORSTARDESTROYERMANDALORIAN.png",
    classification: shipTypes.Capital,
    population: 38,
    size: 750,
    cost: 5000,
    speed: 3,
    turnSpeed: .025,
    shield: 10000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .95,
            weapon: {
                ...weapons.YELLOW_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
                damage: weapons.YELLOW_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD.damage * 10,
                bypassShield: false
            }
        }, {
            x: 0,
            y: .85,
            weapon: {
                ...weapons.ION_CANNON_ULTRA,
                damage: weapons.ION_CANNON_ULTRA.damage * 5
            }
        }];

        const reload = Math.min(output[0].weapon.reload, output[1].weapon.reload);
        output[0].weapon.reload = reload;
        output[1].weapon.reload = reload;

        for (let i = -1; i < 7; i ++) {
            output.push({
                x: -.075,
                y: .5 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.YELLOW_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .075,
                y: .5 - .2 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.YELLOW_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: 0,
                y: .5 - .2 * i,
                weapon: i % 2 ? weapons.YELLOW_RAPID_LASER_CANNON : weapons.YELLOW_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 2,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

ships.VENATOR_ZANN = {
    name: "Venator-Class Star Destroyer",
    asset: "VENATOR.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 500,
    cost: 4250,
    speed: 4,
    turnSpeed: .01,
    shield: 4500,
    shieldRegen: 6,
    hardpoints: (function() {
        const output = [{
            x: -.4,
            y: -.55,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 4,
            shotDelay: 250
        }, {
            x: .4,
            y: -.55,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 250
        }, {
            x: -.275,
            y: .05,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .275,
            y: .05,
            weapon: weapons.TRIPLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: -.25,
            y: .225,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .25,
            y: .225,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1 - .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .1 + .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.YELLOW_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.175,
                y: 0 - .155 * i,
                weapon: weapons.YELLOW_TRIPLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .15,
                y: 0 - .155 * i,
                weapon: weapons.YELLOW_TRIPLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        return output
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

ships.PROVIDENCEDESTROYER_ZANN = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 650,
    cost: 3100,
    speed: 4.5,
    turnSpeed: .0334,
    shield: 4700,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON
            }, {
                x: .125,
                y: -.1 - .16 * i,
                weapon: weapons.RED_LASER_CANNON
            }, {
                x: -.09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON
            }, {
                x: .09,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON
            });
        }

        return output.map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 2.2 | 0 } }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 6,
        squadronKey: "STARVIPERATTACKCRAFT_ZANN"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 4,
        squadronKey: "AUZITUCKGUNSHIP_ZANN"
    }]
};

export default ships;