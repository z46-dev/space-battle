import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.MC85_REBEL = {
    name: "MC-85",
    asset: "MC85.png",
    classification: shipTypes.SuperCapital,
    population: 70,
    size: 1920,
    cost: 20000,
    speed: 4,
    turnSpeed: .0125,
    shield: 32390,
    shieldRegen: 32,
    shieldRegenAbility: {
        duration: 1.25,
        cooldown: 1.2,
        regen: 1.5
    },
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 6; i++) {
            output.push({
                x: -.06 - .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: .8 - .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.06 - .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .06 + .025 * i,
                y: -.4 + .1 * i,
                weapon: (i % 3 === 0) ? weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: .7 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: -.3 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_HEAVY : weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "BWING_REBEL"
    }]
};

ships.BLUEDIVER_REBEL = {
    name: "Blue Diver Star Carrier",
    asset: "BLUEDIVER.png",
    classification: shipTypes.SuperCapital,
    population: 110,
    size: 2230,
    cost: 22000,
    speed: 2,
    turnSpeed: .005,
    shield: 32390,
    shieldRegen: 32,
    shieldRegenAbility: {
        duration: 1.5,
        cooldown: 1.25,
        regen: 1.5
    },
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 8; i++) {
            output.push({
                x: -.03 - .025 * i,
                y: .8 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: .8 - .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: -.8 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: -.8 + .1 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        const positions = [{
            x: 0,
            y: .6,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: .2,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: -.2,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: -.6,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }];

        for (const { x, y, weapons } of positions) {
            for (let i = 0; i < weapons.length; i++) {
                const ang = Math.PI * 2 * i / weapons.length;
                const d = .03;

                output.push({
                    x: x + d * Math.cos(ang),
                    y: y + d * Math.sin(ang),
                    weapon: weapons[i],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 7 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "BWING_REBEL"
    }]
};

ships.MEDIATOR_REBEL = {
    name: "Mediator Star Cruiser",
    asset: "MEDIATOR.png",
    classification: shipTypes.SuperCapital,
    population: 120,
    size: 2450,
    cost: 24000,
    speed: 1,
    turnSpeed: .0025,
    shield: 34500,
    shieldRegen: 34,
    shieldRegenAbility: {
        duration: 2,
        cooldown: .8,
        regen: 1
    },
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 8; i++) {
            output.push({
                x: -.03 - .025 * i,
                y: .8 - .1 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: .8 - .1 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: -.03 - .025 * i,
                y: -.8 + .1 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .03 + .025 * i,
                y: -.8 + .1 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        const positions = [{
            x: 0,
            y: .6,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: .2,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: -.2,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: -.6,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: .2,
            y: -.1,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.2,
            y: -.1,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: .15,
            y: -.3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.15,
            y: -.3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }];

        for (const { x, y, weapons } of positions) {
            for (let i = 0; i < weapons.length; i++) {
                const ang = Math.PI * 2 * i / weapons.length;
                const d = .03;

                output.push({
                    x: x + d * Math.cos(ang),
                    y: y + d * Math.sin(ang),
                    weapon: weapons[i],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 7 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 9,
        squadronKey: "YWING_REBEL"
    }]
};

ships.VISCOUNT_PROTOTYPE_REBEL = {
    name: "Viscount Prototype",
    asset: "VISCOUNT_PROTOTYPE.png",
    classification: shipTypes.SuperCapital,
    population: 180,
    size: 4800,
    cost: 25000,
    speed: 3,
    turnSpeed: .001,
    shield: 75000,
    shieldRegen: 75,
    shieldRegenAbility: {
        cooldown: .75,
        regen: .75
    },
    hardpoints: (function () {
        const output = [];

        const positions = [{
            x: 0,
            y: .9,
            weapons: [weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: 0,
            y: .6,
            weapons: [weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: .3,
            weapons: [weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: 0,
            y: -.3,
            weapons: [weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: 0,
            y: -.6,
            weapons: [weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: 0,
            y: -.9,
            weapons: [weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: .15,
            y: .7,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.15,
            y: .7,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: .2,
            y: .5,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.2,
            y: .5,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: .25,
            y: .3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.25,
            y: .3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: .25,
            y: .1,
            weapons: [weapons.ION_CANNON_ULTRA, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.ION_CANNON_ULTRA, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY]
        }, {
            x: -.25,
            y: .1,
            weapons: [weapons.ION_CANNON_ULTRA, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.ION_CANNON_ULTRA, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY]
        }, {
            x: .2,
            y: -.1,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.2,
            y: -.1,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: .15,
            y: -.3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: -.15,
            y: -.3,
            weapons: [weapons.QUAD_ION_CANNON_MEDIUM, weapons.RED_QUAD_TURBOLASER_CANNON, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY]
        }, {
            x: 0,
            y: 0,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA]
        }, {
            x: 0,
            y: .3,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA]
        }, {
            x: 0,
            y: -.3,
            weapons: [weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA, weapons.ION_CANNON_ULTRA]
        }];

        for (const { x, y, weapons } of positions) {
            for (let i = 0; i < weapons.length; i++) {
                const ang = Math.PI * 2 * i / weapons.length;
                const d = .025;

                output.push({
                    x: x + d * Math.cos(ang),
                    y: y + d * Math.sin(ang),
                    weapon: weapons[i],
                    shotsAtOnce: 2,
                    shotDelay: 100
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 11.5 | 0,
                reload: e.weapon.reload * .5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "BWING_REBEL"
    }]
};

ships.VISCOUNT_REBEL = {
    name: "Viscount Star Defender",
    asset: "VISCOUNT.png",
    classification: shipTypes.SuperCapital,
    population: 210,
    size: 7000,
    cost: 85000,
    speed: 3,
    turnSpeed: .001,
    shield: 100000,
    shieldRegen: 100,
    shieldRegenAbility: {
        cooldown: 1.5,
        regen: .5
    },
    hardpoints: (function () {
        const points = [{
            x: -.014,
            y: .905
        }, {
            x: -.087,
            y: .696
        }, {
            x: .046,
            y: .702
        }, {
            x: .095,
            y: .450
        }, {
            x: -.098,
            y: .517
        }, {
            x: -.161,
            y: .293
        }, {
            x: .023,
            y: .217
        }, {
            x: -.073,
            y: -.152
        }, {
            x: -.143,
            y: -.155
        }, {
            x: -.195,
            y: .151
        }, {
            x: -.081,
            y: .072
        }, {
            x: .156,
            y: -.031
        }, {
            x: .121,
            y: -.224
        }, {
            x: .055,
            y: -.403
        }, {
            x: .060,
            y: -.487
        }, {
            x: .031,
            y: -.708
        }, {
            x: .000,
            y: -.888
        }, {
            x: -.042,
            y: -.918
        }, {
            x: .013,
            y: -.961
        }, {
            x: -.059,
            y: -.828
        }, {
            x: .046,
            y: -.837
        }, {
            x: -.046,
            y: -.760
        }, {
            x: .021,
            y: -.800
        }, {
            x: -.101,
            y: -.700
        }, {
            x: -.088,
            y: -.532
        }, {
            x: -.126,
            y: -.450
        }, {
            x: -.148,
            y: -.294
        }, {
            x: -.198,
            y: -.137
        }, {
            x: -.213,
            y: .049
        }, {
            x: -.232,
            y: .266
        }, {
            x: -.195,
            y: .458
        }, {
            x: -.159,
            y: .608
        }, {
            x: -.088,
            y: .830
        }, {
            x: .012,
            y: .918
        }, {
            x: .076,
            y: .837
        }, {
            x: .112,
            y: .678
        }, {
            x: .160,
            y: .335
        }, {
            x: .134,
            y: .213
        }, {
            x: .052,
            y: .079
        }, {
            x: -.043,
            y: -.159
        }, {
            x: -.047,
            y: -.177
        }, {
            x: -.018,
            y: -.238
        }, {
            x: -.017,
            y: -.401
        }, {
            x: -.010,
            y: -.531
        }, {
            x: .016,
            y: -.578
        }, {
            x: .073,
            y: -.614
        }, {
            x: .077,
            y: -.670
        }, {
            x: .053,
            y: -.746
        }, {
            x: -.021,
            y: -.734
        }, {
            x: .030,
            y: -.659
        }, {
            x: -.082,
            y: -.617
        }, {
            x: -.044,
            y: -.592
        }, {
            x: -.112,
            y: -.423
        }, {
            x: -.121,
            y: -.321
        }, {
            x: -.070,
            y: -.435
        }, {
            x: -.048,
            y: -.504
        }, {
            x: .016,
            y: -.470
        }, {
            x: .085,
            y: -.449
        }, {
            x: .111,
            y: -.508
        }, {
            x: .118,
            y: -.573
        }, {
            x: .117,
            y: -.692
        }, {
            x: .090,
            y: -.773
        }, {
            x: .055,
            y: -.829
        }, {
            x: .042,
            y: -.908
        }, {
            x: -.030,
            y: -.967
        }, {
            x: .146,
            y: -.384
        }, {
            x: .167,
            y: -.288
        }, {
            x: .186,
            y: -.113
        }, {
            x: .213,
            y: -.062
        }, {
            x: .232,
            y: .099
        }, {
            x: .232,
            y: .165
        }, {
            x: .224,
            y: .263
        }, {
            x: .203,
            y: .376
        }, {
            x: .184,
            y: .457
        }, {
            x: .171,
            y: .586
        }, {
            x: .133,
            y: .672
        }, {
            x: .115,
            y: .739
        }, {
            x: -.081,
            y: .786
        }, {
            x: -.143,
            y: .691
        }, {
            x: -.174,
            y: .564
        }, {
            x: -.223,
            y: .367
        }, {
            x: -.233,
            y: .272
        }, {
            x: -.117,
            y: .246
        }, {
            x: -.025,
            y: .321
        }, {
            x: -.125,
            y: .427
        }, {
            x: -.135,
            y: .526
        }, {
            x: -.051,
            y: .629
        }, {
            x: -.035,
            y: .478
        }, {
            x: .007,
            y: .392
        }, {
            x: .062,
            y: .359
        }, {
            x: .089,
            y: .242
        }, {
            x: .038,
            y: .176
        }, {
            x: -.047,
            y: .190
        }, {
            x: -.099,
            y: .180
        }, {
            x: -.152,
            y: .064
        }, {
            x: -.129,
            y: -.053
        }, {
            x: -.052,
            y: -.061
        }, {
            x: .018,
            y: -.021
        }, {
            x: .065,
            y: -.085
        }, {
            x: .046,
            y: -.174
        }, {
            x: .049,
            y: -.306
        }, {
            x: .034,
            y: -.324
        }, {
            x: -.062,
            y: -.362
        }, {
            x: -.111,
            y: -.191
        }, {
            x: -.126,
            y: -.108
        }, {
            x: -.118,
            y: -.081
        }, {
            x: -.074,
            y: -.016
        }, {
            x: -.177,
            y: -.010
        }, {
            x: -.206,
            y: -.020
        }, {
            x: -.241,
            y: .039
        }, {
            x: -.260,
            y: .147
        }, {
            x: -.258,
            y: .187
        }, {
            x: -.099,
            y: .262
        }, {
            x: -.030,
            y: .240
        }, {
            x: -.003,
            y: .177
        }, {
            x: -.008,
            y: .059
        }, {
            x: -.098,
            y: .013
        }, {
            x: -.134,
            y: .001
        }, {
            x: .035,
            y: -.272
        }, {
            x: -.022,
            y: -.377
        }, {
            x: .150,
            y: .039
        }, {
            x: .090,
            y: .086
        }, {
            x: .083,
            y: .112
        }, {
            x: .004,
            y: .307
        }, {
            x: -.047,
            y: .306
        }, {
            x: -.081,
            y: .569
        }, {
            x: -.062,
            y: .630
        }, {
            x: .023,
            y: .564
        }, {
            x: .059,
            y: .475
        }, {
            x: .086,
            y: .433
        }, {
            x: .117,
            y: .363
        }, {
            x: .043,
            y: .282
        }, {
            x: -.083,
            y: .383
        }, {
            x: -.118,
            y: .351
        }, {
            x: .099,
            y: .525
        }, {
            x: .049,
            y: .582
        }, {
            x: .017,
            y: .609
        }, {
            x: -.013,
            y: .664
        }, {
            x: -.033,
            y: .687
        }, {
            x: .022,
            y: .715
        }, {
            x: .048,
            y: .782
        }, {
            x: -.026,
            y: .825
        }, {
            x: -.073,
            y: .847
        }, {
            x: -.135,
            y: .703
        }, {
            x: -.181,
            y: .545
        }, {
            x: -.202,
            y: .411
        }, {
            x: .180,
            y: -.176
        }, {
            x: .047,
            y: -.125
        }, {
            x: -.052,
            y: -.111
        }, {
            x: -.169,
            y: -.113
        }, {
            x: -.211,
            y: -.034
        }, {
            x: -.130,
            y: -.263
        }, {
            x: -.048,
            y: -.268
        }, {
            x: .068,
            y: -.288
        }, {
            x: .158,
            y: -.286
        }, {
            x: .103,
            y: -.347
        }, {
            x: -.010,
            y: -.368
        }, {
            x: -.118,
            y: -.349
        }, {
            x: -.141,
            y: -.357
        }, {
            x: -.061,
            y: -.479
        }, {
            x: .012,
            y: -.513
        }, {
            x: .066,
            y: -.597
        }, {
            x: .047,
            y: -.634
        }, {
            x: -.030,
            y: -.668
        }, {
            x: .215,
            y: -.010
        }, {
            x: .187,
            y: .189
        }, {
            x: .242,
            y: .220
        }, {
            x: .146,
            y: .263
        }, {
            x: .173,
            y: .055
        }, {
            x: .236,
            y: .062
        }, {
            x: .182,
            y: .463
        }, {
            x: .167,
            y: .557
        }, {
            x: .226,
            y: .452
        }, {
            x: .130,
            y: .398
        }, {
            x: .074,
            y: .638
        }, {
            x: -.086,
            y: .472
        }, {
            x: -.224,
            y: .216
        }];

        const selections = [{
            weapon: weapons.RED_RAPID_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 75
        }, {
            weapon: weapons.RED_QUAD_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            weapon: weapons.RED_QUAD_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.RED_OCTUPLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 400
        }, {
            weapon: weapons.QUAD_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            weapon: weapons.QUAD_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 300
        }, {
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 400
        }];

        const output = [];
        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                ...selections[i % selections.length]
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 11.5 | 0,
                reload: e.weapon.reload * .65 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }]
};

ships.LUSANKYA_REBEL = templates.superCapital.EXECUTORSUPERSTARDESTROYER({
    name: "Lusankya",
    color: "RED",
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "BWING_REBEL"
    }]
});

export default ships;