import { shipTypes } from "../constants.js";
import { DOUBLE_ION_CANNON, DOUBLE_ION_CANNON_HEAVY, DOUBLE_ION_CANNON_MEDIUM, GREEN_DOUBLE_LASER_CANNON, GREEN_DOUBLE_LASER_CANNON_HEAVY, GREEN_DOUBLE_TURBOLASER_CANNON, GREEN_LASER_CANNON, GREEN_QUAD_LASER_CANNON_HEAVY, GREEN_QUAD_TURBOLASER_CANNON, GREEN_RAPID_LASER_CANNON, GREEN_TURBOLASER_CANNON, FIGHTER_PROTON_TORPEDO, QUAD_ION_CANNON, FIGHTER_PROTON_BOMB, GREEN_FIGHTER_LASER_CANNON, FIGHTER_PROTON_ROCKET, ASSAULT_CONCUSSION_MISSILE, FIGHTER_PROTON_ROCKET_AOE, GREEN_RAPID_FIGHTER_LASER_CANNON, TIE_DEFENDER_ION_CANNON, GREEN_QUAD_TURBOLASER_CANNON_HEAVY, ION_CANNON_MEDIUM, GREEN_TURBOLASER_CANNON_ULTRAHEAVY, GREEN_SUPERLASER, GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY, GREEN_WEAK_SUPERLASER, ASSAULT_PROTON_TORPEDO, TRIPLE_ION_CANNON_HEAVY, GREEN_TRIPLE_LASER_CANNON_HEAVY, ION_CANNON, GREEN_QUAD_LASER_CANNON, GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY, QUAD_ION_CANNON_HEAVY, GREEN_OCTUPLE_TURBOLASER_CANNON, ION_CANNON_ULTRA, GREEN_ANTI_FIGHTER_LASER_CANNON, ASSAULT_PROTON_ROCKET, RED_SUPERLASER, RED_LIGHT_SUPERLASER } from "../weapons.js";

const ships = {};

ships.ISD = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    classification: shipTypes.Capital,
    population: 24,
    size: 600,
    cost: 3200,
    speed: 2.5,
    turnSpeed: .01,
    shield: 5200,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.075 - .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .07 * i,
                y: .7 - .2 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }]
};

ships.ARQUITENS = {
    name: "Arquitens",
    asset: "ARQUITENS.png",
    classification: shipTypes.Frigate,
    population: 4,
    size: 120,
    cost: 900,
    speed: 8,
    turnSpeed: .075,
    shield: 1500,
    shieldRegen: 2,
    hardpoints: [{
        x: -.225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .225,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .275,
        y: -.125,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .9,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.IMOBILIZER = {
    name: "Imobilizer 418",
    asset: "IMOBILIZER.png",
    classification: shipTypes.HeavyFrigate,
    population: 12,
    size: 225,
    cost: 2200,
    speed: 3,
    turnSpeed: .06,
    shield: 2100,
    shieldRegen: 3,
    hardpoints: [{
        x: -.15,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .15,
        y: .275,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.25,
        y: -.25,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .25,
        y: -.25,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.4,
        y: -.725,
        weapon: ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .4,
        y: -.725,
        weapon: ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .8,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER"
    }]
};

ships.RAIDER = {
    name: "Raider",
    asset: "RAIDER.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 200,
    speed: 10,
    turnSpeed: .035,
    shield: 400,
    shieldRegen: 1,
    hardpoints: [{
        x: -.15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .075,
        weapon: GREEN_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.4,
        weapon: GREEN_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.QUASAR = {
    name: "Quasar",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 175,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 1900,
    shieldRegen: 5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: GREEN_DOUBLE_LASER_CANNON
    }, {
        x: -.175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: .175,
        y: .6,
        weapon: DOUBLE_ION_CANNON
    }, {
        x: -.325,
        y: .15,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: GREEN_QUAD_LASER_CANNON_HEAVY
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }]
};

ships.THRAWN_QUASAR = {
    ...ships.QUASAR,
    name: "Quasar (Thrawn)",
    population: 9,
    shield: 3000,
    shieldRegen: 7.5,
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 4,
        squadronKey: "TIEBOMBER"
    }]
};

ships.TIEFIGHTER = {
    name: "Tie Fighter",
    asset: "TIEFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 15,
    cost: 4,
    speed: 18,
    turnSpeed: .0334,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...GREEN_FIGHTER_LASER_CANNON,
            health: 100
        },
        shotsAtOnce: 2,
        shotDelay: 75
    }]
};

