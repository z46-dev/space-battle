export default class UIElement {
    constructor(isRound = false) {
        this.x = 0;
        this.y = 0;

        this.isRound = isRound;

        if (this.isRound) {
            this.radius = 1;
        } else {
            this.width = 1;
            this.height = 1;
        }

        this.scaleAtRender = 1;
    }

    callback() {}

    contains(x, y) {
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

// IMPLEMENT: drag & drop on top of UIElement, Fleet drag, fleet merge, fleet attack, planet conquer, shipyard!