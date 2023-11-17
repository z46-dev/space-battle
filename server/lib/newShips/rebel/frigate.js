import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MC30C_REBEL = {
    name: "MC-30c",
    asset: "MC30C.png",
    classification: shipTypes.Frigate,
    population: 11,
    size: 300,
    cost: 800,
    speed: 5,
    turnSpeed: .05,
    shield: 4000,
    shieldRegen: 2,
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
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }]
};

ships.NEBULONB_REBEL = {
    name: "Nebulon-B",
    asset: "NEBULONB.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 250,
    cost: 500,
    speed: 4.5,
    turnSpeed: .0175,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.RED_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .5,
        weapon: weapons.RED_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.7,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: -.7,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.85,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 60
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "YWING_REBEL"
    }]
};

ships.PELTA_REBEL = {
    name: "Pelta Frigate",
    asset: "PELTA.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 160,
    cost: 640,
    speed: 4.2,
    turnSpeed: .03,
    shield: 2000,
    shieldRegen: 4,
    hardpoints: [{
        x: -.2,
        y: .85,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .2,
        y: .85,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.125,
        y: .2,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .125,
        y: .2,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: -.25,
        y: -.6,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: .25,
        y: -.6,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.RED_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 70
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 7,
        reserveSize: 2,
        squadronKey: "AWING_REBEL"
    }]
};

ships.QUASAR_REBEL = {
    name: "Quasar",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    population: 10,
    size: 175,
    cost: 2000,
    speed: 3,
    turnSpeed: .025,
    shield: 3500,
    shieldRegen: 2.5,
    hardpoints: [{
        x: -.05,
        y: .95,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .05,
        y: .95,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: -.175,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: .175,
        y: .6,
        weapon: weapons.DOUBLE_ION_CANNON
    }, {
        x: -.325,
        y: .15,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: .325,
        y: .15,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON
    }, {
        x: -.55,
        y: -.3,
        weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY
    }, {
        x: .55,
        y: -.3,
        weapon: weapons.RED_QUAD_LASER_CANNON_HEAVY
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 5,
        reserveSize: 4,
        squadronKey: "AWING_REBEL"
    }]
};

ships.ZENITHCRUISER_REBEL = {
    name: "Zenith Cruiser",
    asset: "ZENITHCRUISER.png",
    classification: shipTypes.Frigate,
    population: 8,
    size: 400,
    cost: 800,
    speed: 4,
    turnSpeed: .0075,
    shield: 1300,
    shieldRegen: 1.3,
    hardpoints: [{
        x: 0,
        y: .85,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .075,
        y: .8,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.075,
        y: .8,
        weapon: weapons.RED_DOUBLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: -.7,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1,
            reload: weapons.RED_RAPID_LASER_CANNON.reload * .5
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: -.125,
        y: -.7,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1,
            reload: weapons.RED_RAPID_LASER_CANNON.reload * .5
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.85,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_RAPID_LASER_CANNON,
            speed: weapons.RED_RAPID_LASER_CANNON.speed * 1.25,
            damage: weapons.RED_RAPID_LASER_CANNON.damage * 2,
            range: weapons.RED_RAPID_LASER_CANNON.range * 1.1,
            reload: weapons.RED_RAPID_LASER_CANNON.reload * .5
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 6,
        shotDelay: 60
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 6,
        reserveSize: 2,
        squadronKey: "XWING_REBEL"
    }]
};

export default ships;