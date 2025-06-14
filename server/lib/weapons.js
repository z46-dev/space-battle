import { shipTypes, weaponTypes } from "./constants.js";

// ION WEAPON DEFS

export const ION_CANNON = {
    reload: 40,
    damage: 15,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100,
    name: "Ion Cannon"
};

export const FIGHTER_ION_CANNON = {
    reload: 120,
    damage: 8,
    speed: 45,
    range: 600,
    type: weaponTypes.IonCannon,
    health: 50,
    name: "Light Ion Cannon",
    collisionRange: 20
};

export const TIE_DEFENDER_ION_CANNON = {
    reload: 20,
    damage: 12,
    speed: 45,
    range: 3000,
    type: weaponTypes.IonCannon,
    health: 20,
    name: "Ion Cannon",
    collisionRange: 20
};

export const DOUBLE_ION_CANNON = {
    reload: 40,
    damage: 30,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100,
    name: "Double Ion Cannon"
};

export const TRIPLE_ION_CANNON = {
    reload: 40,
    damage: 45,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100,
    name: "Triple Ion Cannon"
};

export const QUAD_ION_CANNON = {
    reload: 40,
    damage: 60,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100,
    name: "Quad Ion Cannon"
};

export const OCTUPLE_ION_CANNON = {
    reload: 40,
    damage: 75,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100,
    name: "Octuple Ion Cannon"
};

export const ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 25,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Medium Ion Cannon"
};

export const DOUBLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 50,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Double Medium Ion Cannon"
};

export const TRIPLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 100,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Triple Medium Ion Cannon"
};

export const QUAD_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 150,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Quad Medium Ion Cannon"
};

export const OCTUPLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 200,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Octuple Medium Ion Cannon"
};

export const ION_CANNON_HEAVY = {
    reload: 80,
    damage: 40,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Heavy Ion Cannon"
};

export const DOUBLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 80,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Double Heavy Ion Cannon"
};

export const TRIPLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 120,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Triple Heavy Ion Cannon"
};

export const QUAD_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 160,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Quad Heavy Ion Cannon"
};

export const OCTUPLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 200,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Octuple Heavy Ion Cannon"
};

export const ION_CANNON_ULTRA = {
    reload: 300,
    damage: 400,
    speed: 50,
    range: 7500,
    type: weaponTypes.IonUltra,
    health: 100,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Ultraheavy Ion Cannon"
};

export const SUBJUGATOR_ION_BLAST = {
    reload: 1000,
    damage: 25000,
    speed: 35,
    range: 15000,
    type: weaponTypes.SubjugatorIonBlast,
    health: 1000,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e10,
    name: "Ion Pulse Generator",
    maneuverability: .15,
    seeks: true
};

// GREEN WEAPON DEFS

export const GREEN_FIGHTER_LASER_CANNON = {
    reload: 10,
    damage: 2,
    speed: 75,
    range: 1200,
    type: weaponTypes.GreenLaserCannon,
    health: 75,
    name: "Light Laser Cannon",
    collisionRange: 40
};

export const GREEN_RAPID_FIGHTER_LASER_CANNON = {
    reload: 5,
    damage: 1,
    speed: 75,
    range: 700,
    type: weaponTypes.GreenLaserCannon,
    health: 60,
    name: "Rapid Light Laser Cannon",
    collisionRange: 30
};

export const GREEN_RAPID_LASER_CANNON = {
    reload: 9,
    damage: 3,
    speed: 75,
    range: 3000,
    type: weaponTypes.GreenLaserCannon,
    health: 100,
    name: "Rapid Laser Cannon"
};

export const GREEN_ANTI_FIGHTER_LASER_CANNON = {
    reload: 5,
    damage: 20,
    speed: 80,
    range: 1500,
    type: weaponTypes.GreenLaserCannon,
    health: 100,
    targetOverride: [shipTypes.Fighter, shipTypes.Bomber, shipTypes.FighterBomber],
    name: "Anti-Fighter Laser Cannon"
};

export const GREEN_LASER_CANNON = {
    reload: 15,
    damage: 4,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenLaserCannon,
    health: 100,
    name: "Laser Cannon"
};

export const GREEN_DOUBLE_LASER_CANNON = {
    reload: 22.5,
    damage: 8,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenDoubleLaserCannon,
    health: 100,
    name: "Double Laser Cannon"
};

