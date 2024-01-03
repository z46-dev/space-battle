export const canvas = document.querySelector("canvas");
export const ctx = canvas.getContext("2d", {
    alpha: false,
    colorSpace: "display-p3",
    desynchronized: true
});

export function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
}

window.addEventListener("resize", resize);
resize();

export function uiScale() {
    if (canvas.height > canvas.width) {
        return canvas.height / 1080;
    }

    return canvas.width / 1920;
}