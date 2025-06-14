import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.INEXPUGNABLE_COMMAND_SHIP_OLDREP = {
    name: "Inexpugnable Tactical Command Ship",
    asset: "INEXPUGNABLECOMMANDSHIP.png",
    classification: shipTypes.SuperCapital,
    population: 50,
    size: 2000,
    cost: 11250,
    speed: 2,
    turnSpeed: .001,
    shield: 22500,
    shieldRegen: 22.5,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 16; i ++) {
            output.push({
                x: .75 * Math.cos(Math.PI * 2 * i / 16),
                y: .75 * Math.sin(Math.PI * 2 * i / 16),
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON : weapons.GREEN_TRIPLE_LASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 150
            }, {
                x: .6 * Math.cos(Math.PI * 2 * i / 16 + Math.PI / 16),
                y: .6 * Math.sin(Math.PI * 2 * i / 16 + Math.PI / 16),
                weapon: i % 2 ? weapons.TRIPLE_ION_CANNON_HEAVY : weapons.GREEN_TRIPLE_TURBOLASER_CANNON,
                shotsAtOnce: 2,
                shotDelay: 300
            });
        }

        for (let i = 0; i < 8; i ++) {
            output.push({
                x: .675 * Math.cos(Math.PI * 2 * i / 8 + Math.PI / 16),
                y: .675 * Math.sin(Math.PI * 2 * i / 8 + Math.PI / 16),
                weapon: weapons.ASSAULT_CONCUSSION_MISSILE,
                shotsAtOnce: 3,
                shotDelay: 500
            });
        }

        return output.map(e => ({
            ...e,
            weapon: {
                ...e.weapon,
                health: e.weapon.health * 5
            }
        }))
    })(),
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "AUREK_STRIKEFIGHTER_OLDREP"
    }, {
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 8,
        reserveSize: 12,
        squadronKey: "CHELA_BOMBER_OLDREP"
    }]
};

export default ships;