export const GREEN_TRIPLE_LASER_CANNON = {
    reload: 30,
    damage: 12,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenTripleLaserCannon,
    health: 100,
    name: "Triple Laser Cannon"
};

export const GREEN_QUAD_LASER_CANNON = {
    reload: 37.5,
    damage: 16,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenQuadLaserCannon,
    health: 100,
    name: "Quad Laser Cannon"
};

export const GREEN_LASER_CANNON_HEAVY = {
    reload: 20,
    damage: 12,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenLaserCannon,
    health: 100,
    name: "Heavy Laser Cannon"
};

export const GREEN_DOUBLE_LASER_CANNON_HEAVY = {
    reload: 30,
    damage: 24,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenDoubleLaserCannon,
    health: 100,
    name: "Double Heavy Laser Cannon"
};

export const GREEN_TRIPLE_LASER_CANNON_HEAVY = {
    reload: 40,
    damage: 36,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenTripleLaserCannon,
    health: 100,
    name: "Triple Heavy Laser Cannon"
};

export const GREEN_QUAD_LASER_CANNON_HEAVY = {
    reload: 50,
    damage: 48,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenQuadLaserCannon,
    health: 100,
    name: "Quad Heavy Laser Cannon"
};

export const GREEN_TURBOLASER_CANNON = {
    reload: 60,
    damage: 30,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Turbolaser Cannon"
};

export const GREEN_DOUBLE_TURBOLASER_CANNON = {
    reload: 90,
    damage: 60,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenDoubleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Double Turbolaser Cannon"
};

export const GREEN_TRIPLE_TURBOLASER_CANNON = {
    reload: 120,
    damage: 90,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTripleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Triple Turbolaser Cannon"
};

export const GREEN_QUAD_TURBOLASER_CANNON = {
    reload: 150,
    damage: 120,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenQuadTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Quad Turbolaser Cannon"
};

export const GREEN_OCTUPLE_TURBOLASER_CANNON = {
    reload: 240,
    damage: 150,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenOctupleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Octuple Turbolaser Cannon"
};

export const GREEN_TURBOLASER_CANNON_HEAVY = {
    reload: 75,
    damage: 60,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Heavy Turbolaser Cannon"
};

export const GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    reload: 112.5,
    damage: 120,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenDoubleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Double Heavy Turbolaser Cannon"
};

export const GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    reload: 150,
    damage: 180,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTripleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Triple Heavy Turbolaser Cannon"
};

export const GREEN_QUAD_TURBOLASER_CANNON_HEAVY = {
    reload: 187.5,
    damage: 240,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenQuadTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Quad Heavy Turbolaser Cannon"
};

export const GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    reload: 300,
    damage: 300,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenOctupleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Octuple Heavy Turbolaser Cannon"
};

export const GREEN_TURBOLASER_CANNON_ULTRAHEAVY = {
    reload: 200,
    damage: 260,
    speed: 52.5,
    range: 7500,
    type: weaponTypes.GreenUltraTurbolaser,
    health: 150,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Ultraheavy Turbolaser Cannon"
};

export const GREEN_SUPERLASER = {
    reload: 1000,
    damage: 150,
    type: weaponTypes.GreenSuperlaser,
    health: 2500,
    speed: 200,
    range: 10000,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e10,
    bypassShield: false,
    name: "Superlaser"
};

export const GREEN_WEAK_SUPERLASER = {
    reload: 180,
    damage: 100,
    type: weaponTypes.GreenWeakSuperlaser,
    health: 500,
    speed: 150,
    range: 9000,
    explosionRange: 1e10,
    explosionDamage: 250,
    bypassShield: true,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    name: "Light Superlaser"
};

export const GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    reload: 200,
    damage: 400,
    type: weaponTypes.GreenUltraTurbolaserBypassShield,
    health: 1500,
    speed: 80,
    range: 7500,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e10,
    bypassShield: true,
    name: "Ultraheavy Turbolaser Cannon"
};


export const GREEN_AXIAL_SUPERLASER = {
    reload: 750,
    damage: 300,
    type: weaponTypes.GreenAxialSuperlaser,
    health: 2500,
    speed: 100,
    range: 12500,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 2500,
    explosionDamage: 35,
    name: "Axial Superlaser"
};

// RED WEAPON DEFS

