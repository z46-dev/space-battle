const heroes = {};

heroes["TI-99"] = {
    name: "TI-99",
    tooltip: "The tactical droid TI-99 was a tactical droid in service of the Confederacy of Independent Systems during the Clone Wars. TI-99 was the tactical droid on board Trench's flagship, the Invincible, during the Battle of Christophsis. TI-99 was destroyed when the Invincible was destroyed by Anakin Skywalker and Ahsoka Tano.",
    image: "TI-99.webp",
    ships: ["PROVIDENCEDESTROYER_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.25;
        ship.maxShield *= 1.25;
        ship.shieldRegen *= 1.15;
        ship.maxSpeed *= 1.15;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.15;
            hp.maxHealth *= 1.15;
        });
    }
};

heroes["AdmiralTrench"] = {
    name: "Admiral Trench",
    tooltip: "A fearsome Harch admiral of the CIS who prided himself on many victories against the Republic's best commanders and tacticians. Trench Commanded Providence-Class Dreadnoughts Invincible and Invulnerable, both which in the end proved to be anything but their names.",
    image: "Trench.png",
    ships: ["PROVIDENCEDREADNOUGHT_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.6;
        ship.maxShield *= 1.6;
        ship.shieldRegen *= 1.55;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.3;
            hp.maxHealth *= 1.3;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .000334);
        });
    }
};

heroes["NuteGunray"] = {
    name: "Nute Gunray",
    tooltip: "The Vicerory of the Trade Federation wasn't a great tactician, however what was lacking in the tactics department was more than made up with in resources and riches.",
    image: "Nute.png",
    ships: ["LUCREHULKBATTLESHIP_CIS"],
    modifications: function(ship) {
        ship.shield *= 1.2;
        ship.maxShield *= 1.2;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.2;
            hp.maxHealth *= 1.2;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0001);
        });
    }
};

export default heroes;