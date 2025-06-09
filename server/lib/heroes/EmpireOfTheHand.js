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
    image: "ChissThrawn.png",
    ships: ["IMPERIALSTARDESTROYER_EOTH"],
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
    }
};

heroes["Ar-Alani"] = {
    name: "Ar'alani",
    tooltip: "Ar'alani, born as Irizi'ar'alani and also known by her core name Ziara, was a Chiss female admiral who served in the Expansionary Defense Fleet of the Chiss Ascendancy nation during the Clone Wars and the reign of the Galactic Empire. A Chiss with blue skin and striking red eyes, Ar'alani was known as a brilliant tactician and a devoted officer within the Expansionary Defense Fleet.",
    image: "Ar-alani.png",
    ships: ["SYNDIC_EOTH"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["DagonNiriz"] = {
    name: "Dagon Niriz",
    tooltip: "Dagon Niriz was a fourth-generation Imperial Navy Captain who was assigned to Grand Admiral Thrawn's mapping expedition in the Unknown Regions. He initially saw it as a blow to his career, but later learned of Thrawn's true mission to conquer the Unknown Regions for the Empire. Niriz took great pride in this cause and continued to serve in the Empire of the Hand after Emperor Palpatine's death.",
    image: "Dagon Niriz.png",
    ships: ["IMPERIALSTARDESTROYER_EOTH"],
    modifications: function (ship) {
        ship.shield *= 1.75;
        ship.maxShield *= 1.75;
        ship.shieldRegen *= 1.75;
        ship.maxSpeed *= 1.75;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["Ferob"] = {
    name: "Ferob",
    tooltip: "Ferob was a human Imperial officer who served under Thrawn in the Empire of the Hand. Despite being a humanocentrist, he was loyal to the cause, understanding the purpose of the Empire of the Hand.",
    image: "Ferob.png",
    ships: ["EFODIO_EOTH"],
    modifications: function (ship) {
        ship.shield *= 1.75;
        ship.maxShield *= 1.75;
        ship.shieldRegen *= 1.75;
        ship.maxSpeed *= 1.75;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

heroes["KresTenTarthi"] = {
    name: "Kres'ten'tarthi",
    tooltip: "Kres'ten'tarthi, better known by his core name of Stent, was one of the Chiss followers of Syndic Mitth'raw'nuruodo, better known as Grand Admiral Thrawn. Stent served the Grand Admiral as a TIE pilot and the leader of his Household Phalanx troops.",
    image: "Kres-ten-tarthi.png",
    ships: ["ASCENDANCY_EOTH"],
    modifications: function (ship) {
        ship.shield *= 1.75;
        ship.maxShield *= 1.75;
        ship.shieldRegen *= 1.75;
        ship.maxSpeed *= 1.75;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
        });
    }
};

export default heroes;