export const RED_FIGHTER_LASER_CANNON = {
    ...GREEN_FIGHTER_LASER_CANNON,
    type: weaponTypes.RedLaserCannon
};

export const RED_RAPID_FIGHTER_LASER_CANNON = {
    ...GREEN_RAPID_FIGHTER_LASER_CANNON,
    type: weaponTypes.RedLaserCannon
};

export const RED_RAPID_LASER_CANNON = {
    ...GREEN_RAPID_LASER_CANNON,
    type: weaponTypes.RedLaserCannon,
    collisionRange: 20
};

export const RED_ANTI_FIGHTER_LASER_CANNON = {
    ...GREEN_ANTI_FIGHTER_LASER_CANNON,
    type: weaponTypes.RedLaserCannon
};

export const RED_LASER_CANNON = {
    ...GREEN_LASER_CANNON,
    type: weaponTypes.RedLaserCannon
};

export const RED_DOUBLE_LASER_CANNON = {
    ...GREEN_DOUBLE_LASER_CANNON,
    type: weaponTypes.RedDoubleLaserCannon
};

export const RED_TRIPLE_LASER_CANNON = {
    ...GREEN_TRIPLE_LASER_CANNON,
    type: weaponTypes.RedTripleLaserCannon
};

export const RED_QUAD_LASER_CANNON = {
    ...GREEN_QUAD_LASER_CANNON,
    type: weaponTypes.RedQuadLaserCannon
};

export const RED_LASER_CANNON_HEAVY = {
    ...GREEN_LASER_CANNON_HEAVY,
    type: weaponTypes.RedLaserCannon
};

export const RED_DOUBLE_LASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_LASER_CANNON_HEAVY,
    type: weaponTypes.RedDoubleLaserCannon
};

export const RED_TRIPLE_LASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_LASER_CANNON_HEAVY,
    type: weaponTypes.RedTripleLaserCannon
};

export const RED_QUAD_LASER_CANNON_HEAVY = {
    ...GREEN_QUAD_LASER_CANNON_HEAVY,
    type: weaponTypes.RedQuadLaserCannon
};

export const RED_TURBOLASER_CANNON = {
    ...GREEN_TURBOLASER_CANNON,
    type: weaponTypes.RedTurbolaser
};

export const RED_DOUBLE_TURBOLASER_CANNON = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON,
    type: weaponTypes.RedDoubleTurbolaser
};

export const RED_TRIPLE_TURBOLASER_CANNON = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON,
    type: weaponTypes.RedTripleTurbolaser
};

export const RED_QUAD_TURBOLASER_CANNON = {
    ...GREEN_QUAD_TURBOLASER_CANNON,
    type: weaponTypes.RedQuadTurbolaser
};

export const RED_OCTUPLE_TURBOLASER_CANNON = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON,
    type: weaponTypes.RedOctupleTurbolaser
};

export const RED_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.RedTurbolaser
};

export const RED_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.RedDoubleTurbolaser
};

export const RED_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.RedTripleTurbolaser
};

export const RED_QUAD_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.RedQuadTurbolaser
};

export const RED_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.RedOctupleTurbolaser
};

export const RED_TURBOLASER_CANNON_ULTRAHEAVY = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
    type: weaponTypes.RedUltraTurbolaser
};

export const RED_SUPERLASER = {
    ...GREEN_SUPERLASER,
    type: weaponTypes.RedSuperlaser
};

export const RED_WEAK_SUPERLASER = {
    ...GREEN_WEAK_SUPERLASER,
    type: weaponTypes.RedWeakSuperlaser
};

export const RED_LIGHT_SUPERLASER = {
    reload: 400,
    damage: 100,
    type: weaponTypes.RedLightSuperlaser,
    health: 800,
    speed: 80,
    range: 7500,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e10,
    bypassShield: true,
    name: "Light Superlaser"
};

export const RED_LIGHT_SUPERLASER2 = {
    reload: 500,
    damage: 45,
    type: weaponTypes.RedLightSuperlaser2,
    health: 3000,
    speed: 90,
    range: 10000,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e4,
    bypassShield: false,
    name: "Light Superlaser",
    maneuverability: 1
};

