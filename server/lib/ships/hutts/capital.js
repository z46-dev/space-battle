import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

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

ships.VENATOR_HUTT = {
    name: "Venator-Class Star Destroyer",
    asset: "VENATORNOIR.png",
    classification: shipTypes.Capital,
    population: 22,
    size: 500,
    cost: 6000,
    speed: 4,
    turnSpeed: .01,
    shield: 9500,
    shieldRegen: 20,
    hardpoints: (function () {
        const output = [{
            x: -.4,
            y: -.55,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
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
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 350
        }, {
            x: .275,
            y: .05,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
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

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.1 - .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .1 + .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.PURPLE_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.175,
                y: 0 - .155 * i,
                weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .15,
                y: 0 - .155 * i,
                weapon: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
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
    size: 1000,
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

        for (let i = 0, n = points.length; i < n; i ++) {
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

export default ships;