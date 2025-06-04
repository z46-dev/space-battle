import { shipTypes } from "../../constants.js";
import templates from "../../templates.js";
import * as weapons from "../../weapons.js";

const ships = {};

ships.PELTA_REPUBLIC = templates.frigate.PELTA({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC"
});

ships.ARQUITENS_REPUBLIC = templates.heavyFrigate.ARQUITENS({
    color: "BLUE"
});

ships.CARRACK_REPUBLIC = templates.frigate.CARRACK({
    color: "BLUE"
});

ships.CLASS_C_REPUBLIC = templates.frigate.CLASS_C_FRIGATE({
    color: "BLUE"
});

ships.SUPER_TRANSPORT_VI_REPUBLIC = templates.frigate.SUPER_TRANSPORT_VI({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

ships.SUPER_TRANSPORT_VII_REPUBLIC = templates.frigate.SUPER_TRANSPORT_VII({
    color: "BLUE",
    fighter: "V19TORRENT_REPUBLIC",
    bomber: "YWING_REPUBLIC"
});

export default ships;