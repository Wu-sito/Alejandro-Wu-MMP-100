let fireworks = [];
let bg; 

function preload() {
  
  bg = loadImage('./Website/genshin night view.jpg'); 
}

function setup() {
  createCanvas(800, 600);
}

function draw() {

  background(bg);

  
  for (let i = fireworks.length - 1; i >= 0; i--) {
    fireworks[i].update();
    fireworks[i].display();
    if (fireworks[i].isFinished()) {
      fireworks.splice(i, 1); 
    }
  }
}

function mousePressed() {

  fireworks.push(new Firework(mouseX, mouseY));
}

class Firework {
  constructor(x, y) {
    this.origin = createVector(x, height);
    this.target = createVector(x, y);
    this.exploded = false;
    this.particles = [];
    this.color = color(random(255), random(255), random(255));
    this.lifetime = 255;
  }

  update() {
    if (!this.exploded) {

      let distance = dist(this.origin.x, this.origin.y, this.target.x, this.target.y);
      if (distance > 5) {
        this.origin.y -= 5;
      } else {
        this.exploded = true;
        this.createParticles();
      }
    } else {

      for (let particle of this.particles) {
        particle.update();
      }
      this.lifetime -= 5;
    }
  }

  display() {
    if (!this.exploded) {
      fill(this.color);
      ellipse(this.origin.x, this.origin.y, 10, 10);
    } else {
      for (let particle of this.particles) {
        particle.display();
      }
    }
  }

  createParticles() {
    for (let i = 0; i < 200; i++) {
      let angle = random(TWO_PI);
      let speed = random(3, 7);
      let velocity = createVector(cos(angle) * speed, sin(angle) * speed);
      this.particles.push(new Particle(this.origin.x, this.origin.y, velocity, this.color));
    }
  }

  isFinished() {
    return this.exploded && this.lifetime <= 0;
  }
}

class Particle {
  constructor(x, y, velocity, color) {
    this.pos = createVector(x, y);
    this.velocity = velocity;
    this.color = color;
    this.lifetime = 155;
  }

  update() {
    this.pos.add(this.velocity);
    this.velocity.mult(0.95); 
    this.lifetime -= 5;
  }

  display() {
    fill(red(this.color), green(this.color), blue(this.color), this.lifetime);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 7, 7);
  }
}
