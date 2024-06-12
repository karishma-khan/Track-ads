<template>
    <div class="container">
      <div v-for="(circle, index) in circles" :key="index" :class="'circle ' + circle.color" :style="{ width: circle.size + 'px', height: circle.size + 'px', top: circle.y + 'px', left: circle.x + 'px' }"></div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        circles: []
      }
    },
    mounted() {
      this.initCircles();
    },
    methods: {
      initCircles() {
        for (let i = 0; i < 100; i++) {
          this.createCircle();
        }
      },
      createCircle() {
        const size = this.getRandomInt(20, 80);
        const color = `bg-[rgb(${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)}, ${this.getRandomInt(0, 255)})]`;
        const containerWidth = this.$el.clientWidth; // Get the width of the container
        const containerHeight = this.$el.clientHeight; // Get the height of the container
  
        // Calculate random positions within the container bounds
        const x = Math.random() * (containerWidth - size);
        const y = Math.random() * (containerHeight - size);
  
        const circle = {
          size: size,
          color: color,
          x: x,
          y: y,
          dx: 2 * (Math.random() - 0.5),
          dy: 2 * (Math.random() - 0.5)
        };
        this.circles.push(circle);
      },
      getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      },
      animateCircle(circle) {
        const update = () => {
          circle.x += circle.dx;
          circle.y += circle.dy;
  
          // Bounce off the container boundaries
          if (circle.x < 0 || circle.x + circle.size > this.$el.clientWidth) {
            circle.dx *= -1;
          }
          if (circle.y < 0 || circle.y + circle.size > this.$el.clientHeight) {
            circle.dy *= -1;
          }
  
          requestAnimationFrame(update);
        }
  
        update();
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: #f0f0f0;
  }
  
  .circle {
    position: absolute;
    border-radius: 50%;
  }
  </style>
  