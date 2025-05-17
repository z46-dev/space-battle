import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.MC85_REBEL = {
    name: "MC-85",
    asset: "MC85.png",
    classification: shipTypes.SuperCapital,
    population: 62,
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
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 6; i ++) {
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
    population: 72,
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
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 8; i ++) {
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
            for (let i = 0; i < weapons.length; i ++) {
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
    population: 72,
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
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 8; i ++) {
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
            for (let i = 0; i < weapons.length; i ++) {
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
    population: 125,
    size: 4800,
    cost: 25000,
    speed: 3,
    turnSpeed: .0001,
    shield: 75000,
    shieldRegen: 75,
    shieldRegenAbility: {
        cooldown: .75,
        regen: .75
    },
    hardpoints: (function() {
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
            for (let i = 0; i < weapons.length; i ++) {
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