function drawDotPlot(dataSet, step = 1, drawCurveOverData = false) {
    const min = Math.min(...dataSet);
    const max = Math.max(...dataSet);
    const range = max - min;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = (range / step) * 45 + 30;
    canvas.height = 250;

    canvas.style.width = `${canvas.width / window.devicePixelRatio}px`;
    canvas.style.height = `${canvas.height / window.devicePixelRatio}px`;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(0, 225);
    ctx.lineTo(canvas.width, 225);
    ctx.stroke();
    ctx.closePath();

    const highPoints = [];

    for (let i = min; i <= max; i += step) {
        const x = (i - min) / (range / step / 2 + step) * canvas.width + 15;
        ctx.beginPath();
        ctx.moveTo(x, 220);
        ctx.lineTo(x, 230);
        ctx.stroke();
        ctx.closePath();

        ctx.save();
        ctx.translate(x, 240);
        ctx.fillStyle = "#000000";
        ctx.font = "20px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillText(i, 5, 0);
        ctx.restore();

        const myCount = dataSet.filter(x => x === i).length;

        ctx.save();
        ctx.translate(x, 210);
        ctx.fillStyle = "#000000";

        for (let j = 0; j < myCount; j++) {
            ctx.beginPath();
            ctx.arc(0, -j * 15, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.closePath();
        }

        if (myCount > 0) {
            highPoints.push({
                x: x,
                y: 210 - myCount * 15
            });
        }

        ctx.restore();
    }

    if (drawCurveOverData) {
        ctx.strokeStyle = "#C8C8AA";
        ctx.beginPath();
        ctx.moveTo(highPoints[0].x, highPoints[0].y);

        for (let i = 1; i < highPoints.length; i++) {;

            ctx.lineTo(highPoints[i].x, highPoints[i].y);
        }

        ctx.stroke();
        ctx.closePath();
    }

    return canvas;
}

function drawStemPlot(dataSet, keyInfo = "...") {
    // Parse data set
    const data = {};

    for (const value of dataSet.map(x => x.toString())) {
        if (value.includes(".")) {
            const [whole, decimal] = value.split(".");

            if (!data[whole]) {
                data[whole] = [];
            }

            data[whole].push(decimal);
        } else {
            const firstPart = value.slice(0, -1);
            const lastDigit = value.slice(-1);

            if (!data[firstPart]) {
                data[firstPart] = [];
            }

            data[firstPart].push(lastDigit);
        }
    }

    console.log(data);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = 500;
    canvas.height = 30 + Object.keys(data).length * 30;

    canvas.style.width = `${canvas.width / window.devicePixelRatio}px`;
    canvas.style.height = `${canvas.height / window.devicePixelRatio}px`;

    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.moveTo(100, 15);
    ctx.lineTo(100, canvas.height - 15);
    ctx.stroke();
    ctx.closePath();

    let i = 0,
        maxX = 0;

    for (const key in data) {
        const y = 30 + i * 30;

        ctx.save();
        ctx.translate(100, y);
        ctx.fillStyle = "#000000";
        ctx.font = "20px sans-serif";
        ctx.textBaseline = "middle";
        ctx.textAlign = "right";
        ctx.fillText(key, -50, 0);
        
        let j = 0;
        for (const value of data[key].sort((a, b) => a - b)) {
            ctx.fillText(value, 15 + j * 25, 0);

            j++;
        }

        maxX = Math.max(maxX, 115 + j * 25);

        ctx.restore();

        i++;
    }

    // Draw key
    ctx.save();
    ctx.translate(maxX + 25, 15);
    ctx.strokeRect(0, 0, canvas.width - maxX - 25, 100);

    ctx.fillStyle = "#000000";
    ctx.font = "20px sans-serif";
    ctx.textBaseline = "middle";
    ctx.textAlign = "left";

    ctx.fillText("Key", 5, 20);

    ctx.fillText(keyInfo, 5, 50);

    ctx.restore();

    return canvas;
}

document.body.appendChild(drawDotPlot([9, 6, 8, 7, 8, 8, 6, 6.5, 7, 7, 9, 4, 3, 4, 5, 6, 11, 6, 3, 7, 6, 10, 7, 8, 4.5, 9, 7, 7], .5, true));

document.body.appendChild(drawStemPlot([17.1, 17.4, 16.6, 17.4, 17.7, 17.1, 17.3, 17.7, 17.8, 19.2, "16.0", 15.9, 16.5, 16.8, 16.5, 17.1, 16.7], "15|9 = 15.9"));