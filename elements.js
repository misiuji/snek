class bodyC {
    constructor(x, y, i, bufferSize) {
        //id of the element (0 is closest to head)
        this.id = i;
        //positions of the element
        this.pos = createVector(x, y);
        //the element below this one
        this.bel = null;
        //buffer for movment (element will move to the positions you will give it after delay number of other positions)
        this.buffer = [];
        //setting the side od the buffer
        for (let i = 0; i < bufferSize; i++) {
            this.buffer.push(createVector(x, y));
        }
    }
    setChild(other) {
        this.bel = other;
    }
    move(x, y) {
        //if element has a child give it current position
        if (this.bel != null) {
            this.bel.move(this.pos.x, this.pos.y);
        }
        //get first positon od the buffer
        let v = this.buffer.shift();
        //set it as the position
        this.pos = v;
        //put the given position to the end of the buffer
        this.buffer.push(createVector(x, y));
    }
    show() {
        //switch to hls mode (for lgbt mode)
        colorMode(HSL, 100);
        //change the first to this.id % 100
        fill(0, 0, 100);
        // draw the element
        ellipse(this.pos.x, this.pos.y, 20, 20);
        //get back to rgb mode
        colorMode(RGB, 255);
    }
}

class headC {
    constructor(x, y, other) {
        //positions of the element
        this.pos = createVector(x, y);
        //the angle of the head
        this.angle = 0;
        //the element below this one
        this.bel = other;
    }
    moveTo(x, y) {
        this.pos = createVector(x, y);
    }
    move() {
        //make a vector form the head's angle with the sise of 5 (the speed)
        let v1 = p5.Vector.fromAngle(this.angle, 10);
        //and add it to the position
        this.pos.add(v1);
        //if head has an element below
        if (this.bel != null) {
            //give it curnet position
            this.bel.move(this.pos.x, this.pos.y);
        }
    }
    rotateTo(x, y) {
        //the vetctor from the head to the rotation position
        let v = createVector(x - this.pos.x, y - this.pos.y);
        //the angle od it
        let mouseA = v.heading();
        //the diffrance of the head's angle and the angle to the position
        let diff = this.angle - mouseA;
        //if the head's angle is positiv and the position angle is negativ 
        if (diff > PI / 2) {
            diff -= TWO_PI;//fix it
        }
        //vice versa
        if (diff < -PI) {
            diff += TWO_PI;//fix it
        }

        //create a temperary vector to check if mouse isn't too close to head
        let vM = createVector(mouseX - this.pos.x, mouseY - this.pos.y);
        //if mouse is not touthing the head
        if (vM.mag() > 10) {
            //deacrese the diffrance by 10%
            this.angle -= diff * 0.1;
            //rotate the head by rot rad
            let rot = 0.1;
            // this.angle -= (diff > 0) ? rot : -rot;
        }
        //in case of overflow
        this.angle = this.angle % TWO_PI;
        //random movment
        // let scale = 0.001;
        // this.angle = (noise(this.pos.x * scale, this.pos.y * scale) * PI * 10) % TWO_PI;
    }
    show() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    }
}

