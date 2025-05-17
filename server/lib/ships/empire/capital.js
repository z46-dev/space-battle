import { shipTypes, weaponClassifications } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.IMPERIALSTARDESTROYER_EMPIRE = templates.capital.IMPERIAL_STAR_DESTROYER();

ships.ALLEGIANCE_EMPIRE = templates.capital.ALLEGIANCE_BATTLECRUISER();

ships.VICTORYSTARDESTROYER_EMPIRE = templates.capital.VICTORY_STAR_DESTROYER();

ships.CRIMSONCOMMAND_EMPIRE = templates.capital.CRIMSON_VICTORY_STAR_DESTROYER();

ships.AGGRESSORSTARDESTROYER_EMPIRE = templates.capital.AGGRESSOR_STAR_DESTROYER();

ships.IMPERIAL_CARGO_SHIP_EMPIRE = templates.capital.IMPERIAL_CARGO_SHIP();

ships.TORPEDO_SPHERE_EMPIRE = templates.capital.TORPEDO_SPHERE();

export default ships;