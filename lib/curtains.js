import { canvas, ctx, uiScale } from "../shared/canvas.js";

const speed = .075;

export const curtainState = {
    active: false,
    value: 0,
    flipped: false
};

export function drawCurtains() {
    if (!curtainState.active) {
        return;
    }
    
    const width = canvas.width;
    const height = canvas.height;

    const rectWidth = width / 2 * curtainState.value;

    ctx.fillStyle = "#C8C8C8";
    ctx.fillRect(0, 0, rectWidth, height);
    ctx.fillRect(width - rectWidth, 0, rectWidth, height);
}

export default function curtains(onceHalfway = () => {}) {
    curtainState.active = true;
    curtainState.value = 0;
    curtainState.flipped = false;

    return new Promise(resolve => {
        const interval = setInterval(() => {
            curtainState.value += speed * (curtainState.flipped ? -1 : 1);

            if (curtainState.value >= 1) {
                curtainState.value = 1;
                curtainState.flipped = true;
                onceHalfway();
            }

            if (curtainState.value <= 0 && curtainState.flipped) {
                curtainState.value = 0;
                curtainState.active = false;
                curtainState.flipped = false;
                clearInterval(interval);
                resolve();
            }
        }, 1000 / 60);
    });
}