export const DEVASTATION_SUPERLASER = {
    reload: 300,
    damage: 20,
    type: weaponTypes.RedLightSuperlaser2,
    health: 1000,
    speed: 75,
    range: 9000,
    targetOverride: [shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation],
    explosionRange: 1e10,
    name: "Axial Superlaser",
    maneuverability: 1
};

export const RED_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
    type: weaponTypes.RedUltraTurbolaserBypassShield
};

// BLUE WEAPON DEFS

export const BLUE_FIGHTER_LASER_CANNON = {
    ...GREEN_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_RAPID_FIGHTER_LASER_CANNON = {
    ...GREEN_RAPID_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_RAPID_LASER_CANNON = {
    ...GREEN_RAPID_LASER_CANNON,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_ANTI_FIGHTER_LASER_CANNON = {
    ...GREEN_ANTI_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_LASER_CANNON = {
    ...GREEN_LASER_CANNON,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_DOUBLE_LASER_CANNON = {
    ...GREEN_DOUBLE_LASER_CANNON,
    type: weaponTypes.BlueDoubleLaserCannon
};

export const BLUE_TRIPLE_LASER_CANNON = {
    ...GREEN_TRIPLE_LASER_CANNON,
    type: weaponTypes.BlueTripleLaserCannon
};

export const BLUE_QUAD_LASER_CANNON = {
    ...GREEN_QUAD_LASER_CANNON,
    type: weaponTypes.BlueQuadLaserCannon
};

export const BLUE_LASER_CANNON_HEAVY = {
    ...GREEN_LASER_CANNON_HEAVY,
    type: weaponTypes.BlueLaserCannon
};

export const BLUE_DOUBLE_LASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_LASER_CANNON_HEAVY,
    type: weaponTypes.BlueDoubleLaserCannon
};

export const BLUE_TRIPLE_LASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_LASER_CANNON_HEAVY,
    type: weaponTypes.BlueTripleLaserCannon
};

export const BLUE_QUAD_LASER_CANNON_HEAVY = {
    ...GREEN_QUAD_LASER_CANNON_HEAVY,
    type: weaponTypes.BlueQuadLaserCannon
};

export const BLUE_TURBOLASER_CANNON = {
    ...GREEN_TURBOLASER_CANNON,
    type: weaponTypes.BlueTurbolaser
};

export const BLUE_DOUBLE_TURBOLASER_CANNON = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON,
    type: weaponTypes.BlueDoubleTurbolaser
};

export const BLUE_TRIPLE_TURBOLASER_CANNON = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON,
    type: weaponTypes.BlueTripleTurbolaser
};

export const BLUE_QUAD_TURBOLASER_CANNON = {
    ...GREEN_QUAD_TURBOLASER_CANNON,
    type: weaponTypes.BlueQuadTurbolaser
};

export const BLUE_OCTUPLE_TURBOLASER_CANNON = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON,
    type: weaponTypes.BlueOctupleTurbolaser
};

export const BLUE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlueTurbolaser
};

export const BLUE_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlueDoubleTurbolaser
};

export const BLUE_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlueTripleTurbolaser
};

export const BLUE_QUAD_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlueQuadTurbolaser
};

export const BLUE_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlueOctupleTurbolaser
};

export const BLUE_TURBOLASER_CANNON_ULTRAHEAVY = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
    type: weaponTypes.BlueUltraTurbolaser
};

export const BLUE_SUPERLASER = {
    ...GREEN_SUPERLASER,
    type: weaponTypes.BlueSuperlaser
};

export const BLUE_WEAK_SUPERLASER = {
    ...GREEN_WEAK_SUPERLASER,
    type: weaponTypes.BlueWeakSuperlaser
};

export const BLUE_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
    type: weaponTypes.BlueUltraTurbolaserBypassShield
};

// PURPLE WEAPON DEFS

