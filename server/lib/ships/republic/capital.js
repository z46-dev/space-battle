import { shipTypes, weaponTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.VENATOR_REPUBLIC = templates.capital.VENATOR({
    color: "BLUE",
    asset: "VENATOR_REPUBLIC.png",
    fighter: "ARC170_REPUBLIC",
    interceptor: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

ships.ACCLIMATOR_BATTLESHIP_REPUBLIC = {
    name: "Acclimator Battleship",
    asset: "ACCLIMATOR_BATTLESHIP.png",
    classification: shipTypes.HeavyFrigate,
    population: 22,
    size: 600,
    cost: 9500,
    speed: 3.5,
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
            x: -.318,
            y: .417
        }, {
            x: -.371,
            y: .288
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
            weapons.ASSAULT_PROTON_ROCKET
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
                health: e.weapon.health * 2.3 | 0,
                reload: e.weapon.reload * 1.15 | 0
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