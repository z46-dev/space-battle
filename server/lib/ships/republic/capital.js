import { shipTypes, weaponTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VENATOR_REPUBLIC = {
    name: "Venator-Class Star Destroyer",
    asset: "VENATOR.png",
    classification: shipTypes.Capital,
    population: 19,
    size: 500,
    cost: 4200,
    speed: 4,
    turnSpeed: .01,
    shield: 6800,
    shieldRegen: 6.8,
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
                weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .1 + .025 * i,
                y: .7 - .1 * i,
                weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.175,
                y: 0 - .155 * i,
                weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .15,
                y: 0 - .155 * i,
                weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.75 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "ARC170_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "YWING_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 1,
        squadronKey: "NTB630_REPUBLIC"
    }]
};

ships.ACCLIMATOR_BATTLESHIP_REPUBLIC = {
    name: "Acclimator Battleship",
    asset: "ACCLIMATOR_BATTLESHIP.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 650,
    cost: 9500,
    speed: 2.5,
    turnSpeed: .003,
    shield: 8000,
    shieldRegen: 8,
    hardpoints: (function () {
        const output = [];

        const points = [{
            x: -.070,
            y: .978
        }, {
            x: -.136,
            y: .901
        }, {
            x: -.182,
            y: .774
        }, {
            x: -.222,
            y: .646
        }, {
            x: -.271,
            y: .513
        }, {
            x: -.318,
            y: .417
        }, {
            x: -.371,
            y: .288
        }, {
            x: -.402,
            y: .176
        }, {
            x: -.453,
            y: .055
        }, {
            x: -.510,
            y: -.116
        }, {
            x: -.515,
            y: -.341
        }, {
            x: -.459,
            y: -.413
        }, {
            x: -.353,
            y: -.438
        }, {
            x: -.172,
            y: -.424
        }, {
            x: -.172,
            y: -.378
        }, {
            x: -.170,
            y: -.329
        }, {
            x: -.172,
            y: -.282
        }, {
            x: -.177,
            y: -.060
        }, {
            x: -.159,
            y: -.021
        }, {
            x: -.141,
            y: .026
        }, {
            x: -.107,
            y: .212
        }, {
            x: -.103,
            y: .392
        }, {
            x: -.090,
            y: .570
        }, {
            x: -.083,
            y: .708
        }, {
            x: -.072,
            y: .853
        }];

        for (let i = 0, n = points.length; i < n; i ++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const weaponChoices = [
            weapons.BLUE_DOUBLE_LASER_CANNON, weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
            weapons.BLUE_DOUBLE_TURBOLASER_CANNON, weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.DOUBLE_ION_CANNON_HEAVY,
            weapons.BLUE_DOUBLE_LASER_CANNON, weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
            weapons.BLUE_DOUBLE_TURBOLASER_CANNON, weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.DOUBLE_ION_CANNON_HEAVY,
            weapons.BLUE_ANTI_FIGHTER_LASER_CANNON, weapons.ASSAULT_PROTON_ROCKET
        ];

        let i = 0;
        for (const point of points) {
            output.push({
                ...point,
                weapon: weaponChoices[i % weaponChoices.length],
                ...(() => {
                    if (weaponChoices[i++ % weaponChoices.length].type === weaponTypes.AssaultProtonRocket) {
                        return {
                            shotsAtOnce: 6,
                            shotDelay: 75
                        };
                    }

                    return {
                        shotsAtOnce: 2,
                        shotDelay: 100
                    };
                })()
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.3 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "ARC170_REPUBLIC"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "YWING_REPUBLIC"
    }]
};

export default ships;