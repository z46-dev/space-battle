import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACTIONVITRANSPORT_HUTT = {
    name: "Action-VI Transport",
    asset: "ACTIONVITRANSPORTSTRIPE.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 100,
    cost: 300,
    speed: 8,
    turnSpeed: .02,
    shield: 600,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: .5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.CONSOLAR_HUTT = {
    name: "Consolar Corvette",
    asset: "CONSOLARHUTT.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 60,
    cost: 100,
    speed: 11,
    turnSpeed: .04,
    shield: 400,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .9,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: -.9,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.CR90_HUTT = {
    name: "CR-90",
    asset: "CR90.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 95,
    cost: 200,
    speed: 12,
    turnSpeed: .045,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .6,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: .2,
        weapon: {
            ...weapons.PURPLE_DOUBLE_TURBOLASER_CANNON,
            speed: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON.speed * 1.25,
            damage: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON.damage * 2,
            range: weapons.PURPLE_DOUBLE_TURBOLASER_CANNON.range * 1.1
        },
        shotsAtOnce: 2,
        shotDelay: 120
    }, {
        x: 0,
        y: -.2,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 80
    }].map(hp => ({ ...hp, weapon: { ...hp.weapon, health: 380 } }))
};

ships.LUPUSMISSILEFRIGATE_HUTT = {
    name: "Lupus Missile Frigate",
    asset: "LUPUSMISSILEFRIGATE.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 85,
    cost: 400,
    speed: 9,
    turnSpeed: .045,
    shield: 1000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON_MEDIUM,
            health: weapons.DOUBLE_ION_CANNON_MEDIUM.health * 3,
            reload: weapons.DOUBLE_ION_CANNON_MEDIUM.reload * .6
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_CONCUSSION_MISSILE,
            health: weapons.ASSAULT_CONCUSSION_MISSILE.health * 3,
            reload: weapons.ASSAULT_CONCUSSION_MISSILE.reload * .8
        },
        shotsAtOnce: 6,
        shotDelay: 120
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_PROTON_ROCKET,
            health: weapons.ASSAULT_PROTON_ROCKET.health * 3,
            reload: weapons.ASSAULT_PROTON_ROCKET.reload * .8
        },
        shotsAtOnce: 4,
        shotDelay: 120
    }]
};

ships.LIGHT_MINSTREL_HUTT = {
    name: "Light Minstrel Space Yacht",
    asset: "lightMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 1,
    size: 90,
    cost: 150,
    speed: 9,
    turnSpeed: .03,
    shield: 500,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

ships.HEAVY_MINSTREL_HUTT = {
    name: "Heavy Minstrel Space Yacht",
    asset: "heavyMinstrelSpaceYacht.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 110,
    cost: 300,
    speed: 7,
    turnSpeed: .02,
    shield: 750,
    shieldRegen: 7.5,
    hardpoints: [{
        x: 0,
        y: -.5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .5,
        weapon: weapons.PURPLE_RAPID_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: 0,
        weapon: weapons.PURPLE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 80
    }, {
        x: 0,
        y: .5,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 80
    }]
};

export default ships;