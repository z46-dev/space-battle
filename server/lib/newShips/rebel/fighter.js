import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.XWING_REBEL = {
    name: "X-Wing",
    asset: "XWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 20,
    cost: 5,
    speed: 20,
    turnSpeed: .085,
    shield: 25,
    shieldRegen: 1,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 4
        },
        shotsAtOnce: 8,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.YWING_REBEL = {
    name: "Y-Wing",
    asset: "YWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 24,
    cost: 8,
    speed: 15,
    turnSpeed: .075,
    shield: 65,
    shieldRegen: 1.25,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_ION_CANNON,
            health: weapons.FIGHTER_ION_CANNON.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * .5,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 1.25,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 1.5,
            health: weapons.FIGHTER_PROTON_BOMB.health * 1.5
        },
        shotsAtOnce: 2,
        shotDelay: 125
    }]
};

ships.AWING_REBEL = {
    name: "A-Wing",
    asset: "AWING.png",
    classification: shipTypes.Fighter,
    population: 0,
    size: 14,
    cost: 6,
    speed: 16,
    turnSpeed: .1,
    shield: 15,
    shieldRegen: .9,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            reload: weapons.RED_FIGHTER_LASER_CANNON.reload * .5,
            damage: weapons.RED_FIGHTER_LASER_CANNON.damage * 1.5,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 1.5
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_ROCKET,
            health: weapons.FIGHTER_PROTON_ROCKET.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.BWING_REBEL = {
    name: "B-Wing",
    asset: "BWING.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 27,
    cost: 6,
    speed: 16,
    turnSpeed: .08,
    shield: 15,
    shieldRegen: .9,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_TORPEDO,
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: .5,
        y: 0,
        weapon: weapons.FIGHTER_PROTON_BOMB,
        shotsAtOnce: 4,
        shotDelay: 50
    }]
};

ships.BWING_EXPERIMENTAL_REBEL = {
    name: "Experimental B-Wing",
    asset: "BWING.png",
    classification: shipTypes.FighterBomber,
    population: 0,
    size: 22,
    cost: 6,
    speed: 17,
    turnSpeed: .08,
    shield: 55,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: weapons.RED_DOUBLE_LASER_CANNON
    }, {
        x: .5,
        y: 0,
        weapon: weapons.ASSAULT_PROTON_TORPEDO,
        shotsAtOnce: 5,
        shotDelay: 190
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.ASSAULT_CONCUSSION_MISSILE,
            damage: weapons.ASSAULT_CONCUSSION_MISSILE.damage * 5,
            explosionDamage: weapons.ASSAULT_CONCUSSION_MISSILE.explosionDamage * 5,
            explosionRange: weapons.ASSAULT_CONCUSSION_MISSILE.explosionRange * 5,
            bypassShield: true
        }
    }]
};

ships.MG100STARFORTRESS_REBEL = {
    name: "MG-100 StarFortress SF-17",
    asset: "MG100STARFORTRESS.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 55,
    cost: 16,
    speed: 7.5,
    turnSpeed: .025,
    shield: 50,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100,
        launchAngle: Math.PI / 2
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100,
        launchAngle: -Math.PI / 2
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * 2,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 2,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 3,
            health: weapons.FIGHTER_PROTON_BOMB.health * 5,
            explosionRange: 900,
        },
        shotsAtOnce: 10,
        shotDelay: 50
    }]
};

ships.MG100STARFORTRESS_ESCAPEFROMDQAR_REBEL = {
    name: "MG-100 StarFortress SF-17",
    asset: "MG100STARFORTRESS.png",
    classification: shipTypes.Bomber,
    population: 0,
    size: 55,
    cost: 16,
    speed: 7.5,
    turnSpeed: .025,
    shield: 50,
    shieldRegen: 5,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 2
        },
        shotsAtOnce: 4,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }, {
        x: .5,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_BOMB,
            reload: weapons.FIGHTER_PROTON_BOMB.reload * 1,
            speed: weapons.FIGHTER_PROTON_BOMB.speed * 2,
            damage: weapons.FIGHTER_PROTON_BOMB.damage * 100,
            health: weapons.FIGHTER_PROTON_BOMB.health * 5,
            explosionRange: 10000,
        },
        shotsAtOnce: 10,
        shotDelay: 75
    }]
};

ships.ROGUESQUADRON_REBEL = {
    name: "Rogue Squadron X-Wing",
    asset: "XWING.png",
    classification: shipTypes.Fighter,
    population: 1,
    size: 17.5,
    cost: 5000,
    speed: 25,
    turnSpeed: .015,
    shield: 200,
    shieldRegen: 2,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_FIGHTER_LASER_CANNON,
            health: weapons.RED_FIGHTER_LASER_CANNON.health * 4,
            damage: weapons.RED_FIGHTER_LASER_CANNON.damage * 2,
            speed: weapons.RED_FIGHTER_LASER_CANNON.speed * 1.5
        },
        shotsAtOnce: 4,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 4,
            damage: weapons.FIGHTER_PROTON_TORPEDO.damage * 2,
            explosionDamage: weapons.FIGHTER_PROTON_TORPEDO.explosionDamage * 4,
            explosionRange: weapons.FIGHTER_PROTON_TORPEDO.explosionRange * 2
        },
        shotsAtOnce: 2,
        shotDelay: 100
    }]
};

ships.FALCON_REBEL = {
    name: "Millenium Falcon",
    asset: "FALCON.png",
    classification: shipTypes.Corvette,
    population: 3,
    size: 65,
    cost: 600,
    speed: 20,
    turnSpeed: .0667,
    shield: 3000,
    shieldRegen: 3,
    shieldRegenAbility: {
        duration: 1.5,
        cooldown: .5,
        regen: 5
    },
    tenderAbility: {
        frequency: 1,
        power: 1
    },
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_QUAD_LASER_CANNON,
            health: weapons.RED_QUAD_LASER_CANNON.health * 10
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_QUAD_LASER_CANNON_HEAVY,
            health: weapons.RED_QUAD_LASER_CANNON_HEAVY.health * 10
        },
        shotsAtOnce: 2,
        shotDelay: 50
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_PROTON_TORPEDO,
            health: weapons.FIGHTER_PROTON_TORPEDO.health * 10,
            damage: weapons.FIGHTER_PROTON_TORPEDO.damage * 2,
            explosionDamage: weapons.FIGHTER_CONCUSSION_MISSILE.explosionDamage * 2,
            explosionRange: weapons.FIGHTER_CONCUSSION_MISSILE.explosionRange * 2,
            bypassShield: true
        },
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.FIGHTER_CONCUSSION_MISSILE,
            health: weapons.FIGHTER_CONCUSSION_MISSILE.health * 10,
            damage: weapons.FIGHTER_CONCUSSION_MISSILE.damage * 3,
            explosionDamage: weapons.FIGHTER_CONCUSSION_MISSILE.explosionDamage * 2,
            explosionRange: weapons.FIGHTER_CONCUSSION_MISSILE.explosionRange * 2,
            bypassShield: true
        },
        shotsAtOnce: 3,
        shotDelay: 75
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            reload: 1,
            damage: weapons.RED_ANTI_FIGHTER_LASER_CANNON.damage * 10
        }
    }, {
        x: 0,
        y: 0,
        weapon: {
            ...weapons.RED_ANTI_FIGHTER_LASER_CANNON,
            reload: 1,
            damage: weapons.RED_ANTI_FIGHTER_LASER_CANNON.damage * 10
        }
    }]
};

export default ships;