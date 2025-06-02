import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_HAPAN = templates.stations.GOLAN_I({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN"
});

ships.GOLAN_II_HAPAN = templates.stations.GOLAN_II({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN"
});

ships.GOLAN_III_HAPAN = templates.stations.GOLAN_III({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN"
});

ships.SHIPYARD_LVL_1_HAPAN = templates.stations.SHIPYARD_LVL_1({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN",
    corvette: ["BAIDAM_HAPAN", "FLARE_HAPAN", "FLARE_HAPAN"],
    frigate: ["BETACRUISER_HAPAN", "NOVACRUISER_HAPAN"]
});

ships.SHIPYARD_LVL_2_HAPAN = templates.stations.SHIPYARD_LVL_2({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN",
    corvette: ["BAIDAM_HAPAN", "FLARE_HAPAN", "FLARE_HAPAN"],
    frigate: ["BETACRUISER_HAPAN", "NOVACRUISER_HAPAN", "STELLA_HAPAN", "CHARUBAH_HAPAN"],
    heavyFrigate: ["MAGNETAR_HAPAN", "MIST_HAPAN"]
});

ships.SHIPYARD_LVL_3_HAPAN = templates.stations.SHIPYARD_LVL_3({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN",
    corvette: ["BAIDAM_HAPAN", "FLARE_HAPAN", "FLARE_HAPAN"],
    frigate: ["BETACRUISER_HAPAN", "NOVACRUISER_HAPAN", "STELLA_HAPAN", "CHARUBAH_HAPAN"],
    heavyFrigate: ["MAGNETAR_HAPAN", "MIST_HAPAN", "CORONAL_HAPAN"],
    capital: ["BATTLEDRAGON_HAPAN"]
});

ships.SHIPYARD_LVL_4_HAPAN = templates.stations.SHIPYARD_LVL_4({
    color: "BLUE",
    fighter: "MIYTILFIGHTER_HAPAN",
    bomber: "MIYTILFIGHTER_HAPAN",
    corvette: ["BAIDAM_HAPAN", "FLARE_HAPAN", "FLARE_HAPAN"],
    frigate: ["BETACRUISER_HAPAN", "NOVACRUISER_HAPAN", "STELLA_HAPAN", "CHARUBAH_HAPAN"],
    heavyFrigate: ["MAGNETAR_HAPAN", "MIST_HAPAN", "CORONAL_HAPAN"],
    capital: ["BATTLEDRAGON_HAPAN", "TEREPHON_HAPAN"]
});

export default ships;