
let w, h;
let points = [];
const rad = 30; 


function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 0);
    frameRate(35);

}


function mouseDragged(){
    let p = new Point(createVector(mouseX, mouseY));

    if(p.x>=0 && p.x <= w && p.y >= 0 && p.y <= h){
        points.push(p);
    }

}

function draw() {
    background(0,0,0);

    points.forEach((p)=>{
        p.draw(); 
        p.update(); 
    });

}



class Point {
    constructor(p) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.r = rad;
    }

    draw(){
        noStroke();
        fill(random(360), 100, 100);
        rect(this.x, this.y, this.r, this.r);
    }

    update(){
     
    }

}
