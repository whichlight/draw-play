
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
    //background(0, 0, 0);
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
        pathStarted = false;
    }

    paths.forEach((p) => {
        p.drawPath();
    });


    paths.forEach((p) => {
      //  p.highlight();
        p.collides();
        p.update();
    });


}

class Point {
    constructor(p, c) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.c = c;
    }

}

class Path {
    constructor() {
        this.points = [];
        this.index = 0;
        this.r = 20;
        this.c = 180;
        this.glow = 100;
        this.changeIndex = -1;
    }

    addPoint(x, y) {
        let p = new Point(createVector(x, y), this.c);
        this.points.push(p);
    }

    drawPath() {
        /*
        //had to remove this to allow for layers to interweave
        //and draw on top of each other
        //rather than having each layer with a fixed z index 
        this.points.forEach((p, i) => {
            if (i < (this.points.length - 1)) {
                strokeWeight(this.r);
                stroke(p.c, this.glow, 100,0.8);
                line(p.x, p.y, this.points[i + 1].x, this.points[i + 1].y);
                if (i == this.index) {
                    p.c = this.c;
                }
            }
        })
        */

        if(this.index< this.points.length-1){
            let p = this.points[this.index];
            let q = this.points[this.index+1];
            p.c = this.c;
            strokeWeight(this.r);
            stroke(p.c, this.glow, 100,1);
            line(p.x, p.y, q.x, q.y);


            noFill();
            strokeWeight(2);
            stroke(p.c, 90, 50);
            ellipse(p.x, p.y, this.r, this.r);


            
        }
       
    }

    highlight() {
        let p = this.points[this.index];
        noFill();
        strokeWeight(2);
        stroke(p.c, 90, 50);
        ellipse(p.x, p.y, this.r, this.r);
    }

    update() {
        if (this.glow < 100) this.glow += 10;
        this.index++;
        this.index %= this.points.length;
        if (this.index == 0) this.changeIndex = -1;
    }

    collides() {
        paths.forEach((path) => {
            let p2 = path.points[path.index];
            let p1 = this.points[this.index];
            let d = p5.Vector.dist(p1.pos, p2.pos);

            if (d < this.r / 2 && path != this) {

                //check there wasn't a collission nearby
                let farEnough = false;
                if (this.changeIndex > -1) {
                    let p_coll = this.points[this.changeIndex];
                    farEnough = p5.Vector.dist(p1.pos, p_coll.pos) > this.r;
                }

                if (farEnough || this.changeIndex == -1) {
                    this.colorUpdate();
                    this.changeIndex = this.index;
                }
            }
        });
    }

    colorUpdate() {
        this.c += 60;
        this.c %= 360;
    }




}