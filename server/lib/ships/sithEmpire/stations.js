import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.STAR_FORGE_SITHEMP = {
    name: "Star Forge",
    asset: "STAR_FORGE.png",
    classification: shipTypes.SpaceStation,
    population: 200,
    size: 8000,
    cost: 75000,
    speed: 0,
    turnSpeed: 0,
    shield: 40000,
    shieldRegen: 40,
    hardpoints: (function () {
        const points = [{
            x: -.814,
            y: -.321
        }, {
            x: -.778,
            y: -.312
        }, {
            x: -.661,
            y: -.296
        }, {
            x: -.413,
            y: -.259
        }, {
            x: -.129,
            y: -.285
        }, {
            x: .012,
            y: -.365
        }, {
            x: -.147,
            y: -.451
        }, {
            x: -.386,
            y: -.457
        }, {
            x: -.213,
            y: -.503
        }, {
            x: .031,
            y: -.518
        }, {
            x: .185,
            y: -.508
        }, {
            x: .188,
            y: -.389
        }, {
            x: -.028,
            y: -.250
        }, {
            x: -.245,
            y: -.277
        }, {
            x: -.296,
            y: .034
        }, {
            x: -.475,
            y: .018
        }, {
            x: -.662,
            y: .007
        }, {
            x: -.921,
            y: -.020
        }, {
            x: -.779,
            y: -.013
        }, {
            x: -.757,
            y: .196
        }, {
            x: -.527,
            y: .229
        }, {
            x: -.292,
            y: .277
        }, {
            x: -.126,
            y: .301
        }, {
            x: .107,
            y: .494
        }, {
            x: -.075,
            y: .447
        }, {
            x: -.304,
            y: .407
        }, {
            x: -.056,
            y: .399
        }, {
            x: .087,
            y: .399
        }, {
            x: .204,
            y: .404
        }, {
            x: .272,
            y: .323
        }, {
            x: -.015,
            y: .258
        }, {
            x: -.239,
            y: .175
        }, {
            x: -.586,
            y: .172
        }, {
            x: -.710,
            y: .161
        }, {
            x: -.259,
            y: .174
        }, {
            x: .099,
            y: .118
        }, {
            x: -.246,
            y: .039
        }, {
            x: -.208,
            y: -.126
        }, {
            x: .004,
            y: -.042
        }, {
            x: .117,
            y: -.151
        }, {
            x: -.112,
            y: -.055
        }, {
            x: -.016,
            y: .085
        }, {
            x: .250,
            y: -.110
        }, {
            x: .250,
            y: .049
        }, {
            x: .215,
            y: .168
        }, {
            x: .361,
            y: .233
        }, {
            x: .483,
            y: .314
        }, {
            x: .666,
            y: .271
        }, {
            x: .839,
            y: .280
        }, {
            x: .940,
            y: .264
        }, {
            x: .753,
            y: .128
        }, {
            x: .696,
            y: .128
        }, {
            x: .567,
            y: .128
        }, {
            x: .340,
            y: .110
        }, {
            x: .291,
            y: .099
        }, {
            x: .939,
            y: -.040
        }, {
            x: .859,
            y: -.077
        }, {
            x: .745,
            y: -.118
        }, {
            x: .561,
            y: -.135
        }, {
            x: .532,
            y: -.232
        }, {
            x: .409,
            y: -.177
        }, {
            x: .353,
            y: -.304
        }, {
            x: .234,
            y: -.297
        }];

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
                health: e.weapon.health * 15 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: Infinity,
        squadronKey: "SITH_FIGHTER_SITHEMP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 4,
        reserveSize: Infinity,
        squadronKey: "SITH_BOMBER_SITHEMP"
    }],
    production: [{
        x: 0,
        y: 0,
        maxAlive: 2,
        reserve: Infinity,
        key: "INTERDICTOR_CRUISER_SITHEMP",
        cooldown: 1024
    }, {
        x: 0,
        y: 0,
        maxAlive: 6,
        reserve: Infinity,
        key: "DERRIPHAN_BATTLESHIP_SITHEMP",
        cooldown: 256
    }, {
        x: 0,
        y: 0,
        maxAlive: 4,
        reserve: Infinity,
        key: "SITH_HEAVY_CARRIER_SITHEMP",
        cooldown: 512
    }]
};

ships.SITH_RELAY_SITHEMP = templates.stations.SITH_RELAY_STATION({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP"
});

ships.RONIKA_SITHEMP = templates.stations.RONIKA_DEFENSE_STATION({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP"
});

ships.KEMPLEX_SITHEMP = templates.stations.KEMPLEX_DEFENSE_STATION({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP"
});

ships.SHIPYARD_LVL_1_SITHEMP = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP",
    corvette: ["DRESHDAE_PATROL_CORVETTE_SITHEMP"],
    frigate: ["DERRIPHAN_BATTLESHIP_SITHEMP", "SITH_PERSONNEL_CARRIER_SITHEMP"]
});

ships.SHIPYARD_LVL_2_SITHEMP = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP",
    corvette: ["DRESHDAE_PATROL_CORVETTE_SITHEMP"],
    frigate: ["DERRIPHAN_BATTLESHIP_SITHEMP", "SITH_PERSONNEL_CARRIER_SITHEMP"],
    heavyFrigate: ["SITH_HEAVY_CARRIER_SITHEMP"]
});

ships.SHIPYARD_LVL_3_SITHEMP = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP",
    corvette: ["DRESHDAE_PATROL_CORVETTE_SITHEMP"],
    frigate: ["DERRIPHAN_BATTLESHIP_SITHEMP", "SITH_PERSONNEL_CARRIER_SITHEMP"],
    heavyFrigate: ["SITH_HEAVY_CARRIER_SITHEMP", "SUPREMACY_ATTACK_SHIP_SITHEMP"],
    capital: ["INTERDICTOR_CRUISER_SITHEMP"]
});

ships.SHIPYARD_LVL_4_SITHEMP = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "SITH_FIGHTER_SITHEMP",
    bomber: "SITH_BOMBER_SITHEMP",
    corvette: ["DRESHDAE_PATROL_CORVETTE_SITHEMP"],
    frigate: ["DERRIPHAN_BATTLESHIP_SITHEMP", "SITH_PERSONNEL_CARRIER_SITHEMP"],
    heavyFrigate: ["SITH_HEAVY_CARRIER_SITHEMP", "SUPREMACY_ATTACK_SHIP_SITHEMP"],
    capital: ["INTERDICTOR_CRUISER_SITHEMP"]
});

export default ships;