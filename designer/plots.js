// TODO, INCLUDE GAPS INTO THE THINGY DATA SET PARSING

export default function drawSingleStemPlot(dataSet, keyInfo = "...") {
    // Parse data set
    const data = {};
    const isDecimalSet = dataSet.some(x => x !== x | 0);

    for (const value of dataSet.map(x => x.toString())) {
        if (isDecimalSet) {
            const [whole, decimal] = (value.includes(".") ? value : (value + ".0")).split(".");

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