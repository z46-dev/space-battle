import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ARQUITENS_EMPIRE = {
    name: "Arquitens",
    asset: "ARQUITENS.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 275,
    cost: 900,
    speed: 5,
    turnSpeed: .02,
    shield: 3230,
    shieldRegen: 3.23,
    hardpoints: [{
        x: -.225,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .225,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.275,
        y: -.125,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .275,
        y: -.125,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: 0,
        y: .6,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: -.3,
        y: -.25,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .3,
        y: -.25,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 75
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: hp.weapon.health * 2.75 | 0 } }))
};

ships.IMOBILIZER_EMPIRE = {
    name: "Imobilizer 418",
    asset: "IMOBILIZER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 360,
    cost: 2200,
    speed: 3,
    turnSpeed: .015,
    shield: 5700,
    shieldRegen: 5.7,
    hardpoints: [{
        x: -.1,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .1,
        y: .275,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.2,
        y: -.25,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .2,
        y: -.25,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: -.35,
        y: -.725,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: .35,
        y: -.725,
        weapon: weapons.ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: 0,
        y: .75,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }]
};

ships.DREADNOUGHTHEAVYCRUISER_EMPIRE = {
    name: "Dreadnought Heavy Cruiser",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 340,
    cost: 3000,
    speed: 3,
    turnSpeed: .015,
    shield: 6500,
    shieldRegen: 6.5,
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
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .175,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0,
            reload: e.weapon.reload * .6 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "TIEINTERCEPTOR_EMPIRE"
    }]
};

ships.ACCLIMATOR_EMPIRE = {
    name: "Acclimator Assault Cruiser",
    asset: "ACCLIMATOR.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 300,
    cost: 2500,
    speed: 3,
    turnSpeed: .01,
    shield: 6500,
    shieldRegen: 1.5,
    hardpoints: (function () {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 100
        }, {
            x: -.55,
            y: -.35,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .55,
            y: -.35,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.2 - .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .2 + .1 * i,
                y: .6 - .225 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                reload: e.weapon.reload * .85,
                health: e.weapon.health * 3.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER_EMPIRE"
    }]
};

ships.IMPERIAL_II_EMPIRE = {
    name: "Imperial II Frigate",
    asset: "IMPERIAL_II_FRIGATE.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 400,
    cost: 2500,
    speed: 3,
    turnSpeed: .006,
    shield: 5500,
    shieldRegen: 5.5,
    hardpoints: (() => {
        const points = [{
            x: -.035,
            y: .839
        }, {
            x: -.089,
            y: .666
        }, {
            x: -.137,
            y: .535
        }, {
            x: -.216,
            y: .322
        }, {
            x: -.245,
            y: .243
        }, {
            x: -.333,
            y: -.016
        }, {
            x: -.367,
            y: -.084
        }, {
            x: -.498,
            y: -.446
        }, {
            x: -.224,
            y: -.445
        }, {
            x: -.225,
            y: -.343
        }, {
            x: -.186,
            y: -.015
        }, {
            x: -.111,
            y: .098
        }, {
            x: -.102,
            y: .301
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [];
        const selection = [
            weapons.GREEN_DOUBLE_LASER_CANNON, weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
            weapons.GREEN_DOUBLE_TURBOLASER_CANNON, weapons.DOUBLE_ION_CANNON,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.GREEN_RAPID_LASER_CANNON,
            weapons.GREEN_DOUBLE_LASER_CANNON, weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
            weapons.GREEN_DOUBLE_TURBOLASER_CANNON, weapons.DOUBLE_ION_CANNON,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.GREEN_RAPID_LASER_CANNON
        ];

        for (let i = 0, n = points.length; i < n; i++) {
            const weapon = selection[i % selection.length];
            output.push({
                ...points[i],
                weapon: {
                    ...weapon,
                    health: weapon.health * 3.5 | 0
                },
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }
        
        return output;
    })()
};

export default ships;