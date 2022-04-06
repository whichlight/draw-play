/*
grubs

prompt: yellowtail https://editor.p5js.org/golan/sketches/3_V73feC_

*/


let w, h;
let pathStarted = false;
let g_path;
let paths = [];

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 0);

}

function draw() {
    background(0, 0, 0);

    if (mouseIsPressed) {
        if (!pathStarted) {
            g_path = new Path();
            pathStarted = true;
            paths.push(g_path);
        }
        if (pathStarted) {
            g_path.addPoint(mouseX, mouseY);
        }
    }

    if (!mouseIsPressed) {
        if(pathStarted){
            g_path.completed = true; 
        }
        pathStarted = false;
    }

    paths.forEach((p) => {
        p.drawPath();
    });


    paths.forEach((p) => {
        if(p.completed){
            p.update();

        }
    });
}

class Point {
    constructor(p, c) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.c = c;
        this.completed = false; 
    }
}

class Path {
    constructor() {
        this.points = [];
        this.index = 0;
        this.r = 20;
        this.c = 180;
    }

    addPoint(x, y) {
        let p = new Point(createVector(x, y), this.c);
        this.points.push(p);
    }

    drawPath() {
      

        this.points.forEach((p,i) => {
            if(i<this.points.length-1){
                let p = this.points[i];
                let q = this.points[i+1];
                p.c = this.c;

                let r = max(10,3*p5.Vector.dist(p.pos, q.pos)); 
                noFill();
                stroke(0, 0, 100);
               // strokeWeight(r);
               // line(p.x, p.y, q.x, q.y);
               ellipse(p.x, p.y, r, r);

            }
        });

        if(this.index< this.points.length-1){
            let p = this.points[this.index];
            let q = this.points[this.index+1];
            p.c = this.c;
            let r = max(10,3*p5.Vector.dist(p.pos, q.pos)); 


            strokeWeight(1);
            fill(0,0,100);
           // noFill();
           // line(p.x, p.y, q.x, q.y);
            ellipse(p.x, p.y, r, r);
        }

    }

    update() {
        this.index++;
        this.index %= this.points.length;
       
        // move things around 
        if(this.points.length>2){
            let p = this.points[0].pos;
            let q = this.points[1].pos;
            this.points.shift(); 
    
            let v3 = p5.Vector.sub(q, p);
            let j = p5.Vector.add(this.points[this.points.length-1].pos, v3);
            this.addPoint(j.x,j.y);

        }
       

    }

}