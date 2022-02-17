const particles = [];
function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const numParticles = Math.floor(window.innerWidth / 10);

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    const adjustParticles =
        Math.floor(window.innerWidth / 10) - particles.length;

    if (adjustParticles > 0) {
        for (let i = 0; i < adjustParticles; i++) {
            particles.push(new Particle());
        }
    } else {
        for (let i = 0; i < -adjustParticles; i++) {
            particles.pop();
        }
    }
}

function draw() {
    clear();
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        this.pos = createVector(random(width), random(height));
        this.size = 5;
        this.connectionRange = 120;
        const velFactor = 2;
        this.vel = createVector(
            random(-velFactor, velFactor),
            random(-velFactor, velFactor)
        );
    }

    draw() {
        noStroke();
        fill('rgba(255,255,255,0.3)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    edges() {
        if (this.pos.x < 0) {
            this.pos.x = width;
        }
        if (this.pos.x > width) {
            this.pos.x = 0;
        }

        if (this.pos.y < 0) {
            this.pos.y = height;
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
        }

        // if (this.pos.y < 0 || this.pos.y > height) {
        //     this.pos.y %= height;
        // }
    }

    checkParticles(particles) {
        particles.forEach((particle) => {
            const d = dist(
                this.pos.x,
                this.pos.y,
                particle.pos.x,
                particle.pos.y
            );

            if (d < this.connectionRange) {
                const a = 1 - d / this.connectionRange;
                stroke(`rgba(255,255,255,${a})`);
                strokeWeight(1 - d / this.connectionRange);
                line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
            }
        });
    }
}
