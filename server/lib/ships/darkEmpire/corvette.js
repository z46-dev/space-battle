import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IPV1_DARKEMPIRE = templates.corvette.IPV1();

ships.VIGILCORVETTE_DARKEMPIRE = templates.corvette.VIGILCORVETTE();

export default ships;