ships.TIEBOMBER = {
    name: "Tie Bomber",
    asset: "TIEBOMBER.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 19,
    cost: 9,
    speed: 13,
    turnSpeed: .0175,
    shield: 0,
    shieldRegen: 0,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: GREEN_FIGHTER_LASER_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_BOMB,
        shotsAtOnce: 2,
        shotDelay: 75
    }, {
        x: .5,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 1,
        shotDelay: 75
    }]
};

ships.TIEDEFENDER = {
    name: "Tie Defender",
    asset: "TIEDEFENDER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 18,
    cost: 25,
    speed: 19,
    turnSpeed: .16,
    shield: 200,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...GREEN_RAPID_FIGHTER_LASER_CANNON,
            damage: GREEN_RAPID_FIGHTER_LASER_CANNON.damage * 2,
            range: GREEN_RAPID_FIGHTER_LASER_CANNON.range * .85
        }
    }, {
        x: 0,
        y: 0,
        weapon: TIE_DEFENDER_ION_CANNON
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_ROCKET_AOE,
        shotsAtOnce: 4,
        shotDelay: 250
    }]
};

ships.SSD = {
    name: "Super Star Destroyer",
    asset: "SSD.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 8000,
    cost: 60000,
    speed: .5,
    turnSpeed: .0005,
    shield: 86000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 13; i ++) {
            output.push({
                x: -.02 - .0225 * i,
                y: .8 - .1 * i,
                weapon: GREEN_QUAD_LASER_CANNON_HEAVY
            }, {
                x: .04 + .02 * i,
                y: .8 - .1 * i,
                weapon: GREEN_QUAD_LASER_CANNON_HEAVY
            }, {
                x: -.01 - .0225 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON
            }, {
                x: .03 + .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON
            }, {
                x: -.025 - .0225 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            }, {
                x: .025 + .02 * i,
                y: .8 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 250
            });
        }

        for (let i = -4; i < 12; i ++) {
            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            });

            i += .5;

            output.push({
                x: -.055 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: .075 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_LASER_CANNON : DOUBLE_ION_CANNON_MEDIUM
            }, {
                x: -.08 - .01 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_TURBOLASER_CANNON : GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .09 + .00825 * i,
                y: .4 - .075 * i,
                weapon: (i | 0) % 2 ? GREEN_DOUBLE_TURBOLASER_CANNON : GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            });

            i |= 0;
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 6,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 4,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER"
    }]
};

ships.DEATHSTAR = {
    name: "Death Star",
    asset: "DEATHSTAR.png",
    classification: shipTypes.SuperCapital,
    population: 300,
    size: 20000,
    cost: 10000000,
    speed: .01,
    turnSpeed: .0001,
    shield: 10_000_000,
    shieldRegen: 100,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 64; i ++) {
            const angle = i * Math.PI / 32;

            output.push({
                x: Math.cos(angle) * .9,
                y: Math.sin(angle) * .9,
                weapon: {
                    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                    range: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY.range * 3
                }
            }, {
                x: Math.cos(angle + Math.PI / 64) * .7,
                y: Math.sin(angle + Math.PI / 64) * .7,
                weapon: {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    range: DOUBLE_ION_CANNON_MEDIUM.range * 3
                }
            }, {
                x: Math.cos(angle) * .5,
                y: Math.sin(angle) * .5,
                weapon: {
                    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
                    range: GREEN_TURBOLASER_CANNON_ULTRAHEAVY.range * 3
                }
            }, {
                x: Math.cos(angle + Math.PI / 64) * .3,
                y: Math.sin(angle + Math.PI / 64) * .3,
                weapon: {
                    ...DOUBLE_ION_CANNON_MEDIUM,
                    range: DOUBLE_ION_CANNON_MEDIUM.range * 3
                }
            });
        }

        output.push({
            x: -.5,
            y: .4125,
            weapon: GREEN_SUPERLASER,
            shotsAtOnce: 50,
            shotDelay: 22.5
        });

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 10,
        reserveSize: 55,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 10,
        reserveSize: 50,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 2,
        reserveSize: 3,
        squadronKey: "ISD"
    }]
};

