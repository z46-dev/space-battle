## Rework projectile weapons:
```cpp
struct ProjectileWeapon {
    float Speed; // The speed
    float Maneuverability; // How well can it turn
    bool Seeks; // Does it seek out its prey?
    
    int ImpactDamage; // The damage it does to the hardpoint it impacts
    int CollisionRange; // The range it takes to collide (accuracy)

    int ExplosionDamage; // The damage it does to hardpoints around it
    int ExplosionRange; // The range of the explosion
}
```

## Projectile Types:
- Proton Torpedo
    - High impact damage, low explosion damage, high explosion range
    - Semi-Fast speed, decent maneuverability, seeks
- Proton Bomb
    - Low impact damage, high explosion damage, high explosion range
    - Slow speed, slight maneuverability, seeks to correct course
- Proton Rocket
    - Medium impact damage, medium explosion damage, low explosion range
    - High speed, high maneuverability, seeks
- Concussion Missile
    - High impact damage, very high explosion damage, high explosion range
    - Medium speed, very slight maneuverability, seeks to correct course