export const PURPLE_FIGHTER_LASER_CANNON = {
    ...GREEN_FIGHTER_LASER_CANNON,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_RAPID_FIGHTER_LASER_CANNON = {
    ...GREEN_RAPID_FIGHTER_LASER_CANNON,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_RAPID_LASER_CANNON = {
    ...GREEN_RAPID_LASER_CANNON,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_ANTI_FIGHTER_LASER_CANNON = {
    ...GREEN_ANTI_FIGHTER_LASER_CANNON,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_LASER_CANNON = {
    ...GREEN_LASER_CANNON,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_DOUBLE_LASER_CANNON = {
    ...GREEN_DOUBLE_LASER_CANNON,
    type: weaponTypes.PurpleDoubleLaserCannon
};

export const PURPLE_TRIPLE_LASER_CANNON = {
    ...GREEN_TRIPLE_LASER_CANNON,
    type: weaponTypes.PurpleTripleLaserCannon
};

export const PURPLE_QUAD_LASER_CANNON = {
    ...GREEN_QUAD_LASER_CANNON,
    type: weaponTypes.PurpleQuadLaserCannon
};

export const PURPLE_LASER_CANNON_HEAVY = {
    ...GREEN_LASER_CANNON_HEAVY,
    type: weaponTypes.PurpleLaserCannon
};

export const PURPLE_DOUBLE_LASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_LASER_CANNON_HEAVY,
    type: weaponTypes.PurpleDoubleLaserCannon
};

export const PURPLE_TRIPLE_LASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_LASER_CANNON_HEAVY,
    type: weaponTypes.PurpleTripleLaserCannon
};

export const PURPLE_QUAD_LASER_CANNON_HEAVY = {
    ...GREEN_QUAD_LASER_CANNON_HEAVY,
    type: weaponTypes.PurpleQuadLaserCannon
};

export const PURPLE_TURBOLASER_CANNON = {
    ...GREEN_TURBOLASER_CANNON,
    type: weaponTypes.PurpleTurbolaser
};

export const PURPLE_DOUBLE_TURBOLASER_CANNON = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON,
    type: weaponTypes.PurpleDoubleTurbolaser
};

export const PURPLE_TRIPLE_TURBOLASER_CANNON = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON,
    type: weaponTypes.PurpleTripleTurbolaser
};

export const PURPLE_QUAD_TURBOLASER_CANNON = {
    ...GREEN_QUAD_TURBOLASER_CANNON,
    type: weaponTypes.PurpleQuadTurbolaser
};

export const PURPLE_OCTUPLE_TURBOLASER_CANNON = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON,
    type: weaponTypes.PurpleOctupleTurbolaser
};

export const PURPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.PurpleTurbolaser
};

export const PURPLE_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.PurpleDoubleTurbolaser
};

export const PURPLE_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.PurpleTripleTurbolaser
};

export const PURPLE_QUAD_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.PurpleQuadTurbolaser
};

export const PURPLE_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.PurpleOctupleTurbolaser
};

export const PURPLE_TURBOLASER_CANNON_ULTRAHEAVY = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
    type: weaponTypes.PurpleUltraTurbolaser
};

export const PURPLE_SUPERLASER = {
    ...GREEN_SUPERLASER,
    type: weaponTypes.PurpleSuperlaser
};

export const PURPLE_WEAK_SUPERLASER = {
    ...GREEN_WEAK_SUPERLASER,
    type: weaponTypes.PurpleWeakSuperlaser
};

export const PURPLE_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
    type: weaponTypes.PurpleUltraTurbolaserBypassShield
};

// YELLOW WEAPON DEFS

