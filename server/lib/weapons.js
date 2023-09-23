import { shipTypes, weaponTypes } from "./constants.js";

// ION WEAPON DEFS

export const ION_CANNON = {
    reload: 40,
    damage: 15,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100
};

export const FIGHTER_ION_CANNON = {
    reload: 120,
    damage: 8,
    speed: 55,
    range: 600,
    type: weaponTypes.IonCannon,
    health: 5
};

export const TIE_DEFENDER_ION_CANNON = {
    reload: 20,
    damage: 4,
    speed: 60,
    range: 3000,
    type: weaponTypes.IonCannon,
    health: 20
};

export const DOUBLE_ION_CANNON = {
    reload: 40,
    damage: 30,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100
};

export const TRIPLE_ION_CANNON = {
    reload: 40,
    damage: 45,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100
};

export const QUAD_ION_CANNON = {
    reload: 40,
    damage: 60,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100
};

export const OCTUPLE_ION_CANNON = {
    reload: 40,
    damage: 75,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100
};

export const ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 25,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const DOUBLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 50,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const TRIPLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 100,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const QUAD_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 150,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const OCTUPLE_ION_CANNON_MEDIUM = {
    reload: 60,
    damage: 200,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const ION_CANNON_HEAVY = {
    reload: 80,
    damage: 40,
    speed: 50,
    range: 5250,
    type: weaponTypes.IonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const DOUBLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 80,
    speed: 50,
    range: 5250,
    type: weaponTypes.DoubleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const TRIPLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 120,
    speed: 50,
    range: 5250,
    type: weaponTypes.TripleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const QUAD_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 160,
    speed: 50,
    range: 5250,
    type: weaponTypes.QuadIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const OCTUPLE_ION_CANNON_HEAVY = {
    reload: 80,
    damage: 200,
    speed: 50,
    range: 5250,
    type: weaponTypes.OctupleIonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const ION_CANNON_ULTRA = {
    reload: 300,
    damage: 400,
    speed: 50,
    range: 6500,
    type: weaponTypes.IonCannon,
    health: 100,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

// GREEN WEAPON DEFS

export const GREEN_FIGHTER_LASER_CANNON = {
    reload: 12,
    damage: 1,
    speed: 75,
    range: 1200,
    type: weaponTypes.GreenLaserCannon,
    health: 5
};

export const GREEN_RAPID_FIGHTER_LASER_CANNON = {
    reload: 6,
    damage: 1,
    speed: 75,
    range: 700,
    type: weaponTypes.GreenLaserCannon,
    health: 30
};

export const GREEN_RAPID_LASER_CANNON = {
    reload: 9,
    damage: 3,
    speed: 75,
    range: 3000,
    type: weaponTypes.GreenLaserCannon,
    health: 100
};

export const GREEN_ANTI_FIGHTER_LASER_CANNON = {
    reload: 5,
    damage: 20,
    speed: 80,
    range: 1500,
    type: weaponTypes.GreenLaserCannon,
    health: 100,
    targetOverride: [shipTypes.Fighter, shipTypes.Bomber]
};

export const GREEN_LASER_CANNON = {
    reload: 15,
    damage: 4,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenLaserCannon,
    health: 100
};

export const GREEN_DOUBLE_LASER_CANNON = {
    reload: 22.5,
    damage: 8,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenDoubleLaserCannon,
    health: 100
};

export const GREEN_TRIPLE_LASER_CANNON = {
    reload: 30,
    damage: 12,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenTripleLaserCannon,
    health: 100
};

export const GREEN_QUAD_LASER_CANNON = {
    reload: 37.5,
    damage: 16,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenQuadLaserCannon,
    health: 100
};

export const GREEN_LASER_CANNON_HEAVY = {
    reload: 20,
    damage: 12,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenLaserCannon,
    health: 100
};

export const GREEN_DOUBLE_LASER_CANNON_HEAVY = {
    reload: 30,
    damage: 24,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenDoubleLaserCannon,
    health: 100
};

export const GREEN_TRIPLE_LASER_CANNON_HEAVY = {
    reload: 40,
    damage: 36,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenTripleLaserCannon,
    health: 100
};

export const GREEN_QUAD_LASER_CANNON_HEAVY = {
    reload: 50,
    damage: 48,
    speed: 60,
    range: 4000,
    type: weaponTypes.GreenQuadLaserCannon,
    health: 100
};

export const GREEN_TURBOLASER_CANNON = {
    reload: 60,
    damage: 30,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_DOUBLE_TURBOLASER_CANNON = {
    reload: 90,
    damage: 60,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenDoubleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_TRIPLE_TURBOLASER_CANNON = {
    reload: 120,
    damage: 90,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTripleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_QUAD_TURBOLASER_CANNON = {
    reload: 150,
    damage: 120,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenQuadTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_OCTUPLE_TURBOLASER_CANNON = {
    reload: 240,
    damage: 150,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenOctupleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_TURBOLASER_CANNON_HEAVY = {
    reload: 75,
    damage: 60,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_DOUBLE_TURBOLASER_CANNON_HEAVY = {
    reload: 112.5,
    damage: 120,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenDoubleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_TRIPLE_TURBOLASER_CANNON_HEAVY = {
    reload: 150,
    damage: 180,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenTripleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_QUAD_TURBOLASER_CANNON_HEAVY = {
    reload: 187.5,
    damage: 240,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenQuadTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_OCTUPLE_TURBOLASER_CANNON_HEAVY = {
    reload: 300,
    damage: 300,
    speed: 50,
    range: 4500,
    type: weaponTypes.GreenOctupleTurbolaser,
    health: 125,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_TURBOLASER_CANNON_ULTRAHEAVY = {
    reload: 200,
    damage: 260,
    speed: 52.5,
    range: 7500,
    type: weaponTypes.GreenUltraTurbolaser,
    health: 150,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital]
};

export const GREEN_SUPERLASER = {
    reload: 1500,
    damage: 2000,
    type: weaponTypes.GreenSuperlaser,
    health: 4000,
    speed: 250,
    range: 1e6,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital],
    explosionRange: 1e10,
    bypassShield: true
};

export const GREEN_WEAK_SUPERLASER = {
    reload: 750,
    damage: 160,
    type: weaponTypes.GreenWeakSuperlaser,
    health: 120,
    speed: 180,
    range: 1e6,
    explosionRange: 1e10,
    bypassShield: true,
    targetOverride: [shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital],
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
    type: weaponTypes.RedLaserCannon
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

// PROJECTILE DEFS
export const FIGHTER_PROTON_TORPEDO = {
    reload: 399,
    damage: 80,
    speed: 25,
    range: 1500,
    type: weaponTypes.ProtonTorpedo,
    health: 10
};

export const FIGHTER_PROTON_BOMB = {
    reload: 400,
    damage: 40, // Weak cuz usually many in a squadron
    speed: 5,
    range: 800,
    type: weaponTypes.ProtonBomb,
    health: 10,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital] // Can't aim well and only works on stationary/very slow targets
};

export const FIGHTER_PROTON_ROCKET = {
    reload: 400,
    damage: 35,
    speed: 30,
    range: 1000,
    type: weaponTypes.ProtonRocket,
    health: 10
};

export const FIGHTER_PROTON_ROCKET_AOE = {
    reload: 80,
    damage: 20,
    speed: 30,
    range: 4000,
    collisionRange: 45,
    type: weaponTypes.ProtonRocketAOE,
    health: 25
};

export const ASSAULT_PROTON_ROCKET = {
    reload: 200,
    damage: 95,
    speed: 35,
    range: 3000,
    collisionRange: 60,
    type: weaponTypes.AssaultProtonRocket,
    health: 100
};

export const ASSAULT_CONCUSSION_MISSILE = {
    reload: 300,
    damage: 60, // Weak cuz usually many in a volley
    speed: 35,
    range: 4000,
    type: weaponTypes.ConcussionMissile,
    health: 100,
    targetOverride: [shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital] // Can't aim well and only works on stationary/very slow targets
};

export const ASSAULT_PROTON_TORPEDO = {
    reload: 400,
    damage: 85,
    speed: 35,
    range: 3500,
    type: weaponTypes.ProtonTorpedo,
    health: 150,
    targetOverride: [shipTypes.Corvette, shipTypes.Frigate, shipTypes.HeavyFrigate, shipTypes.Capital, shipTypes.SuperCapital] // Can't aim well and only works on stationary/very slow targets
};

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
    health: 180
};