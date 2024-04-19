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
    speed: 24,
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
        shotsAtOnce: 4,
        shotDelay: 15
    }, {
        x: 0,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 3,
        shotDelay: 130
    }]
};

ships.BAIDAM_HAPAN = {
    name: "Baidam Corvette",
    asset: "BAIDAM_HAPAN.png",
    classification: shipTypes.Corvette,
    population: 2,
    size: 85,
    cost: 360,
    speed: 11.2,
    turnSpeed: .03,
    shield: 1675,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_DOUBLE_LASER_CANNON,
        shotsAtOnce: 6,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 6,
        shotDelay: 45
    }, {
        x: 0,
        y: 0,
        weapon: weapons.ION_CANNON_HEAVY,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.5 | 0
        }
    }))
};

ships.FLARE_HAPAN = {
    name: "Flare Corvette",
    asset: "FLARE_HAPAN.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 100,
    cost: 490,
    speed: 8,
    turnSpeed: .02,
    shield: 2000,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.BLUE_TURBOLASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: 0,
        y: 0,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 2.75 | 0
        }
    }))
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
    shield: 2560,
    shieldRegen: 2,
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
            health: e.weapon.health * 3
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
    shield: 3980,
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
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 4
        }
    }))
};

ships.STELLA_HAPAN = {
    name: "Stella Frigate",
    asset: "STELLA_HAP.png",
    classification: shipTypes.Frigate,
    population: 7,
    size: 280,
    cost: 2370,
    speed: 4,
    turnSpeed: .01,
    shield: 3904,
    shieldRegen: 3,
    hardpoints: [{
        x: 0,
        y: .8,
        weapon: weapons.BLUE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: 0,
        y: .2,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 45
    }, {
        x: 0,
        y: -.3,
        weapon: weapons.BLUE_QUAD_LASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 60
    }, {
        x: .2,
        y: -.7,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 4,
        shotDelay: 45
    }, {
        x: -.2,
        y: -.7,
        weapon: weapons.TRIPLE_ION_CANNON
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 3
        }
    }))
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
    shield: 4560,
    shieldRegen: 4,
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
    shield: 5560,
    shieldRegen: 5,
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

ships.CORONAL_HAPAN = {
    name: "Coronal Tender",
    asset: "CORONAL_HAPAN.png",
    classification: shipTypes.HeavyFrigate,
    population: 16,
    size: 400,
    cost: 4590,
    speed: 3.4,
    turnSpeed: .008,
    shield: 7673,
    shieldRegen: 8,
    shieldRegenAbility: {
        cooldown: .55,
        regen: 1.25
    },
    tenderAbility: {
        frequency: 1,
        power: 1
    },
    hardpoints: [{
        x: -.3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            range: e.weapon.range * 2,
            damage: e.weapon.damage * 1.5,
            health: e.weapon.health * 9.5 + .5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 5,
        reserveSize: 1,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.MIST_HAPAN = {
    name: "Mist Carrier",
    asset: "MIST_CARRIER_HAPAN.png",
    classification: shipTypes.HeavyFrigate,
    population: 29,
    size: 600,
    cost: 7488,
    speed: 2.6,
    turnSpeed: .008,
    shield: 9800,
    shieldRegen: 9,
    shieldRegenAbility: {
        cooldown: .7,
        regen: 1.5
    },
    hardpoints: [{
        x: -.5,
        y: .6,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: .6,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .3,
        y: .3,
        weapon: weapons.TRIPLE_ION_CANNON_MEDIUM,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .55,
        y: -.2,
        weapon: weapons.BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: -.3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }, {
        x: .3,
        y: -.8,
        weapon: weapons.BLUE_TRIPLE_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 60
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 9.5 + .5 | 0
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 6,
        reserveSize: 6,
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
    shield: 6780,
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
            health: e.weapon.health * 12
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 1,
        squadronSize: 7,
        reserveSize: 4,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.TEREPHON_HAPAN = {
    name: "Terephon Cruiser",
    asset: "TEREPHONCRUISER.png",
    classification: shipTypes.Capital,
    population: 18,
    size: 550,
    cost: 6000,
    speed: 3,
    turnSpeed: .0125,
    shield: 7890,
    shieldRegen: 7,
    hardpoints: [{
        x: -.1,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .1,
        y: .85,
        weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
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
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .125,
        y: .375,
        weapon: weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY,
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
        shotsAtOnce: 6,
        shotDelay: 100
    }, {
        x: .2,
        y: -.15,
        weapon: weapons.ASSAULT_PROTON_ROCKET,
        shotsAtOnce: 6,
        shotDelay: 100
    }].map(e => ({
        ...e,
        weapon: {
            ...e.weapon,
            health: e.weapon.health * 5
        }
    })),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 7,
        reserveSize: 4,
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
    shield: 14320,
    shieldRegen: 14,
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
    }, {
        x: -.3,
        y: -.45,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
    }, {
        x: .3,
        y: -.45,
        weapon: weapons.BLUE_ANTI_FIGHTER_LASER_CANNON,
        shotsAtOnce: 3,
        shotDelay: 40
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
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 6,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

ships.STARBASE01_HAPAN = {
    name: "Hapan Mobile Starbase",
    asset: "HAPAN_STARBASE_01.png",
    classification: shipTypes.SpaceStation,
    population: 48,
    size: 770,
    cost: 12000,
    speed: 0,
    turnSpeed: .0001,
    shield: 26540,
    shieldRegen: 26,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 12; i ++) {
            const angle = i * Math.PI / 6;
            output.push({
                x: Math.cos(angle) * .8,
                y: Math.sin(angle) * .8,
                weapon: [weapons.BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_OCTUPLE_TURBOLASER_CANNON_HEAVY, weapons.BLUE_RAPID_LASER_CANNON][i % 3],
                shotsAtOnce: 3,
                shotDelay: 95
            }, {
                x: Math.cos(angle + Math.PI / 12) * .6,
                y: Math.sin(angle + Math.PI / 12) * .6,
                weapon: [weapons.OCTUPLE_ION_CANNON, weapons.DOUBLE_ION_CANNON, weapons.ASSAULT_PROTON_ROCKET][i % 3],
                shotsAtOnce: 3,
                shotDelay: 95
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 8
            }
        }));
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 4,
        squadronSize: 6,
        reserveSize: 12,
        squadronKey: "MIYTILFIGHTER_HAPAN"
    }]
};

export default ships;