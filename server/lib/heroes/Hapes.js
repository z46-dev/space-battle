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

heroes["Astarta"] = {
    name: "Astarta",
    tooltip: "Astarta aided Isolder during his hunt for \"pirate king\" Harravan. After the capture of Harravan, Astarta remained with Isolder as the leader of his security detail. During the Battle of Dathomir, Astarta commanded a Hapan Battle Dragon. It was also Astarta's investigation that revealed Ta'a Chume as the source behind the murder of both Isolder's brother Kalen and Lady Elliar, his first love.",
    image: "Astarta.png",
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

heroes["Chelik"] = {
    name: "Chelik",
    tooltip: "Chelik was a princess of the Hapan Royal House, a niece of Ta'a Chume, and the older sister of Alyssia. She was believed to harbor ambitions to usurp the throne and become Queen Mother of Hapes.",
    image: "Chelik.png",
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

heroes["HeshaLovett"] = {
    name: "Hesha Lovett",
    tooltip: "Hesha Lovett was a Hapan female who served as captain of the Hapan royal vessel during the Yuuzhan Vong War. In 27 ABY, Lovett cleared Jaina Solo to land on Hapes in a stolen Yuuzhan Vong ship and then handed the comm over to Ta'a Chume.",
    image: "Hesha Lovett.png",
    ships: ["CORONAL_HAPAN"],
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

heroes["Isolder"] = {
    name: "Isolder",
    tooltip: "Isolder was the former heir, or Chume'da, of the Hapes Consortium. As the second son of Queen Mother Ta'a Chume, Isolder was not expected to rule. However, after his older brother Kalen was murdered, Isolder went on an undercover quest to hunt down the person responsible. Impressed by his finding of the culprit, his mother granted him the rank of Chume'da.",
    image: "Isolder.png",
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