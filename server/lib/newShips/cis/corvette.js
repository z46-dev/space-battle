import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.LUPUSMISSILEFRIGATE_CIS = {
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

export default ships;