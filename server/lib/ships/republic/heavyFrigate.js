import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ACCLIMATOR_REPUBLIC = templates.heavyFrigate.ACCLIMATOR({
    color: "BLUE",
    fighter: "ARC170_REPUBLIC"
});

ships.DREADNOUGHTHEAVYCRUISER_REPUBLIC = templates.heavyFrigate.DREADNOUGHTHEAVYCRUISER({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC"
});

export default ships;