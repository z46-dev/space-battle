import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_REPUBLIC = templates.stations.GOLAN_I({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

ships.GOLAN_II_REPUBLIC = templates.stations.GOLAN_II({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

ships.GOLAN_III_REPUBLIC = templates.stations.GOLAN_III({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

ships.SHIPYARD_LVL_1_REPUBLIC = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    corvette: ["CR90_REPUBLIC", "CONSOLAR_REPUBLIC"],
    frigate: ["PELTA_REPUBLIC", "ARQUITENS_REPUBLIC"]
});

ships.SHIPYARD_LVL_2_REPUBLIC = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    corvette: ["CR90_REPUBLIC", "CONSOLAR_REPUBLIC"],
    frigate: ["PELTA_REPUBLIC", "ARQUITENS_REPUBLIC"],
    heavyFrigate: ["ACCLIMATOR_REPUBLIC", "DREADNOUGHTHEAVYCRUISER_REPUBLIC"]
});

ships.SHIPYARD_LVL_3_REPUBLIC = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    corvette: ["CR90_REPUBLIC", "CONSOLAR_REPUBLIC"],
    frigate: ["PELTA_REPUBLIC", "ARQUITENS_REPUBLIC", "CARRACK_REPUBLIC"],
    heavyFrigate: ["ACCLIMATOR_REPUBLIC", "DREADNOUGHTHEAVYCRUISER_REPUBLIC"],
    capital: ["VENATOR_REPUBLIC"]
});

ships.SHIPYARD_LVL_4_REPUBLIC = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC",
    corvette: ["CR90_REPUBLIC", "CONSOLAR_REPUBLIC"],
    frigate: ["PELTA_REPUBLIC", "ARQUITENS_REPUBLIC", "CARRACK_REPUBLIC"],
    heavyFrigate: ["ACCLIMATOR_REPUBLIC", "DREADNOUGHTHEAVYCRUISER_REPUBLIC"],
    capital: ["VENATOR_REPUBLIC"]
});

export default ships;