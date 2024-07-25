<template>
  <div id="container" class="Herocontainer" ref="container">
    <div id="canvas" ref="canvas">
      <div v-for="(ball, idx) in balls" :ref="'ball'+idx" :key="idx" :style="ball.style" class="ball" @click="toggleHover(ball,true)"></div>
      <div v-if="isToolTip" class="absolute bottom-0 w-full flex justify-center">
      <div class="z-[20] px-[20px] h-[250px] w-[300px] bg-black rounded-t-[24px] text-left p-[10px] text-white flex flex-col justify-evenly" style="max-width: 300px !important;">
        <div class="flex justify-between">
          <div @click="$router.push(`/advertiser/${toolTipVal.id}`)" class="heroTool border-b pb-2 border-white cursor-pointer">{{ toolTipVal.name }}</div>
          <div @click="isToolTip = false"><img src="../static/img/x.svg" alt=""></div>
        </div>
        <div class="mt-4 mb-2">
          <div class="heroToolHead">{{ toolTipVal.count }}</div>
          <div class="heroToolValue">Total Ads</div>
        </div>
        <div class="my-2">
          <div class="heroToolHead">&#8377; {{ toolTipVal.amount }}</div>
          <div class="heroToolValue">Total Ads Spent</div>
        </div>
        <!-- <div class="my-2">
          <div class="heroToolHead">7.883M+</div>
          <div class="heroToolValue">Total Impressions</div>
        </div> -->
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      balls: [],
      numCircles: 10,
      speed: 2,
      isToolTip:false,
      infoDetail:false,
      toolTipVal:0,
      canvasWidth: null,
      canvasHeight: null,
      gravity: 0.1,  // Set default gravity
      damping: 1,  // Set default damping
      canvas: null,
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      randomRadius: [20, 50, 80, 150, 250],
      randomColors: ['#FBE69F','#C5D6B6','#4CB2AC','#326284','#133751'],
    };
  },
  computed: {
    ...mapGetters({
      indexData: "get_index_data",
    })
  },
  mounted() {
    this.maxCount = Math.max(...this.indexData.map(item => item.count));
    this.maxAmount = Math.max(...this.indexData.map(item => item.amount));
    this.initializeCanvas();
    this.addCircles();
    this.moveBalls();
  },
  methods: {
    toggleHover(circle,bool)
    {
      this.isToolTip = bool
      this.toolTipVal = circle
    },
    addCircles() {
      this.balls = this.indexData.map((item, idx) => {
        let radius = Math.floor(Math.random() * (91 - 39 + 1)) + 39;
        return {
          x: Math.random() * this.canvasWidth,
          y: Math.random() * this.canvasHeight,
          dx: Math.random() * 2 - 1,
          dy: Math.random() * 2 - 1,
          radius: radius,
          style: {
            width: `${radius}px`,
            height: `${radius}px`,
            left: '0px',
            top: '0px',
            backgroundColor: this.randomColors[Math.floor(Math.random() * this.randomColors.length)],
          },
          id: item.advertiser_ad_id,
          name: item.advertiser,
          amount: item.amount,
          count: item.count,
        };
      });
    },
    moveBalls() {
      this.balls.forEach(ball => {
        ball.dy += this.gravity;
        ball.x += ball.dx;
        ball.y += ball.dy;

        const radius = ball.radius;

        // Check horizontal boundaries
        if (ball.x - radius <= 0 || ball.x + radius >= this.canvasWidth) {
          ball.dx = -ball.dx * this.damping;
          ball.x = Math.max(radius, Math.min(ball.x, this.canvasWidth - radius));
        }

        // Check vertical boundaries
        if (ball.y - radius <= 0 || ball.y + radius >= this.canvasHeight) {
          ball.dy = -ball.dy * this.damping;
          ball.y = Math.max(radius, Math.min(ball.y, this.canvasHeight - radius));
        }

        ball.style.left = `${ball.x - radius}px`;
        ball.style.top = `${ball.y - radius}px`;
      });

      requestAnimationFrame(() => this.moveBalls());
    },
    initializeCanvas() {
      this.canvas = this.$refs.canvas;
      this.canvasWidth = this.canvas.offsetWidth+40;
      this.canvasHeight = this.canvas.offsetHeight + 10;
    },
  },
};
</script>

<style>
#canvas {
  position: relative;
  width: 100vw;
  height: 40vh;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-bottom-left-radius: 10%;
  border-bottom-right-radius: 10%;
}
.ball {
  position: absolute;
  border-radius: 50%;
  background-color: red;
}
@media screen and (max-width:920px) {
  #canvas{
    height: 50vh;
  }
}
</style>
