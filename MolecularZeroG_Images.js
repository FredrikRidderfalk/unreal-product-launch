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
    this.radius = Math.random() * 40 + 4;
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
      this.x - this.radius * 2,
      this.y,
      this.radius * 4,
      this.radius * 4
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
