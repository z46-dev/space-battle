import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.MC69NOIR_HUTT = {
    name: "MC-69 Noir",
    asset: "MC69NOIR.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 450,
    cost: 3000,
    speed: 2.9,
    turnSpeed: .01,
    shield: 9500,
    shieldRegen: 5,
    hardpoints: [{
        x: -.04,
        y: .85,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .085,
        y: .775,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.12,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: .45,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.18,
        y: .2,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .275,
        y: 0,
        weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.25,
        y: -.2,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .225,
        y: -.4,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.1,
        y: -.6,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .04,
        y: -.8,
        weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: -.08,
        y: .35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }, {
        x: .15,
        y: -.1,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 130
    }]
};

ships.VENATOR_HUTT = templates.capital.VENATOR({
    color: "PURPLE",
    fighter: "A9VIGILANCE_HUTT",
    interceptor: "A9VIGILANCE_HUTT",
    bomber: "SKIPRAYBLASTBOAT_HUTT"
});

ships.KARAGGA_HUTT = {
    name: "Karragga Destroyer",
    asset: "karaggaDestroyer.png",
    classification: shipTypes.Capital,
    population: 22,
    size: 675,
    cost: 4000,
    speed: 1.3,
    turnSpeed: .01,
    shield: 7400,
    shieldRegen: 95,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.15,
                y: .7 - .3 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 75
            }, {
                x: .15,
                y: .7 - .3 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 75
            }, {
                x: -.075,
                y: .875 - .45 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .075,
                y: .875 - .45 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 0; i < 6; i++) {
            const a = Math.PI * 2 / 6 * i;
            const x = Math.cos(a) * .1;
            const y = Math.sin(a) * .05 - .8;
            output.push({
                x: x,
                y: y,
                weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 2
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

ships.VONTOR_HUTT = {
    name: "Vontor Destroyer",
    asset: "vontorDestroyer.png",
    classification: shipTypes.Capital,
    population: 30,
    size: 750,
    cost: 8000,
    speed: 1.5,
    turnSpeed: .008,
    shield: 5500,
    shieldRegen: 5.5,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 7; i++) {
            output.push({
                x: -.075 - .01 * i,
                y: .925 - .225 * i,
                weapon: i === 0 ? weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY : weapons.PURPLE_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .075 + .01 * i,
                y: .925 - .225 * i,
                weapon: i === 0 ? weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY : weapons.PURPLE_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 225
            }, {
                x: 0,
                y: .8 - .225 * i,
                weapon: weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 225
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 4.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "SKIPRAYBLASTBOAT_HUTT"
    }]
};

ships.CHELANDION_HUTT = {
    name: "Chelandion Cruiser",
    asset: "CHELANDION.png",
    classification: shipTypes.Capital,
    population: 28,
    size: 680,
    cost: 6000,
    speed: 2,
    turnSpeed: .008,
    shield: 4200,
    shieldRegen: 4.2,
    hardpoints: (function () {
        const points = [{
            x: -.063,
            y: .837
        }, {
            x: -.145,
            y: .684
        }, {
            x: -.189,
            y: .463
        }, {
            x: -.212,
            y: .180
        }, {
            x: -.093,
            y: .034
        }, {
            x: -.176,
            y: -.195
        }, {
            x: -.183,
            y: -.579
        }, {
            x: -.355,
            y: -.772
        }, {
            x: -.136,
            y: -.866
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [];

        const selections = [
            weapons.PURPLE_QUAD_TURBOLASER_CANNON,
            weapons.PURPLE_QUAD_LASER_CANNON,
            weapons.PURPLE_QUAD_TURBOLASER_CANNON_HEAVY,
            weapons.PURPLE_QUAD_LASER_CANNON_HEAVY,
            weapons.QUAD_ION_CANNON,
            weapons.QUAD_ION_CANNON_HEAVY,
            weapons.ASSAULT_CONCUSSION_MISSILE
        ];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 150
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 4 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "A9VIGILANCE_HUTT"
    }]
};

// OLD REPUBLIC ERA HUTTS

ships.AZALUS_HUTT_DREADNOUGHT_HUTT = {
    name: "Azalus Dreadnought",
    asset: "AZALUS_DREADNOUGHT.png",
    classification: shipTypes.Capital,
    population: 30,
    size: 1850,
    cost: 9000,
    speed: 2,
    turnSpeed: .002,
    shield: 6000,
    shieldRegen: 6,
    hardpoints: (function () {
        const points = [{
            x: -.054,
            y: .983
        }, {
            x: -.077,
            y: .852
        }, {
            x: -.105,
            y: .650
        }, {
            x: -.121,
            y: .548
        }, {
            x: -.032,
            y: .567
        }, {
            x: -.041,
            y: .879
        }, {
            x: -.070,
            y: .459
        }, {
            x: -.158,
            y: .416
        }, {
            x: -.215,
            y: .321
        }, {
            x: -.214,
            y: .214
        }, {
            x: -.216,
            y: .057
        }, {
            x: -.214,
            y: .000
        }, {
            x: -.214,
            y: -.057
        }, {
            x: -.071,
            y: .334
        }, {
            x: -.089,
            y: -.005
        }, {
            x: -.161,
            y: .111
        }, {
            x: -.159,
            y: -.192
        }, {
            x: -.099,
            y: -.175
        }, {
            x: -.031,
            y: -.076
        }, {
            x: -.023,
            y: .245
        }, {
            x: -.032,
            y: -.372
        }, {
            x: -.031,
            y: -.193
        }, {
            x: -.151,
            y: -.391
        }, {
            x: -.207,
            y: -.327
        }, {
            x: -.207,
            y: -.214
        }, {
            x: -.071,
            y: -.462
        }, {
            x: -.126,
            y: -.470
        }, {
            x: -.057,
            y: -.955
        }, {
            x: -.075,
            y: -.866
        }, {
            x: -.092,
            y: -.747
        }, {
            x: -.119,
            y: -.592
        }, {
            x: -.045,
            y: -.584
        }, {
            x: -.026,
            y: -.858
        }, {
            x: -.045,
            y: .066
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
            weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 250
        }, {
            weapon: weapons.PURPLE_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
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
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 6,
        squadronKey: "CHAOS_FIGHTER_HUTT"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: 6,
        squadronKey: "CHAOS_BOMBER_HUTT"
    }]
};

export default ships;