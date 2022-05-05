// Uncomment connect() for an additional geometrical effect

const canvas = document.getElementById("canvasMolecularZeroG");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let numberOfParticles = 20;
const particlesArray = [];

// ------ IMAGE SETUP ------
const img = new Image();
img.src = "assets/cup.png";
const imgWidth = 750;
const imgHeight = 750;

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 30 + 4;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.opacity = 1;
  }
  draw() {
    ctx.drawImage(
      img,
      0,
      0,
      imgWidth,
      imgHeight,
      this.x,
      this.y,
      this.radius * 3,
      this.radius * 3
    );
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.radius > 11) {
      this.opacity = 0.6;
    }
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.speedX = -this.speedX;
    }
    if (this.y + this.radius > canvas.height || this.y + this.radius < 0) {
      this.speedY = -this.speedY;
    }
    this.draw();
  }
}
function init() {
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }
  //   connect();
  requestAnimationFrame(animate);
}
init();
animate();

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  particlesArray = [];
  init();
});

function connect() {
  let opacityValue = 1;
  // this function is all we need to replicate the particle.js library with vanilla JavaScript
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx * dx + dy * dy);
      let maxConnectedDistance = 200; // change this value if more and longer connected lines between the particles is desired

      if (distance < maxConnectedDistance) {
        opacityValue = 1 - distance / maxConnectedDistance;
        ctx.strokeStyle = `rgba(20, 220, 220, ${opacityValue})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x - 50, particlesArray[a].y - 50);
        ctx.lineTo(particlesArray[b].x - 50, particlesArray[b].y - 50);
        ctx.stroke();
      }
    }
  }
}
