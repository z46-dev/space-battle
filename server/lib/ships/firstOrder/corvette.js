import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IPV1_FO = templates.corvette.IPV1();

ships.RAIDER_II_FO = templates.corvette.RAIDER_II();

export default ships;