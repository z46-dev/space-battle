export default class LocalPlayer {
    constructor(id) {
        this.id = id;
    }

    get XORKey() {
        // Based on ID
    }

    load() {
        this.data = JSON.parse(atob(localStorage.getItem("player-" + this.id)));
    }
}