import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.WORLDDEVASTATORBC_DARKEMPIRE = {
    name: "World Devastator Battlecruiser",
    asset: "WORLDDEVASTATOR.png",
    classification: shipTypes.SuperCapital,
    population: 48,
    size: 2600,
    cost: 16000,
    speed: 2,
    turnSpeed: .01,
    shield: 24000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [{
            x: -.35,
            y: .675,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: .675,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: .725,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: .725,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.2,
            y: .9,
            weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .2,
            y: .9,
            weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: .9,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: .9,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.05,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .05,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.05,
            y: -.3,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .05,
            y: -.3,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: -.9,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: -.9,
            weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.65,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: -.65,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.7,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: -.7,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .8 - .15 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .1,
                y: .8 - .15 * i,
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.15,
                y: .15 - .15 * i,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .15,
                y: .15 - .15 * i,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.2,
                y: -.45 - .15 * i,
                weapon: weapons.GREEN_RAPID_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .2,
                y: -.45 - .15 * i,
                weapon: weapons.GREEN_RAPID_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }],
    events: {
        onKill: function(me, them, battle) {
            if (me.persistentData == null) {
                me.persistentData = {
                    material: 0
                };
            }

            const gain = them.size * .1 | 0;

            me.persistentData.material += gain;
            
            console.log("World Devastaor Battlecruiser gained " + gain + " material, now at " + me.persistentData.material);

            while (me.persistentData.material >= 600) {
                me.persistentData.material -= 600;

                const angle = me.angle;
                const distance = me.size * .45;

                const newbie = battle.spawn("WORLDDEVASTATORFG_DARKEMPIRE", me.team, me.x + Math.cos(angle) * distance, me.y + Math.sin(angle) * distance);
                newbie.angle = me.angle;
            }
        }
    }
};

ships.BELLATOR_DARKEMPIRE = {
    name: "Bellator Star Destroyer",
    asset: "BELLATOR.png",
    classification: shipTypes.SuperCapital,
    population: 90,
    size: 5000,
    cost: 30000,
    speed: 1.5,
    turnSpeed: .01,
    shield: 39000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 14; i ++) {
            output.push({
                x: -.02 - .02 * i,
                y: .8 - .1 * i,
                weapon: weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .02 + .02 * i,
                y: .8 - .1 * i,
                weapon: weapons.GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.005 - .02 * i,
                y: .85 - .1 * i,
                weapon: weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .005 + .02 * i,
                y: .85 - .1 * i,
                weapon: weapons.QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.02 - .02 * i,
                y: .85 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .02 + .02 * i,
                y: .85 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: 0,
                y: .15 - .03 * i,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: -.05,
                y: .3 - .1 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 80
            }, {
                x: .05,
                y: .3 - .1 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 80
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.1 - .02 * i,
                y: .1 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            }, {
                x: .1 + .02 * i,
                y: .1 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

ships.ASSERTOR_DARKEMPIRE = {
    name: "Assertor Star Dreadnought",
    asset: "ASSERTOR.png",
    classification: shipTypes.SuperCapital,
    population: 200,
    size: 8000,
    cost: 50000,
    speed: 1,
    turnSpeed: .005,
    shield: 100000,
    shieldRegen: 25,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 36; i ++) {
            output.push({
                x: -.03 - .0115 * i,
                y: .9 - .035 * i,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: .03 + .0115 * i,
                y: .9 - .035 * i,
                weapon: weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: -.02 - .0115 * i,
                y: .85 - .035 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .02 + .0115 * i,
                y: .85 - .035 * i,
                weapon: weapons.GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.01 - .0115 * i,
                y: .9 - .035 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .01 + .0115 * i,
                y: .9 - .035 * i,
                weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.01 - .0115 * i,
                y: .85 - .035 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .01 + .0115 * i,
                y: .85 - .035 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.1,
                y: .45 - .035 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 80
            }, {
                x: .1,
                y: .45 - .035 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 80
            });
        }

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.002,
                y: .3 - .05 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 300
            }, {
                x: .002,
                y: .3 - .05 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 300
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEDEFENDER_DARKEMPIRE"
    }]
};

