import { shipTypes } from "../constants.js";

const heroes = {};

heroes["Ereneda"] = {
    name: "Ereneda",
    tooltip: "Ereneda is a powerful warrior and the Queen Mother of the Hapes Consortium. She is known for her strength and her ability to lead her people. She is also known for her fierce loyalty to her friends and allies.",
    image: "Ereneda.png",
    ships: ["BATTLEDRAGON_HAPAN", "TEREPHON_HAPAN"],
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

heroes["TenelKaDjo"] = {
    name: "Tenel Ka Djo",
    tooltip: "Tenel Ka Djo is a powerful warrior and the Queen Mother of the Hapes Consortium. She is known for her strength and her ability to lead her people. She is also known for her fierce loyalty to her friends and allies.",
    image: "TenelKaDjo.png",
    ships: ["BATTLEDRAGON_HAPAN", "TEREPHON_HAPAN"],
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

export default heroes;