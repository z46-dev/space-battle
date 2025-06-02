import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.CONSOLAR_REPUBLIC =  templates.corvette.CONSOLAR({
    color: "BLUE"
});

ships.CR90_REPUBLIC = templates.corvette.CR90({
    color: "BLUE"
});

export default ships;