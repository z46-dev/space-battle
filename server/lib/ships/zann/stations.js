import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_ZANN = templates.stations.GOLAN_I({
    color: "YELLOW",
    fighter: "STARVIPERATTACKCRAFT_ZANN",
    bomber: "AUZITUCKGUNSHIP_ZANN"
});

ships.GOLAN_II_ZANN = templates.stations.GOLAN_II({
    color: "YELLOW",
    fighter: "STARVIPERATTACKCRAFT_ZANN",
    bomber: "AUZITUCKGUNSHIP_ZANN"
});

ships.GOLAN_III_ZANN = templates.stations.GOLAN_III({
    color: "YELLOW",
    fighter: "STARVIPERATTACKCRAFT_ZANN",
    bomber: "AUZITUCKGUNSHIP_ZANN"
});

export default ships;