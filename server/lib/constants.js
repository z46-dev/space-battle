export const weaponTypes = {
    // RED WEAPONS (Rebels, Separatists)
    "RedLaserCannon": 0,
    "RedDoubleLaserCannon": 1,
    "RedTripleLaserCannon": 2,
    "RedQuadLaserCannon": 3,
    "RedOctupleLaserCannon": 4,
    "RedTurbolaser": 5,
    "RedDoubleTurbolaser": 6,
    "RedTripleTurbolaser": 7,
    "RedQuadTurbolaser": 8,
    "RedOctupleTurbolaser": 9,

    // GREEN WEAPONS (Empire)
    "GreenLaserCannon": 10,
    "GreenDoubleLaserCannon": 11,
    "GreenTripleLaserCannon": 12,
    "GreenQuadLaserCannon": 13,
    "GreenOctupleLaserCannon": 14,
    "GreenTurbolaser": 15,
    "GreenDoubleTurbolaser": 16,
    "GreenTripleTurbolaser": 17,
    "GreenQuadTurbolaser": 18,
    "GreenOctupleTurbolaser": 19,

    // BLUE WEAPONS (Republic)
    "BlueLaserCannon": 20,
    "BlueDoubleLaserCannon": 21,
    "BlueTripleLaserCannon": 22,
    "BlueQuadLaserCannon": 23,
    "BlueOctupleLaserCannon": 24,
    "BlueTurbolaser": 25,
    "BlueDoubleTurbolaser": 26,
    "BlueTripleTurbolaser": 27,
    "BlueQuadTurbolaser": 28,
    "BlueOctupleTurbolaser": 29,

    // PURPLE (Chiss, Empire of the Hand)
    "PurpleLaserCannon": 30,
    "PurpleDoubleLaserCannon": 31,
    "PurpleTripleLaserCannon": 32,
    "PurpleQuadLaserCannon": 33,
    "PurpleOctupleLaserCannon": 34,
    "PurpleTurbolaser": 35,
    "PurpleDoubleTurbolaser": 36,
    "PurpleTripleTurbolaser": 37,
    "PurpleQuadTurbolaser": 38,
    "PurpleOctupleTurbolaser": 39,

    // ION WEAPONS (All factions)
    "IonCannon": 40,
    "DoubleIonCannon": 41,
    "TripleIonCannon": 42,
    "QuadIonCannon": 43,
    "OctupleIonCannon": 44,
    "IonTurbolaser": 45,
    "DoubleIonTurbolaser": 46,
    "TripleIonTurbolaser": 47,
    "QuadIonTurbolaser": 48,
    "OctupleIonTurbolaser": 49,

    // PROJECTILE WEAPONS (All factions)
    "ProtonBomb": 50,
    "ProtonTorpedo": 51,
    "ConcussionMissile": 52,
    "ProtonRocket": 53,
    "AssaultProtonRocket": 54,
    "ProtonRocketAOE": 55
};

export const colors = {
    "Green": "#00FF00",
    "Red": "#FF0000",
    "Blue": "#0000FF",
    "Purple": "#C800FF",
    "Ion": "#EEEEFF",
    "Bomb": "#FFFFFF",
    "Torpedo": "#FF1F53",
    "Missile": "#CFC64C",
    "Rocket": "#7FCAD4"
};

export const weaponDrawProperties = (function() {
    const output = [];

    for (const key in weaponTypes) {
        if (["Bomb", "Torpedo", "Missile", "Proton"].some(x => key.includes(x))) {
            continue;
        }

        const color = key.match(/Red|Green|Blue|Purple|Ion/)[0];
        const type = weaponTypes[key];
        const shots = key.match(/Double|Triple|Quad|Octuple/) ? key.match(/Double|Triple|Quad|Octuple/)[0] : "Single";
        const strength = key.match(/Cannon|Turbolaser/) ? key.match(/Cannon|Turbolaser/)[0] : "Cannon";

        output[type] = {
            color: colors[color],
            shots: shots,
            count: [1, 2, 3, 4, 8][["Single", "Double", "Triple", "Quad", "Octuple"].indexOf(shots)],
            strength: 1 + ["Cannon", "Turbolaser"].indexOf(strength) * .5,
            key: key,
            isCircle: false,
            shadows: false
        };
    }

    output[weaponTypes.ProtonBomb] = {
        color: colors.Bomb,
        shots: "Single",
        count: 1,
        strength: 1.5,
        key: "ProtonBomb",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.ProtonTorpedo] = {
        color: colors.Torpedo,
        shots: "Single",
        count: 1,
        strength: 1.2,
        key: "ProtonTorpedo",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.ConcussionMissile] = {
        color: colors.Missile,
        shots: "Single",
        count: 1,
        strength: 2,
        key: "ConcussionMissile",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.ProtonRocket] = {
        color: colors.Rocket,
        shots: "Single",
        count: 1,
        strength: 1,
        key: "ProtonRocket",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.AssaultProtonRocket] = {
        color: colors.Rocket,
        shots: "Single",
        count: 1,
        strength: 2,
        key: "ProtonRocket",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.ProtonRocketAOE] = {
        color: colors.Rocket,
        shots: "Single",
        count: 1,
        strength: 1.5,
        key: "ProtonRocketAOE",
        isCircle: true,
        shadows: true
    };

    return output;
})();

export const weaponClassifications = {
    "LaserCannon": 0,
    "IonCannon": 1,
    "Turbolaser": 2,
    "Guided": 3,
    "AreaOfEffect": 4,
    "GuidedAOE": 5
};

export const weaponProperties = (function() {
    const output = [];

    for (const key in weaponTypes) {
        const classification = key.match(/Laser|Ion|Turbolaser|Bomb|RocketAOE|Rocket|Missile|Torpedo/)[0];

        const map = {
            "Laser": "LaserCannon",
            "Ion": "IonCannon",
            "Turbolaser": "Turbolaser",
            "Bomb": "AreaOfEffect",
            "RocketAOE": "GuidedAOE",
            "Rocket": "Guided",
            "Missile": "AreaOfEffect",
            "Torpedo": "Guided"
        };

        output[weaponTypes[key]] = {
            classification: weaponClassifications[map[classification]],
            key: key
        };
    }

    return output;
})();

export const shipTypes = {
    "Fighter": 0,
    "Bomber": 1,
    "Corvette": 2,
    "Frigate": 3,
    "HeavyFrigate": 4,
    "Capital": 5,
    "SuperCapital": 6
};