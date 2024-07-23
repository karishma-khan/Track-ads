<template>
    <div id="container" ref="container">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  
  <script>
  
  export default {
  data() {
    return {
      circles: [],
      numCircles: 10,
      circleRadius: 10,
      speed: 2
    };
  },
  mounted() {
    this.initializeCanvas();
    this.initializeCircles();
    this.update = this.update.bind(this);
    this.update();
  },
  methods: {
    initializeCanvas() {
      const canvas = this.$refs.canvas;
      const container = this.$refs.container;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    },
    initializeCircles() {
      const canvas = this.$refs.canvas;
      const containerWidth = canvas.width;
      const containerHeight = canvas.height;

      for (let i = 0; i < this.numCircles; i++) {
        const angle = Math.random() * 2 * Math.PI;
        const dx = Math.cos(angle) * this.speed;
        const dy = Math.sin(angle) * this.speed;

        this.circles.push({
          x: Math.random() * (containerWidth - 2 * this.circleRadius),
          y: Math.random() * (containerHeight - 2 * this.circleRadius),
          dx: dx,
          dy: dy
        });
      }
    },
    update() {
      const canvas = this.$refs.canvas;
      const context = canvas.getContext('2d');
      const containerWidth = canvas.width;
      const containerHeight = canvas.height;

      context.clearRect(0, 0, containerWidth, containerHeight);

      for (const circle of this.circles) {
        circle.x += circle.dx;
        circle.y += circle.dy;

        if (circle.x <= 0 || circle.x >= containerWidth - 2 * this.circleRadius) {
          circle.dx *= -1;
        }

        if (circle.y <= 0 || circle.y >= containerHeight - 2 * this.circleRadius) {
          circle.dy *= -1;
        }

        const dx = circle.x - containerWidth / 2;
        const dy = circle.y - containerHeight;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radius = containerWidth / 2;

        if (distance > radius - this.circleRadius) {
          const angle = Math.atan2(dy, dx);
          circle.dx = -Math.cos(angle) * this.speed;
          circle.dy = -Math.sin(angle) * this.speed;
        }

        context.beginPath();
        context.arc(circle.x + this.circleRadius, circle.y + this.circleRadius, this.circleRadius, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.closePath();
      }

      requestAnimationFrame(this.update);
    }
  }
};


  </script>
  
  <style scoped>
  body, html {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: #f0f0f0;
  }
  
  #container {
    position: relative;
    width: 100vw;
    height: 30vw;
    border-radius: 0 0 5% 5%;
    background-color: #2196F3;
  }
  
  .circle-container {
    position: relative;
    width: 100%;
    height: 100%;
  }
  
  .circle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
  }
  </style>
  