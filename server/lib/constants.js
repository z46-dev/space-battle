const iota = (() => {
    let i = 0;
    return () => i++;
})();

export const weaponTypes = {
    // RED WEAPONS (Rebels, Separatists)
    "RedLaserCannon": iota(),
    "RedDoubleLaserCannon": iota(),
    "RedTripleLaserCannon": iota(),
    "RedQuadLaserCannon": iota(),
    "RedOctupleLaserCannon": iota(),
    "RedTurbolaser": iota(),
    "RedDoubleTurbolaser": iota(),
    "RedTripleTurbolaser": iota(),
    "RedQuadTurbolaser": iota(),
    "RedOctupleTurbolaser": iota(),
    "RedUltraTurbolaser": iota(),
    "RedSuperlaser": iota(),
    "RedWeakSuperlaser": iota(),
    "RedLightSuperlaser": iota(),
    "RedLightSuperlaser2": iota(),
    "RedUltraTurbolaserBypassShield": iota(),

    // GREEN WEAPONS (Empire)
    "GreenLaserCannon": iota(),
    "GreenDoubleLaserCannon": iota(),
    "GreenTripleLaserCannon": iota(),
    "GreenQuadLaserCannon": iota(),
    "GreenOctupleLaserCannon": iota(),
    "GreenTurbolaser": iota(),
    "GreenDoubleTurbolaser": iota(),
    "GreenTripleTurbolaser": iota(),
    "GreenQuadTurbolaser": iota(),
    "GreenOctupleTurbolaser": iota(),
    "GreenUltraTurbolaser": iota(),
    "GreenSuperlaser": iota(),
    "GreenWeakSuperlaser": iota(),
    "GreenUltraTurbolaserBypassShield": iota(),

    // BLUE WEAPONS (Republic)
    "BlueLaserCannon": iota(),
    "BlueDoubleLaserCannon": iota(),
    "BlueTripleLaserCannon": iota(),
    "BlueQuadLaserCannon": iota(),
    "BlueOctupleLaserCannon": iota(),
    "BlueTurbolaser": iota(),
    "BlueDoubleTurbolaser": iota(),
    "BlueTripleTurbolaser": iota(),
    "BlueQuadTurbolaser": iota(),
    "BlueOctupleTurbolaser": iota(),
    "BlueUltraTurbolaser": iota(),
    "BlueSuperlaser": iota(),
    "BlueWeakSuperlaser": iota(),
    "BlueUltraTurbolaserBypassShield": iota(),

    // PURPLE (Hutts)
    "PurpleLaserCannon": iota(),
    "PurpleDoubleLaserCannon": iota(),
    "PurpleTripleLaserCannon": iota(),
    "PurpleQuadLaserCannon": iota(),
    "PurpleOctupleLaserCannon": iota(),
    "PurpleTurbolaser": iota(),
    "PurpleDoubleTurbolaser": iota(),
    "PurpleTripleTurbolaser": iota(),
    "PurpleQuadTurbolaser": iota(),
    "PurpleOctupleTurbolaser": iota(),
    "PurpleUltraTurbolaser": iota(),
    "PurpleSuperlaser": iota(),
    "PurpleWeakSuperlaser": iota(),
    "PurpleUltraTurbolaserBypassShield": iota(),

    // YELLOW (Zann Consortium)
    "YellowLaserCannon": iota(),
    "YellowDoubleLaserCannon": iota(),
    "YellowTripleLaserCannon": iota(),
    "YellowQuadLaserCannon": iota(),
    "YellowOctupleLaserCannon": iota(),
    "YellowTurbolaser": iota(),
    "YellowDoubleTurbolaser": iota(),
    "YellowTripleTurbolaser": iota(),
    "YellowQuadTurbolaser": iota(),
    "YellowOctupleTurbolaser": iota(),
    "YellowUltraTurbolaser": iota(),
    "YellowSuperlaser": iota(),
    "YellowWeakSuperlaser": iota(),
    "YellowUltraTurbolaserBypassShield": iota(),

    // BLACK (Aurum Foundaries)
    "BlackLaserCannon": iota(),
    "BlackDoubleLaserCannon": iota(),
    "BlackTripleLaserCannon": iota(),
    "BlackQuadLaserCannon": iota(),
    "BlackOctupleLaserCannon": iota(),
    "BlackTurbolaser": iota(),
    "BlackDoubleTurbolaser": iota(),
    "BlackTripleTurbolaser": iota(),
    "BlackQuadTurbolaser": iota(),
    "BlackOctupleTurbolaser": iota(),
    "BlackUltraTurbolaser": iota(),
    "BlackSuperlaser": iota(),
    "BlackWeakSuperlaser": iota(),
    "BlackUltraTurbolaserBypassShield": iota(),

    // ION WEAPONS (All factions)
    "IonCannon": iota(),
    "DoubleIonCannon": iota(),
    "TripleIonCannon": iota(),
    "QuadIonCannon": iota(),
    "OctupleIonCannon": iota(),
    "IonTurbolaser": iota(),
    "DoubleIonTurbolaser": iota(),
    "TripleIonTurbolaser": iota(),
    "QuadIonTurbolaser": iota(),
    "OctupleIonTurbolaser": iota(),
    "IonUltra": iota(),

    // PROJECTILE WEAPONS (All factions)
    "ProtonBomb": iota(),
    "ProtonTorpedo": iota(),
    "AssaultProtonTorpedo": iota(),
    "ConcussionMissile": iota(),
    "ProtonRocket": iota(),
    "AssaultProtonRocket": iota(),
    "ProtonRocketAOE": iota(),

    // SPECIAL WEAPONS (All factions)
    "SubjugatorIonBlast": iota()
};