ships.ONAGER = {
    name: "Onager Star Destroyer",
    asset: "ONAGER.png",
    classification: shipTypes.Capital,
    population: 31,
    size: 950,
    cost: 10000,
    speed: 1.5,
    turnSpeed: .01,
    shield: 13000,
    shieldRegen: 8,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: -.05,
            weapon: GREEN_WEAK_SUPERLASER,
            shotsAtOnce: 40,
            shotDelay: 18
        }, {
            x: -.65,
            y: .8,
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 80
        }, {
            x: .65,
            y: .8,
            weapon: ASSAULT_PROTON_TORPEDO,
            shotsAtOnce: 3,
            shotDelay: 80
        }];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.175,
                y: -.12 - .04 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .175,
                y: -.12 - .04 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.075,
                y: .85 - .15 * i,
                weapon: i % 2 ? TRIPLE_ION_CANNON_HEAVY : GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: .075,
                y: .85 - .15 * i,
                weapon: i % 2 ? TRIPLE_ION_CANNON_HEAVY : GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? ION_CANNON : GREEN_QUAD_LASER_CANNON
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? ION_CANNON : GREEN_QUAD_LASER_CANNON
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.2 - .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? ION_CANNON : GREEN_QUAD_LASER_CANNON
            }, {
                x: .2 + .015 * i,
                y: .6 - .15 * i,
                weapon: i % 2 ? ION_CANNON : GREEN_QUAD_LASER_CANNON
            });
        }

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.1 - .2 * i,
                y: .9334 - .025 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .1 + .2 * i,
                y: .9334 - .025 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 4,
        squadronKey: "TIEDEFENDER"
    }]
};

ships.ARCHAMMER = {
    name: "Arch Hammer",
    asset: "ARCHAMMER.png",
    classification: shipTypes.SuperCapital,
    population: 72,
    size: 3000,
    cost: 16000,
    speed: 2,
    turnSpeed: .01,
    shield: 24000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.001 - .005 * i,
                y: .8 - .1 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .015 + .0025 * i,
                y: .8 - .1 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.00065 - .0025 * i,
                y: .6 - .05 * i,
                weapon: DOUBLE_ION_CANNON_HEAVY
            }, {
                x: .0065 + .00125 * i,
                y: .6 - .05 * i,
                weapon: DOUBLE_ION_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDEFENDER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 2,
        reserveSize: 1e10,
        squadronKey: "RAIDER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 2,
        reserveSize: 1e10,
        squadronKey: "ARQUITENS"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 1,
        reserveSize: 1e10,
        squadronKey: "QUASAR"
    }]
};

ships.WORLDDEVASTATORFG = {
    name: "World Devastator Frigate",
    asset: "WORLDDEVASTATOR.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
    size: 600,
    cost: 9000,
    speed: 4,
    turnSpeed: .02,
    shield: 3500,
    shieldRegen: 10,
    hardpoints: [{
        x: -.35,
        y: .7,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .35,
        y: .7,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: .9,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: .9,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .9,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .9,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .3,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .3,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: -.3,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: -.3,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: -.9,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: -.9,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.35,
        y: -.7,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .35,
        y: -.7,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER"
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
            
            console.log("World Devastaor Frigate gained " + gain + " material, now at " + me.persistentData.material);

            while (me.persistentData.material >= 500) {
                me.persistentData.material -= 500;

                const newbie = battle.spawn("WORLDDEVASTATORBC", me.team, me.x, me.y);
                newbie.angle = me.angle;

                newbie.persistentData = me.persistentData;

                console.log("World Devastator Frigate has upgraded into a new World Devastator Battlecruiser");

                me.hardpoints.forEach(hardpoint => {
                    hardpoint.health = 0;
                });

                me.explodeOnDeath = false;
            }
        }
    }
};

