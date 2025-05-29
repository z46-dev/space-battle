import templates from "../../templates.js";

const ships = {};

ships.RAIDER_EMPIRE = templates.corvette.RAIDER();
ships.RAIDER_II_EMPIRE = templates.corvette.RAIDER_II();

ships.VIGILCORVETTE_EMPIRE = templates.corvette.VIGILCORVETTE();

ships.BUCCANEER_EMPIRE = templates.corvette.BUCCANEER({
    color: "GREEN"
});

ships.CUSTOMS_EMPIRE = templates.corvette.CUSTOMS_LIGHT_CORVETTE();

export default ships;