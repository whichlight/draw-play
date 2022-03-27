
let w, h;
let points = [];
let cols = [60,180,300];
let g_start, g_end = 0; 
let toActivate = []; 

function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 0);
    frameRate(25);

}


function touchStarted(){
    g_start = new Point(createVector(mouseX, mouseY));
}

function touchEnded(){
    g_end = new Point(createVector(mouseX, mouseY)); 
    let d = p5.Vector.dist(g_start.pos, g_end.pos)
    if(d==0){
        let p = pointCollides(g_end); 
        if(p!=-1) {
            p.activate(p.newstate);
        }
    }
}

function mouseDragged(){
    let p = new Point(createVector(mouseX, mouseY));
    points.push(p);

}

function draw() {
    background(0,0,0);
    if (mouseIsPressed) {
      

    }

    toActivate = [];
    points.forEach((p)=>{
        p.draw(); 
        p.update(); 
    });

    toActivate.forEach((ps) => {
        ps[0].activate(ps[1]);
    });


}

class Point {
    constructor(p) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.c = 0;
        this.r = 20;
        this.state = 0; //0,1,2 
        this.newstate = 1;
    }

    activate(n){
        this.state = n;
    }

    draw(){
        fill(cols[this.state], 100, 100);
        ellipse(this.x, this.y, this.r, this.r);
    }

    activateNeighbors(){
        points.forEach((p,i)=>{
            let d = p5.Vector.dist(p.pos, this.pos);
            if (d < p.r && p!=this && p.state!=this.state) {
                toActivate.push([p, this.state]); 
                p.newstate = this.state; 
            }
        });
    }

    update(){
        if(this.state==this.newstate ){
            this.activateNeighbors(); 
            this.newstate = this.state+1; 
            this.newstate%=cols.length; 
        }
    }

}

function pointCollides(q){
    let collidePoint = -1; 
    points.forEach((p)=>{
        let d = p5.Vector.dist(p.pos, q.pos);
        if (d < p.r/2) {
            collidePoint = p;
        }
    });
    return collidePoint; 
}