ships.WORLDDEVASTATORBC = {
    name: "World Devastator Battlecruiser",
    asset: "WORLDDEVASTATOR.png",
    classification: shipTypes.SuperCapital,
    population: 54,
    size: 3000,
    cost: 16000,
    speed: 2,
    turnSpeed: .01,
    shield: 24000,
    shieldRegen: 10,
    hardpoints: (function() {
        const output = [{
            x: -.35,
            y: .675,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: .675,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: .725,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: .725,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.2,
            y: .9,
            weapon: GREEN_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .2,
            y: .9,
            weapon: GREEN_DOUBLE_LASER_CANNON,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: .9,
            weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: .9,
            weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: .25,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: .25,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.05,
            y: .25,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .05,
            y: .25,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.05,
            y: -.3,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .05,
            y: -.3,
            weapon: DOUBLE_ION_CANNON_MEDIUM,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.1,
            y: -.9,
            weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .1,
            y: -.9,
            weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.65,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: -.65,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: -.35,
            y: -.7,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }, {
            x: .35,
            y: -.7,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 2,
            shotDelay: 100
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.1,
                y: .8 - .15 * i,
                weapon: i % 2 ? TRIPLE_ION_CANNON_HEAVY : GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: .1,
                y: .8 - .15 * i,
                weapon: i % 2 ? TRIPLE_ION_CANNON_HEAVY : GREEN_TRIPLE_LASER_CANNON_HEAVY
            }, {
                x: -.15,
                y: .15 - .15 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .15,
                y: .15 - .15 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: -.2,
                y: -.45 - .15 * i,
                weapon: GREEN_RAPID_LASER_CANNON
            }, {
                x: .2,
                y: -.45 - .15 * i,
                weapon: GREEN_RAPID_LASER_CANNON
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 6,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEBOMBER"
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

                const newbie = battle.spawn("WORLDDEVASTATORFG", me.team, me.x + Math.cos(angle) * distance, me.y + Math.sin(angle) * distance);
                newbie.angle = me.angle;
            }
        }
    }
};

ships.MTFCRUISER = {
    name: "Modular Task Force Cruiser",
    asset: "MTFCRUISER.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 400,
    cost: 5000,
    speed: 3.9,
    turnSpeed: .015,
    shield: 4000,
    shieldRegen: 10,
    hardpoints: [{
        x: 0,
        y: .95,
        weapon: ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: -.03,
        y: .7,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .03,
        y: .7,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .2,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .2,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.2,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.2,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: -.9125,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: -.9125,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }],
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 1,
        squadronKey: "TIEBOMBER"
    }]
};

ships.BELLATOR = {
    name: "Bellator Star Destroyer",
    asset: "BELLATOR.png",
    classification: shipTypes.SuperCapital,
    population: 110,
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
                weapon: GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .02 + .02 * i,
                y: .8 - .1 * i,
                weapon: GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: -.005 - .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .005 + .02 * i,
                y: .85 - .1 * i,
                weapon: QUAD_ION_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.02 - .02 * i,
                y: .85 - .1 * i,
                weapon: GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .02 + .02 * i,
                y: .85 - .1 * i,
                weapon: GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: 0,
                y: .15 - .03 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: -.05,
                y: .3 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 80
            }, {
                x: .05,
                y: .3 - .1 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 80
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: -.1 - .02 * i,
                y: .1 - .1 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            }, {
                x: .1 + .02 * i,
                y: .1 - .1 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 3,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 8,
        squadronKey: "TIEBOMBER"
    }]
};

