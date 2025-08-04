import { shipTypes } from "./constants.js";
import templates from "./templates.js";
import { DUMMY_BLANK } from "./weapons.js";

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    get angle() {
        return Math.atan2(this.y, this.x);
    }
}

export const empire = {
    ...(await import("./ships/empire/fighter.js")).default,
    ...(await import("./ships/empire/corvette.js")).default,
    ...(await import("./ships/empire/frigate.js")).default,
    ...(await import("./ships/empire/heavyFrigate.js")).default,
    ...(await import("./ships/empire/capital.js")).default,
    ...(await import("./ships/empire/superCapital.js")).default,
    ...(await import("./ships/empire/stations.js")).default
};

export const darkEmpire = {
    ...(await import("./ships/darkEmpire/fighter.js")).default,
    ...(await import("./ships/darkEmpire/corvette.js")).default,
    ...(await import("./ships/darkEmpire/frigate.js")).default,
    ...(await import("./ships/darkEmpire/heavyFrigate.js")).default,
    ...(await import("./ships/darkEmpire/capital.js")).default,
    ...(await import("./ships/darkEmpire/superCapital.js")).default,
    ...(await import("./ships/darkEmpire/stations.js")).default
};

export const rebel = {
    ...(await import("./ships/rebel/fighter.js")).default,
    ...(await import("./ships/rebel/corvette.js")).default,
    ...(await import("./ships/rebel/frigate.js")).default,
    ...(await import("./ships/rebel/heavyFrigate.js")).default,
    ...(await import("./ships/rebel/capital.js")).default,
    ...(await import("./ships/rebel/superCapital.js")).default,
    ...(await import("./ships/rebel/stations.js")).default
};

export const republic = {
    ...(await import("./ships/republic/fighter.js")).default,
    ...(await import("./ships/republic/corvette.js")).default,
    ...(await import("./ships/republic/frigate.js")).default,
    ...(await import("./ships/republic/heavyFrigate.js")).default,
    ...(await import("./ships/republic/capital.js")).default,
    ...(await import("./ships/republic/superCapital.js")).default,
    ...(await import("./ships/republic/stations.js")).default
};

export const cis = {
    ...(await import("./ships/cis/fighter.js")).default,
    ...(await import("./ships/cis/corvette.js")).default,
    ...(await import("./ships/cis/frigate.js")).default,
    ...(await import("./ships/cis/heavyFrigate.js")).default,
    ...(await import("./ships/cis/capital.js")).default,
    ...(await import("./ships/cis/superCapital.js")).default,
    ...(await import("./ships/cis/stations.js")).default
};

export const hutts = {
    ...(await import("./ships/hutts/fighter.js")).default,
    ...(await import("./ships/hutts/corvette.js")).default,
    ...(await import("./ships/hutts/frigate.js")).default,
    ...(await import("./ships/hutts/heavyFrigate.js")).default,
    ...(await import("./ships/hutts/capital.js")).default,
    ...(await import("./ships/hutts/superCapital.js")).default,
    ...(await import("./ships/hutts/stations.js")).default
};

export const zann = {
    ...(await import("./ships/zann/fighter.js")).default,
    ...(await import("./ships/zann/corvette.js")).default,
    ...(await import("./ships/zann/frigate.js")).default,
    ...(await import("./ships/zann/heavyFrigate.js")).default,
    ...(await import("./ships/zann/capital.js")).default,
    ...(await import("./ships/zann/superCapital.js")).default,
    ...(await import("./ships/zann/stations.js")).default
};

export const hapan = {
    ...(await import("./ships/hapesConsortium/fighter.js")).default,
    ...(await import("./ships/hapesConsortium/corvette.js")).default,
    ...(await import("./ships/hapesConsortium/frigate.js")).default,
    ...(await import("./ships/hapesConsortium/heavyFrigate.js")).default,
    ...(await import("./ships/hapesConsortium/capital.js")).default,
    ...(await import("./ships/hapesConsortium/superCapital.js")).default,
    ...(await import("./ships/hapesConsortium/spaceStation.js")).default,
    ...(await import("./ships/hapesConsortium/stations.js")).default
};

export const aurumFoundaries = {
    ...(await import("./ships/aurumFoundaries/fighter.js")).default,
    ...(await import("./ships/aurumFoundaries/corvette.js")).default,
    ...(await import("./ships/aurumFoundaries/frigate.js")).default,
    ...(await import("./ships/aurumFoundaries/heavyFrigate.js")).default,
    ...(await import("./ships/aurumFoundaries/capital.js")).default,
    ...(await import("./ships/aurumFoundaries/superCapital.js")).default,
    ...(await import("./ships/aurumFoundaries/spaceStation.js")).default
};

export const empireOfTheHand = {
    ...(await import("./ships/eoth/fighter.js")).default,
    ...(await import("./ships/eoth/corvette.js")).default,
    ...(await import("./ships/eoth/frigate.js")).default,
    ...(await import("./ships/eoth/heavyFrigate.js")).default,
    ...(await import("./ships/eoth/capital.js")).default,
    ...(await import("./ships/eoth/superCapital.js")).default,
    ...(await import("./ships/eoth/stations.js")).default
};

