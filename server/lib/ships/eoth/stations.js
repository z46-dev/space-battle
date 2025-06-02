import templates from "../../templates.js";

const ships = {};

ships.GOLAN_I_EOTH = templates.stations.GOLAN_I({
    color: "BLACK",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH"
});

ships.GOLAN_II_EOTH = templates.stations.GOLAN_II({
    color: "BLACK",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH"
});

ships.GOLAN_III_EOTH = templates.stations.GOLAN_III({
    color: "BLACK",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH"
});

ships.SHIPYARD_LVL_1_EOTH = templates.stations.SHIPYARD_LVL_1({
    color: "RED",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH",
    corvette: ["KUURO_EOTH", "ASDONI_EOTH", "SYZYGOS_EOTH"],
    frigate: ["BAOMU_EOTH", "FRUORO_EOTH"]
});

ships.SHIPYARD_LVL_2_EOTH = templates.stations.SHIPYARD_LVL_2({
    color: "RED",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH",
    corvette: ["KUURO_EOTH", "ASDONI_EOTH", "SYZYGOS_EOTH"],
    frigate: ["BAOMU_EOTH", "FRUORO_EOTH", "KYNIGOS_EOTH", "PROLIPSI_EOTH"],
    heavyFrigate: ["ORMOS_EOTH", "CHAF_EOTH"]
});

ships.SHIPYARD_LVL_3_EOTH = templates.stations.SHIPYARD_LVL_3({
    color: "RED",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH",
    corvette: ["KUURO_EOTH", "ASDONI_EOTH", "SYZYGOS_EOTH"],
    frigate: ["BAOMU_EOTH", "FRUORO_EOTH", "KYNIGOS_EOTH", "PROLIPSI_EOTH"],
    heavyFrigate: ["ORMOS_EOTH", "CHAF_EOTH", "EFODIO_EOTH"],
    capital: ["ASCENDANCY_EOTH"]
});

ships.SHIPYARD_LVL_4_EOTH = templates.stations.SHIPYARD_LVL_4({
    color: "RED",
    fighter: "NSSIS_EOTH",
    bomber: "SYCA_EOTH",
    corvette: ["KUURO_EOTH", "ASDONI_EOTH", "SYZYGOS_EOTH"],
    frigate: ["BAOMU_EOTH", "FRUORO_EOTH", "KYNIGOS_EOTH", "PROLIPSI_EOTH"],
    heavyFrigate: ["ORMOS_EOTH", "CHAF_EOTH", "EFODIO_EOTH"],
    capital: ["ASCENDANCY_EOTH", "SYNDIC_EOTH"]
});

export default ships;