ships.ALLEGIANCE = {
    name: "Allegiance Star Destroyer",
    asset: "ALLEGIANCE.png",
    classification: shipTypes.Capital,
    population: 54,
    size: 1200,
    cost: 8900,
    speed: 1.9,
    turnSpeed: .01,
    shield: 11000,
    shieldRegen: 4,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .975,
            weapon: ASSAULT_CONCUSSION_MISSILE,
            shotsAtOnce: 5,
            shotDelay: 80
        }];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.37 - .02 * i,
                y: -.37 - .07 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            }, {
                x: .37 + .02 * i,
                y: -.37 - .07 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY
            });
        }

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: -.075 - .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? QUAD_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .0325 * i,
                y: .75 - .1 * i,
                weapon: i % 2 ? QUAD_ION_CANNON_HEAVY : GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: 0,
                y: .25 - .05 * i,
                weapon: i % 2 ? GREEN_OCTUPLE_TURBOLASER_CANNON : ION_CANNON_ULTRA
            });
        }

        return output;
    })()
    // NO FIGHTERS
};

ships.ASSERTOR = {
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
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: .03 + .0115 * i,
                y: .9 - .035 * i,
                weapon: GREEN_TURBOLASER_CANNON_ULTRAHEAVY
            }, {
                x: -.02 - .0115 * i,
                y: .85 - .035 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .02 + .0115 * i,
                y: .85 - .035 * i,
                weapon: GREEN_QUAD_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.01 - .0115 * i,
                y: .9 - .035 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .01 + .0115 * i,
                y: .9 - .035 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.01 - .0115 * i,
                y: .85 - .035 * i,
                weapon: GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .01 + .0115 * i,
                y: .85 - .035 * i,
                weapon: GREEN_DOUBLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: -.1,
                y: .45 - .035 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 80
            }, {
                x: .1,
                y: .45 - .035 * i,
                weapon: ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 4,
                shotDelay: 80
            });
        }

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.002,
                y: .3 - .05 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            }, {
                x: .002,
                y: .3 - .05 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEBOMBER"
    }]
};

ships.INTERDICTORSTARDESTROYER = {
    name: "Interdictor Star Destroyer",
    asset: "INTERDICTORSTARDESTROYER.png",
    classification: shipTypes.Capital,
    population: ships.ISD.population,
    size: ships.ISD.size,
    cost: ships.ISD.cost * 1.1 | 0,
    speed: ships.ISD.speed * .95,
    turnSpeed: ships.ISD.turnSpeed * .99,
    shield: ships.ISD.shield * 1.1 | 0,
    shieldRegen: ships.ISD.shieldRegen * 1.1 | 0,
    hardpoints: (function() {
        const output = [{
            x: -.3,
            y: -.55,
            weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: .3,
            y: -.55,
            weapon: GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: -.3,
            y: -.55,
            weapon: QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }, {
            x: .3,
            y: -.55,
            weapon: QUAD_ION_CANNON_HEAVY,
            shotsAtOnce: 3,
            shotDelay: 100
        }];

        for (let i = 0; i < 6; i ++) {
            output.push({
                x: -.075 - .06 * i,
                y: .7 - .25 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .075 + .06 * i,
                y: .7 - .25 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER"
    }]
};

ships.CARRACK = {
    name: "Carrack Cruiser",
    asset: "CARRACK.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 170,
    cost: 1900,
    speed: 4.5,
    turnSpeed: .02,
    shield: 2100,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .5,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .5,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: .125,
        y: .2,
        weapon: ION_CANNON
    }, {
        x: -.1,
        y: -.4,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: .1,
        y: -.4,
        weapon: GREEN_TURBOLASER_CANNON
    }, {
        x: 0,
        y: -.6,
        weapon: GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }]
};

ships.LANCERFRIGATE = {
    name: "Lancer Frigate",
    asset: "LANCERFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 12,
    size: 150,
    cost: 3000,
    speed: 3.9,
    turnSpeed: .018,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .95,
        weapon: ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .6,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .35,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }, {
        x: -.15,
        y: -.5,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .15,
        y: -.5,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON
    }]
};

ships.IPV1 = {
    name: "IPV-1 System Patrol Craft",
    asset: "IPV1.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 270,
    speed: 8,
    turnSpeed: .015,
    shield: 500,
    shieldRegen: .5,
    hardpoints: [{
        x: 0,
        y: .9,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 90
    }]
};

