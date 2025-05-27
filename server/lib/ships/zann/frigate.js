import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.LANCERFRIGATE_ZANN = templates.frigate.LANCER({
    color: "YELLOW"
});

ships.NEUTRON_STAR_ZANN = templates.frigate.NEUTRON_STAR({
    color: "YELLOW"
});

export default ships;