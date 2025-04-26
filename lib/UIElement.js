export default class UIElement {
    constructor(isRound = false, draggable = false, isGameObject = false) {
        this.x = 0;
        this.y = 0;

        this.isRound = isRound;
        this.draggable = draggable;
        this.isGameObject = isGameObject;
        this.canBeDropedInto = false;

        if (this.isRound) {
            this.radius = 1;
        } else {
            this.width = 1;
            this.height = 1;
        }

        this.scaleAtRender = 1;

        this.isDragging = false;

        this.object = null;
    }

    callback() {}

    onDrop() {}

    contains(x, y, cx, cy, cw, ch, scale) { // mouse x, mouse y, camera x, camera y, canvas width, canvas height
        if (this.isGameObject) {
            x += cx * scale - cw / 2;
            y += cy * scale - ch / 2;
        }

        if (this.isRound) {
            const dx = x * this.scaleAtRender - this.x;
            const dy = y * this.scaleAtRender - this.y;

            return dx * dx + dy * dy < this.radius * this.radius;
        }

        return x * this.scaleAtRender >= this.x &&
            x * this.scaleAtRender <= this.x + this.width &&
            y * this.scaleAtRender >= this.y &&
            y * this.scaleAtRender <= this.y + this.height;
    }
}