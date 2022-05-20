
let w, h;
let points = []; 
const rad = 15; 
let g_color = 0; 
let newcolor = false; 
let centerVec; 


function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 0);
    rectMode(CENTER);
    centerVec = createVector(w/2, h/2)
    angleMode(DEGREES);
  
}

function draw() {
    background(0, 0, 0, 0.1);
    if (mouseIsPressed) {
        if(newcolor){
            newcolor = false; 
            g_color+=60;
            g_color%=360;  
        }

        let p = new Point(createVector(mouseX, mouseY));

        if(p.pos.x>=0 && p.pos.x <= w && p.pos.y >= 0 && p.pos.y <= h){
            points.push(p);
        }
    }

    if(!mouseIsPressed){
       newcolor = true; 
    }

 
    points.forEach((p)=>{
        p.draw(); 
        p.update(); 

        if(p.rm){
            const index = points.indexOf(p);
            points.splice(index, 1); 
        }
        
    });



   



}

class Point {
    constructor(p) {
        this.pos = p;
        this.r = rad;
        this.rm = false; 
        this.c = g_color; 
        this.angle = this.pos.angleBetween(centerVec);
        this.d = p5.Vector.sub(this.pos, centerVec);
      
    }

    draw(){

        for(let s = 0; s<6; s+=1){
            let c = this.c +(s*60); 
            c%=360; 
            push()
            translate(centerVec.x, centerVec.y); 
            rotate(60*s);
            noStroke();
            fill(c, 100, 100);
            ellipse(this.d.x, this.d.y, this.r, this.r);
            pop(); 

        }
    



    }

    update(){

        this.d.x *=1.005; 
        this.d.y *=1.005; 
        this.pos.x = this.d.x + centerVec.x; 
        this.pos.y = this.d.y + centerVec.y; 

        let outside = (this.pos.x<0 || this.pos.x > w || this.pos.y < 0 || this.pos.y > h);
        if(outside) {this.rm = true;}

    }

}