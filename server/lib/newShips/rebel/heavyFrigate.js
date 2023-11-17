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

ships.NEBULONB2_REBEL = {
    name: "EF-76 Nebulon-B2 Attack Frigate",
    asset: "NEBULONB2.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 350,
    cost: 1500,
    speed: 3,
    turnSpeed: .025,
    shield: 4000,
    shieldRegen: 4,
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

        return output;
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
    population: 28,
    size: 300,
    cost: 6000,
    speed: 2.25,
    turnSpeed: .0175,
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

ships.VALORCRUISER_REBEL = {
    name: "Valor Cruiser",
    asset: "VALORCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 25,
    size: 650,
    cost: 2950,
    speed: 2,
    turnSpeed: .01,
    shield: 9500,
    shieldRegen: 9.5,
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