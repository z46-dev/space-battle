import { shipTypes } from "../../constants.js";
import * as weapons from "../../weapons.js";
import templates from "../../templates.js";

const ships = {};

ships.CR90_RESISTANCE = templates.corvette.CR90();

ships.AGAVE_CORVETTE_RESISTANCE = templates.corvette.AGAVE_CORVETTE();

export default ships;