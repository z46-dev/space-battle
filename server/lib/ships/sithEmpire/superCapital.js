import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CENTURION_BATTLECRUISER_SITHEMP = {
    name: "Centurion Battlecruiser",
    asset: "CENTURION_BATTLECRUISER.png",
    classification: shipTypes.SuperCapital,
    population: 50,
    size: 1500,
    cost: 12500,
    speed: 2.5,
    turnSpeed: .005,
    shield: 10000,
    shieldRegen: 10,
    hardpoints: (function () {
        const points = [{
            x: -.023,
            y: .946
        }, {
            x: -.042,
            y: .853
        }, {
            x: -.061,
            y: .766
        }, {
            x: -.078,
            y: .673
        }, {
            x: -.095,
            y: .602
        }, {
            x: -.117,
            y: .485
        }, {
            x: -.133,
            y: .399
        }, {
            x: -.150,
            y: .310
        }, {
            x: -.186,
            y: .149
        }, {
            x: -.210,
            y: .030
        }, {
            x: -.224,
            y: -.055
        }, {
            x: -.241,
            y: -.160
        }, {
            x: -.267,
            y: -.229
        }, {
            x: -.299,
            y: -.364
        }, {
            x: -.314,
            y: -.460
        }, {
            x: -.333,
            y: -.572
        }, {
            x: -.350,
            y: -.613
        }, {
            x: -.213,
            y: -.900
        }, {
            x: -.151,
            y: -.709
        }, {
            x: -.178,
            y: -.455
        }, {
            x: -.133,
            y: -.333
        }, {
            x: -.147,
            y: .084
        }, {
            x: -.177,
            y: -.176
        }, {
            x: -.090,
            y: .408
        }, {
            x: -.122,
            y: .218
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }];

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
                health: e.weapon.health * 1.75 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 12,
        reserveSize: 8,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 12,
        reserveSize: 8,
        squadronKey: "SITH_BOMBER_SITHEMP"
    }]
};

export default ships;