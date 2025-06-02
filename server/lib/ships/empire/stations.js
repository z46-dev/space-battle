import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_EMPIRE = templates.stations.GOLAN_I({
    color: "GREEN",
    fighter: "TIEFIGHTER_EMPIRE",
    bomber: "TIEBOMBER_EMPIRE"
});

ships.GOLAN_II_EMPIRE = templates.stations.GOLAN_II({
    color: "GREEN",
    fighter: "TIEFIGHTER_EMPIRE",
    bomber: "TIEBOMBER_EMPIRE"
});

ships.GOLAN_III_EMPIRE = templates.stations.GOLAN_III({
    color: "GREEN",
    fighter: "TIEFIGHTER_EMPIRE",
    bomber: "TIEBOMBER_EMPIRE"
});

ships.SHIPYARD_LVL_1_EMPIRE = templates.stations.SHIPYARD_LVL_1();
ships.SHIPYARD_LVL_2_EMPIRE = templates.stations.SHIPYARD_LVL_2();
ships.SHIPYARD_LVL_3_EMPIRE = templates.stations.SHIPYARD_LVL_3();
ships.SHIPYARD_LVL_4_EMPIRE = templates.stations.SHIPYARD_LVL_4();

export default ships;