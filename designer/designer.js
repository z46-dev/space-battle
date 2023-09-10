const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
}

window.addEventListener("resize", resize);
resize();

const camera = {
    x: 0,
    y: 0,
    zoom: 1,

    realX: 0,
    realY: 0,
    realZoom: 1,

    directionX: 0,
    directionY: 0,
    rightMouseButton: false,

    mouseX: 0,
    mouseY: 0
};

window.addEventListener("wheel", event => {
    camera.realZoom += event.deltaY / 1000;
    camera.realZoom = Math.max(camera.realZoom, .1);
    camera.realZoom = Math.min(camera.realZoom, 3);
});

window.addEventListener("mousedown", event => {
    if (event.button === 2) {
        camera.rightMouseButton = true;
    } else {
        addPlot();
    }
});

window.addEventListener("mouseup", event => {
    if (event.button === 2) {
        camera.rightMouseButton = false;
    }
});

window.addEventListener("mousemove", event => {
    camera.directionX = event.movementX;
    camera.directionY = event.movementY;

    camera.mouseX = event.clientX * window.devicePixelRatio - canvas.width / 2;
    camera.mouseY = event.clientY * window.devicePixelRatio - canvas.height / 2;
});

function uiScale() {
    if (canvas.height > canvas.width) {
        return canvas.height / 1080;
    }

    return canvas.width / 1920;
}

const gridMod = 30;
const gridSize = 3000;

function getNearestGridPoint(x, y) {
    return {
        x: Math.round(x / gridMod) * gridMod,
        y: Math.round(y / gridMod) * gridMod
    };
}

function drawText(text, x, y, size = 20, color = "#FFFFFF", align = "center") {
    ctx.save();
    ctx.font = `bold ${size}px sans-serif`;
    ctx.textBaseline = "middle";
    ctx.textAlign = align;
    ctx.fillStyle = color;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = size * .2;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
    ctx.restore();
}

class Layer {
    constructor() {
        this.points = [];
        this.fill = "#00BEFF";
        this.stroke = "#00BEFF";
        this.lineWidth = 2.5;
    }
}

const layers = [];
let layerIndex = 0;

layers.push(new Layer());

function addPlot() {
    const scale = uiScale() * camera.zoom;
    const point = getNearestGridPoint(camera.mouseX / scale + camera.x, camera.mouseY / scale + camera.y);

    layers[layerIndex].points.push(point);
}

function draw() {
    requestAnimationFrame(draw);

    ctx.lineCap = ctx.lineJoin = "round";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#AAAAAA";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (camera.rightMouseButton) {
        camera.realX -= camera.directionX / camera.realZoom;
        camera.realY -= camera.directionY / camera.realZoom;
    }

    camera.x += (camera.realX - camera.x) / 10;
    camera.y += (camera.realY - camera.y) / 10;
    camera.zoom += (camera.realZoom - camera.zoom) / 10;

    const scale = uiScale() * camera.zoom;

    ctx.save();

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.scale(scale, scale);
    ctx.translate(-camera.x, -camera.y);

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(-gridSize, -gridSize, gridSize * 2, gridSize * 2);

    // Grid
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = .5;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2.5 * scale;

    for (let x = -gridSize; x <= gridSize; x += gridMod) {
        ctx.moveTo(x, -gridSize);
        ctx.lineTo(x, gridSize);
    }

    for (let y = -gridSize; y <= gridSize; y += gridMod) {
        ctx.moveTo(-gridSize, y);
        ctx.lineTo(gridSize, y);
    }

    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // Major Lines
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#888888";
    ctx.lineWidth = 5 * scale;

    ctx.moveTo(0, -gridSize);
    ctx.lineTo(0, gridSize);

    ctx.moveTo(-gridSize, 0);
    ctx.lineTo(gridSize, 0);

    ctx.stroke();
    ctx.closePath();
    ctx.restore();

    // Major line texts
    for (let x = -gridSize; x <= gridSize; x += gridMod * 5) {
        drawText(x / gridMod, x, 0, 20, "#FFFFFF", "center");
        drawText(x / gridMod, 0, x, 20, "#FFFFFF", "center");
    }

    layers.forEach(function draw(layer, currentIndex) {
        ctx.save();

        ctx.fillStyle = layer.fill;
        ctx.strokeStyle = layer.stroke;
        ctx.lineWidth = layer.lineWidth * scale;

        ctx.beginPath();

        for (let i = 0; i < layer.points.length; i++) {
            ctx[i === 0 ? "moveTo" : "lineTo"](layer.points[i].x, layer.points[i].y);
        }

        ctx.stroke();

        ctx.globalAlpha = currentIndex === layerIndex ? .667 : .334;
        ctx.fill();

        ctx.restore();
    });

    { // User (x, y)
        const point = getNearestGridPoint(camera.mouseX / scale + camera.x, camera.mouseY / scale + camera.y);

        ctx.beginPath();
        ctx.arc(point.x, point.y, 7.5, 0, Math.PI * 2);
        ctx.fillStyle = "#FFFFFF";
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 1.5;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        // Draw at top left corner of screen
        const drawX = camera.x - canvas.width / 2 / scale + 10 / scale;
        const drawY = camera.y - canvas.height / 2 / scale + 20 / scale;

        drawText(`Grid Unit: (${point.x / gridMod}, ${point.y / gridMod})`, drawX, drawY, 20 / scale, "#FFFFFF", "left");
        drawText(`Mouse: (${camera.mouseX + .5 | 0}, ${camera.mouseY + .5 | 0})`, drawX, drawY + 30 / scale, 20 / scale, "#FFFFFF", "left");
        drawText(`Camera: (${camera.x + .5 | 0}, ${camera.y + .5 | 0}, ${(camera.zoom).toFixed(2)}z)`, drawX, drawY + 60 / scale, 20 / scale, "#FFFFFF", "left");
    }

    ctx.restore();
}

draw();