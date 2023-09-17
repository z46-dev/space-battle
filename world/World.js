class Station {
    static id = 0;

    constructor(world) {
        this.id = Station.id++;
        this.name = "Coruscant";
        this.population = 1e12;

        /**
         * @type {Map<number, Fleet>}
         */
        this.fleets = new Map();

        /**
         * @type {Faction}
         */
        this.controlledBy = null;

        this.x = 0;
        this.y = 0;

        /**
         * @type {World}
         */
        this.world = world;

        this.world.stations.set(this.id, this);
    }
}

class Fleet {
    static id = 0;
    constructor(world) {
        this.ships = [];
        
        /**
         * @type {Faction}
         */
        this.faction = null;

        /**
         * @type {Station}
         */
        this.location = null;

        /**
         * @type {World}
         */
        this.world = world;
    }
}

class Faction {
    static id = 0;
    constructor(world) {
        this.id = Faction.id++;
        this.name = "Galactic Empire";
        this.color = "#000000";
        
        /**
         * @type {Map<number, Fleet>}
         */
        this.fleets = new Map();

        /**
         * @type {Map<number, Station>}
         */
        this.stations = new Map();

        /**
         * @type {World}
         */
        this.world = world;

        this.world.factions.set(this.id, this);
    }
}

class World {
    constructor() {
        /**
         * @type {Map<number, Station>}
         */
        this.stations = new Map();

        /**
         * @type {Map<number, Fleet>}
         */
        this.fleets = new Map();

        /**
         * @type {Map<number, Faction>}
         */
        this.factions = new Map();
    }
}