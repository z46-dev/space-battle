import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.RECUSANT_CIS = {
    name: "Recusant Light Destroyer",
    asset: "RECUSANT.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 500,
    cost: 2400,
    speed: 3.4,
    turnSpeed: .01,
    shield: 3200,
    shieldRegen: 1.9,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
        shotsAtOnce: 2,
        shotDelay: 250
    }, {
        x: -.03,
        y: .825,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .03,
        y: .825,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.06,
        y: .7,
        weapon: weapons.QUAD_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .06,
        y: .7,
        weapon: weapons.QUAD_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .075,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.075,
        y: .35,
        weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 65
    }, {
        x: .075,
        y: .35,
        weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 65
    }, {
        x: -.06,
        y: 0,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .06,
        y: 0,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 2 | 0 } })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 3,
        reserveSize: 2,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

ships.SABOATHDESTROYER_CIS = {
    name: "Saboath Destroyer",
    asset: "SABOATHDESTROYER.png",
    classification: shipTypes.HeavyFrigate,
    population: 22,
    size: 335,
    cost: 2670,
    speed: 3,
    turnSpeed: .015,
    shield: 3500,
    shieldRegen: 3.5,
    hardpoints: [{
        x: -.1125,
        y: .875,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1125,
        y: .875,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1125,
        y: .675,
        weapon: weapons.RED_QUAD_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 65
    }, {
        x: .1125,
        y: .675,
        weapon: weapons.RED_QUAD_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 65
    }, {
        x: -.1125,
        y: .475,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1125,
        y: .475,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3125,
        y: -.675,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: .3,
        y: -.675,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: -.25,
        y: .3,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: -.3,
        y: .1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: -.35,
        y: -.1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: .25,
        y: .3,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: .3,
        y: .1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }, {
        x: .35,
        y: -.1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 250
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 1,
        reserveSize: 4,
        squadronKey: "DROIDGUNSHIP_CIS"
    }]
};

ships.MUNIFICENT_HEAVY_CIS = {
    name: "Munificent Heavy Cruiser",
    asset: "MUNIFICENT_HEAVY.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 420,
    cost: 3000,
    speed: 2.7,
    turnSpeed: .004,
    shield: 4500,
    shieldRegen: 4.5,
    hardpoints: (() => {
        const points = [{
            x: -.074,
            y: .915
        }, {
            x: -.106,
            y: .841
        }, {
            x: -.140,
            y: .744
        }, {
            x: -.169,
            y: .649
        }, {
            x: -.182,
            y: .547
        }, {
            x: -.192,
            y: .459
        }, {
            x: -.197,
            y: .374
        }, {
            x: -.195,
            y: .286
        }, {
            x: -.205,
            y: .111
        }, {
            x: -.142,
            y: .103
        }, {
            x: -.080,
            y: .088
        }, {
            x: -.163,
            y: -.457
        }, {
            x: -.163,
            y: -.604
        }, {
            x: -.139,
            y: -.798
        }, {
            x: -.089,
            y: -.940
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [{
            x: 0,
            y: .8,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.5,
            y: -.05,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .5,
            y: -.05,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }];
        
        const selections = [
            weapons.RED_DOUBLE_TURBOLASER_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
            weapons.RED_DOUBLE_LASER_CANNON, weapons.RED_QUAD_LASER_CANNON,
            weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.QUAD_ION_CANNON_HEAVY,
            weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.RED_RAPID_LASER_CANNON
        ];

        for (let i = 0; i < points.length; i ++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 1.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 5,
        reserveSize: 1,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;