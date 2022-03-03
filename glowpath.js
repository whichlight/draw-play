
let w,h; 
let pathStarted = false; 
let g_path; 
let paths = []; 

function setup() {
    w = windowWidth; 
    h = windowHeight; 
    createCanvas(w,h);
    colorMode(HSB, 360, 100, 100); 
    background(0,0,0);

}

function draw() {
    background(0,0,0,0.1);
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


    paths.forEach((p)=>{
        p.highlight(); 
    });


}

class Path{
    constructor(){
        this.points = [];
        this.index = 0; 
        this.r = 20;
    }

    addPoint(x,y){
        this.points.push([x,y]);
    }

    drawPath(){
        this.points.forEach((p,i)=>{
            if(i<(this.points.length-1)){
                strokeWeight(this.r);
                stroke(0,0,10,0.1); 
                line(p[0], p[1], this.points[i+1][0], this.points[i+1][1]);
            }
        })
    }

    highlight(){
        let p = this.points[this.index]; 
        noStroke();
        fill(0,0,100);
        ellipse(p[0],p[1], this.r, this.r);
        this.index++; 
        this.index%=this.points.length;  
    }


}