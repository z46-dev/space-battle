import { shipTypes, weaponTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PROVIDENCEDREADNOUGHT_CIS = {
    name: "Providence-Class Carrier/Destroyer",
    asset: "PROVIDENCE_DREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 40,
    size: 1100,
    cost: 9700,
    speed: 2.25,
    turnSpeed: .003,
    shield: 14500,
    shieldRegen: 11,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
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
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: .12,
                y: -.1 - .16 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON
            }, {
                x: -.085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .085,
                y: -.175 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .06,
                y: -.1 - .16 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM
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
    population: 34,
    size: 1200,
    cost: 6500,
    speed: 3,
    turnSpeed: .01,
    shield: 8500,
    shieldRegen: 8.5,
    hardpoints: (function() {
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

        for (let i = 0; i < 5; i ++) {
            output.push({
                x: -.05 - .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .05 + .0075 * i,
                y: .85 - .1 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.025 - .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .025 + .0075 * i,
                y: .3 - .075 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.03 - .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .03 + .0075 * i,
                y: .9 - .125 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.03 - .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .03 + .0075 * i,
                y: .35 - .075 * i,
                weapon: i % 2 ? weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY : weapons.DOUBLE_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3.7 | 0
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
    population: 40,
    size: 1000,
    cost: 7800,
    speed: 2,
    turnSpeed: .0025,
    shield: 18000,
    shieldRegen: 18,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 16; i ++) {
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

        for (let i = 0; i < 7; i ++) {
            const x = Math.sin(i) * .075 + .05;
            const y = .667 - .2 * i;

            for (let j = 0; j < 3; j ++) {
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
    population: 75,
    size: 3230,
    cost: 45000,
    speed: 1,
    turnSpeed: .0005,
    shield: 52300,
    shieldRegen: 52,
    hardpoints: (function() {
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
            for (let j = 0; j < 4; j ++) {
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
                health: e.weapon.health * 3 | 0
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