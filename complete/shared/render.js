import { ctx } from "./canvas.js";

export class Color {
    /**
     * @type {Map<string, string>}
     */
    static #cache = new Map();
    
    static #lerp(from, to, strength) {
        return (to - from) * strength + from;
    }

    static mix(primary, secondary, amount) {
        const key = `${primary}${secondary}${amount}`;

        if (this.#cache.has(key)) {
            return this.#cache.get(key);
        }

        const pr = parseInt(primary.slice(1), 16);
        const se = parseInt(secondary.slice(1), 16);

        const re = 
            1 << 24 |
            (this.#lerp((pr >> 16) & 255, (se >> 16) & 255, amount) | 0) << 16 |
            (this.#lerp((pr >> 8) & 255, (se >> 8) & 255, amount) | 0) << 8 |
            (this.#lerp(pr & 255, se & 255, amount) | 0);

        const hex = "#" + re.toString(16).slice(1);

        this.#cache.set(key, hex);

        return hex;
    }
}

export function drawText(text, x, y, size, fill, stroke = Color.mix(fill, "#000000", .334)) {
    ctx.font = `bold ${size}px sans-serif`;
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = size / 5;

    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
}