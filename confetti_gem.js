
let w, h;
let points = [];
const rad = 20;


function setup() {
    w = windowWidth;
    h = windowHeight;
    createCanvas(w, h);
    colorMode(HSB, 360, 100, 100);
    background(0, 0, 0);
    frameRate(35);
    rectMode(CENTER);


    for (let i = 0; i < 1000; i++) {
        let x = random(0,w);
        let y = random(0,h); 
        let c = random()<0.5 ? 0 : 100;
        let r = rad*2

        push();
        noStroke();
        fill(0,0,c);
      //  rotate(random(-0.5,0.5));
        rect(x,y,r,r);
        pop();
    
    }

}

function draw() {
    //background(0, 0, 0);

    points.forEach((p) => {
        p.draw();
        p.update();
    });


    //remove
    points.forEach((p) => {
        if (p.r <= 0) {
            const index = points.indexOf(p);
            if (index > -1) points.splice(index, 1);
        }

    });

    if(mouseIsPressed){
        for (let i = 0; i < 3; i++) {
            let p = new Point(createVector(mouseX, mouseY));
            if (p.x >= 0 && p.x <= w && p.y >= 0 && p.y <= h) {
                points.push(p);
            }
        }
    }



}



class Point {
    constructor(p) {
        this.pos = p;
        this.x = this.pos.x;
        this.y = this.pos.y;
        this.r = rad;
        this.life = 150;
        this.speed = random(0.5,1); 
        this.dir = random(0,2*PI);
        this.rotation = random(0,2*PI);
        this.spin = random(-1,1)*0.1;
        this.v = createVector(this.speed * cos(this.dir), this.speed * sin(this.dir));
    }

    draw() {
        push();
        translate(this.x, this.y);
        noStroke();
        rotate(this.rotation);
        fill(random(360), 100, 100);
        rect(0,0, this.r, this.r);
        pop(); 

    }

    update() {
        
        if(this.r > rad*0.8){
            this.r -= 1 /20;
            this.x += this.v.x;
            this.y += this.v.y;
        } else{
            this.r -= 1 /2;
        }
        this.rotation +=this.spin; 
        this.life--;

    }

}
