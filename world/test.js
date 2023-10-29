const assets = new Map();

function loadAsset(path, name) {
    const image = new Image();
    image.src = path;

    image.ready = false;

    image.onload = () => {
        image.ready = true;
    };

    assets.set(name, image);
}

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth * devicePixelRatio;
canvas.height = innerHeight * devicePixelRatio;

loadAsset("/assets/ships/ALLEGIANCE.png", "ship");

function turnImageIntoShards(image) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);

    const shards = [];

    const baseAngle = Math.random() * Math.PI * 2;
    const shardCount = 4 + Math.random() * 7 | 0;

    for (let i = 0; i < shardCount; i ++) {
        const startAngle = baseAngle + i / shardCount * Math.PI * 2;
        const endAngle = baseAngle + (i + 1) / shardCount * Math.PI * 2;

        // Clip and paste to a new canvas
        const shardCanvas = new OffscreenCanvas(image.width, image.height);
        const shardCtx = shardCanvas.getContext("2d");

        shardCtx.beginPath();
        shardCtx.moveTo(image.width / 2, image.height / 2);
        shardCtx.arc(image.width / 2, image.height / 2, image.width / 2, startAngle, endAngle);
        shardCtx.closePath();
        shardCtx.clip();

        shardCtx.drawImage(canvas, 0, 0);

        shards.push(shardCanvas);
    }

    return shards;
}

const shards = [];
window.shards = shards;

let i = 200;

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (shards.length > 0) {
        for (const shard of shards) {
            ctx.save();
            ctx.translate(shard.x, shard.y);
            ctx.rotate(shard.r);
            ctx.drawImage(shard.image, -shard.image.width / 2, -shard.image.height / 2);
            ctx.restore();

            shard.x += shard.vx;
            shard.y += shard.vy;
            shard.r += shard.vr;
        }
    } else {
        const ship = assets.get("ship");
        if (ship.ready) {
            ctx.drawImage(ship, canvas.width / 2 - ship.width / 2, canvas.height / 2 - ship.height / 2);

            i--;

            if (i === 0) {
                shards.push(...turnImageIntoShards(ship).map(shard => ({
                    image: shard,
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    vx: Math.random() * 1 - .5,
                    vy: Math.random() * 1 - .5,
                    r: 0,
                    vr: Math.random() * .005 - .0025
                })));
            }
        }
    }

    console.log(i);

    requestAnimationFrame(draw);
}

draw();