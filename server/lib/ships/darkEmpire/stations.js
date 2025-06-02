import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_DARKEMPIRE = templates.stations.GOLAN_I({
    color: "GREEN",
    fighter: "TIEDRONE_DARKEMPIRE",
    bomber: "TIEBOMBER_DARKEMPIRE"
});

ships.GOLAN_II_DARKEMPIRE = templates.stations.GOLAN_II({
    color: "GREEN",
    fighter: "TIEDRONE_DARKEMPIRE",
    bomber: "TIEBOMBER_DARKEMPIRE"
});

ships.GOLAN_III_DARKEMPIRE = templates.stations.GOLAN_III({
    color: "GREEN",
    fighter: "TIEDRONE_DARKEMPIRE",
    bomber: "TIEBOMBER_DARKEMPIRE"
});

export default ships;