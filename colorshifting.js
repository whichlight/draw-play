let w, h;
let pathStarted = false;
let g_path;
let paths = [];
let g_changeNode = [-1,-1]; 

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
            if (d > (collission_dist)) {
                noStroke();
                collideColor(p_i, g_path.r);
                strokeWeight(g_path.r);
                stroke(g_path.c, 100, 100,0.8);
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
        this.r = 20;
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
    paths.forEach((path, path_i) => {
        path.points.forEach((point, point_i) => {
            let d = p5.Vector.dist(point, p);
            //make sure it doesn't change color twice in the same point (or neighbors) when crossing
            if (d!=0 && d < dist && !(g_changeNode[0]==path_i && abs(g_changeNode[1]-point_i)<2)) {
                g_path.c = newColor();
                g_changeNode = [path_i, point_i];
                console.log(g_changeNode);
            }
        });
    });
  
}

function newColor() {
    let c = g_path.c+=30; 
    c%=360; 
    return c;
}