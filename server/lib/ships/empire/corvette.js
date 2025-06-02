import templates from "../../templates.js";

const ships = {};

ships.RAIDER_EMPIRE = templates.corvette.RAIDER();
ships.RAIDER_II_EMPIRE = templates.corvette.RAIDER_II();

ships.VIGILCORVETTE_EMPIRE = templates.corvette.VIGILCORVETTE();

ships.BUCCANEER_EMPIRE = templates.corvette.BUCCANEER({
    color: "GREEN"
});

ships.CUSTOMS_EMPIRE = templates.corvette.CUSTOMS_LIGHT_CORVETTE();

ships.IPV1_EMPIRE = templates.corvette.IPV1();

ships.CR92A_EMPIRE = templates.corvette.CR92A({
    color: "GREEN"
});

export default ships;