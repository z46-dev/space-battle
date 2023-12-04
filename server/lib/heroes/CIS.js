const heroes = {};

heroes["TI-99"] = {
    name: "TI-99",
    tooltip: "The tactical droid TI-99 was a tactical droid in service of the Confederacy of Independent Systems during the Clone Wars. TI-99 was the tactical droid on board Trench's flagship, the Invincible, during the Battle of Christophsis. TI-99 was destroyed when the Invincible was destroyed by Anakin Skywalker and Ahsoka Tano.",
    image: "TI-99.webp",
    modifications: function(ship) {
        ship.shield *= 1.15;
        ship.maxShield *= 1.15;
        ship.shieldRegen *= 1.15;
        ship.maxSpeed *= 1.15;
    }
};

export default heroes;