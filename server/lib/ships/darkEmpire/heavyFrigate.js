import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.WORLDDEVASTATORFG_DARKEMPIRE = {
    name: "World Devastator Frigate",
    asset: "WORLDDEVASTATOR.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 600,
    cost: 9000,
    speed: 4,
    turnSpeed: .02,
    shield: 6000,
    shieldRegen: 10,
    hardpoints: [{
        x: -.35,
        y: .7,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .35,
        y: .7,
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
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: -.9,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: -.9,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
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
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 1e10,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
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
            
            console.log("World Devastaor Frigate gained " + gain + " material, now at " + me.persistentData.material);

            while (me.persistentData.material >= 500) {
                me.persistentData.material -= 500;

                const newbie = battle.spawn("WORLDDEVASTATORBC_DARKEMPIRE", me.team, me.x, me.y);
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

ships.DREADNOUGHTHEAVYCRUISER_DARKEMPIRE = {
    name: "Dreadnought Heavy Cruiser",
    asset: "DREADNOUGHTHEAVYCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 14,
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
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .125,
        y: .4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.15,
        y: -.4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .15,
        y: -.4,
        weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: -.175,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 200
    }, {
        x: .175,
        y: 0,
        weapon: weapons.GREEN_DOUBLE_LASER_CANNON,
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
        squadronSize: 8,
        reserveSize: 2,
        squadronKey: "TIEINTERCEPTOR_DARKEMPIRE"
    }]
};

ships.HARROWERDREADNOUGHT_DARKEMPIRE = {
    name: "Harrower Dreadnought",
    asset: "HARROWERDREADNOUGHT.png",
    classification: shipTypes.HeavyFrigate,
    population: 20,
    size: 900,
    cost: 2400,
    speed: 2,
    turnSpeed: .005,
    shield: 15000,
    shieldRegen: 7,
    hardpoints: (function() {
        const output = [{
            x: 0,
            y: .285,
            weapon: {
                ...weapons.ASSAULT_PROTON_TORPEDO,
                reload: weapons.ASSAULT_PROTON_TORPEDO.reload * .75
            },
            shotsAtOnce: 8,
            shotDelay: 85
        }];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3 - .02 * i,
                y: -.425 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            }, {
                x: .3 + .02 * i,
                y: -.425 - .1 * i,
                weapon: weapons.GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 200
            });
        }

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.085 - .04 * i,
                y: .85 - .15 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            }, {
                x: .085 + .04 * i,
                y: .85 - .15 * i,
                weapon: i % 2 ? weapons.DOUBLE_ION_CANNON_MEDIUM : weapons.GREEN_DOUBLE_LASER_CANNON_HEAVY,
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        for (let i = 0; i < output.length; i ++) {
            output[i].weapon = {
                ...output[i].weapon,
                health: output[i].weapon.health * 5
            };
        }

        return output;
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "TIEDRONE_DARKEMPIRE"
    }]
};

export default ships;