ships.MANDATORSIEGEDREADNOUGHT_DARKEMPIRE = {
    name: "Mandator IV-class Siege Dreadnought",
    asset: "MANDATORSIEGEDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 4000,
    cost: 40000,
    speed: 1,
    turnSpeed: .005,
    shield: 80000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [{
            x: -.3,
            y: -.4,
            weapon: weapons.RED_LIGHT_SUPERLASER,
            shotsAtOnce: 5,
            shotDelay: 80
        }, {
            x: .3,
            y: -.4,
            weapon: weapons.RED_LIGHT_SUPERLASER,
            shotsAtOnce: 5,
            shotDelay: 80
        }];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.0075 - .034 * i,
                y: .9 - .14 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .035 * i,
                y: .9 - .14 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .02 * i,
                y: .875 - .14 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .02 * i,
                y: .875 - .14 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .01 * i,
                y: .85 - .1 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .01 * i,
                y: .85 - .1 * i,
                weapon: weapons.DOUBLE_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

ships.MEGASTARDESTOYER_DARKEMPIRE = {
    name: "Mega Star Destroyer",
    asset: "MEGASTARDESTROYER.png",
    classification: shipTypes.SuperCapital,
    population: 500,
    size: 30000,
    cost: 80000,
    speed: .01,
    turnSpeed: .001,
    shield: 750000,
    shieldRegen: 50,
    hardpoints: (function() {
        const output = [];
        const types = ["GREEN_TURBOLASER_CANNON_ULTRAHEAVY", "GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY", "ION_CANNON_ULTRA"];
        const types2 = ["GREEN_DOUBLE_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_DOUBLE_LASER_CANNON", "DOUBLE_ION_CANNON_MEDIUM", "GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY"];
        const types3 = ["ASSAULT_CONCUSSION_MISSILE", "ASSAULT_PROTON_ROCKET", "ASSAULT_PROTON_TORPEDO"];

        for (let i = 0; i < 64; i ++) {
            output.push({
                x: .015 + .015 * i,
                y: .225 - .0045 * i,
                weapon: {
                    ...weapons[types[i % types.length]],
                    range: weapons[types[i % types.length]].range * 2.5
                },
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: -.015 - .015 * i,
                y: .225 - .0045 * i,
                weapon: {
                    ...weapons[types[i % types.length]],
                    range: weapons[types[i % types.length]].range * 2.5
                },
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .015 + .015 * i,
                y: .125 - .003 * i,
                weapon: {
                    ...weapons[types2[i % types2.length]],
                    range: weapons[types2[i % types2.length]].range * 2.5
                },
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -.015 - .015 * i,
                y: .125 - .003 * i,
                weapon: {
                    ...weapons[types2[i % types2.length]],
                    range: weapons[types2[i % types2.length]].range * 2.5
                },
                shotsAtOnce: 2,
                shotDelay: 75
            });

            if (i % 8 === 0) {
                output.push({
                    x: .015 + .015 * i,
                    y: .225 - .0045 * i,
                    weapon: {
                        ...weapons.GREEN_SUPERLASER,
                        speed: weapons.GREEN_SUPERLASER.speed * .5,
                        range: weapons.GREEN_SUPERLASER.range * 3,
                        reload: weapons.GREEN_SUPERLASER.reload * .3,
                        damage: weapons.GREEN_SUPERLASER.damage * .4
                    }
                }, {
                    x: -.015 - .015 * i,
                    y: .225 - .0045 * i,
                    weapon: {
                        ...weapons.GREEN_SUPERLASER,
                        speed: weapons.GREEN_SUPERLASER.speed * .5,
                        range: weapons.GREEN_SUPERLASER.range * 3,
                        reload: weapons.GREEN_SUPERLASER.reload * .3,
                        damage: weapons.GREEN_SUPERLASER.damage * .4
                    }
                });
            }
        }

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.1,
                y: .175 - .02 * i,
                weapon: {
                    ...weapons[types3[i % types3.length]],
                    range: weapons[types3[i % types3.length]].range * 2.5,
                    bypassShield: false
                },
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .1,
                y: .175 - .02 * i,
                weapon: {
                    ...weapons[types3[i % types3.length]],
                    range: weapons[types3[i % types3.length]].range * 2.5,
                    bypassShield: false
                },
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDEFENDER_DARKEMPIRE"
    }, ...(new Array(5).fill({}).map(($, i) => ({
        x: -.5 + .25 * i,
        y: -.15,
        maxSquadrons: 1,
        squadronSize: 1,
        reserveSize: 5,
        squadronKey: "RESURGENT_DARKEMPIRE"
    })))]
};

ships.IMPELLORFLEETCARRIER_DARKEMPIRE = {
    name: "Impellor Fleet Carrier",
    asset: "IMPELLORFLEETCARRIER.png",
    classification: shipTypes.SuperCapital,
    population: 120,
    size: 4000,
    cost: 20000,
    speed: 2,
    turnSpeed: .0025,
    shield: 50000,
    shieldRegen: 50,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 7; i ++) {
            output.push({
                x: -.125,
                y: .9 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .125,
                y: .9 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.15 - .02075 * i,
                y: .875 - .0825 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_TRIPLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 125
            }, {
                x: .15 + .02075 * i,
                y: .875 - .0825 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_TRIPLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 125
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.165 - .01 * i,
                y: .1775 - .04 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .165 + .01 * i,
                y: .1775 - .04 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: -.32 - .01 * i,
                y: -.245 - .04 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .32 + .01 * i,
                y: -.245 - .04 * i,
                weapon: i % 2 ? weapons.ION_CANNON_ULTRA : weapons.GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            });
        }

        for (let i = 0; i < 5; i ++) {
            let x = .175 + .06 * i;
            let y = .61 - .2225 * i;

            if (i === 4) {
                x = -.445;
                y = -.385;
            }

            const weaponType = i % 2 ? weapons.GREEN_DOUBLE_TURBOLASER_CANNON : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY;
            const weapon = {
                ...weaponType,
                reload: weaponType.reload * .5,
                range: weaponType.range * 1.5,
                damage: weaponType.damage * 1.5
            };

            output.push({
                x: x - .005,
                y: y - .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: x - .005,
                y: y + .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: x + .005,
                y: y - .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: x + .005,
                y: y + .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            });

            output.push({
                x: -x - .005,
                y: y - .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -x - .005,
                y: y + .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -x + .005,
                y: y - .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: -x + .005,
                y: y + .005,
                weapon: weapon,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.125,
        y: .8,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: .125,
        y: .8,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: -.125,
        y: .65,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: .125,
        y: .65,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }, {
        x: -.125,
        y: .5,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }, {
        x: .125,
        y: .5,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEBOMBER_DARKEMPIRE"
    }]
};

export default ships;