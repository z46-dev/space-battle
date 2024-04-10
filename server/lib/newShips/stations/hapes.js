import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.MIYTILFIGHTER_HAPAN = {
    name: "Miy'til Starfighter",
    asset: "MIYTILFIGHTER.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 16,
    cost: 3,
    speed: 22,
    turnSpeed: .08,
    shield: 100,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_RAPID_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO
    }]
};

ships.BETACRUISER_HAPAN = {
    name: "Beta Cruiser",
    asset: "BETACRUISER.png",
    classification: shipTypes.Frigate,
    population: 5,
    size: 150,
    cost: 1200,
    speed: 4.5,
    turnSpeed: .01,
    shield: 2000,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: -.8,
        y: -.8,
        weapon: weapons.ION_CANNON_HEAVY
    }, {
        x: .8,
        y: -.8,
        weapon: weapons.ION_CANNON_HEAVY
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2
        }
    }))
};

ships.NOVACRUISER_HAPAN = {
    name: "Nova Cruiser",
    asset: "NOVACRUISER.png",
    classification: shipTypes.Frigate,
    population: 9,
    size: 220,
    cost: 2500,
    speed: 3.7,
    turnSpeed: .009,
    shield: 3000,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: -.35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: -.35,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.65,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .65,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.CHARUBAH_HAPAN = {
    name: "Charubah Frigate",
    asset: "CHARUBAHFRIGATE.png",
    classification: shipTypes.Frigate,
    population: 13,
    size: 270,
    cost: 3000,
    speed: 3.6,
    turnSpeed: .0125,
    shield: 3140,
    shieldRegen: 3,
    hardpoints: [{
        x: -.15,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .7,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.375,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .375,
        y: -.225,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.MAGNETAR_HAPAN = {
    name: "Magnetar Cruiser",
    asset: "MAGNETARCRUISER.png",
    classification: shipTypes.HeavyFrigate,
    population: 15,
    size: 300,
    cost: 3120,
    speed: 3,
    turnSpeed: .0125,
    shield: 4360,
    shieldRegen: 4,
    hardpoints: [{
        x: -.15,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .15,
        y: .55,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.375,
        y: .2,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .375,
        y: .2,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.5,
        y: -.2,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }, {
        x: .5,
        y: -.2,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 150
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.BATTLEDRAGON_HAPAN = {
    name: "Hapan Battle Dragon",
    asset: "HAPANBATTLEDRAGON.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 300,
    cost: 6580,
    speed: 3,
    turnSpeed: .0025,
    shield: 5000,
    shieldRegen: .05,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_TURBOLASER_CANNON,
            reload: 1.25
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ION_CANNON_MEDIUM,
            reload: 1.25
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.BLUE_LASER_CANNON,
            reload: 1.25
        }
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 120
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 11
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.TEREPHON_HAPAN = {
    name: "Terephon Cruiser",
    asset: "TEREPHONCRUISER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 450,
    cost: 6000,
    speed: 3,
    turnSpeed: .0125,
    shield: 4800,
    shieldRegen: 5,
    hardpoints: [{
        x: -.1,
        y: .85,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .85,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: .55,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: .55,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.125,
        y: .375,
        weapon: weapons.BLUE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .375,
        weapon: weapons.BLUE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.25,
        y: -.375,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .25,
        y: -.375,
        weapon: weapons.DOUBLE_ION_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.2,
        y: -.15,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .2,
        y: -.15,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.NEUTRON_HAPAN = {
    name: "Neutron Cruiser",
    asset: "NEUTRONCRUISER.png",
    classification: shipTypes.Capital,
    population: 26,
    size: 600,
    cost: 9850,
    speed: 2.9,
    turnSpeed: .006,
    shield: 12000,
    shieldRegen: 12,
    hardpoints: [{
        x: -.7,
        y: -.7,
        weapon: weapons.ION_CANNON_ULTRA
    }, {
        x: .7,
        y: -.7,
        weapon: weapons.ION_CANNON_ULTRA
    }, {
        x: -.625,
        y: -.375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .625,
        y: -.375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.325,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .325,
        y: -.125,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.6,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: -.3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .8,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .3,
        weapon: weapons.DOUBLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.15,
        y: .05,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: .15,
        y: .05,
        weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
        shotsAtOnce: 4,
        shotDelay: 100
    }, {
        x: -.125,
        y: .45,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .45,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.1,
        y: .65,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .65,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 2,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;