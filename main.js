/// <reference path="./p5.global-mode.d.ts" /> 
var worm;
var fruit = [];
var amount = 50;
var ded = false;
var score = 0;
function setup() {
    // frameRate(3);
    createCanvas(window.innerWidth, window.innerHeight - 4);
    background(0);
    strokeWeight(1);
    stroke(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    worm = new wormC(width / 2, height / 2, 100, 1);
    fruit = [];
    //creating fruits
    for (let i = 0; i < amount; i++) {
        fruit.push(new fruitC(random(50, width - 50), random(50, height - 50)));
    }
}
function draw() {
    background(0);
    fill(255);
    //death 
    if (worm.isDead() && frameCount > 10) {
        ded = true;
    }
    if (!ded) {
        worm.moveAndShow();
    }
    //cheking if any fruits has been eten and dispalying them
    for (let i = 0; i < amount; i++) {
        fruit[i].show();
        if (fruit[i].isAte(worm.head.pos.x, worm.head.pos.y, 10)) {
            fruit[i] = new fruitC(random(50, width - 50), random(50, height - 50));
            worm.addElement();
            score++;
        }
    }
    fill(255);
    textAlign(RIGHT, BOTTOM);
    textSize(24);
    text("The Score:" + score, width - 10, height - 10);
    if (ded) {
        drawDeathScreen();
    }
}

function mousePressed() {
    if (ded) {
        setup();
        frameCount = 0;
        ded = false;
        score = 0;
    }
}

function drawDeathScreen() {
    fill(255);
    background(0);
    textAlign(CENTER, CENTER);
    textSize(32);
    text("YOU LOST\nThe score: " + score + "\nPress the mouse button to restart", width / 2, height / 2);
}
