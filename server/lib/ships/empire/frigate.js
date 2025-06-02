import templates from "../../templates.js";

const ships = {};

ships.QUASAR_EMPIRE = templates.frigate.QUASAR();
ships.TONFALKCARRIER_EMPIRE = templates.frigate.TONFALKCARRIER();
ships.CARRACK_EMPIRE = templates.frigate.CARRACK();
ships.LANCERFRIGATE_EMPIRE = templates.frigate.LANCER();
ships.STRIKECRUISER_EMPIRE = templates.frigate.STRIKECRUISER();
ships.STARGALLEON_EMPIRE = templates.frigate.STAR_GALLEON();
ships.VICTORYFRIGATE_EMPIRE = templates.frigate.VICTORY_FRIGATE();
ships.SUPER_TRANSPORT_XI_EMPIRE = templates.frigate.SUPER_TRANSPORT_XI();
ships.TARTAN_PATROL_CRUISER_EMPIRE = templates.frigate.TARTAN_PATROL_CRUISER();
ships.TRENCHANT_CRUISER_EMPIRE = templates.frigate.TRENCHANT_CRUISER();
ships.VENGEANCE_FRIGATE_EMPIRE = templates.frigate.VENGEANCE_FRIGATE();
ships.NEUTRON_STAR_EMPIRE = templates.frigate.NEUTRON_STAR({
    color: "GREEN"
});
ships.NEBULONB_EMPIRE = templates.frigate.NEBULON_B();

export default ships;