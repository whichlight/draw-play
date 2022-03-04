
let w,h; 
let pathStarted = false; 
let g_path; 
let paths = []; 
let bc = 240; 

function setup() {
    w = windowWidth; 
    h = windowHeight; 
    createCanvas(w,h);
    colorMode(HSB, 360, 100, 100); 
    background(0,0,0);
    rectMode(CENTER);
}

function draw() {
    background(bc,100,100,0.1);
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

class Path{
    constructor(){
        this.points = [];
        this.index = 0; 
        this.r = 20;
        this.max = 0; 
    }

    addPoint(x,y){
        this.points.push(createVector(x,y));
    }

    drawPath(){
        this.points.forEach((p,i)=>{
            if(i<(this.points.length-1)){
               // strokeWeight(1);
             //   stroke(0,0,10);
             noStroke();
                let d = p5.Vector.sub(this.points[i+1], this.points[i]);
                let r = d.mag();
                if(this.max<r) this.max = r; 
                r = r*sin(frameCount*0.05+i*0.5); 
                fill(bc-60,100,100);
                rect(p.x, p.y, r, r);
            }
        })
    }


}