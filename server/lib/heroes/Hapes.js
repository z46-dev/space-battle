import { shipTypes } from "../constants.js";

const heroes = {};

heroes["Ereneda"] = {
    name: "Ereneda",
    tooltip: "Ereneda is a powerful warrior and the Queen Mother of the Hapes Consortium. She is known for her strength and her ability to lead her people. She is also known for her fierce loyalty to her friends and allies.",
    image: "Ereneda.png",
    ships: ["BATTLEDRAGON_HAPAN", "MIST_HAPAN", "NEUTRON_HAPAN"],
    modifications: function (ship) {
        ship.shield *= 1.3;
        ship.maxShield *= 1.3;
        ship.shieldRegen *= 1.3;
        ship.maxSpeed *= 1.3;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
            hp.range *= 1.1;
            hp.damage *= 1.1;
        });
    }
};

heroes["TenelKaDjo"] = {
    name: "Tenel Ka Djo",
    tooltip: "Tenel Ka Djo is a powerful warrior and the Queen Mother of the Hapes Consortium. She is known for her strength and her ability to lead her people. She is also known for her fierce loyalty to her friends and allies.",
    image: "TenelKaDjo.png",
    ships: ["BATTLEDRAGON_HAPAN", "MIST_HAPAN", "NEUTRON_HAPAN"],
    modifications: function (ship) {
        ship.shield *= 2;
        ship.maxShield *= 2;
        ship.shieldRegen *= 2;
        ship.maxSpeed *= 1.25;

        ship.hardpoints.forEach(hp => {
            hp.health *= 2;
            hp.maxHealth *= 2;
            hp.reload *= .8;
        });
    }
};

heroes["AlesonGray"] = {
    name: "Aleson Gray",
    tooltip: "Aleson Gray was a Hapan male who served as the Dukat and Duch'da to Lady AlGray of the Relephon Moons as of 35 ABY. The ninth cousin of Queen Mother Tenel Ka, he commanded the Kendall during the Swarm War.",
    image: "Aleson Gray.png",
    ships: ["BATTLEDRAGON_HAPAN"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    }
};

heroes["Alyssia"] = {
    name: "Alyssia",
    tooltip: "Alyssia was a princess of the Hapan Royal House, a niece of Ta'a Chume, to whom she bore a close physical resemblance. She was also the younger sister of Chelik.",
    image: "Alyssia.png",
    ships: ["BATTLEDRAGON_HAPAN"],
    modifications: function (ship) {
        ship.shield *= 1.5;
        ship.maxShield *= 1.5;
        ship.shieldRegen *= 1.5;

        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    }
};

export default heroes;