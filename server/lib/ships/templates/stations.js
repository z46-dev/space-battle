import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const templates = {};

templates.GOLAN_I = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";

    return {
        name: "Golan I Defense Platform",
        asset: "GOLAN1.png",
        classification: shipTypes.SpaceStation,
        population: 15,
        size: 650,
        cost: 3000,
        speed: 0,
        turnSpeed: .0001,
        shield: 6000,
        shieldRegen: 6,
        hardpoints: (function () {
            const points = [{
                x: -.120,
                y: .746
            }, {
                x: -.118,
                y: .542
            }, {
                x: -.207,
                y: .297
            }, {
                x: -.218,
                y: .124
            }, {
                x: -.218,
                y: -.121
            }, {
                x: -.210,
                y: -.301
            }, {
                x: -.114,
                y: -.529
            }, {
                x: -.120,
                y: -.750
            }, {
                x: -.166,
                y: -.046
            }, {
                x: -.169,
                y: .047
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[options.color + "_DOUBLE_LASER_CANNON"], weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(6000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: -.75,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: .75,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 4,
            squadronKey: options.bomber
        }]
    };
}

templates.GOLAN_II = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";

    return {
        name: "Golan II Defense Platform",
        asset: "GOLAN2.png",
        classification: shipTypes.SpaceStation,
        population: 25,
        size: 1250,
        cost: 6000,
        speed: 0,
        turnSpeed: 0,
        shield: 15000,
        shieldRegen: 15,
        hardpoints: (function () {
            const points = [{
                x: -.208,
                y: .788
            }, {
                x: -.360,
                y: .407
            }, {
                x: -.369,
                y: .373
            }, {
                x: -.369,
                y: .117
            }, {
                x: -.371,
                y: -.117
            }, {
                x: -.371,
                y: -.372
            }, {
                x: -.363,
                y: -.415
            }, {
                x: -.209,
                y: -.792
            }, {
                x: -.184,
                y: -.973
            }, {
                x: -.185,
                y: .977
            }, {
                x: -.333,
                y: -.037
            }, {
                x: -.333,
                y: .034
            }, {
                x: -.234,
                y: -.388
            }, {
                x: -.236,
                y: .388
            }, {
                x: -.180,
                y: -.102
            }, {
                x: -.177,
                y: .101
            }, {
                x: -.104,
                y: -.498
            }, {
                x: -.105,
                y: .496
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[options.color + "_DOUBLE_LASER_CANNON"], weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"], weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(15000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: -.75,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: .75,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 8,
            squadronKey: options.bomber
        }]
    };
}

templates.GOLAN_III = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";

    return {
        name: "Golan III Defense Platform",
        asset: "GOLAN3.png",
        classification: shipTypes.SpaceStation,
        population: 50,
        size: 2000,
        cost: 15000,
        speed: 0,
        turnSpeed: 0,
        shield: 30500,
        shieldRegen: 30.5,
        hardpoints: (function () {
            const points = [{
                x: -.115,
                y: .964
            }, {
                x: -.154,
                y: .912
            }, {
                x: -.161,
                y: .841
            }, {
                x: -.173,
                y: .755
            }, {
                x: -.169,
                y: .492
            }, {
                x: -.036,
                y: .614
            }, {
                x: -.098,
                y: .721
            }, {
                x: -.275,
                y: .592
            }, {
                x: -.331,
                y: .450
            }, {
                x: -.343,
                y: .304
            }, {
                x: -.264,
                y: .367
            }, {
                x: -.281,
                y: .130
            }, {
                x: -.278,
                y: -.112
            }, {
                x: -.345,
                y: -.312
            }, {
                x: -.335,
                y: -.452
            }, {
                x: -.275,
                y: -.589
            }, {
                x: -.178,
                y: -.758
            }, {
                x: -.168,
                y: -.911
            }, {
                x: -.113,
                y: -.964
            }, {
                x: -.157,
                y: -.501
            }, {
                x: -.033,
                y: -.685
            }, {
                x: -.094,
                y: -.759
            }, {
                x: -.217,
                y: -.301
            }, {
                x: -.212,
                y: -.167
            }, {
                x: -.209,
                y: .156
            }, {
                x: -.222,
                y: .307
            }, {
                x: -.072,
                y: .431
            }, {
                x: -.071,
                y: -.437
            }, {
                x: -.068,
                y: -.165
            }, {
                x: -.062,
                y: .170
            }, {
                x: -.168,
                y: -.002
            }, {
                x: -.172,
                y: -.821
            }, {
                x: -.260,
                y: -.366
            }, {
                x: -.084,
                y: -.003
            }];

            for (let i = 0, n = points.length; i < n; i++) {
                points.push({
                    x: -points[i].x,
                    y: points[i].y
                });
            }

            const output = [];
            const selections = [
                weapons.DOUBLE_ION_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
                weapons[options.color + "_DOUBLE_LASER_CANNON"], weapons[options.color + "_DOUBLE_LASER_CANNON_HEAVY"],
                weapons[options.color + "_DOUBLE_TURBOLASER_CANNON"], weapons[options.color + "_DOUBLE_TURBOLASER_CANNON_HEAVY"],
                weapons.QUAD_ION_CANNON_MEDIUM, weapons.QUAD_ION_CANNON_HEAVY,
                weapons[options.color + "_QUAD_LASER_CANNON"], weapons[options.color + "_QUAD_LASER_CANNON_HEAVY"],
                weapons[options.color + "_QUAD_TURBOLASER_CANNON"], weapons[options.color + "_QUAD_TURBOLASER_CANNON_HEAVY"],
                weapons.ASSAULT_CONCUSSION_MISSILE, weapons.ASSAULT_PROTON_TORPEDO
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 200
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(30500 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: -.75,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 16,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: .75,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 16,
            squadronKey: options.bomber
        }]
    };
}

templates.SHIPYARD_LVL_1 = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";
    options.corvette ??= ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE", "IPV1_EMPIRE"];
    options.frigate ??= ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE"];

    return {
        shipyardLevel: 1, // IMPORTANT
        name: "Light Frigate Shipyard",
        asset: "SHIPYARD1.png",
        classification: shipTypes.SpaceStation,
        population: 20,
        size: 1200,
        cost: 1500,
        speed: 0,
        turnSpeed: 0,
        shield: 3500,
        shieldRegen: 3.5,
        hardpoints: (function () {
            const points = [{
                x: -.472,
                y: .154
            }, {
                x: -.472,
                y: -.500
            }, {
                x: .099,
                y: -.829
            }, {
                x: .677,
                y: -.502
            }, {
                x: .671,
                y: .159
            }, {
                x: .101,
                y: .495
            }, {
                x: -.521,
                y: .906
            }, {
                x: -.198,
                y: .350
            }];

            const output = [];
            const selections = [
                weapons.ION_CANNON,
                weapons[options.color + "_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(4000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 1,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.bomber
        }],
        production: (function () {
            const output = [];

            const corvettesAlive = 4;
            const frigatesAlive = 1;

            if (!(options.corvette instanceof Array)) {
                options.corvette = [options.corvette];
            } else if (options.corvette.length > corvettesAlive) {
                options.corvette = options.corvette.sort(() => .5 - Math.random());
            }

            if (!(options.frigate instanceof Array)) {
                options.frigate = [options.frigate];
            } else if (options.frigate.length > frigatesAlive) {
                options.frigate = options.frigate.sort(() => .5 - Math.random());
            }

            for (let i = 0; i < corvettesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 4,
                    key: options.corvette[i % options.corvette.length],
                    cooldown: 128
                });
            }

            for (let i = 0; i < frigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 2,
                    key: options.frigate[i % options.frigate.length],
                    cooldown: 256
                });
            }

            return output;
        })()
    };
}

templates.SHIPYARD_LVL_2 = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";
    options.corvette ??= ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE", "IPV1_EMPIRE"];
    options.frigate ??= ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE", "STRIKECRUISER_EMPIRE", "VICTORYFRIGATE_EMPIRE"];
    options.heavyFrigate ??= ["DREADNOUGHTHEAVYCRUISER_EMPIRE", "VINDICATOR_EMPIRE"];

    return {
        shipyardLevel: 2, // IMPORTANT
        name: "Heavy Frigate Shipyard",
        asset: "SHIPYARD2.png",
        classification: shipTypes.SpaceStation,
        population: 55,
        size: 1750,
        cost: 2300,
        speed: 0,
        turnSpeed: 0,
        shield: 8000,
        shieldRegen: 8,
        hardpoints: (function () {
            const points = [{
                x: -.871,
                y: .338
            }, {
                x: -.644,
                y: .193
            }, {
                x: -.380,
                y: .150
            }, {
                x: -.388,
                y: -.225
            }, {
                x: -.643,
                y: -.242
            }, {
                x: -.878,
                y: -.414
            }, {
                x: -.344,
                y: -.953
            }, {
                x: -.166,
                y: -.723
            }, {
                x: -.147,
                y: -.470
            }, {
                x: -.041,
                y: .427
            }, {
                x: -.139,
                y: .968
            }, {
                x: -.179,
                y: .703
            }, {
                x: -.015,
                y: .727
            }, {
                x: .229,
                y: -.462
            }, {
                x: .262,
                y: -.719
            }, {
                x: .426,
                y: -.954
            }, {
                x: .396,
                y: -.232
            }, {
                x: .433,
                y: .056
            }, {
                x: .204,
                y: .320
            }, {
                x: -.189,
                y: .277
            }, {
                x: .088,
                y: -.397
            }, {
                x: -.320,
                y: -.074
            }];

            const output = [];
            const selections = [
                weapons.ION_CANNON,
                weapons[options.color + "_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(12000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 2,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.bomber
        }],
        production: (function () {
            const output = [];

            const corvettesAlive = 4;
            const frigatesAlive = 2;
            const heavyFrigatesAlive = 1;

            if (!(options.corvette instanceof Array)) {
                options.corvette = [options.corvette];
            } else if (options.corvette.length > corvettesAlive) {
                options.corvette = options.corvette.sort(() => .5 - Math.random());
            }

            if (!(options.frigate instanceof Array)) {
                options.frigate = [options.frigate];
            } else if (options.frigate.length > frigatesAlive) {
                options.frigate = options.frigate.sort(() => .5 - Math.random());
            }

            if (!(options.heavyFrigate instanceof Array)) {
                options.heavyFrigate = [options.heavyFrigate];
            } else if (options.heavyFrigate.length > heavyFrigatesAlive) {
                options.heavyFrigate = options.heavyFrigate.sort(() => .5 - Math.random());
            }

            for (let i = 0; i < corvettesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 8,
                    key: options.corvette[i % options.corvette.length],
                    cooldown: 128
                });
            }

            for (let i = 0; i < frigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 4,
                    key: options.frigate[i % options.frigate.length],
                    cooldown: 256
                });
            }

            for (let i = 0; i < heavyFrigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 2,
                    key: options.heavyFrigate[i % options.heavyFrigate.length],
                    cooldown: 512
                });
            }

            return output;
        })()
    };
}

