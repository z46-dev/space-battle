const heroes = {};

heroes["Yularen"] = {
    name: "Admiral Wolf Yularen",
    tooltip: "Admiral Wolf Yularen is a veteran of the Clone Wars and a master tactician. He is a strong leader and worked with Jedi Generals like Anakin Skywalker and Obi-Wan Kenobi. He is a strong leader and a tactical genius, and he is a valuable asset to any fleet.", 
    image: "Yularen.png",
    ships: ["VENATOR_REPUBLIC"],
    modifications: function(ship) {
        ship.shield *= 1.4;
        ship.maxShield *= 1.4;
        ship.shieldRegen *= 1.75;
        ship.maxSpeed *= 1.15;
        ship.hardpoints.forEach(hp => {
            hp.health *= 1.5;
            hp.maxHealth *= 1.5;
        });
    },
    onTick: function(ship) {
        ship.hardpoints.forEach(hp => {
            hp.health = Math.min(hp.maxHealth, hp.health + hp.maxHealth * .0005);
        });
    }
};

export default heroes;