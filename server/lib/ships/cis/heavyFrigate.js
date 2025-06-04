import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.RECUSANT_CIS = templates.heavyFrigate.RECUSANT_DESTROYER();

ships.SABOATHDESTROYER_CIS = templates.heavyFrigate.SABOATH_DESTROYER();

ships.MUNIFICENT_HEAVY_CIS = {
    name: "Munificent Heavy Cruiser",
    asset: "MUNIFICENT_HEAVY.png",
    classification: shipTypes.HeavyFrigate,
    population: 18,
    size: 420,
    cost: 3000,
    speed: 2.7,
    turnSpeed: .004,
    shield: 4500,
    shieldRegen: 4.5,
    hardpoints: (() => {
        const points = [{
            x: -.074,
            y: .915
        }, {
            x: -.106,
            y: .841
        }, {
            x: -.140,
            y: .744
        }, {
            x: -.169,
            y: .649
        }, {
            x: -.182,
            y: .547
        }, {
            x: -.192,
            y: .459
        }, {
            x: -.197,
            y: .374
        }, {
            x: -.195,
            y: .286
        }, {
            x: -.205,
            y: .111
        }, {
            x: -.142,
            y: .103
        }, {
            x: -.080,
            y: .088
        }, {
            x: -.163,
            y: -.457
        }, {
            x: -.163,
            y: -.604
        }, {
            x: -.139,
            y: -.798
        }, {
            x: -.089,
            y: -.940
        }];

        for (let i = 0, n = points.length; i < n; i++) {
            points.push({
                x: -points[i].x,
                y: points[i].y
            });
        }

        const output = [{
            x: 0,
            y: .8,
            weapon: weapons.RED_TURBOLASER_CANNON_ULTRAHEAVY,
            shotsAtOnce: 2,
            shotDelay: 500
        }, {
            x: -.5,
            y: -.05,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }, {
            x: .5,
            y: -.05,
            weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
            shotsAtOnce: 2,
            shotDelay: 150
        }];
        
        const selections = [
            weapons.RED_DOUBLE_TURBOLASER_CANNON, weapons.DOUBLE_ION_CANNON_MEDIUM,
            weapons.RED_DOUBLE_LASER_CANNON, weapons.RED_QUAD_LASER_CANNON,
            weapons.RED_ANTI_FIGHTER_LASER_CANNON, weapons.QUAD_ION_CANNON_HEAVY,
            weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.RED_RAPID_LASER_CANNON
        ];

        for (let i = 0; i < points.length; i ++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 1.25 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 5,
        reserveSize: 1,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

ships.LUCREHULK_CORE_SHIP_CIS = {
    name: "Lucrehulk Core Ship",
    asset: "LUCREHULK_CORE.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 350,
    cost: 4000,
    speed: 4,
    turnSpeed: .01,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: (() => {
        const output = [];

        for (let i = 0; i < 10; i ++) {
            const angle = (i / 10) * Math.PI * 2;
            output.push({
                x: Math.cos(angle) * .7,
                y: .1 + Math.sin(angle) * .7,
                weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 100
            });
        }

        return output.map(hp => ({
            ...hp,
            weapon: {
                ...hp.weapon,
                health: hp.weapon.health * 3 | 0,
                reload: hp.weapon.reload * .5 | 0
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 4,
        reserveSize: 1,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;