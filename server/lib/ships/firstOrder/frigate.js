import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ARQUITENS_FO = templates.heavyFrigate.ARQUITENS();

ships.STRIKECRUISER_FO = templates.frigate.STRIKECRUISER({
    fighter: "TIEINTERCEPTOR_FO"
});

export default ships;