import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.RECUSANT_HUTT = templates.heavyFrigate.RECUSANT_DESTROYER({
    color: "PURPLE"
});

ships.ACCLIMATOR_HUTT = templates.heavyFrigate.ACCLIMATOR({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT"
});

ships.SABOATHDESTROYER_HUTT = templates.heavyFrigate.SABOATH_DESTROYER({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT"
});

ships.UBRIKKIAN_HUTT = {
    name: "Ubrikkian Frigate",
    asset: "ubrikkianFrigate.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 340,
    cost: 2900,
    speed: 3,
    turnSpeed: .015,
    shield: 2800,
    shieldRegen: 2.8,
    hardpoints: [{
        x: -.075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: .4,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: -.4,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: -.4,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 3 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "A9VIGILANCE_HUTT"
    }]
};

ships.TEMPEST_HUTT = {
    name: "Tempest Heavy Cruiser",
    asset: "tempestCruiser.png",
    classification: shipTypes.HeavyFrigate,
    population: 20,
    size: 500,
    cost: 4000,
    speed: 2.5,
    turnSpeed: .01,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: [{
        x: -.1,
        y: .95,
        weapon: {
            ...weapons.ASSAULT_PROTON_ROCKET,
            reload: weapons.ASSAULT_PROTON_ROCKET.reload / 3
        },
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .1,
        y: .95,
        weapon: {
            ...weapons.ASSAULT_PROTON_ROCKET,
            reload: weapons.ASSAULT_PROTON_ROCKET.reload / 3
        },
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.18,
        y: .55,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 40
    }, {
        x: .18,
        y: .55,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 40
    }, {
        x: -.12,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: .12,
        y: .3,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: -.12,
        y: .1,
        weapon: weapons.QUAD_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: .12,
        y: .1,
        weapon: weapons.QUAD_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: -.12,
        y: -.1,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: .12,
        y: -.1,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: -.09,
        y: -.4,
        weapon: weapons.PURPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: .09,
        y: -.4,
        weapon: weapons.PURPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 55
    }, {
        x: 0,
        y: -.55,
        weapon: weapons.PURPLE_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 55
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 4.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }]
};

ships.SZAJIN_HUTT = {
    name: "Szajin Cruiser",
    asset: "szajinCruiser.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 500,
    cost: 4000,
    speed: 1.9,
    turnSpeed: .005,
    shield: 6500,
    shieldRegen: 6.5,
    hardpoints: [{
        x: -.075,
        y: .915,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .075,
        y: .915,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.2,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .2,
        y: .6,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.25,
        y: .2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .25,
        y: .2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.25,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .25,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: -.25,
        y: -.7,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .25,
        y: -.7,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: .4,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .25,
        y: .4,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }].map(hp => ({
        ...hp,
        weapon: {
            ...hp.weapon,
            health: hp.weapon.health * 6 | 0,
            reload: hp.weapon.reload * .7
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }]
};

ships.KARABOS_HUTT = {
    name: "Karabos Destroyer",
    asset: "KARABOS.png",
    classification: shipTypes.HeavyFrigate,
    population: 20,
    size: 600,
    cost: 5400,
    speed: 4,
    turnSpeed: .01,
    shield: 3500,
    shieldRegen: 3.5,
    hardpoints: (function () {
        const points = [{
            x: -.189,
            y: .436
        }, {
            x: -.191,
            y: .347
        }, {
            x: -.191,
            y: .252
        }, {
            x: -.194,
            y: .169
        }, {
            x: -.191,
            y: .083
        }, {
            x: -.190,
            y: .005
        }, {
            x: -.195,
            y: -.090
        }, {
            x: -.108,
            y: -.530
        }, {
            x: -.095,
            y: -.090
        }, {
            x: -.091,
            y: .288
        }, {
            x: -.075,
            y: .491
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: i % 2 ? weapons.PURPLE_DOUBLE_TURBOLASER_CANNON : weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }]
};

// OLD REPUBLIC ERA HUTTS

ships.AJUUR_HEAVY_CRUISER_HUTT = {
    name: "Ajuur Heavy Cruiser",
    asset: "AJUUR_HEAVY_CRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 17,
    size: 1200,
    cost: 4000,
    speed: 2,
    turnSpeed: .01,
    shield: 1800,
    shieldRegen: 1.8,
    hardpoints: (function () {
        const points = [{
            x: -.289,
            y: -.392
        }, {
            x: -.289,
            y: -.321
        }, {
            x: -.294,
            y: -.124
        }, {
            x: -.294,
            y: -.042
        }, {
            x: -.291,
            y: .139
        }, {
            x: -.293,
            y: .230
        }, {
            x: -.069,
            y: .934
        }, {
            x: -.107,
            y: .753
        }, {
            x: -.140,
            y: .525
        }, {
            x: -.115,
            y: .396
        }, {
            x: -.185,
            y: .218
        }, {
            x: -.139,
            y: .113
        }, {
            x: -.217,
            y: .038
        }, {
            x: -.128,
            y: -.161
        }, {
            x: -.204,
            y: -.200
        }, {
            x: -.164,
            y: -.396
        }, {
            x: -.128,
            y: -.571
        }, {
            x: -.103,
            y: -.774
        }, {
            x: -.059,
            y: -.956
        }, {
            x: -.072,
            y: -.399
        }, {
            x: -.061,
            y: .315
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.PURPLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.PURPLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 300
        }]

        const output = [];

        for (let i = 0, n = points.length; i < n; i++) {
            output.push({
                ...points[i],
                ...selections[i % selections.length]
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * .75 | 0,
                reload: e.weapon.reload * 1.2
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "CHAOS_FIGHTER_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "CHAOS_BOMBER_HUTT"
    }]
};

export default ships;