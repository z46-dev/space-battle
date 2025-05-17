import templates from "../../templates.js";

const ships = {};

ships.QUASAR_EMPIRE = templates.frigate.QUASAR();
ships.TONFALKCARRIER_EMPIRE = templates.frigate.TONFALKCARRIER();
ships.CARRACK_EMPIRE = templates.frigate.CARRACK();
ships.LANCERFRIGATE_EMPIRE = templates.frigate.LANCER();
ships.STRIKECRUISER_EMPIRE = templates.frigate.STRIKECRUISER();
ships.STARGALLEON_EMPIRE = templates.frigate.STAR_GALLEON();
ships.VICTORYFRIGATE_EMPIRE = templates.frigate.VICTORY_FRIGATE();

export default ships;