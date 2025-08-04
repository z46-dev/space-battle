import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";

const ships = {};

function frigateShipyard(weaponColor, fighter, bomber, corvette, frigate) {
    return {
        name: "Frigate Shipyard",
        asset: "frigateShipyard.png",
        classification: shipTypes.SpaceStation,
        population: 1,
        size: 1000,
        cost: 6000,
        speed: 0,
        turnSpeed: 0,
        shield: 6500,
        shieldRegen: 6.5,
        hardpoints: (function() {
            const output = [];

            for (let i = 0; i < 5; i ++) {
                output.push({
                    x: -.5 + .25 * i,
                    y: -.35,
                    weapon: weapons[i % 2 ? "DOUBLE_ION_CANNON_MEDIUM" : (weaponColor + "_DOUBLE_LASER_CANNON_HEAVY")],
                    shotsAtOnce: 2,
                    shotDelay: 75
                }, {
                    x: -.5 + .25 * i,
                    y: .35,
                    weapon: weapons[i % 2 ? "DOUBLE_ION_CANNON_MEDIUM" : (weaponColor + "_DOUBLE_LASER_CANNON_HEAVY")],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            for (let i = 0; i < 3; i ++) {
                const angle = Math.PI / 1.5 * i;
                const ds = .15;

                output.push({
                    x: .5 + Math.cos(angle) * ds,
                    y:  Math.sin(angle) * ds,
                    weapon: weapons[weaponColor + "_DOUBLE_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 75
                }, {
                    x: -.5 +  Math.cos(angle + Math.PI) * ds,
                    y:  Math.sin(angle + Math.PI) * ds,
                    weapon: weapons[weaponColor + "_DOUBLE_TURBOLASER_CANNON"],
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
                    maxAlive: 1,
                    reserve: 2,
                    key: c,
                    cooldown: 80
                }));
            } else {
                output.push({
                    x: 0,
                    y: 0,
                    maxAlive: 2,
                    reserve: 2,
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
                    maxAlive: 1,
                    reserve: 1,
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
        asset: "capitalShipyard.png",
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
                output.push({
                    x: 0,
                    y: .75 - .2 * i,
                    weapon: weapons[weaponColor + "_DOUBLE_TURBOLASER_CANNON"],
                    shotsAtOnce: 2,
                    shotDelay: 75
                });
            }

            [
                [.3, .725],
                [-.3, .725],
                [.3, .025],
                [-.3, .025],
                [.3, -.685],
                [-.3, -.685]
            ].forEach(([x, y]) => [
                [0, .125],
                [0, -.125],
                [.2, .1],
                [.2, -.1],
                [.4, .075],
                [.4, -.075],
                [.1, 0],
                [.3, 0],
                [.5, 0]
            ].forEach(([xx, yy], i) => output.push({
                x: x + (x < 0 ? xx * -1 : xx),
                y: y + yy,
                weapon: weapons[xx === .5 ? "SIEGE_CONCUSSION_MISSILE" : (i % 2 ? "DOUBLE_ION_CANNON_MEDIUM" : (weaponColor + "_DOUBLE_LASER_CANNON_HEAVY"))],
                shotsAtOnce: 2,
                shotDelay: 75,
                launchAngle: xx === .5 ? (x > 0 ? Math.PI / 2 : -Math.PI / 2) : undefined
            })));
    
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
ships.FRIGATE_SHIPYARD_CIS = frigateShipyard("RED", "VULTUREDROID_CIS", "HYENABOMBER_CIS", ["DIAMOND_CIS", "HARDCELL_CIS"], ["C9979_CIS", "MUNIFICENT_CIS"]);
ships.FRIGATE_SHIPYARD_REPUBLIC = frigateShipyard("BLUE", "V19TORRENT_REPUBLIC", "YWING_REPUBLIC", ["CONSOLAR_REPUBLIC", "CR90_REPUBLIC"], ["PELTA_REPUBLIC", "CARRACK_REPUBLIC"]);

ships.CAPITAL_SHIPYARD_REBEL = capitalShipyard(
    "RED", "XWING_REBEL", "YWING_REBEL",
    ["CR90_REBEL", "DP20_REBEL"],
    ["NEBULONB_REBEL", "MC30C_REBEL"],
    ["MC50_REBEL"],
    "MC80BLIBERTY_REBEL"
);

ships.CAPITAL_SHIPYARD_EMPIRE = capitalShipyard(
    "GREEN", "TIEFIGHTER_EMPIRE", "TIEBOMBER_EMPIRE",
    ["RAIDER_EMPIRE", "VIGILCORVETTE_EMPIRE"],
    ["CARRACK_EMPIRE", "LANCERFRIGATE_EMPIRE", "QUASAR_EMPIRE"],
    ["ARQUITENS_EMPIRE", "DREADNOUGHTHEAVYCRUISER_EMPIRE", "ACCLIMATOR_EMPIRE"],
    "IMPERIALSTARDESTROYER_EMPIRE"
);

ships.CAPITAL_SHIPYARD_CIS = capitalShipyard(
    "RED", "VULTUREDROID_CIS", "HYENABOMBER_CIS",
    ["DIAMOND_CIS", "HARDCELL_CIS"],
    ["C9979_CIS", "MUNIFICENT_CIS"],
    ["RECUSANT_CIS", "SABOATHDESTROYER_CIS"],
    "PROVIDENCEDESTROYER_CIS"
);

ships.CAPITAL_SHIPYARD_REPUBLIC = capitalShipyard(
    "BLUE", "V19TORRENT_REPUBLIC", "YWING_REPUBLIC",
    ["CONSOLAR_REPUBLIC", "CR90_REPUBLIC"],
    ["PELTA_REPUBLIC", "CARRACK_REPUBLIC"],
    ["ACCLIMATOR_REPUBLIC", "ARQUITENS_REPUBLIC"],
    "VENATOR_REPUBLIC"
);

export default ships;