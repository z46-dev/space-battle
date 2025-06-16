import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.INTERDICTOR_CRUISER_SITHEMP = {
    name: "Interdictor Cruiser",
    asset: "INTERDICTOR_CRUISER.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 800,
    cost: 3400,
    speed: 3,
    turnSpeed: .0125,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: (function () {
        const points = [{
            x: -.068,
            y: .879
        }, {
            x: -.182,
            y: .534
        }, {
            x: -.261,
            y: .233
        }, {
            x: -.330,
            y: -.231
        }, {
            x: -.302,
            y: -.568
        }, {
            x: -.227,
            y: -.745
        }, {
            x: -.232,
            y: -.299
        }, {
            x: -.104,
            y: .323
        }, {
            x: -.195,
            y: .119
        }, {
            x: -.055,
            y: .772
        }, {
            x: -.079,
            y: -.235
        }, {
            x: -.086,
            y: -.597
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [{
            weapon: weapons.RED_LASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.RED_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
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
                health: e.weapon.health * 1.65 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "SITH_BOMBER_SITHEMP"
    }]
};

export default ships;