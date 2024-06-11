<template>
    <div>
      <div id="canvas" ref="canvas">
        <div v-for="(ball, index) in balls" :key="index" :ref="`ball${index}`" class="ball"></div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        balls: [
          { x: 150, y: 150, dx: 2, dy: 2 },
          { x: 100, y: 100, dx: -2, dy: 2 },
          { x: 200, y: 200, dx: 2, dy: -2 }
        ],
        canvasRadius: 0,
        ballRadius: 0,
        gravity: 0.1
      };
    },
    mounted() {
      this.$nextTick(() => {
        this.canvasRadius = this.$refs.canvas.offsetWidth / 2;
        this.ballRadius = this.$refs.ball0.offsetWidth / 2;
        this.moveBalls();
      });
    },
    methods: {
      moveBalls() {
        requestAnimationFrame(this.moveBalls);
        this.balls.forEach((ball, index) => {
          ball.dy += this.gravity;  // Apply gravity to the vertical velocity
          ball.x += ball.dx;
          ball.y += ball.dy;
  
          // Calculate distance from the center of the canvas
          const distFromCenter = Math.sqrt((ball.x - this.canvasRadius) ** 2 + (ball.y - this.canvasRadius) ** 2);
  
          // Check if the ball is hitting the circular boundary
          if (distFromCenter + this.ballRadius >= this.canvasRadius) {
            // Calculate the angle of the collision
            const angle = Math.atan2(ball.y - this.canvasRadius, ball.x - this.canvasRadius);
            const normalX = Math.cos(angle);
            const normalY = Math.sin(angle);
  
            // Calculate the dot product of the velocity vector and the normal vector
            const dotProduct = ball.dx * normalX + ball.dy * normalY;
  
            // Reflect the velocity vector
            ball.dx = ball.dx - 2 * dotProduct * normalX;
            ball.dy = ball.dy - 2 * dotProduct * normalY;
  
            // Slightly move the ball out of the boundary to prevent it from getting stuck
            const overlap = distFromCenter + this.ballRadius - this.canvasRadius;
            ball.x -= overlap * normalX;
            ball.y -= overlap * normalY;
          }
  
          // Move the ball to the new position
          this.$refs[`ball${index}`][0].style.left = `${ball.x - this.ballRadius}px`;
          this.$refs[`ball${index}`][0].style.top = `${ball.y - this.ballRadius}px`;
        });
      }
    }
  };
  </script>
  
  <style scoped>
  #canvas {
    position: relative;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 2px solid #000;
    overflow: hidden;
  }
  .ball {
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: red;
  }
  </style>
  