export const colors = {
    "Green": "#00FF00",
    "Red": "#FF0000",
    "Blue": "#3535FF",
    "Purple": "#C800FF",
    "Yellow": "#C8C800",
    "Black": "#EEFFAA", // Changed cuz looked wonky
    "Ion": "#EEEEFF",
    "Bomb": "#FFFFFF",
    "Torpedo": "#FF1F53",
    "Missile": "#CFC64C",
    "Rocket": "#7FCAD4"
};

export const weaponDrawProperties = (function() {
    const output = [];

    for (const key in weaponTypes) {
        if (["Bomb", "Torpedo", "Missile", "Proton", "Bypass", "SubjugatorIonBlast"].some(x => key.includes(x))) {
            continue;
        }

        const color = key.match(/Red|Green|Blue|Purple|Yellow|Black|Ion/)[0];
        const type = weaponTypes[key];
        const shots = key.match(/Double|Triple|Quad|Octuple/) ? key.match(/Double|Triple|Quad|Octuple/)[0] : "Single";
        const strength = key.match(/Cannon|Ultra|Turbolaser|LightSuperlaser2|LightSuperlaser|WeakSuperlaser|Superlaser/) ? key.match(/Cannon|Ultra|Turbolaser|LightSuperlaser2|LightSuperlaser|WeakSuperlaser|Superlaser/)[0] : "Cannon";

        output[type] = {
            color: colors[color],
            shots: shots,
            count: [1, 2, 3, 4, 8][["Single", "Double", "Triple", "Quad", "Octuple"].indexOf(shots)],
            strength: 1 + ["Cannon", "Turbolaser", "LightSuperlaser2", "placeholder", "placeholder", "Ultra", "placeholder", "LightSuperlaser", "placeholder", "WeakSuperlaser", ...(new Array(3).fill("placeholder")), "Superlaser"].indexOf(strength) * .5,
            key: key,
            isCircle: false,
            shadows: true
        };
    }

    for (const color of ["Red", "Green", "Blue", "Purple", "Yellow", "Black"]) {
        output[weaponTypes[color + "UltraTurbolaserBypassShield"]] = {
            color: colors[color],
            shots: "Single",
            count: 1,
            strength: 4,
            key: color + "UltraTurbolaserBypassShield",
            shadows: true,
            isCircle: false
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
        strength: 1.5,
        key: "ProtonTorpedo",
        isCircle: true,
        shadows: true
    };

    output[weaponTypes.AssaultProtonTorpedo] = {
        color: colors.Torpedo,
        shots: "Single",
        count: 1,
        strength: 2,
        key: "AssaultProtonTorpedo",
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

    output[weaponTypes.SubjugatorIonBlast] = {
        color: colors.Ion,
        shots: "Single",
        count: 1,
        strength: 10,
        key: "SubjugatorIonBlast",
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
        const classification = key.match(/TurbolaserBypassShield|Laser|Ion|Turbolaser|WeakSuperlaser|Superlaser|Bomb|RocketAOE|Rocket|Missile|Torpedo/)[0];

        const map = {
            "Laser": "LaserCannon",
            "Ion": "IonCannon",
            "Turbolaser": "Turbolaser",
            "Bomb": "AreaOfEffect",
            "RocketAOE": "GuidedAOE",
            "Rocket": "Guided",
            "Missile": "AreaOfEffect",
            "Torpedo": "Guided",
            "Superlaser": "GuidedAOE",
            "WeakSuperlaser": "GuidedAOE",
            "TurbolaserBypassShield": "GuidedAOE"
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
    "FighterBomber": 2,
    "Corvette": 3,
    "Frigate": 4,
    "HeavyFrigate": 5,
    "Capital": 6,
    "SuperCapital": 7,
    "SpaceStation": 8
};

export const shipTypeNames = {
    [shipTypes.Fighter]: "Fighter",
    [shipTypes.Bomber]: "Bomber",
    [shipTypes.FighterBomber]: "Fighter/Bomber",
    [shipTypes.Corvette]: "Corvette",
    [shipTypes.Frigate]: "Frigate",
    [shipTypes.HeavyFrigate]: "Heavy Frigate",
    [shipTypes.Capital]: "Capital",
    [shipTypes.SuperCapital]: "Super Capital",
    [shipTypes.SpaceStation]: "Space Station"
};