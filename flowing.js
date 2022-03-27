
let w, h;
let points = [];
let cols = [60,180,300];
let g_start, g_end = 0; 
let toActivate = []; 

let bins = []; 
const rad = 30; 
const binSize = rad*2; 


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
        let p = pointClicked(g_end); 
        if(p!=-1) {
            p.activate(p.newstate);
        }
    }
}

function mouseDragged(){
    let p = new Point(createVector(mouseX, mouseY));
    let spacer = true;

    if(points.length>1){
        let q = points[points.length-1];
        d = p5.Vector.dist(q.pos, p.pos)
        spacer = (d>rad/6) ? true : false; 
    }

    if(p.x>=0 && p.x <= w && p.y >= 0 && p.y <= h && spacer){
        points.push(p);
    }

}

function draw() {
    background(0,0,0);

    binPoints(); 
  
    toActivate = [];
    points.forEach((p)=>{
        p.draw(); 
        p.update(); 
    });

    toActivate.forEach((p) => {
        p.activate(p.newstate);
    });


}

function drawBins(){
    let xs = w/binSize; 
    let ys = h/binSize; 

    for(let i =0; i<xs; i++){
        stroke(0,0,100);
        line(i*binSize,0,i*binSize,h);
    }

    for(let j =0; j<ys; j++){
        stroke(0,0,100);
        line(0,j*binSize,w,j*binSize);
          
    }
}

class Point {
    constructor(p) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.c = 0;
        this.r = rad;
        this.state = 0;
        this.newstate = 1;
    }

    activate(n){
        this.state = n;
    }

    draw(){
        stroke(0,0,0);
        fill(cols[this.state], 100, 100);
        ellipse(this.x, this.y, this.r, this.r);
    }

    activateNeighbors(q=this){
        let ps = getBinPoints(q.x, q.y);
        ps.forEach((p,i)=>{
            let d = p5.Vector.dist(p.pos, q.pos);
            if (d < p.r && p!=q && p.state!=q.state && !toActivate.includes(p)) {
                toActivate.push(p); 
                p.newstate = q.state; 
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

function pointClicked(q){
    let collidePoint = -1; 

    if(q.x>=0 && q.x <= w && q.y >= 0 && q.y <= h){
        let ps = getBinPoints(q.x, q.y);
        ps.forEach((p)=>{
            let d = p5.Vector.dist(p.pos, q.pos);
            if (d < p.r/2) {
                collidePoint = p;
            }
        });
        
    }

   
    return collidePoint; 
}

function binPoints(){

    bins = []; 

    let xs = w/binSize; 
    let ys = h/binSize; 

    for(let i =0; i<xs; i++){
        let b = []; 
        for(let j =0; j<ys; j++){
            b.push([]);
        }
        bins.push(b); 
    }

    points.forEach((p)=>{
        let xIndex = floor(p.pos.x/binSize); 
        let yIndex = floor(p.pos.y/binSize); 
        bins[xIndex][yIndex].push(p);
    });
}

function getBinPoints(x,y){
    let xNorm = x/binSize; 
    let yNorm = y/binSize; 
    let xIndex = floor(xNorm);
    let yIndex = floor(yNorm); 

    let binPoints = []; 
    //points in bin
    let ps = bins[xIndex][yIndex];
    ps.forEach((p)=>{binPoints.push(p)});

    //nieghborBins 
    let xIndex2, yIndex2 = 0; 

    if(xNorm > xIndex + 0.5) xIndex2 = xIndex+1;  
    else xIndex2 = xIndex-1;
    if(yNorm > yIndex + 0.5) yIndex2 = yIndex+1;  
    else yIndex2 = yIndex-1;


    if(xIndex2 >= 0 && xIndex2 < bins.length) {
        ps = bins[xIndex2][yIndex];
        ps.forEach((p)=>{binPoints.push(p)});

        if(yIndex2 >= 0 && yIndex2 <bins[0].length) {
          ps = bins[xIndex2][yIndex2];
          ps.forEach((p)=>{binPoints.push(p)});
        }
      }

      if(yIndex2 >= 0 && yIndex2 <bins[0].length){
        ps = bins[xIndex][yIndex2];
        ps.forEach((p)=>{binPoints.push(p)});
      }

    return binPoints; 
}

/*
//add binning
// rewrite point search function 
// create bins 
//add bins in fxn 
*/
