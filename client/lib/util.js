const canvas = document.querySelector("canvas");

export function uiScale() {
    if (canvas.height > canvas.width) {
        return canvas.height / 1080;
    }

    return canvas.width / 1920;
}

export function lerp(A, B, w) {
    return (1 - w) * A + w * B;
}

export function lerpAngle(A, B, w) {
    const CS = (1 - w) * Math.cos(A) + w * Math.cos(B);
    const SN = (1 - w) * Math.sin(A) + w * Math.sin(B);
    return Math.atan2(SN, CS);
}