function angleDifference(a, b) {
    const diff = a - b;
    return Math.atan2(Math.sin(diff), Math.cos(diff));
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = innerWidth * devicePixelRatio;
    canvas.height = innerHeight * devicePixelRatio;
}

window.addEventListener("resize", resize);
resize();

let px = 200,
    py = 150;

let ox = 800,
    oy = 300;

const arc = [-Math.PI / 10, Math.PI / 10];

function isInArc(sourceX, sourceY, sourceAngle, sourceArc, targetX, targetY) {
    const atan = Math.atan2(targetY - sourceY, targetX - sourceX);
    const diff = angleDifference(atan, sourceAngle);

    return diff > sourceArc[0] && diff < sourceArc[1];
}

function draw() {
    requestAnimationFrame(draw);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let angle = performance.now() / 2500,
        distance = innerWidth * 10;

    ctx.beginPath();
    ctx.arc(px, py, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(ox, oy, 10, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fillStyle = isInArc(px, py, angle, arc, ox, oy) ? "#00FF00" : "#FF0000";
    ctx.fill();

    ctx.save();

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(px + Math.cos(angle + arc[0]) * distance, py + Math.sin(angle + arc[0]) * distance);
        ctx.lineTo(px + Math.cos(angle + arc[1]) * distance, py + Math.sin(angle + arc[1]) * distance);
        ctx.closePath();

        ctx.fillStyle = "#00BEFF";
        ctx.globalAlpha = .25;
        ctx.fill();

    ctx.restore();
}

draw();