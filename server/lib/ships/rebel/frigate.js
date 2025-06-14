import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC30A_REBEL = {
    name: "MC-30a",
    asset: "MC30A.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 300,
    cost: 1200,
    speed: 5,
    turnSpeed: .02,
    shield: 4000,
    shieldRegen: 4,
    hardpoints: (function () {
        const points = [{
            x: -.111,
            y: .657
        }, {
            x: -.094,
            y: -.386
        }, {
            x: .090,
            y: .580
        }, {
            x: -.074,
            y: .217
        }, {
            x: .108,
            y: -.050
        }, {
            x: .047,
            y: -.806
        }, {
            x: -.231,
            y: -.157
        }, {
            x: -.240,
            y: -.779
        }, {
            x: .306,
            y: -.524
        }];

        const output = [];

        const selections = [
            weapons.RED_LASER_CANNON,
            weapons.ION_CANNON
        ];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 4,
                shotDelay: 75
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 1.5 | 0
            }
        }));
    })()
};

ships.MC30C_REBEL = {
    name: "MC-30c",
    asset: "MC30C.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 300,
    cost: 1200,
    speed: 5,
    turnSpeed: .02,
    shield: 4000,
    shieldRegen: 2,
    shieldRegenAbility: {
        duration: .8,
        cooldown: .6,
        regen: 1.05
    },
    hardpoints: [{
        x: -.05,
        y: .8,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .05,
        y: .8,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: -.1,
        y: .5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .1,
        y: .5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: -.1,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 100
    }, {
        x: .1,
        y: .2,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 3,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }]
};

ships.MC40A_REBEL = {
    name: "MC-40a",
    asset: "MC40A.png",
    classification: shipTypes.Frigate,
    population: 15,
    size: 400,
    cost: 2600,
    speed: 3,
    turnSpeed: .015,
    shield: 5000,
    shieldRegen: 5,
    hardpoints: (function () {
        const points = [{
            x: -.103,
            y: .700
        }, {
            x: -.050,
            y: .401
        }, {
            x: .112,
            y: .474
        }, {
            x: .063,
            y: .822
        }, {
            x: .408,
            y: -.457
        }, {
            x: .196,
            y: -.050
        }, {
            x: .069,
            y: -.054
        }, {
            x: -.211,
            y: -.245
        }, {
            x: -.379,
            y: -.382
        }, {
            x: -.145,
            y: -.628
        }, {
            x: -.034,
            y: -.798
        }, {
            x: -.055,
            y: -.103
        }, {
            x: -.249,
            y: -.077
        }, {
            x: .094,
            y: -.565
        }];

        const output = [];

        const selections = [
            weapons.RED_LASER_CANNON,
            weapons.ION_CANNON,
            weapons.ASSAULT_PROTON_ROCKET
        ];

        for (let i = 0; i < points.length; i++) {
            output.push({
                ...points[i],
                weapon: selections[i % selections.length],
                shotsAtOnce: 2,
                shotDelay: 75
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 2.5 | 0
            }
        }));
    })()
};

ships.NEBULONB_REBEL = templates.frigate.NEBULON_B({
    color: "RED",
    fighter: "XWING_REBEL"
});

ships.PELTA_REBEL = templates.frigate.PELTA();

ships.QUASAR_REBEL = templates.frigate.QUASAR({
    color: "RED",
    fighter: "XWING_REBEL",
    interceptor: "AWING_REBEL",
    bomber: "YWING_REBEL"
});

ships.LIBERATOR_REBEL = templates.frigate.LIBERATOR();

ships.NEUTRON_STAR_REBEL = templates.frigate.NEUTRON_STAR();

export default ships;