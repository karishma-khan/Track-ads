<template>
  <div class="Herocontainer">
    <div ref="semicircle" class="semicircle">
      <div class="heroSubtitle">
          Top Political Advertisers on Meta
          <p>As on 30 Mar,2024</p>
      </div>
      <div class="circle-container">
        <div v-for="(circle, index) in circles" :key="index"
             :style="circle.style"
             class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circles: [
        { style: { width: '40px', height: '40px', backgroundColor: 'red' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(188, 93, 93)' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(57, 82, 107)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'red' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(166, 191, 24)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'red' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(189, 75, 149)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'rgb(65, 52, 52)' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'rgb(70, 160, 100)' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(211, 156, 62)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(211, 237, 244)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(188, 93, 93)' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(57, 82, 107)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'red' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(166, 191, 24)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'red' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(189, 75, 149)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'rgb(65, 52, 52)' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'rgb(70, 160, 100)' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(211, 156, 62)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(211, 237, 244)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(188, 93, 93)' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(57, 82, 107)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'red' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(166, 191, 24)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'red' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'red' } },
        { style: { width: '30px', height: '30px', backgroundColor: 'rgb(189, 75, 149)' } },
        { style: { width: '50px', height: '50px', backgroundColor: 'rgb(65, 52, 52)' } },
        { style: { width: '70px', height: '70px', backgroundColor: 'rgb(70, 160, 100)' } },
        { style: { width: '40px', height: '40px', backgroundColor: 'rgb(211, 156, 62)' } },
        { style: { width: '60px', height: '60px', backgroundColor: 'rgb(211, 237, 244)' } },
        // Add more circles as needed
      ]
    };
  },
  mounted() {
    this.positionCircles();
  },
  methods: {
    positionCircles() {
      const semicircle = this.$refs.semicircle;
      const semicircleWidth = semicircle.clientWidth;
      const semicircleHeight = semicircle.clientHeight;
      const radius = semicircleWidth / 2;

      this.circles.forEach((circle, index) => {
        const circleElement = semicircle.querySelector('.circle-container').children[index];
        const circleDiameter = parseInt(circle.style.width);
        const angle = Math.random() * Math.PI; // Random angle between 0 and PI
        const x = (radius - circleDiameter / 2) * Math.cos(angle);
        const y = ((radius) - circleDiameter / 2) * Math.sin(angle)/(3.5);

        // Adjust position calculation to fit the new semicircle height
        circleElement.style.left = `${x + radius - circleDiameter / 2}px`;
        circleElement.style.top = `${y + (semicircleHeight/3) - circleDiameter / 2}px`;

        // Randomize the animation duration and delay for each circle
        const fallDuration = 2 + Math.random() * 2; // 2 to 4 seconds
        const moveDuration = 3 + Math.random() * 2; // 3 to 5 seconds
        const fallDelay = Math.random(); // 0 to 1 second
        circleElement.style.animationDuration = `${fallDuration}s, ${moveDuration}s`;
        circleElement.style.animationDelay = `${fallDelay}s, ${fallDuration + fallDelay}s`;
      });
    }
  }
};
</script>

<style scoped>
.heroSubtitle {
  position: absolute;
  top:10vw !important;
  left:50% !important;
  transform:translateX(-50%);
  font-family: SF Pro;
  font-size: 15.87px;
  font-weight: 500;
  line-height: 18.51px;
  letter-spacing: 0.03em;
  color: #00000066;
}

.Herocontainer {
  text-align: center;
  position: relative;
  width: 100%;
  /* height: 100vh; Adjusted to take full viewport height */
}

.semicircle {
  /* position: absolute; */
  /* left: 50%; */
  /* transform: translateX(-50%); */
  width: 100vw;
  height: 25vw; /* Adjusted semicircle height */
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
}

.circle-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.circle {
  position: absolute;
  background-color: rgba(0, 128, 255, 0.6);
  border-radius: 50%;
  border: 2px solid rgba(0, 0, 0, 0.1);
    animation: fall 2s ease-out forwards, move 3s infinite ease-in-out alternate;
}

@keyframes fall {
  0% {
    transform: translateY(-300px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(20px);
  }
}

/* Styling for title and date */
.title {
  margin-top: 20px;
  font-size: 18px;
  color: #666;
}

.date {
  font-size: 14px;
  color: #999;
}
</style>