templates.SHIPYARD_LVL_3 = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";
    options.corvette ??= ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE", "IPV1_EMPIRE"];
    options.frigate ??= ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE", "STRIKECRUISER_EMPIRE", "VICTORYFRIGATE_EMPIRE"];
    options.heavyFrigate ??= ["DREADNOUGHTHEAVYCRUISER_EMPIRE", "VINDICATOR_EMPIRE", "PURSUIT_EMPIRE"];
    options.capital ??= ["IMPERIALSTARDESTROYER_EMPIRE"];

    return {
        shipyardLevel: 3, // IMPORTANT
        name: "Capital Shipyard",
        asset: "SHIPYARD3.png",
        classification: shipTypes.SpaceStation,
        population: 85,
        size: 3000,
        cost: 5000,
        speed: 0,
        turnSpeed: 0,
        shield: 15000,
        shieldRegen: 15,
        hardpoints: (function () {
            const points = [{
                x: -.794,
                y: -.971
            }, {
                x: -.700,
                y: -.651
            }, {
                x: -.566,
                y: -.733
            }, {
                x: -.434,
                y: -.544
            }, {
                x: -.604,
                y: -.438
            }, {
                x: -.587,
                y: -.145
            }, {
                x: -.300,
                y: -.384
            }, {
                x: -.532,
                y: -.253
            }, {
                x: -.207,
                y: -.388
            }, {
                x: -.179,
                y: -.598
            }, {
                x: -.089,
                y: -.795
            }, {
                x: .334,
                y: -.542
            }, {
                x: .065,
                y: -.253
            }, {
                x: .111,
                y: -.589
            }, {
                x: .074,
                y: -.625
            }, {
                x: -.133,
                y: -.480
            }, {
                x: .068,
                y: -.346
            }, {
                x: .095,
                y: -.150
            }, {
                x: .091,
                y: .095
            }, {
                x: .846,
                y: -.029
            }, {
                x: .512,
                y: -.078
            }, {
                x: .512,
                y: .021
            }, {
                x: .286,
                y: -.110
            }, {
                x: .287,
                y: .069
            }, {
                x: .044,
                y: .183
            }, {
                x: .358,
                y: .497
            }, {
                x: -.089,
                y: .757
            }, {
                x: .206,
                y: .316
            }, {
                x: -.177,
                y: .537
            }, {
                x: -.202,
                y: .339
            }, {
                x: .088,
                y: .290
            }, {
                x: -.145,
                y: .434
            }, {
                x: .112,
                y: .529
            }, {
                x: .059,
                y: .552
            }, {
                x: -.312,
                y: .323
            }, {
                x: -.529,
                y: .219
            }, {
                x: -.602,
                y: .074
            }, {
                x: -.428,
                y: .489
            }, {
                x: -.617,
                y: .380
            }, {
                x: -.698,
                y: .608
            }, {
                x: -.578,
                y: .679
            }, {
                x: -.794,
                y: .917
            }];

            const output = [];
            const selections = [
                weapons.ION_CANNON,
                weapons[options.color + "_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(35000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.bomber
        }],
        production: (function () {
            const output = [];

            const corvettesAlive = 8;
            const frigatesAlive = 4;
            const heavyFrigatesAlive = 2;
            const capitalShipsAlive = 1;

            if (!(options.corvette instanceof Array)) {
                options.corvette = [options.corvette];
            } else if (options.corvette.length > corvettesAlive) {
                options.corvette = options.corvette.sort(() => .5 - Math.random());
            }

            if (!(options.frigate instanceof Array)) {
                options.frigate = [options.frigate];
            } else if (options.frigate.length > frigatesAlive) {
                options.frigate = options.frigate.sort(() => .5 - Math.random());
            }

            if (!(options.heavyFrigate instanceof Array)) {
                options.heavyFrigate = [options.heavyFrigate];
            } else if (options.heavyFrigate.length > heavyFrigatesAlive) {
                options.heavyFrigate = options.heavyFrigate.sort(() => .5 - Math.random());
            }

            if (!(options.capital instanceof Array)) {
                options.capital = [options.capital];
            } else if (options.capital.length > capitalShipsAlive) {
                options.capital = options.capital.sort(() => .5 - Math.random());
            }

            for (let i = 0; i < corvettesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 12,
                    key: options.corvette[i % options.corvette.length],
                    cooldown: 128
                });
            }

            for (let i = 0; i < frigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 6,
                    key: options.frigate[i % options.frigate.length],
                    cooldown: 256
                });
            }

            for (let i = 0; i < heavyFrigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 3,
                    key: options.heavyFrigate[i % options.heavyFrigate.length],
                    cooldown: 512
                });
            }

            for (let i = 0; i < capitalShipsAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 1,
                    key: options.capital[i % options.capital.length],
                    cooldown: 1024
                });
            }

            return output;
        })()
    };
}

