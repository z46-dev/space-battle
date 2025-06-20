import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC50_REBEL = {
    name: "MC-50",
    asset: "MC50.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 600,
    cost: 2800,
    speed: 4,
    turnSpeed: .008,
    shield: 6000,
    shieldRegen: 2,
    shieldRegenAbility: {},
    hardpoints: (function () {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.15,
            y: .75,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .15,
            y: .75,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.3,
            y: .55,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .3,
            y: .55,
            weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.4,
            y: .4,
            weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .4,
            y: .4,
            weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.2,
                y: .3 - .2 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .2,
                y: .3 - .2 * i,
                weapon: weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: .2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "YWING_REBEL"
    }]
};

ships.NEBULONB2_REBEL = {
    name: "EF-76 Nebulon-B2 Attack Frigate",
    asset: "NEBULONB2.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 350,
    cost: 2950,
    speed: 3,
    turnSpeed: .008,
    shield: 4000,
    shieldRegen: 4,
    shieldRegenAbility: {
        duration: .8,
        cooldown: 2,
        regen: .7
    },
    hardpoints: (function () {
        const output = [{
            x: 0,
            y: .85,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.2,
            y: .675,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .2,
            y: .675,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.4,
            y: .6,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .4,
            y: .6,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.125,
            y: -.8,
            weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 4,
            shotDelay: 60
        }, {
            x: .125,
            y: -.8,
            weapon: weapons.ASSAULT_PROTON_ROCKET,
            shotsAtOnce: 4,
            shotDelay: 60
        }];

        for (let i = 0; i < 3; i++) {
            output.push({
                x: 0,
                y: .4 - .3 * i,
                weapon: i === 1 ? weapons.RED_ANTI_FIGHTER_LASER_CANNON : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 50
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2 | 0
            }
        }));
    })(),
    hangars: [{
        x: -.2,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

ships.FREEVIRGILLIABUNKERBUSTER_REBEL = {
    name: "Free Virgillia Bunker Buster",
    asset: "FREEVIRGILLIABUNKERBUSTER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 300,
    cost: 3100,
    speed: 2.25,
    turnSpeed: .01,
    shield: 6000,
    shieldRegen: 8,
    hardpoints: (function () {
        const output = [];

        for (let i = 0; i < 4; i++) {
            output.push({
                x: -.2 - .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .2 + .15 * i,
                y: .875 - .075 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.RED_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: 0,
                y: .8 - .4 * i,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: 0,
                y: .6 - .4 * i,
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 200
            });
        }

        return output.map(hardpoint => ({
            ...hardpoint,
            weapon: {
                ...hardpoint.weapon,
                health: hardpoint.weapon.health * 3
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

ships.MC75_REBEL = {
    name: "MC-75",
    asset: "MC75.png",
    classification: shipTypes.HeavyFrigate,
    population: 24,
    size: 560,
    cost: 3400,
    speed: 3,
    turnSpeed: .006,
    shield: 9800,
    shieldRegen: 3,
    shieldRegenAbility: {
        duration: 2,
        regen: 1.2
    },
    hardpoints: [{
        x: 0,
        y: .1,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 100
    }, {
        x: 0,
        y: .875,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .7,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .7,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .35,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .35,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.175,
        y: .15,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .175,
        y: .15,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: -.025,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: -.025,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.25,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.25,
        weapon: weapons.TRIPLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1125,
        y: -.5,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1125,
        y: -.5,
        weapon: weapons.RED_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.09,
        y: -.75,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .09,
        y: -.75,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 1.45
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
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

ships.DREADNOUGHTHEAVYCRUISER_REBEL = {
    name: "Dreadnought Heavy Cruiser (Refit)",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 340,
    cost: 3000,
    speed: 3,
    turnSpeed: .015,
    shield: 6500,
    shieldRegen: 6.5,
    hardpoints: [{
        x: -.075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .075,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .2,
        y: -.8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: .4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .175,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0,
            reload: e.weapon.reload * .6 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }]
};

ships.VESPER_REBEL = {
    name: "Vesper-Class Heavy Frigate",
    asset: "VESPER.png",
    classification: shipTypes.HeavyFrigate,
    population: 27,
    size: 700,
    cost: 6500,
    speed: 4,
    turnSpeed: .003,
    shield: 11100,
    shieldRegen: 11.1,
    hardpoints: (function () {
        const output = [{
            x: -.03,
            y: .97,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.1,
            y: .9,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.14,
            y: .74,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.16,
            y: .62,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.17,
            y: .4,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.16,
            y: .22,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.15,
            y: .06,
            weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.125,
            y: -.125,
            weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.075,
            y: -.23,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.07,
            y: -.31,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.07,
            y: -.39,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.15,
            y: -.61,
            weapon: weapons.RED_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.075,
            y: -.51,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.12,
            y: -.74,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.085,
            y: -.85,
            weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.03,
            y: -.95,
            weapon: weapons.DOUBLE_ION_CANNON,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: .37,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: .47,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: .57,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: .67,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }, {
            x: -.09,
            y: -.06,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 200
        }];

        for (let i = 0, n = output.length; i < n; i++) {
            output.push({
                ...output[i],
                x: -output[i].x
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.34 | 0,
                reload: e.weapon.reload * .8 | 0,
                damage: e.weapon.damage * .8 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 4,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 4,
        squadronKey: "YWING_REBEL"
    }]
};

ships.ASSAULT_FRIGATE_MK2_REBEL = templates.heavyFrigate.ASSAULT_FRIGATE_MK2();

ships.DAUNTLESS_REBEL = templates.heavyFrigate.DAUNTLESS_CRUISER();

export default ships;