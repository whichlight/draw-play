
let w, h;
let x, y;
let pathStarted = false; 
let g_path; 

let paths = []

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 100);

}

function draw() {
    if(mouseIsPressed){
        if(!pathStarted){
            g_path = new Path(); 
            pathStarted = true; 
            paths.push(g_path); 

        }
        if(pathStarted){
            g_path.addPoint(mouseX, mouseY);
        }
    }

    if(!mouseIsPressed){
        pathStarted = false; 
    }

    paths.forEach((p)=>{
        p.drawPath();
    });





}


class Path {
    constructor() {
        this.points = [];
    }

    addPoint(x, y) {
        this.points.push(createVector(x, y));
    }

    drawPath() {
        fill(0, 0, 100);
        beginShape(TRIANGLE_FAN);
        this.points.forEach((p) => {
            vertex(p.x, p.y);
        });
        endShape(FILL);
    }
}