templates.SHIPYARD_LVL_4 = function (options = {}) {
    options.color ??= "GREEN";

    options.fighter ??= "TIEFIGHTER_EMPIRE";
    options.bomber ??= "TIEPUNISHER_EMPIRE";
    options.corvette ??= ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE", "IPV1_EMPIRE"];
    options.frigate ??= ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE", "STRIKECRUISER_EMPIRE", "VICTORYFRIGATE_EMPIRE"];
    options.heavyFrigate ??= ["DREADNOUGHTHEAVYCRUISER_EMPIRE", "VINDICATOR_EMPIRE", "PURSUIT_EMPIRE"];
    options.capital ??= ["IMPERIALSTARDESTROYER_EMPIRE", "VENATOR_EMPIRE"];

    return {
        shipyardLevel: 4, // IMPORTANT
        name: "Dreadnought Shipyard",
        asset: "SHIPYARD4.png",
        classification: shipTypes.SpaceStation,
        population: 175,
        size: 5000,
        cost: 10000,
        speed: 0,
        turnSpeed: 0,
        shield: 25000,
        shieldRegen: 25,
        hardpoints: (function () {
            const points = [{
                x: -.155,
                y: -.949
            }, {
                x: -.153,
                y: -.730
            }, {
                x: .188,
                y: -.528
            }, {
                x: .311,
                y: -.466
            }, {
                x: .353,
                y: -.416
            }, {
                x: .355,
                y: -.096
            }, {
                x: .352,
                y: .066
            }, {
                x: -.219,
                y: -.480
            }, {
                x: -.171,
                y: -.168
            }, {
                x: -.164,
                y: -.567
            }, {
                x: -.224,
                y: .002
            }, {
                x: -.161,
                y: .184
            }, {
                x: -.163,
                y: .353
            }, {
                x: -.215,
                y: .484
            }, {
                x: -.162,
                y: .538
            }, {
                x: -.169,
                y: .648
            }, {
                x: -.173,
                y: .775
            }, {
                x: -.217,
                y: .958
            }, {
                x: -.170,
                y: .983
            }, {
                x: -.016,
                y: .929
            }, {
                x: -.019,
                y: .857
            }, {
                x: .010,
                y: .763
            }, {
                x: .009,
                y: .691
            }, {
                x: -.029,
                y: .601
            }, {
                x: -.031,
                y: .307
            }, {
                x: -.034,
                y: .103
            }, {
                x: -.081,
                y: -.204
            }, {
                x: -.083,
                y: -.222
            }, {
                x: .043,
                y: .475
            }, {
                x: .298,
                y: .492
            }, {
                x: .351,
                y: .429
            }, {
                x: .382,
                y: .358
            }, {
                x: .350,
                y: .252
            }, {
                x: -.062,
                y: .345
            }, {
                x: -.079,
                y: -.398
            }, {
                x: -.115,
                y: -.615
            }, {
                x: -.023,
                y: -.590
            }, {
                x: -.026,
                y: -.479
            }];

            const output = [];
            const selections = [
                weapons.DOUBLE_ION_CANNON,
                weapons[options.color + "_DOUBLE_LASER_CANNON"]
            ];

            for (let i = 0; i < points.length; i++) {
                output.push({
                    ...points[i],
                    weapon: selections[i % selections.length],
                    shotsAtOnce: 2,
                    shotDelay: 150
                });
            }

            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: Math.round(45000 / output.length)
                }
            }));
        })(),
        hangars: [{
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.fighter
        }, {
            x: 0,
            y: 0,
            maxSquadrons: 4,
            squadronSize: 6,
            reserveSize: 1024,
            squadronKey: options.bomber
        }],
        production: (function () {
            const output = [];

            const corvettesAlive = 8;
            const frigatesAlive = 4;
            const heavyFrigatesAlive = 2;
            const capitalShipsAlive = 2;

            if (!(options.corvette instanceof Array)) {
                options.corvette = [options.corvette];
            } else if (options.corvette.length > corvettesAlive) {
                options.corvette = options.corvette.sort(() => .5 - Math.random());
            }

            if (!(options.frigate instanceof Array)) {
                options.frigate = [options.frigate];
            } else if (options.frigate.length > frigatesAlive) {
                options.frigate = options.frigate.sort(() => .5 - Math.random());
            }

            if (!(options.heavyFrigate instanceof Array)) {
                options.heavyFrigate = [options.heavyFrigate];
            } else if (options.heavyFrigate.length > heavyFrigatesAlive) {
                options.heavyFrigate = options.heavyFrigate.sort(() => .5 - Math.random());
            }

            if (!(options.capital instanceof Array)) {
                options.capital = [options.capital];
            } else if (options.capital.length > capitalShipsAlive) {
                options.capital = options.capital.sort(() => .5 - Math.random());
            }

            for (let i = 0; i < corvettesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 12,
                    key: options.corvette[i % options.corvette.length],
                    cooldown: 128
                });
            }

            for (let i = 0; i < frigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 6,
                    key: options.frigate[i % options.frigate.length],
                    cooldown: 256
                });
            }

            for (let i = 0; i < heavyFrigatesAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 3,
                    key: options.heavyFrigate[i % options.heavyFrigate.length],
                    cooldown: 512
                });
            }

            for (let i = 0; i < capitalShipsAlive; i++) {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 1,
                    key: options.capital[i % options.capital.length],
                    cooldown: 1024
                });
            }

            return output;
        })()
    };
}

export default templates;