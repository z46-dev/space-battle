import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_RESISTANCE = templates.stations.GOLAN_I({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE"
});

ships.GOLAN_II_RESISTANCE = templates.stations.GOLAN_II({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE"
});

ships.GOLAN_III_RESISTANCE = templates.stations.GOLAN_III({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE"
});

ships.SHIPYARD_LVL_1_RESISTANCE = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE",
    corvette: ["CR90_RESISTANCE", "AGAVE_CORVETTE_RESISTANCE"],
    frigate: ["MC30A_RESISTANCE", "MC30C_RESISTANCE"]
});

ships.SHIPYARD_LVL_2_RESISTANCE = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE",
    corvette: ["CR90_RESISTANCE", "AGAVE_CORVETTE_RESISTANCE"],
    frigate: ["MC30A_RESISTANCE", "MC30C_RESISTANCE"],
    heavyFrigate: ["NEBULONB2_RESISTANCE", "FREEVIRGILLIABUNKERBUSTER_RESISTANCE"]
});

ships.SHIPYARD_LVL_3_RESISTANCE = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE",
    corvette: ["CR90_RESISTANCE", "AGAVE_CORVETTE_RESISTANCE"],
    frigate: ["MC30A_RESISTANCE", "MC30C_RESISTANCE"],
    heavyFrigate: ["NEBULONB2_RESISTANCE", "FREEVIRGILLIABUNKERBUSTER_RESISTANCE"],
    capital: ["MC80BLIBERTY_RESISTANCE"]
});

ships.SHIPYARD_LVL_4_RESISTANCE = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "XWING_RESISTANCE",
    bomber: "YWING_RESISTANCE",
    corvette: ["CR90_RESISTANCE", "AGAVE_CORVETTE_RESISTANCE"],
    frigate: ["MC30A_RESISTANCE", "MC30C_RESISTANCE"],
    heavyFrigate: ["NEBULONB2_RESISTANCE", "FREEVIRGILLIABUNKERBUSTER_RESISTANCE"],
    capital: ["MC80BLIBERTY_RESISTANCE"]
});

export default ships;