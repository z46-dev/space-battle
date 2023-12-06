## Rework weapon defs
- Light Laser Cannon
- Medium Laser Cannon
- Heavy Laser Cannon

- Light Turbolaser Cannon
- Medium Turbolaser Cannon
- Heavy Turbolaser Cannon

- Light Ion Cannon
- Medium Ion Cannon
- Heavy Ion Cannon

```js
const types = {
    laser: 0,
    turbo: 1,
    ion: 2
};

const strengths = {
    light: 1,
    medium: 1.3,
    heavy: 1.6
};

function getDamage(strength, count, type = 0) {
    let output = 0;

    switch (type) {
        case types.laser:
            output = 8;
            break;
        case types.turbo:
            output = 18;
            break;
        case types.ion:
            output = 13;
            break;
    }

    output *= strength;

    output *= Math.max(1, (count + 1) / 2);

    return output;
}
```