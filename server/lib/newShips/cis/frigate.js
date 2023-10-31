import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.C9979_CIS = {
    name: "C9979 Picket Carrier",
    asset: "C9979.png",
    classification: shipTypes.Frigate,
    population: 2,
    size: 145,
    cost: 600,
    speed: 3,
    turnSpeed: .008,
    shield: 2000,
    shieldRegen: 3,
    hardpoints: [{
        x: -.8,
        y: .5,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 3,
            reload: weapons.RED_DOUBLE_LASER_CANNON.reload * .3
        }
    }, {
        x: .8,
        y: .5,
        weapon: {
            ...weapons.RED_DOUBLE_LASER_CANNON,
            health: weapons.RED_DOUBLE_LASER_CANNON.health * 3,
            reload: weapons.RED_DOUBLE_LASER_CANNON.reload * .3
        }
    }, {
        x: -.8,
        y: -.5,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON,
            health: weapons.DOUBLE_ION_CANNON.health * 3
        }
    }, {
        x: .8,
        y: -.5,
        weapon: {
            ...weapons.DOUBLE_ION_CANNON,
            health: weapons.DOUBLE_ION_CANNON.health * 3
        }
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 2,
        squadronSize: 3,
        reserveSize: 9,
        squadronKey: "VULTUREDROID_CIS"
    }]
};

export default ships;