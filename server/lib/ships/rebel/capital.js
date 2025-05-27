import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC80A_REBEL = {
    name: "MC-80a Home One Type",
    asset: "MC80A.png",
    classification: shipTypes.Capital,
    population: 38,
    size: 1450,
    cost: 7800,
    speed: 2.5,
    turnSpeed: .02,
    shield: 14300,
    shieldRegen: 14,
    shieldRegenAbility: {
        cooldown: .55,
        regen: 1.1
    },
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: [-.05, -.15, -.15, -.05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.05, .15, .15, .05][i],
                y: [.6, .2, -.2, -.4][i],
                weapon: {
                    ...weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.1, -.1, -.025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_LASER_CANNON,
                    health: weapons.RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .1, .1, .025][i],
                y: [.7, .3, -.3, -.7][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_LASER_CANNON,
                    health: weapons.RED_LASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [-.025, -.05, -.05, -.025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
                    health: weapons.RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: [.025, .05, .05, .025][i],
                y: [.8, .4, -.4, -.8][i],
                weapon: i % 2 ? {
                    ...weapons.DOUBLE_ION_CANNON_MEDIUM,
                    health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 1.5
                } : {
                    ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
                    health: weapons.RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 3 | 0,
                reload: e.weapon.reload * .5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 3,
        squadronKey: "BWING_REBEL"
    }]
};

ships.MC80BLIBERTY_REBEL = {
    name: "MC-80b Liberty",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 500,
    cost: 3900,
    speed: 3,
    turnSpeed: .025,
    shield: 8000,
    shieldRegen: 4,
    shieldRegenAbility: {
        cooldown: .9,
        regen: 1.05
    },
    hardpoints: (function() {
        const output = [{
            x: -.2,
            y: -.4,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }, {
            x: -.3,
            y: -.2,
            weapon: weapons.RED_RAPID_LASER_CANNON
        }, {
            x: -.2,
            y: .05,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY
        }, {
            x: -.075,
            y: .1,
            weapon: weapons.RED_QUAD_LASER_CANNON
        }, {
            x: -.05,
            y: .4,
            weapon: weapons.DOUBLE_ION_CANNON
        }, {
            x: -.025,
            y: .7,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon
            })
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 4 | 0,
                reload: e.weapon.reload * .7 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "YWING_REBEL"
    }]
};

ships.MC80B_REBEL = {
    name: "MC-80b",
    asset: "MC80B.png",
    classification: shipTypes.Capital,
    population: 29,
    size: 750,
    cost: 5000,
    speed: 3,
    turnSpeed: .025,
    shield: 9500,
    shieldRegen: 9.5,
    shieldRegenAbility: {
        cooldown: 1,
        regen: 1
    },
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.15,
            y: .65,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.2,
            y: .45,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.25,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.3,
            y: .05,
            weapon: weapons.RED_QUAD_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.15,
            weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.225,
            y: -.35,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: -.55,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
                shotsAtOnce: 2,
                shotDelay: 100
            })
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
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 3,
        squadronKey: "BWING_REBEL"
    }]
};

ships.STARHAWK_REBEL = {
    name: "Starhawk",
    asset: "STARHAWK.png",
    classification: shipTypes.Capital,
    population: 32,
    size: 900,
    cost: 8000,
    speed: 2,
    turnSpeed: .001,
    shield: 12340,
    shieldRegen: 12,
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: .075,
            y: .95,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 3,
            shotDelay: 75
        }, {
            x: -.3,
            y: .3,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 2,
            shotDelay: 60
        }, {
            x: .3,
            y: .3,
            weapon: weapons.ION_CANNON_ULTRA,
            shotsAtOnce: 2,
            shotDelay: 60
        }, {
            x: -.225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 60
        }, {
            x: .225,
            y: -.55,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 60
        }, {
            x: -.15,
            y: -.7,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 60
        }, {
            x: .15,
            y: -.7,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 60
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: .2,
                y: .6 - .075 * i,
                weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 120
            }, {
                x: -.125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 3,
                shotDelay: 60
            }, {
                x: .125,
                y: .2 - .125 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 3,
                shotDelay: 60
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5.3 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "BWING_REBEL"
    }]
};

ships.INEXPUGNABLECOMMANDSHIP_REBEL = {
    name: "Inexpugnable Tactical Command Ship",
    asset: "INEXPUGNABLECOMMANDSHIP.png",
    classification: shipTypes.Capital,
    population: 45,
    size: 1300,
    cost: 10000,
    speed: 1.5,
    turnSpeed: .001,
    shield: 21540,
    shieldRegen: 21.54,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 10; i ++) {
            output.push({
                x: .75 * Math.cos(Math.PI * 2 * i / 10),
                y: .75 * Math.sin(Math.PI * 2 * i / 10),
                weapon: i % 2 ? {
                    ...weapons.TRIPLE_ION_CANNON_HEAVY,
                    health: weapons.TRIPLE_ION_CANNON_HEAVY.health * 1.5
                } : {
                    ...weapons.RED_DOUBLE_TURBOLASER_CANNON,
                    health: weapons.RED_DOUBLE_TURBOLASER_CANNON.health * 1.5
                },
                shotsAtOnce: 3,
                shotDelay: 75
            }, {
                x: .6 * Math.cos(Math.PI * 2 * i / 10 + Math.PI / 10),
                y: .6 * Math.sin(Math.PI * 2 * i / 10 + Math.PI / 10),
                weapon: i % 2 ? {
                    ...weapons.RED_DOUBLE_LASER_CANNON,
                    health: weapons.RED_DOUBLE_LASER_CANNON.health * 1.5
                } : {
                    ...weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
                    health: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY.health * 1.5
                },
                shotsAtOnce: 3,
                shotDelay: 75
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 7
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "MG100STARFORTRESS_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "XWING_REBEL"
    }]
};

