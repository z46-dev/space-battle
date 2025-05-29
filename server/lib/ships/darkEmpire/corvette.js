import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IPV1_DARKEMPIRE = templates.corvette.IPV1();

ships.VIGILCORVETTE_DARKEMPIRE = templates.corvette.VIGILCORVETTE();

ships.RAIDER_II_DARKEMPIRE = templates.corvette.RAIDER_II();

export default ships;