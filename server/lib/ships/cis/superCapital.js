import { shipTypes, weaponTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDREADNOUGHT_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 70,
    size: 1100,
    cost: 14000,
    speed: 2.25,
    turnSpeed: .003,
    shield: 18300,
    shieldRegen: 18.3,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .1,
                y: .55 - .08 * i,
                weapon: weapons.ASSAULT_PROTON_TORPEDO,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: 0,
                y: .45 - .08 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .14,
                y: -.175 - .16 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: .06,
                y: .5 - .08 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 4,
                shotDelay: 120
            }, {
                x: -.12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        for (let i = 0; i < 6; i++) {
            output.push({
                x: -.01,
                y: .1 - .05 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .05,
                y: .1 - .05 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 4.4 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.RECUSANTDREADNOUGHT_CIS = {
    name: "Recusant Destroyer",
    asset: "RECUSANTDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 65,
    size: 1200,
    cost: 11000,
    speed: 3,
    turnSpeed: .01,
    shield: 16500,
    shieldRegen: 16.5,
    hardpoints: (function () {
        const output = [{
            x: 0,
            y: .95,
            weapon: {
                ...weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
                damage: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD.damage * 3,
                bypassShield: false
            }
        }, {
            x: 0,
            y: .9,
            weapon: {
                ...weapons.ION_CANNON_ULTRA,
                damage: weapons.ION_CANNON_ULTRA.damage * 3
            }
        }];

        const points = [{
            x: -.014,
            y: .934
        }, {
            x: -.035,
            y: .871
        }, {
            x: -.056,
            y: .769
        }, {
            x: -.058,
            y: .674
        }, {
            x: -.062,
            y: .593
        }, {
            x: -.080,
            y: .533
        }, {
            x: -.090,
            y: .493
        }, {
            x: -.090,
            y: .441
        }, {
            x: -.100,
            y: .379
        }, {
            x: -.113,
            y: .303
        }, {
            x: -.110,
            y: .223
        }, {
            x: -.106,
            y: .148
        }, {
            x: -.087,
            y: .072
        }, {
            x: -.071,
            y: -.014
        }, {
            x: -.053,
            y: -.099
        }, {
            x: -.035,
            y: -.175
        }, {
            x: -.034,
            y: -.235
        }, {
            x: -.030,
            y: -.402
        }, {
            x: -.027,
            y: -.513
        }, {
            x: -.035,
            y: -.779
        }, {
            x: -.027,
            y: .324
        }, {
            x: -.042,
            y: .280
        }, {
            x: -.041,
            y: .210
        }, {
            x: -.031,
            y: .167
        }, {
            x: -.030,
            y: .092
        }, {
            x: -.027,
            y: .014
        }, {
            x: -.023,
            y: -.053
        }, {
            x: -.049,
            y: .445
        }, {
            x: -.045,
            y: .558
        }, {
            x: -.041,
            y: .691
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const selections = [
            weapons.RED_DOUBLE_LASER_CANNON,
            weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
            weapons.DOUBLE_ION_CANNON_MEDIUM,
            weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            weapons.RED_DOUBLE_TURBOLASER_CANNON,
            weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
            weapons.QUAD_ION_CANNON_HEAVY
        ];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.95 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.BULWARKII_CIS = {
    name: "Bulwark-II Battleship",
    asset: "BULWARKII.png",
    classification: shipTypes.SuperCapital,
    population: 65,
    size: 1000,
    cost: 9500,
    speed: 2,
    turnSpeed: .0025,
    shield: 18000,
    shieldRegen: 18,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 16; i++) {
            const x = Math.sin(i / 4) * .075 + .1;
            const y = .85 - (i / 16) * 1.7;

            const weapon = [
                weapons.RED_TURBOLASER_CANNON_HEAVY,
                weapons.ION_CANNON_ULTRA,
                weapons.RED_TURBOLASER_CANNON_HEAVY,
                weapons.TRIPLE_ION_CANNON_MEDIUM
            ][i % 4];

            output.push({
                x,
                y,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -x,
                y,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        for (let i = 0; i < 7; i++) {
            const x = Math.sin(i) * .075 + .05;
            const y = .667 - .2 * i;

            for (let j = 0; j < 3; j++) {
                const angle = Math.PI * 2 / 3 * j;
                const d = .02;
                const x2 = x + Math.cos(angle) * d;
                const y2 = y + Math.sin(angle) * d;

                const weapon = [
                    weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    weapons.TRIPLE_ION_CANNON,
                    weapons.RED_TRIPLE_LASER_CANNON
                ][j % 3];

                output.push({
                    x: x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 120
                }, {
                    x: -x2,
                    y: y2,
                    weapon: weapon,
                    shotsAtOnce: 2,
                    shotDelay: 120
                });
            }
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "VULTUREDROID_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.SUBJUGATOR_CIS = {
    name: "Subjugator-Class Battlecruiser",
    asset: "SUBJUGATOR.png",
    classification: shipTypes.SuperCapital,
    population: 80,
    size: 3230,
    cost: 45000,
    speed: 1,
    turnSpeed: .0005,
    shield: 52300,
    shieldRegen: 52,
    hardpoints: (function () {
        const output = [];

        const points = [{
            x: .001,
            y: .940
        }, {
            x: -.030,
            y: .820
        }, {
            x: -.001,
            y: .868
        }, {
            x: .022,
            y: .809
        }, {
            x: -.033,
            y: .712
        }, {
            x: .043,
            y: .701
        }, {
            x: .069,
            y: .609
        }, {
            x: .090,
            y: .524
        }, {
            x: -.093,
            y: .488
        }, {
            x: -.083,
            y: .571
        }, {
            x: -.066,
            y: .641
        }, {
            x: .002,
            y: .763
        }, {
            x: -.035,
            y: .614
        }, {
            x: .001,
            y: .650
        }, {
            x: .013,
            y: .538
        }, {
            x: -.047,
            y: .497
        }, {
            x: -.005,
            y: .587
        }, {
            x: .046,
            y: .460
        }, {
            x: -.039,
            y: .431
        }, {
            x: -.001,
            y: .488
        }, {
            x: .061,
            y: .281
        }, {
            x: -.077,
            y: .358
        }, {
            x: .075,
            y: .354
        }, {
            x: -.037,
            y: .087
        }, {
            x: .051,
            y: .097
        }, {
            x: -.052,
            y: .236
        }, {
            x: -.003,
            y: .176
        }, {
            x: -.068,
            y: -.020
        }, {
            x: .031,
            y: -.011
        }, {
            x: -.047,
            y: -.155
        }, {
            x: .066,
            y: -.126
        }, {
            x: -.029,
            y: -.074
        }, {
            x: .031,
            y: -.778
        }, {
            x: -.056,
            y: -.696
        }, {
            x: .040,
            y: -.668
        }, {
            x: .066,
            y: -.525
        }, {
            x: .097,
            y: -.432
        }, {
            x: -.097,
            y: -.432
        }, {
            x: -.084,
            y: -.530
        }, {
            x: -.025,
            y: -.279
        }, {
            x: -.083,
            y: -.330
        }, {
            x: .078,
            y: -.150
        }, {
            x: .058,
            y: -.340
        }, {
            x: -.062,
            y: -.223
        }, {
            x: .092,
            y: .194
        }, {
            x: -.107,
            y: .101
        }];

        const weaps = [weapons.RED_DOUBLE_LASER_CANNON_HEAVY, weapons.RED_DOUBLE_LASER_CANNON_HEAVY, weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY];

        for (const point of points) {
            for (let j = 0; j < 4; j++) {
                const angle = Math.PI * 2 / 4 * j;
                const d = .005;

                output.push({
                    x: point.x + Math.cos(angle) * d,
                    y: point.y + Math.sin(angle) * d,
                    weapon: weaps[j]
                });
            }
        }

        for (const point of [{
            x: -.242,
            y: .326
        }, {
            x: .241,
            y: .333
        }]) {
            output.push({
                x: point.x,
                y: point.y,
                weapon: weapons.SUBJUGATOR_ION_BLAST
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0,
                range: e.weapon.range * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 12,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 3,
        reserveSize: 24,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

ships.DEVASTATION_CIS = {
    name: "Devastation-Class Battlecruiser",
    asset: "DEVASTATION.png",
    classification: shipTypes.SuperCapital,
    population: 80,
    size: 3230,
    cost: 45000,
    speed: 1,
    turnSpeed: .0005,
    shield: 52300,
    shieldRegen: 52,
    hardpoints: (function () {
        const output = [];

        const points = [{
            x: -.011,
            y: .961
        }, {
            x: -.028,
            y: .917
        }, {
            x: -.053,
            y: .853
        }, {
            x: -.075,
            y: .778
        }, {
            x: -.097,
            y: .698
        }, {
            x: -.109,
            y: .635
        }, {
            x: -.153,
            y: .617
        }, {
            x: -.191,
            y: .496
        }, {
            x: -.207,
            y: .401
        }, {
            x: -.217,
            y: .305
        }, {
            x: -.214,
            y: .199
        }, {
            x: -.212,
            y: .087
        }, {
            x: -.144,
            y: .546
        }, {
            x: -.146,
            y: .438
        }, {
            x: -.149,
            y: .340
        }, {
            x: -.146,
            y: .261
        }, {
            x: -.127,
            y: .159
        }, {
            x: -.032,
            y: .618
        }, {
            x: -.045,
            y: .498
        }, {
            x: -.052,
            y: .393
        }, {
            x: -.055,
            y: .301
        }, {
            x: -.058,
            y: .199
        }, {
            x: -.058,
            y: .099
        }, {
            x: -.132,
            y: .064
        }, {
            x: -.129,
            y: -.043
        }, {
            x: -.130,
            y: -.224
        }, {
            x: -.128,
            y: -.376
        }, {
            x: -.044,
            y: -.006
        }, {
            x: -.035,
            y: -.114
        }, {
            x: -.032,
            y: -.229
        }, {
            x: -.026,
            y: -.308
        }, {
            x: -.028,
            y: -.381
        }, {
            x: -.035,
            y: -.451
        }, {
            x: -.035,
            y: -.537
        }, {
            x: -.030,
            y: -.590
        }, {
            x: -.172,
            y: -.358
        }, {
            x: -.206,
            y: -.439
        }, {
            x: -.210,
            y: -.555
        }, {
            x: -.195,
            y: -.699
        }, {
            x: -.059,
            y: -.744
        }, {
            x: -.100,
            y: -.707
        }, {
            x: -.121,
            y: -.656
        }, {
            x: -.125,
            y: -.591
        }, {
            x: -.073,
            y: -.640
        }, {
            x: -.121,
            y: -.502
        }, {
            x: -.084,
            y: -.383
        }, {
            x: -.092,
            y: -.180
        }, {
            x: -.095,
            y: .510
        }, {
            x: -.097,
            y: .341
        }, {
            x: -.084,
            y: -.021
        }, {
            x: -.081,
            y: -.279
        }, {
            x: -.023,
            y: -.673
        }, {
            x: -.029,
            y: -.747
        }, {
            x: -.017,
            y: -.808
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const weaps = [
            weapons.RED_DOUBLE_LASER_CANNON_HEAVY, weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            weapons.RED_DOUBLE_LASER_CANNON_HEAVY, weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
            weapons.DOUBLE_ION_CANNON_MEDIUM, weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            weapons.ASSAULT_CONCUSSION_MISSILE
        ];

        let k = 0;
        for (const point of points) {
            for (let j = 0; j < 2; j++) {
                const angle = Math.PI * j;
                const d = .005;

                output.push({
                    x: point.x + Math.cos(angle) * d,
                    y: point.y + Math.sin(angle) * d,
                    weapon: weaps[k++ % weaps.length]
                });
            }
        }

        output.push({
            x: 0,
            y: .6,
            weapon: weapons.DEVASTATION_SUPERLASER,
            shotsAtOnce: 1000,
            shotDelay: 2
        });

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0,
                range: e.weapon.range * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 12,
        squadronKey: "HYENABOMBER_CIS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 3,
        reserveSize: 24,
        squadronKey: "DROIDTRIFIGHTER_CIS"
    }]
};

export default ships;