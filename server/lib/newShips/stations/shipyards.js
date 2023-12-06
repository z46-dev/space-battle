import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

function frigateShipyard(weaponColor, fighter, bomber, corvette, frigate) {
    return {
        name: "Frigate Shipyard",
        asset: "KELDABEBATTLESHIP.png",
        classification: shipTypes.SpaceStation,
        population: 1,
        size: 1000,
        cost: 6000,
        speed: 0,
        turnSpeed: 0,
        shield: 6500,
        shieldRegen: 6.5,
        hardpoints: (function() {
            const output = [{
                x: 0,
                y: 0,
                weapon: weapons.ASSAULT_PROTON_ROCKET,
                shotsAtOnce: 5,
                shotDelay: 60
            }];
    
            const d = .6;
            for (let i = 0; i < 8; i ++) {
                const a = Math.PI / 4 * i;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    weapon: weapons[weaponColor + "_DOUBLE_LASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }
    
            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: h.weapon.health * 3 | 0
                }
            }))
        })(),
        hangars: (function() {
            const output = [];
    
            const d = .6;
            for (let i = 0; i < 4; i ++) {
                const a = Math.PI / 2 * i;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    maxSquadrons: 1,
                    squadronSize: 8,
                    reserveSize: 2,
                    squadronKey: i % 2 ? fighter : bomber
                });
            }
    
            return output;
        })(),
        production: (function() {
            const output = [];

            if (corvette instanceof Array) {
                corvette.forEach(c => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 2,
                    reserve: 3,
                    key: c,
                    cooldown: 80
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 3,
                    reserve: 5,
                    key: corvette,
                    cooldown: 80
                });
            }

            if (frigate instanceof Array) {
                frigate.forEach(f => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 1,
                    key: f,
                    cooldown: 120
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 2,
                    reserve: 2,
                    key: frigate,
                    cooldown: 120
                });
            }

            return output;
        })()
    };
}

function capitalShipyard(weaponColor, fighter, bomber, corvette, frigate, heavyFrigate, capital) {
    return {
        name: "Capital Shipyard",
        asset: "KELDABEBATTLESHIP.png",
        classification: shipTypes.SpaceStation,
        population: 1,
        size: 1000,
        cost: 18000,
        speed: 0,
        turnSpeed: 0,
        shield: 19500,
        shieldRegen: 19.5,
        hardpoints: (function() {
            const output = [];
    
            for (let i = 0; i < 8; i ++) {
                const a = Math.PI / 4 * i;
                const d = .15;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    weapon: weapons.ASSAULT_PROTON_ROCKET,
                    shotsAtOnce: 4,
                    shotDelay: 75,
                    launchAngle: a
                });
            }

            for (let i = 0; i < 12; i ++) {
                const a = Math.PI / 6 * i;
                const d = .4;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    weapon: weapons.DOUBLE_ION_CANNON_HEAVY,
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            for (let i = 0; i < 16; i ++) {
                const a = Math.PI / 8 * i;
                const d = .5;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    weapon: weapons[weaponColor + "_DOUBLE_LASER_CANNON_HEAVY"],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }
    
            return output.map(h => ({
                ...h,
                weapon: {
                    ...h.weapon,
                    health: h.weapon.health * 3 | 0
                }
            }))
        })(),
        hangars: (function() {
            const output = [];
    
            const d = .6;
            for (let i = 0; i < 4; i ++) {
                const a = Math.PI / 2 * i;
                output.push({
                    x: Math.cos(a) * d,
                    y: Math.sin(a) * d,
                    maxSquadrons: 1,
                    squadronSize: 8,
                    reserveSize: 2,
                    squadronKey: i % 2 ? fighter : bomber
                });
            }
    
            return output;
        })(),
        production: (function() {
            const output = [];

            if (corvette instanceof Array) {
                corvette.forEach(c => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 3,
                    reserve: 3,
                    key: c,
                    cooldown: 80
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 4,
                    reserve: 4,
                    key: corvette,
                    cooldown: 80
                });
            }

            if (frigate instanceof Array) {
                frigate.forEach(f => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 2,
                    reserve: 2,
                    key: f,
                    cooldown: 120
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 3,
                    reserve: 3,
                    key: frigate,
                    cooldown: 120
                });
            }

            if (heavyFrigate instanceof Array) {
                heavyFrigate.forEach(h => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 2,
                    key: h,
                    cooldown: 180
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 2,
                    reserve: 3,
                    key: heavyFrigate,
                    cooldown: 180
                });
            }

            if (capital instanceof Array) {
                capital.forEach(c => output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 0,
                    key: c,
                    cooldown: 240
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 1,
                    reserve: 1,
                    key: capital,
                    cooldown: 240
                });
            }

            return output;
        })()
    };
}

ships.FRIGATE_SHIPYARD_REBEL = frigateShipyard("RED", "XWING_REBEL", "YWING_REBEL", ["CR90_REBEL", "DP20_REBEL"], ["PELTA_REBEL", "NEBULONB_REBEL"]);
ships.FRIGATE_SHIPYARD_EMPIRE = frigateShipyard("GREEN", "TIEFIGHTER_EMPIRE", "TIEBOMBER_EMPIRE", ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE"], ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE"]);

ships.CAPITAL_SHIPYARD_REBEL = capitalShipyard("RED", "XWING_REBEL", "YWING_REBEL", ["CR90_REBEL", "DP20_REBEL"], ["PELTA_REBEL", "NEBULONB_REBEL", "MC30_REBEL"], ["MC75_REBEL", "MC50_REBEL"], "MC80BLIBERTY_REBEL");
ships.CAPITAL_SHIPYARD_EMPIRE = capitalShipyard("GREEN", "TIEFIGHTER_EMPIRE", "TIEBOMBER_EMPIRE", ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE"], ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE", "QUASAR_EMPIRE"], ["ARQUITENS_EMPIRE", "DREADNOUGHTHEAVYCRUISER_EMPIRE", "ACCLIMATOR_EMPIRE"], "IMPERIALSTARDESTROYER_EMPIRE");

export default ships;