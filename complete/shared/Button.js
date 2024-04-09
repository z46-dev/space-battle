import { ctx } from "./canvas.js";
import { Color, drawText } from "./render.js";


export default class UIButton {
    static IDAccumulator = 0;

    /**
     * @type {Map<number, UIButton>}
     */
    static buttons = new Map();

    static drawAll(mouseX, mouseY) {
        this.buttons.forEach(button => {
            button.mouseIsOver = button.contains(mouseX, mouseY);
            button.draw();
        });
    }

    constructor(x, y, width, height) {
        this.id = UIButton.IDAccumulator++;
        this.centerX = x;
        this.centerY = y;
        this.width = width;
        this.height = height;
        this.color = "#FFFFFF";
        this.mouseIsOver = false;
        this.rotation = 0;
        this.keybind = false;
        this.drawKeybind = true;
        this.enabled = true;

        UIButton.buttons.set(this.id, this);
    }

    bounds() {
        return {
            left: this.centerX - this.width / 2,
            right: this.centerX + this.width / 2,
            top: this.centerY - this.height / 2,
            bottom: this.centerY + this.height / 2
        };
    }

    contains(x, y) {
        const bounds = this.bounds();
        return x >= bounds.left && x <= bounds.right && y >= bounds.top && y <= bounds.bottom;
    }

    draw() {
        let fill = this.color;

        if (this.mouseIsOver) {
            fill = Color.mix(fill, "#FFFFFF", .2);
        }

        ctx.beginPath();
        ctx.rect(this.centerX - this.width / 2, this.centerY - this.height / 2, this.width, this.height);
        ctx.closePath();

        ctx.fillStyle = fill;
        ctx.fill();

        ctx.strokeStyle = Color.mix(fill, "#000000", .5);
        ctx.lineWidth = 4;
        ctx.stroke();
        
        ctx.translate(this.centerX, this.centerY);
        ctx.scale(this.width / 10, this.width / 10);
        const rot = this.rotation;
        ctx.rotate(rot);
        this.nowDrawMe();
        ctx.rotate(-rot);
        ctx.scale(1 / (this.width / 10), 1 / (this.width / 10));
        ctx.translate(-this.centerX, -this.centerY);

        if (this.keybind !== false && this.drawKeybind) {
            ctx.textAlign = "right";
            ctx.textBaseline = "bottom";
            drawText(`[${this.keybind}]`, this.centerX + this.width / 2, this.centerY + this.height / 2, this.width * .3);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
        }
    }

    nowDrawMe() {}

    clickEvent() {
        alert("err.no-click-event");
    }
}