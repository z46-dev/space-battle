import { shipTypes } from "../constants.js";

const heroes = {};

heroes["JaggedFel"] = {
    name: "Jagged Fel",
    tooltip: "Jagged Fel was a human leaderof the Imperial Remnant, and then the Empire of the Hand in Thrawn's service.",
    image: "JaggedFel.png",
    ships: ["ASCENDANCY_EOTH", "SYNDIC_EOTH"],
    modifications: function (ship) {
        ship.shield *= 1.3;
        ship.maxShield *= 1.3;
        ship.shieldRegen *= 1.3;
        ship.maxSpeed *= 1.3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.range *= 2;
            hp.damage *= 1.25;
        });
    },
    onTick: function (ship) {}
};

heroes["GrandAdmiralThrawnEOTH"] = {
    name: "Grand Admiral Thrawn",
    tooltip: "Grand Admiral Thrawn was a Chiss who was a brilliant tactician. He was able to defeat the New Republic on multiple occasions, and was able to take over the Empire after the death of Emperor Palpatine. He was eventually killed by his bodyguard, Rukh.",
    image: "AdmiralThrawn.jfif",
    ships: ["IMPERIALSTARDESTROYER_EOTH", "ASCENDANCY_EOTH"],
    modifications: function (ship) {
        ship.shield *= 3;
        ship.maxShield *= 3;
        ship.shieldRegen *= 3;
        ship.maxSpeed *= 1.3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.damage *= 1.2;
            hp.range *= 1.5;
            hp.reload *= .775;
        });

        ship.addHangar({
            x: 0,
            y: 0,
            offset: 0,
            direction: 0,
            maxSquadrons: 3,
            squadronSize: 3,
            reserveSize: 12,
            squadronKey: "TIEDEFENDER_EMPIRE"
        });
    },
    onTick: function (ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0003);
        });

        //ship.repelMissiles();
    }
};

export default heroes;