ships.VIGILCORVETTE = {
    name: "Vigil Corvette",
    asset: "VIGILCORVETTE.png",
    classification: shipTypes.Corvette,
    population: 5,
    size: 120,
    cost: 1000,
    speed: 5,
    turnSpeed: .01,
    shield: 1100,
    shieldRegen: 2,
    hardpoints: [{
        x: -.375,
        y: .05,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .4,
        y: .025,
        weapon: GREEN_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.375,
        y: .05,
        weapon: GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .4,
        y: .025,
        weapon: GREEN_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }]
};

ships.DREADNOUGHTHEAVYCRUISER = {
    name: "Dreadnought Heavy Cruiser",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 290,
    cost: 2900,
    speed: 3,
    turnSpeed: .015,
    shield: 4000,
    shieldRegen: 4,
    hardpoints: [{
        x: -.075,
        y: .8,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .075,
        y: .8,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.2,
        y: -.8,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .2,
        y: -.8,
        weapon: DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.125,
        y: .4,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .175,
        y: 0,
        weapon: GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }],
    hangars: [{
        x: 0,
        y: -.8,
        maxSquadrons: 1,
        squadronSize: 10,
        reserveSize: 2,
        squadronKey: "TIEFIGHTER"
    }]
};

ships.VICTORYSTARDESTROYER = {
    name: "Victory-I Star Destroyer",
    asset: "VICTORYSTARDESTROYER.png",
    classification: shipTypes.Capital,
    population: 20,
    size: 400,
    cost: 3000,
    speed: 2.5,
    turnSpeed: .015,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 3; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .3,
                y: -.4 - .1 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_HEAVY : GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.55 - .025 * i,
                y: -.25 - .15 * i,
                weapon: i % 2 ? ASSAULT_CONCUSSION_MISSILE : ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 3,
                shotDelay: 80
            }, {
                x: .55 + .025 * i,
                y: -.25 - .15 * i,
                weapon: i % 2 ? ASSAULT_CONCUSSION_MISSILE : ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 3,
                shotDelay: 80
            }, {
                x: -.05 - .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            }, {
                x: .05 + .05 * i,
                y: .8 - .2 * i,
                weapon: i % 2 ? DOUBLE_ION_CANNON_MEDIUM : GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output;
    })()
};

ships.MANDATORSIEGEDREADNOUGHT = {
    name: "Mandator IV-class Siege Dreadnought",
    asset: "MANDATORSIEGEDREADNOUGHT.png",
    classification: shipTypes.SuperCapital,
    population: 140,
    size: 5000,
    cost: 40000,
    speed: 1,
    turnSpeed: .005,
    shield: 80000,
    shieldRegen: 20,
    hardpoints: (function() {
        const output = [{
            x: -.3,
            y: -.4,
            weapon: RED_LIGHT_SUPERLASER,
            shotsAtOnce: 5,
            shotDelay: 80
        }, {
            x: .3,
            y: -.4,
            weapon: RED_LIGHT_SUPERLASER,
            shotsAtOnce: 5,
            shotDelay: 80
        }];

        for (let i = 0; i < 12; i ++) {
            output.push({
                x: -.0075 - .034 * i,
                y: .9 - .14 * i,
                weapon: GREEN_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .035 * i,
                y: .9 - .14 * i,
                weapon: GREEN_QUAD_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .02 * i,
                y: .875 - .14 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .02 * i,
                y: .875 - .14 * i,
                weapon: GREEN_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: -.0075 - .01 * i,
                y: .85 - .1 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            }, {
                x: .025 + .01 * i,
                y: .85 - .1 * i,
                weapon: DOUBLE_ION_CANNON_MEDIUM,
                shotsAtOnce: 2,
                shotDelay: 80
            });
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEFIGHTER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 5,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEBOMBER"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 8,
        reserveSize: 8,
        squadronKey: "TIEDEFENDER"
    }]
};

export default ships;