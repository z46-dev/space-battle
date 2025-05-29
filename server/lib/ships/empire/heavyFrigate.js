import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.ARQUITENS_EMPIRE = templates.heavyFrigate.ARQUITENS();
ships.IMOBILIZER_EMPIRE = templates.heavyFrigate.IMOBILIZER_418();
ships.DREADNOUGHTHEAVYCRUISER_EMPIRE = templates.heavyFrigate.DREADNOUGHTHEAVYCRUISER();
ships.ACCLIMATOR_EMPIRE = templates.heavyFrigate.ACCLIMATOR();
ships.IMPERIAL_II_EMPIRE = templates.heavyFrigate.IMPERIAL_II();
ships.GLADIATOR_EMPIRE = templates.heavyFrigate.GLADIATOR();
ships.VINDICATOR_EMPIRE = templates.heavyFrigate.VINDICATOR();
ships.PURSUIT_EMPIRE = templates.heavyFrigate.PURSUIT_DESTROYER();
ships.DRAGON_HEAVY_CRUISER_EMPIRE = templates.heavyFrigate.DRAGON_HEAVY_CRUISER();
ships.SURVEYOR_EMPIRE = templates.heavyFrigate.SURVEYOR();

export default ships;