export const YELLOW_FIGHTER_LASER_CANNON = {
    ...GREEN_FIGHTER_LASER_CANNON,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_RAPID_FIGHTER_LASER_CANNON = {
    ...GREEN_RAPID_FIGHTER_LASER_CANNON,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_RAPID_LASER_CANNON = {
    ...GREEN_RAPID_LASER_CANNON,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_ANTI_FIGHTER_LASER_CANNON = {
    ...GREEN_ANTI_FIGHTER_LASER_CANNON,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_LASER_CANNON = {
    ...GREEN_LASER_CANNON,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_DOUBLE_LASER_CANNON = {
    ...GREEN_DOUBLE_LASER_CANNON,
    type: weaponTypes.YellowDoubleLaserCannon
};

export const YELLOW_TRIPLE_LASER_CANNON = {
    ...GREEN_TRIPLE_LASER_CANNON,
    type: weaponTypes.YellowTripleLaserCannon
};

export const YELLOW_QUAD_LASER_CANNON = {
    ...GREEN_QUAD_LASER_CANNON,
    type: weaponTypes.YellowQuadLaserCannon
};

export const YELLOW_LASER_CANNON_HEAVY = {
    ...GREEN_LASER_CANNON_HEAVY,
    type: weaponTypes.YellowLaserCannon
};

export const YELLOW_DOUBLE_LASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_LASER_CANNON_HEAVY,
    type: weaponTypes.YellowDoubleLaserCannon
};

export const YELLOW_TRIPLE_LASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_LASER_CANNON_HEAVY,
    type: weaponTypes.YellowTripleLaserCannon
};

export const YELLOW_QUAD_LASER_CANNON_HEAVY = {
    ...GREEN_QUAD_LASER_CANNON_HEAVY,
    type: weaponTypes.YellowQuadLaserCannon
};

export const YELLOW_TURBOLASER_CANNON = {
    ...GREEN_TURBOLASER_CANNON,
    type: weaponTypes.YellowTurbolaser
};

export const YELLOW_DOUBLE_TURBOLASER_CANNON = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON,
    type: weaponTypes.YellowDoubleTurbolaser
};

export const YELLOW_TRIPLE_TURBOLASER_CANNON = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON,
    type: weaponTypes.YellowTripleTurbolaser
};

export const YELLOW_QUAD_TURBOLASER_CANNON = {
    ...GREEN_QUAD_TURBOLASER_CANNON,
    type: weaponTypes.YellowQuadTurbolaser
};

export const YELLOW_OCTUPLE_TURBOLASER_CANNON = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON,
    type: weaponTypes.YellowOctupleTurbolaser
};

export const YELLOW_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.YellowTurbolaser
};

export const YELLOW_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.YellowDoubleTurbolaser
};

export const YELLOW_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.YellowTripleTurbolaser
};

export const YELLOW_QUAD_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.YellowQuadTurbolaser
};

export const YELLOW_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.YellowOctupleTurbolaser
};

export const YELLOW_TURBOLASER_CANNON_ULTRAHEAVY = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
    type: weaponTypes.YellowUltraTurbolaser
};

export const YELLOW_SUPERLASER = {
    ...GREEN_SUPERLASER,
    type: weaponTypes.YellowSuperlaser
};

export const YELLOW_WEAK_SUPERLASER = {
    ...GREEN_WEAK_SUPERLASER,
    type: weaponTypes.YellowWeakSuperlaser
};

export const YELLOW_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
    type: weaponTypes.YellowUltraTurbolaserBypassShield
};

// BLACK WEAPON DEFS

export const BLACK_FIGHTER_LASER_CANNON = {
    ...GREEN_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_RAPID_FIGHTER_LASER_CANNON = {
    ...GREEN_RAPID_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_RAPID_LASER_CANNON = {
    ...GREEN_RAPID_LASER_CANNON,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_ANTI_FIGHTER_LASER_CANNON = {
    ...GREEN_ANTI_FIGHTER_LASER_CANNON,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_LASER_CANNON = {
    ...GREEN_LASER_CANNON,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_DOUBLE_LASER_CANNON = {
    ...GREEN_DOUBLE_LASER_CANNON,
    type: weaponTypes.BlackDoubleLaserCannon
};

export const BLACK_TRIPLE_LASER_CANNON = {
    ...GREEN_TRIPLE_LASER_CANNON,
    type: weaponTypes.BlackTripleLaserCannon
};

export const BLACK_QUAD_LASER_CANNON = {
    ...GREEN_QUAD_LASER_CANNON,
    type: weaponTypes.BlackQuadLaserCannon
};

export const BLACK_LASER_CANNON_HEAVY = {
    ...GREEN_LASER_CANNON_HEAVY,
    type: weaponTypes.BlackLaserCannon
};

export const BLACK_DOUBLE_LASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_LASER_CANNON_HEAVY,
    type: weaponTypes.BlackDoubleLaserCannon
};

export const BLACK_TRIPLE_LASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_LASER_CANNON_HEAVY,
    type: weaponTypes.BlackTripleLaserCannon
};

export const BLACK_QUAD_LASER_CANNON_HEAVY = {
    ...GREEN_QUAD_LASER_CANNON_HEAVY,
    type: weaponTypes.BlackQuadLaserCannon
};

export const BLACK_TURBOLASER_CANNON = {
    ...GREEN_TURBOLASER_CANNON,
    type: weaponTypes.BlackTurbolaser
};

export const BLACK_DOUBLE_TURBOLASER_CANNON = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON,
    type: weaponTypes.BlackDoubleTurbolaser
};

export const BLACK_TRIPLE_TURBOLASER_CANNON = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON,
    type: weaponTypes.BlackTripleTurbolaser
};

export const BLACK_QUAD_TURBOLASER_CANNON = {
    ...GREEN_QUAD_TURBOLASER_CANNON,
    type: weaponTypes.BlackQuadTurbolaser
};

export const BLACK_OCTUPLE_TURBOLASER_CANNON = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON,
    type: weaponTypes.BlackOctupleTurbolaser
};

