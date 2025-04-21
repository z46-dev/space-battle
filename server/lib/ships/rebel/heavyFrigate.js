import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC50_REBEL = {
    name: "MC-50",
    asset: "MC50.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 600,
    cost: 2800,
    speed: 4,
    turnSpeed: .008,
    shield: 6000,
    shieldRegen: 2,
    shieldRegenAbility: {},
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

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
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

ships.NEBULONB2_REBEL = {
    name: "EF-76 Nebulon-B2 Attack Frigate",
    asset: "NEBULONB2.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 350,
    cost: 2950,
    speed: 3,
    turnSpeed: .008,
    shield: 4000,
    shieldRegen: 4,
    shieldRegenAbility: {
        duration: .8,
        cooldown: 2,
        regen: .7
    },
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.2,
            y: .675,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .2,
            y: .675,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.4,
            y: .6,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .4,
            y: .6,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.125,
            y: -.8,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 60
        }, {
            x: .125,
            y: -.8,
            weapon: weapons.ASSAULT_PROTON_ROCKET,
            shotsAtOnce: 4,
            shotDelay: 60
        }];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: 0,
                y: .4 - .3 * i,
                weapon: i === 1 ? weapons.RED_ANTI_FIGHTER_LASER_CANNON : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 50
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

ships.FREEVIRGILLIABUNKERBUSTER_REBEL = {
    name: "Free Virgillia Bunker Buster",
    asset: "FREEVIRGILLIABUNKERBUSTER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 300,
    cost: 3100,
    speed: 2.25,
    turnSpeed: .01,
    shield: 6000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2 - .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .2 + .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: 0,
                y: .8 - .4 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: 0,
                y: .6 - .4 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 200
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 3
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

ships.MC75_REBEL = {
    name: "MC-75",
    asset: "MC75.png",
    classification: shipTypes.HeavyFrigate,
    population: 24,
    size: 500,
    cost: 3400,
    speed: 3,
    turnSpeed: .006,
    shield: 9800,
    shieldRegen: 3,
    shieldRegenAbility: {
        duration: 2,
        regen: 1.2
    },
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
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 1.45
        }
    })),
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

ships.VALORCRUISER_REBEL = {
    name: "Valor Cruiser",
    asset: "VALORCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 28,
    size: 580,
    cost: 3890,
    speed: 2,
    turnSpeed: .01,
    shield: 6800,
    shieldRegen: 6.8,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.1 - .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .1 + .05 * Math.pow(i, 1.035),
                y: .9 - .25 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: -.05 - .05 * Math.pow(i, 1.05),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .05 + .05 * Math.pow(i, 1.05),
                y: -.9 + .25 * i,
                weapon: i % 2 === 0 ? weapons.DOUBLE_ION_CANNON : weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 2.5
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "MG100STARFORTRESS_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "XWING_REBEL"
    }]
};

ships.DREADNOUGHTHEAVYCRUISER_REBEL = {
    name: "Dreadnought Heavy Cruiser (Refit)",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 290,
    cost: 3300,
    speed: 3.5,
    turnSpeed: .02,
    shield: 5230,
    shieldRegen: 5,
    hardpoints: [{
        x: -.075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: .4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: .175,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 50
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }]
};

export default ships;