ships.MC90_REBEL = {
    name: "MC-90 Star Cruiser",
    asset: "MC90.png",
    classification: shipTypes.Capital,
    population: 40,
    size: 950,
    cost: 10500,
    speed: 3,
    turnSpeed: .03,
    shield: 11300,
    shieldRegen: 11,
    shieldRegenAbility: {
        cooldown: 1,
        regen: 1.25
    },
    hardpoints: (function() {
        const output = [];
        const positions = [{
            x: 0,
            y: .85,
            weapons: [weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.DOUBLE_ION_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: .1,
            y: .6,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: -.1,
            y: .6,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: .15,
            y: .35,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: -.15,
            y: .35,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: .2,
            y: .1,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: -.2,
            y: .1,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: .25,
            y: -.25,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: -.25,
            y: -.25,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: .25,
            y: -.5,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: -.25,
            y: -.5,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY, weapons.QUAD_ION_CANNON_HEAVY, weapons.RED_ANTI_FIGHTER_LASER_CANNON]
        }, {
            x: .15,
            y: -.75,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: -.15,
            y: -.75,
            weapons: [weapons.RED_QUAD_TURBOLASER_CANNON, weapons.QUAD_ION_CANNON, weapons.ASSAULT_CONCUSSION_MISSILE]
        }, {
            x: 0,
            y: .1,
            weapons: [weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.DOUBLE_ION_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }, {
            x: 0,
            y: -.6,
            weapons: [weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.DOUBLE_ION_CANNON_HEAVY, weapons.RED_QUAD_LASER_CANNON_HEAVY]
        }];

        for (const { x, y, weapons } of positions) {
            for (let i = 0; i < weapons.length; i ++) {
                const ang = Math.PI * 2 * i / weapons.length;
                const d = .04;

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
                health: e.weapon.health * 2.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "YWING_REBEL"
    }]
};

ships.ENDURANCE_REBEL = {
    name: "Endurance Fleet Carrier",
    asset: "ENDURANCE.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 600,
    cost: 6500,
    speed: 3.5,
    turnSpeed: .01,
    shield: 9250,
    shieldRegen: 9.25,
    shieldRegenAbility: {
        cooldown: 2,
        regen: .8
    },
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.125,
            y: .65,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.175,
            y: .45,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.225,
            y: .25,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.275,
            y: .05,
            weapon: weapons.RED_QUAD_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.325,
            y: -.15,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
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
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 5,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 5,
        squadronKey: "BWING_REBEL"
    }]
};

ships.NEBULA_REBEL = {
    name: "Nebula Star Destroyer",
    asset: "NEBULA_DESTROYER.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 600,
    cost: 6500,
    speed: 3.5,
    turnSpeed: .01,
    shield: 11100,
    shieldRegen: 11.1,
    shieldRegenAbility: {
        cooldown: .5,
        regen: .75,
        duration: .5
    },
    hardpoints: (function() {
        const output = [{
            x: -.075,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.125,
            y: .65,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.175,
            y: .45,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.225,
            y: .275,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.3,
            y: -.075,
            weapon: weapons.RED_QUAD_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.3,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.4,
            y: -.5,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.45,
            y: -.7,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.225,
            y: -.15,
            weapon: weapons.RED_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.225,
            y: -.3,
            weapon: weapons.QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: 0,
            y: .95,
            weapon: weapons.ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 6,
            shotDelay: 75
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
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
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

ships.LUCREHULKAUXILIARYWARSHIP_REBEL = {
    name: "Rebel Conversion Lucrehulk",
    asset: "LUCREHULK3.png",
    classification: shipTypes.Capital,
    population: 40,
    size: 1400,
    cost: 11500,
    speed: 1,
    turnSpeed: .001,
    shield: 23200,
    shieldRegen: 23,
    hardpoints: (function() {
        const output = [];

        for (let i = 3; i <= 33; i += 2) {
            const angle = Math.PI * 2 / 36 * i + Math.PI / 2;

            output.push({
                x: Math.cos(angle) * .75,
                y: Math.sin(angle) * .75 + .05,
                weapon:  weapons.RED_QUAD_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: Math.cos(angle) * .85,
                y: Math.sin(angle) * .85 + .05,
                weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: Math.cos(angle) * .65,
                y: Math.sin(angle) * .65 + .05,
                weapon: weapons.QUAD_ION_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 4.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.25,
        y: .85,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "XWING_REBEL"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "AWING_REBEL"
    }, {
        x: -.25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 5,
        reserveSize: 8,
        squadronKey: "YWING_REBEL"
    }, {
        x: .25,
        y: .85,
        maxSquadrons: 3,
        squadronSize: 5,
        reserveSize: 8,
        squadronKey: "BWING_REBEL"
    }],
    production: [{
        x: .25,
        y: .85,
        maxAlive: 2,
        reserve: 2,
        key: "CR90_REBEL",
        cooldown: 250
    },{
        x: -.25,
        y: .85,
        maxAlive: 2,
        reserve: 2,
        key: "DP20_REBEL",
        cooldown: 250
    }]
};

ships.DEFENDER_ASSAULT_CARRIER_REBEL = templates.capital.DEFENDER_ASSAULT_CARRIER();

ships.MAJESTIC_REBEL = templates.capital.MAJESTIC_STAR_CRUISER();

export default ships;