export const BLACK_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlackTurbolaser
};

export const BLACK_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlackDoubleTurbolaser
};

export const BLACK_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlackTripleTurbolaser
};

export const BLACK_QUAD_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_QUAD_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlackQuadTurbolaser
};

export const BLACK_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    ...GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY,
    type: weaponTypes.BlackOctupleTurbolaser
};

export const BLACK_TURBOLASER_CANNON_ULTRAHEAVY = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY,
    type: weaponTypes.BlackUltraTurbolaser
};

export const BLACK_SUPERLASER = {
    ...GREEN_SUPERLASER,
    type: weaponTypes.BlackSuperlaser
};

export const BLACK_WEAK_SUPERLASER = {
    ...GREEN_WEAK_SUPERLASER,
    type: weaponTypes.BlackWeakSuperlaser
};

export const BLACK_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD = {
    ...GREEN_TURBOLASER_CANNON_ULTRAHEAVY_BYPASS_SHIELD,
    type: weaponTypes.BlackUltraTurbolaserBypassShield
};

// PROJECTILE DEFS
// export const FIGHTER_PROTON_TORPEDO = {
//     reload: 399,
//     damage: 80,
//     speed: 25,
//     range: 1500,
//     type: weaponTypes.ProtonTorpedo,
//     health: 10,
//     name: "Proton Torpedo"
// };

// export const FIGHTER_PROTON_BOMB = {
//     reload: 400,
//     damage: 40, // Weak cuz usually many in a squadron
//     speed: 5,
//     range: 800,
//     type: weaponTypes.ProtonBomb,
//     health: 10,
//     targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation], // Can't aim well and only works on stationary/very slow targets
//     name: "Proton Bomb"
// };

// export const FIGHTER_PROTON_ROCKET = {
//     reload: 400,
//     damage: 35,
//     speed: 30,
//     range: 1000,
//     type: weaponTypes.ProtonRocket,
//     health: 10,
//     name: "Proton Rocket"
// };

// export const FIGHTER_PROTON_ROCKET_AOE = {
//     reload: 80,
//     damage: 10,
//     speed: 30,
//     range: 4000,
//     collisionRange: 45,
//     type: weaponTypes.ProtonRocketAOE,
//     health: 25,
//     name: "Proton ROcket"
// };

// export const ASSAULT_PROTON_ROCKET = {
//     reload: 100,
//     damage: 95,
//     speed: 35,
//     range: 3000,
//     collisionRange: 60,
//     type: weaponTypes.AssaultProtonRocket,
//     health: 100,
//     name: "Assault Proton Rocket"
// };

// export const ASSAULT_CONCUSSION_MISSILE = {
//     reload: 125,
//     damage: 60, // Weak cuz usually many in a volley
//     speed: 35,
//     range: 4000,
//     type: weaponTypes.ConcussionMissile,
//     health: 100,
//     targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation], // Can't aim well and only works on stationary/very slow targets
//     name: "Assault Concussion Missile"
// };

// export const ASSAULT_PROTON_TORPEDO = {
//     reload: 135,
//     damage: 85,
//     speed: 35,
//     range: 3500,
//     type: weaponTypes.ProtonTorpedo,
//     health: 150,
//     targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation], // Can't aim well and only works on stationary/very slow targets
//     name: "Assault Proton Torpedo"
// };

export const DUMMY_BLANK = {
    reload: 1e10,
    damage: 1,
    speed: 1,
    range: 1,
    type: weaponTypes.BlueLaserCannon,
    health: 100
};

export const SNUB_ONE_ROCKET = {
    reload: 15,
    damage: 10,
    speed: 50,
    range: 3500,
    type: weaponTypes.ProtonRocketAOE,
    health: 180,
    name: "Proton Rocket"
};