export const oldRepublic = {
    ...(await import("./ships/oldRepublic/fighter.js")).default,
    ...(await import("./ships/oldRepublic/corvette.js")).default,
    ...(await import("./ships/oldRepublic/frigate.js")).default,
    ...(await import("./ships/oldRepublic/heavyFrigate.js")).default,
    ...(await import("./ships/oldRepublic/capital.js")).default,
    ...(await import("./ships/oldRepublic/superCapital.js")).default,
    ...(await import("./ships/oldRepublic/stations.js")).default
};

export const sithEmpire = {
    ...(await import("./ships/sithEmpire/fighter.js")).default,
    ...(await import("./ships/sithEmpire/corvette.js")).default,
    ...(await import("./ships/sithEmpire/frigate.js")).default,
    ...(await import("./ships/sithEmpire/heavyFrigate.js")).default,
    ...(await import("./ships/sithEmpire/capital.js")).default,
    ...(await import("./ships/sithEmpire/superCapital.js")).default,
    ...(await import("./ships/sithEmpire/stations.js")).default
};

export const mandalorians = {
    ...(await import("./ships/mandalorians/fighter.js")).default,
    ...(await import("./ships/mandalorians/corvette.js")).default,
    ...(await import("./ships/mandalorians/frigate.js")).default,
    ...(await import("./ships/mandalorians/heavyFrigate.js")).default,
    ...(await import("./ships/mandalorians/capital.js")).default,
    ...(await import("./ships/mandalorians/superCapital.js")).default,
    ...(await import("./ships/mandalorians/stations.js")).default
};

export const resistance = {
    ...(await import("./ships/resistance/fighter.js")).default,
    ...(await import("./ships/resistance/corvette.js")).default,
    ...(await import("./ships/resistance/frigate.js")).default,
    ...(await import("./ships/resistance/heavyFrigate.js")).default,
    ...(await import("./ships/resistance/capital.js")).default,
    ...(await import("./ships/resistance/superCapital.js")).default,
    ...(await import("./ships/resistance/stations.js")).default
};

export const firstOrder = {
    ...(await import("./ships/firstOrder/fighter.js")).default,
    ...(await import("./ships/firstOrder/corvette.js")).default,
    ...(await import("./ships/firstOrder/frigate.js")).default,
    ...(await import("./ships/firstOrder/heavyFrigate.js")).default,
    ...(await import("./ships/firstOrder/capital.js")).default,
    ...(await import("./ships/firstOrder/superCapital.js")).default,
    ...(await import("./ships/firstOrder/stations.js")).default
};

export const stations = {
    ...(await import("./ships/stations/shipyards.js")).default
};

const ships = {
    ...empire,
    ...darkEmpire,
    ...rebel,
    ...republic,
    ...cis,
    ...hutts,
    ...zann,
    ...hapan,
    ...aurumFoundaries,
    ...empireOfTheHand,
    ...oldRepublic,
    ...sithEmpire,
    ...mandalorians,
    ...resistance,
    ...firstOrder,
    ...stations
};

// TEST DUMMIES
ships.DUMMY_CARRIER = {
    name: "Dummy Carrier",
    asset: "QUASAR.png",
    classification: shipTypes.Frigate,
    size: 100,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: [{
        x: 0,
        y: 0,
        weapon: DUMMY_BLANK
    }],
    hangars: [{
        x: 0,
        y: 0,
        maxSquadrons: 3,
        squadronSize: 10,
        reserveSize: 9,
        squadronKey: "TIEBOMBER"
    }]
};

ships.DUMMY_TARGET = {
    name: "Dummy Target",
    asset: "MC80LIBERTY.png",
    classification: shipTypes.Capital,
    size: 300,
    cost: 1,
    speed: .01,
    turnSpeed: .025,
    shield: 1000,
    shieldRegen: 10,
    hardpoints: (function() {
        const weapon = DUMMY_BLANK; // Dummy weapon

        const output = [{
            x: -.2,
            y: -.4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.3,
            y: -.2,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.2,
            y: .05,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.075,
            y: .1,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.05,
            y: .4,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }, {
            x: -.025,
            y: .7,
            weapon: weapon,
            shotsAtOnce: 10,
            shotDelay: 40
        }];

        for (let i = 0, j = output.length; i < j; i ++) {
            output.push({
                x: -output[i].x,
                y: output[i].y,
                weapon: output[i].weapon,
                shotsAtOnce: 10,
                shotDelay: 40
            })
        }

        return output;
    })()
};

const rangeScales = {
    [shipTypes.Fighter]: .85,
    [shipTypes.Corvette]: .725,
    [shipTypes.Frigate]: .85,
    [shipTypes.HeavyFrigate]: .9,
    [shipTypes.Capital]: 1,
    [shipTypes.SuperCapital]: 1.25
};

for (const ship in ships) {
    ships[ship].hardpoints.forEach(hardpoint => {
        const vector = new Vector(hardpoint.y, hardpoint.x);

        hardpoint.offset = vector.length;
        hardpoint.direction = vector.angle;

        hardpoint.weapon.range *= rangeScales[ships[ship].classification] || 1;
    });

    if (ships[ship].hangars instanceof Array) {
        ships[ship].hangars.forEach(hangar => {
            const vector = new Vector(hangar.y, hangar.x);

            hangar.offset = vector.length;
            hangar.direction = vector.angle;
        });
    }

    if (ships[ship].production instanceof Array) {
        ships[ship].production.forEach(production => {
            const vector = new Vector(production.y, production.x);

            production.offset = vector.length;
            production.direction = vector.angle;
        });
    }

    ships[ship]._key = ship;
}

export default ships;