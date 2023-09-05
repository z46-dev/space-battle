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

const hardpointTypes = {
    "LaserCannon": 0,
    "IonCannon": 1,
    "Turbolaser": 2,
    "ProtonTorpedo": 3,
    "ConcussionMissile": 4
};

const ships = {};

const ISD_Turbo = {
    reload: 50,
    damage: 60,
    speed: 25,
    range: 4000,
    type: hardpointTypes.Turbolaser,
    health: 100
};

const ISD_Ion = {
    reload: 30,
    damage: 55,
    speed: 35,
    range: 4000,
    type: hardpointTypes.IonCannon,
    health: 100
};

const ISD_Laser = {
    reload: 15,
    damage: 7,
    speed: 45,
    range: 3000,
    type: hardpointTypes.LaserCannon,
    health: 100
};

ships.ISD = {
    name: "Imperial Star Destroyer",
    asset: "ISD.png",
    size: 400,
    cost: 3200,
    speed: 1,
    shield: 5500,
    shieldRegen: 2,
    hardpoints: (function() {
        const output = [];

        for (let i = 0; i < 4; i ++) {
            output.push({
                x: -.3,
                y: -.4 - .075 * i,
                weapon: ISD_Turbo
            }, {
                x: .3,
                y: -.4 - .075 * i,
                weapon: ISD_Turbo
            }, {
                x: -.125 - .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? ISD_Ion : ISD_Laser
            }, {
                x: .125 + .15 * i,
                y: .6 - .4 * i,
                weapon: i % 2 ? ISD_Ion : ISD_Laser
            });
        }

        return output;
    })()
};

for (const ship in ships) {
    ships[ship].hardpoints.forEach(hardpoint => {
        const vector = new Vector(hardpoint.y, hardpoint.x);

        hardpoint.offset = vector.length;
        hardpoint.direction = vector.angle;
    });
}

export default ships;

/*
 * TODO:
 * Add MC80
 * Make Ion Cannons work
 * Work on the client rendering of ammo (color, dual, triple, etc.)
 */