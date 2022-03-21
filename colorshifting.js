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
    rectMode(CENTER);
}

function draw() {
    // background(0, 0, 0, 0.1);

    if (mouseIsPressed) {
        if (!pathStarted) {
            g_path = new Path();
            pathStarted = true;
            paths.push(g_path);
            let p = createVector(mouseX, mouseY);
            g_path.addPoint(p);
        }

        if (pathStarted) {
            let collission_dist = g_path.r; 
            let p = createVector(mouseX, mouseY);
            let p_i = g_path.points[g_path.points.length - 1];
            let d = p5.Vector.dist(p, p_i);
            if (d > collission_dist) {
                noStroke();
                let c = collideColor(p, collission_dist);
                console.log(c);
                strokeWeight(g_path.r*0.66);
                stroke(g_path.c, 100, 100);
                line(p_i.x, p_i.y, p.x, p.y);

                fill(g_path.c, 100, 100);
                noStroke();
                ellipse(p.x,p.y,collission_dist, collission_dist);
                g_path.addPoint(p);

            }

        }
    }

    if (!mouseIsPressed) {
        pathStarted = false;
    }


}

class Path {
    constructor() {
        this.points = [];
        this.r = 15;
        this.c = 180; 
    }

    addPoint(p) {
        this.points.push(p);
    }

    drawPath() {
        this.points.forEach((p, i) => {



        })
    }

}

function collideColor(p, dist) {
    //iterate through points, see if it intersects
    let c = 0; 
    paths.forEach((path) => {
        path.points.forEach((point) => {
            let d = p5.Vector.dist(point, p);
            if (d < dist) {
                g_path.c = newColor();
           
            }
        });
    });
  
}

function newColor() {
    let c = g_path.c+=30; 
    c%=360; 
    return c;
}