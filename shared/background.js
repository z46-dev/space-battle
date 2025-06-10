function generate(size, drawCircles) {
    const canvas = new OffscreenCanvas(size, size);
    const ctx = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    const maxNebulaRadius = size * .25;
    const maxArcRadius = size * .75;
    const margin = Math.max(maxNebulaRadius, maxArcRadius, 150);
    const nebulaColors = [
        "rgba(120, 80, 255, 0.2)",
        "rgba(255, 80, 180, 0.2)",
        "rgba(80, 255, 220, 0.2)",
        "rgba(255, 200, 80, 0.2)",
        "rgba(80, 180, 255, 0.2)"
    ];

    function drawWrapped(cb) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                ctx.save();
                ctx.translate(dx * width, dy * height);
                cb();
                ctx.restore();
            }
        }
    }

    ctx.fillStyle = "#050715";
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 120; i++) {
        const x = Math.random() * (width + 2 * margin) - margin;
        const y = Math.random() * (height + 2 * margin) - margin;
        const radius = Math.random() * (maxNebulaRadius - 30) + 30;
        const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];

        drawWrapped(() => {
            ctx.globalAlpha = 0.02;
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.globalAlpha = 1;
        });
    }

    for (let i = 0; i < 40; i++) {
        const x = Math.random() * (width + 2 * margin) - margin;
        const y = Math.random() * (height + 2 * margin) - margin;
        const w = Math.random() * 300 + 100;
        const h = Math.random() * 60 + 20;

        drawWrapped(() => {
            ctx.translate(x, y);
            ctx.rotate(Math.random() * Math.PI * 2);
            ctx.globalAlpha = 0.003;
            ctx.fillStyle = "white";
            ctx.fillRect(-w / 2, -h / 2, w, h);
            ctx.globalAlpha = 1;
        });
    }

    if (drawCircles) {
        for (let i = 0; i < 4; i++) {
            const cx = Math.random() * (width + 2 * margin) - margin;
            const cy = Math.random() * (height + 2 * margin) - margin;
            const r = Math.random() * 700 + 200;

            drawWrapped(() => {
                ctx.beginPath();
                ctx.arc(cx, cy, r, 0, Math.PI * 2);
                ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
                ctx.stroke();
            });
        }
    }

    for (let i = 0; i < Math.log(size) * Math.cbrt(size); i++) {
        const x = Math.random() * (width + 2);
        const y = Math.random() * (height + 2);
        const alpha = Math.random();

        drawWrapped(() => {
            ctx.beginPath();
            ctx.arc(x, y, 8, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowColor = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowBlur = 16;
            ctx.fill();
        });
    }

    return canvas;
}

/**
 * @param {CanvasRenderingContext2D} c
 * @param {number} size
 * @returns {CanvasPattern}
 */
export default function createPattern(c, size, drawCircles = true) {
    return c.createPattern(generate(size, drawCircles), "repeat");
}

// const background = (function () {
//     const gridOffscreenCanvas = new OffscreenCanvas(2048, 2048);
//     const gctx = gridOffscreenCanvas.getContext("2d");
//     const gtxWidth = gridOffscreenCanvas.width;
//     const gctxHeight = gridOffscreenCanvas.height;
//     const maxNebulaRadius = 240 + 60;
//     const maxArcRadius = 900;
//     const margin = Math.max(maxNebulaRadius, maxArcRadius, 150);
//     function drawWrapped(callback) {
//         for (let dx = -1; dx <= 1; dx++) {
//             for (let dy = -1; dy <= 1; dy++) {
//                 gctx.save();
//                 gctx.translate(dx * gtxWidth, dy * gctxHeight);
//                 callback();
//                 gctx.restore();
//             }
//         }
//     }
//     gctx.fillStyle = "#050715";
//     gctx.fillRect(0, 0, gtxWidth, gctxHeight);
//     for (let i = 0; i < 999; i++) {
//         const x = Math.random() * (gtxWidth + 2);
//         const y = Math.random() * (gctxHeight + 2);
//         const alpha = Math.random() * 1;
//         drawWrapped(() => {
//             gctx.beginPath();
//             gctx.arc(x, y, 1, 0, Math.PI * 2);
//             gctx.fillStyle = `rgba(255,255,255,${alpha})`;
//             gctx.fill();
//         });
//     }
//     const nebulaColors = [
//         "rgba(120,80,255,0.2)",
//         "rgba(255,80,180,0.2)",
//         "rgba(80,255,220,0.2)",
//         "rgba(255,200,80,0.2)",
//         "rgba(80,180,255,0.2)"
//     ];
//     for (let i = 0; i < 120; i++) {
//         const x = Math.random() * (gtxWidth + 2 * margin) - margin;
//         const y = Math.random() * (gctxHeight + 2 * margin) - margin;
//         const radius = Math.random() * 180 + 60;
//         const color = nebulaColors[Math.floor(Math.random() * nebulaColors.length)];
//         drawWrapped(() => {
//             gctx.globalAlpha = 0.02;
//             gctx.beginPath();
//             gctx.arc(x, y, radius, 0, Math.PI * 2);
//             gctx.fillStyle = color;
//             gctx.fill();
//             gctx.globalAlpha = 1;
//         });
//     }
//     for (let i = 0; i < 40; i++) {
//         const x = Math.random() * (gtxWidth + 2 * margin) - margin;
//         const y = Math.random() * (gctxHeight + 2 * margin) - margin;
//         const w = Math.random() * 300 + 100;
//         const h = Math.random() * 60 + 20;
//         drawWrapped(() => {
//             gctx.translate(x, y);
//             gctx.rotate(Math.random() * Math.PI * 2);
//             gctx.globalAlpha = 0.003;
//             gctx.fillStyle = "white";
//             gctx.fillRect(-w / 2, -h / 2, w, h);
//             gctx.globalAlpha = 1;
//         });
//     }
//     gctx.strokeStyle = "rgba(255,255,255,0.2)";
//     for (let i = 0; i < 10; i++) {
//         const cx = Math.random() * (gtxWidth + 2 * margin) - margin;
//         const cy = Math.random() * (gctxHeight + 2 * margin) - margin;
//         const r = Math.random() * 700 + 200;
//         drawWrapped(() => {
//             gctx.beginPath();
//             gctx.arc(cx, cy, r, 0, Math.PI * 2);
//             gctx.stroke();
//         });
//     }
//     for (let i = 0; i < 999; i++) {
//         const x = Math.random() * (gtxWidth + 2);
//         const y = Math.random() * (gctxHeight + 2);
//         const alpha = Math.random() * 1;
//         drawWrapped(() => {
//             gctx.beginPath();
//             gctx.arc(x, y, 1, 0, Math.PI * 2);
//             gctx.fillStyle = `rgba(255,255,255,${alpha})`;
//             gctx.fill();
//         });
//     }

//     return ctx => ctx.createPattern(gridOffscreenCanvas, "repeat");
// })();