// Fighter Explosion Ammunition
export const FIGHTER_PROTON_TORPEDO = {
    reload: 100,
    range: 1500,
    type: weaponTypes.ProtonTorpedo,
    health: 175,
    name: "Proton Torpedo",

    damage: 10,
    collisionRange: 45,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 150,

    speed: 28,
    maneuverability: .1,
    seeks: true
};

export const FIGHTER_CONCUSSION_MISSILE = {
    reload: 100,
    range: 1750,
    type: weaponTypes.ConcussionMissile,
    health: 200,
    name: "Concussion Missile",

    damage: 15,
    collisionRange: 35,

    explodes: true,
    explosionDamage: 4,
    explosionRange: 400,

    speed: 20,
    maneuverability: .005,
    seeks: true
};

export const FIGHTER_PROTON_ROCKET = {
    reload: 100,
    range: 2500,
    type: weaponTypes.ProtonRocket,
    health: 100,
    name: "Proton Rocket",

    damage: 5,
    collisionRange: 30,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 10,

    speed: 35,
    maneuverability: .25,
    seeks: true
};

export const FIGHTER_PROTON_BOMB = {
    reload: 100,
    range: 500,
    type: weaponTypes.ProtonBomb,
    health: 125,
    name: "Proton Bomb",

    damage: 6,
    collisionRange: 60,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 250,

    speed: 6,
    maneuverability: .15,
    seeks: true,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

// Assault Explosion Ammunition
export const ASSAULT_PROTON_TORPEDO = {
    reload: 100,
    range: 4500,
    type: weaponTypes.AssaultProtonTorpedo,
    health: 175,
    name: "Proton Torpedo",

    damage: 40,
    collisionRange: 45,

    explodes: true,
    explosionDamage: 4,
    explosionRange: 400,

    speed: 28,
    maneuverability: .1,
    seeks: true,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

export const ASSAULT_CONCUSSION_MISSILE = {
    reload: 100,
    range: 4000,
    type: weaponTypes.ConcussionMissile,
    health: 200,
    name: "Concussion Missile",

    damage: 70,
    collisionRange: 35,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 600,

    speed: 20,
    maneuverability: .0667,
    seeks: true,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

export const ASSAULT_PROTON_ROCKET = {
    reload: 100,
    range: 4000,
    type: weaponTypes.AssaultProtonRocket,
    health: 100,
    name: "Proton Rocket",

    damage: 30,
    collisionRange: 30,

    explodes: true,
    explosionDamage: 2,
    explosionRange: 200,

    speed: 35,
    maneuverability: .25,
    seeks: true,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

export const ASSAULT_PROTON_BOMB = {
    reload: 100,
    range: 8000,
    type: weaponTypes.ProtonBomb,
    health: 125,
    name: "Proton Bomb",

    damage: 5,
    collisionRange: 60,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 300,

    speed: 6,
    maneuverability: .2,
    seeks: true,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

export const SIEGE_CONCUSSION_MISSILE = {
    reload: 75,
    range: 6000,
    type: weaponTypes.ConcussionMissile,
    health: 200,
    name: "Concussion Missile",

    damage: 70,
    collisionRange: 35,

    explodes: true,
    explosionDamage: 6,
    explosionRange: 600,

    speed: 20,
    maneuverability: .1,
    seeks: true,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital, shipTypes.SpaceStation]
};

export const TENDER_FREQUENCY_SECONDS = 3;
export const TENDER_HEAL_PULSE_AMOUNT = 48;

export function spawner(squadrons = [], ships = []) {
    return {
        name: "Spawner",
        asset: "frigateShipyard.png",
        classification: shipTypes.SpaceStation,
        population: 0,
        size: 1,
        cost: 0,
        speed: 0,
        turnSpeed: 0,
        shield: 2048,
        shieldRegen: 2048,
        hardpoints: [{
            x: 0,
            y: 0,
            weapon: {
                reload: Infinity,
                damage: 0,
                speed: 100,
                range: 0,
                type: weaponTypes.IonCannon,
                health: 2048,
                name: "Ion Cannon"
            }
        }], // {x,y,maxSquadrons,squadronSize,reserveSize:0,squadronKey}
        hangars: squadrons,
        production: ships // {x,y,maxAlive,key,reserve:0,cooldown:0}
    };
}