class wormC {
    constructor(x, y, bodyL, bSize) {
        this.bufferSize = bSize;
        this.body = [];
        this.head;
        //----------------------------------------------------creating the body
        //the amound of blobs of the worm
        for (let i = 0; i < bodyL; i++) {
            //pushing the new body element
            this.body.push(new bodyC(x, y, i, this.bufferSize));
        }
        //fxing the first buffer(it needs a bonus slot)
        this.body[0] = new bodyC(x, y, 0, this.bufferSize + 1);
        //seting the releitons of the body
        for (let i = 0; i < bodyL - 1; i++) {
            //the i-th elemnet is the perent of the i+1 th element 
            this.body[i].setChild(this.body[i + 1]);
        }
        //creating the head
        this.head = new headC(x, y, this.body[0]);
    }
    moveAndShow() {
        //rotate the head
        this.head.rotateTo(mouseX, mouseY);
        //move and then show the head
        this.head.move();
        this.head.show();
        //show the worm
        for (var display of this.body) {
            display.show();
        }
    }
    addElement() {
        //the index of last element
        let i = this.body.length - 1;
        //position of the last element
        let x = this.body[i].pos.x;
        let y = this.body[i].pos.y;
        //push new element
        this.body.push(new bodyC(x, y, i + 1, this.bufferSize));
        //set it as the child os the secound to last element
        this.body[i].setChild(this.body[i + 1]);
    }
    isDead() {
        //go through all the elements
        for (let i = 3; i < this.body.length; i++) {
            //check if it's intersecting the head
            if (p5.Vector.dist(this.head.pos, this.body[i].pos) < 20) {
                return true;
            }
        }
        //if non intersect return false
        return false;
    }
}