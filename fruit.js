class fruitC {
    constructor(x, y) {
        this.pos = createVector(x, y);
    }
    show() {
        fill(255, 0, 0);
        ellipse(this.pos.x, this.pos.y, 10, 10);
    }
    isAte(x, y, r) {
        return createVector(x, y).dist(this.pos) < r + 10;
    }
}