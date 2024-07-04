<template>
  <div class="Herocontainer">
    <div ref="semicircle" class="semicircle relative overflow-hidden">
      <div class="heroSubtitle z-10">
        <div :class="infoDetail ? 'md:block hidden' : ''">
          Top Political Advertisers on Meta
          <p class="flex justify-center text-[14px] items-center">As on 30 Mar,2024 <img @click="infoDetail=true" class="mx-2" src="../static/img/heroInfo.svg" /> </p>
        </div>
          <div class="heroInfo bg-[white]" v-if="infoDetail">
            <div class="flex justify-between items-top">
              <div class="text-[12px] text-left leading-[14px]">Each circle represents an advertiser.</div>
              <img @click="infoDetail = false" class="h-[12px] w-[12px] mt-1" src="../static/img/infoClose.svg" alt="">
            </div>
            <div>
              <div class="text-[12px] text-left mt-[5px]">Ads :</div>
              <div class="flex flex-wrap justify-between items-center">
                <div class="flex items-center mr-2">
                  <div class="rounded-[50%] bg-[red] h-[10px] mr-2 w-[10px]"></div>
                  <div class="text-[10px]">100 - 200</div>
                </div>
                <div class="flex items-center mr-2">
                  <div class="rounded-[50%] bg-[red] h-[10px] mr-2 w-[10px]"></div>
                  <div class="text-[10px]">100 - 200</div>
                </div>
                <div class="flex items-center mr-2">
                  <div class="rounded-[50%] bg-[red] h-[10px] mr-2 w-[10px]"></div>
                  <div class="text-[10px]">100 - 200</div>
                </div>
                <div class="flex items-center mr-2">
                  <div class="rounded-[50%] bg-[red] h-[10px] mr-2 w-[10px]"></div>
                  <div class="text-[10px]">100 - 200</div>
                </div>
                <div class="flex items-center mr-2">
                  <div class="rounded-[50%] bg-[red] h-[10px] mr-2 w-[10px]"></div>
                  <div class="text-[10px]">100 - 200</div>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="circle-container overflow-hidden">
        <div v-for="(circle, index) in circles" :key="index"
             :style="circle.style"
             @click="toggleHover(index,true)"
             class="circle"></div>
      </div>
    <div v-if="isToolTip" class="absolute bottom-0 w-full flex justify-center">
      <div class="z-[20] px-[20px] h-[250px] w-[300px] bg-black rounded-t-[24px] text-left p-[10px] text-white flex flex-col justify-evenly">
        <div class="flex justify-between">
          <div @click="$router.push('/advertiser/xyz')" class="heroTool border-b pb-2 border-white cursor-pointer">The Narative Builders</div>
          <div @click="isToolTip = false"><img src="../static/img/x.svg" alt=""></div>
        </div>
        <div class="mt-4 mb-2">
          <div class="heroToolHead">685</div>
          <div class="heroToolValue">Total Ads</div>
        </div>
        <div class="my-2">
          <div class="heroToolHead">$ 190.7k - $273.7k</div>
          <div class="heroToolValue">Total Ads Spent</div>
        </div>
        <div class="my-2">
          <div class="heroToolHead">7.883M+</div>
          <div class="heroToolValue">Total Impressions</div>
        </div>
      </div>
    </div>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isToolTip:false,
      infoDetail:false,
      toolTipVal:0,
      randomColors:['#FBE69F','#C5D6B6','#4CB2AC','#326284','#133751'],
      circles: [
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
        { style: { width: '30px', height: '30px'} },
        { style: { width: '50px', height: '50px'} },
        { style: { width: '70px', height: '70px'} },
        { style: { width: '40px', height: '40px'} },
        { style: { width: '60px', height: '60px'} },
      ]
    };
  },
  mounted() {
    this.positionCircles();
    window.addEventListener('resize', this.positionCircles);
  },
  methods: {
    toggleHover(index,bool)
    {
      this.isToolTip = bool
      this.toolTipVal = index
    },
    positionCircles() {
      const conwidth = window?.innerWidth
      const semicircle = this.$refs.semicircle;
      const semicircleWidth = semicircle.clientWidth;
      const semicircleHeight = semicircle.clientHeight;
      const radius = semicircleWidth / 2;
      
      console.log(semicircle.clientWidth);
      this.circles.forEach((circle, index) => {
        const circleElement = semicircle.querySelector('.circle-container').children[index];
        const circleDiameter = parseInt(circle.style.width);
        const angle = Math.random() * Math.PI;
        const x = (radius - circleDiameter / 2) * Math.cos(angle);
        const y = ((radius) - circleDiameter / 2) * Math.sin(angle)/(semicircle.clientWidth > 920 ? 3.5 :1.5);

        circleElement.style.left = `${x + radius - circleDiameter / 2}px`;
        circleElement.style.top = `${y + (semicircleHeight/( conwidth > 920 ? 3 :2 )) - circleDiameter / 2}px`;
        circleElement.style.backgroundColor = this.randomColors[Math.floor( Math.random() * 5 )];
        circleElement.style.opacity = '0.9';

        const fallDuration = 2 + Math.random() * 2;
        const moveDuration = 3 + Math.random() * 2;
        const fallDelay = Math.random();
        circleElement.style.animationDuration = `${fallDuration}s, ${moveDuration}s`;
        circleElement.style.animationDelay = `${fallDelay}s, ${fallDuration + fallDelay}s`;
      });
    }
  }
};
</script>

<style scoped>
.heroTool{
  font-family: SF Pro;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0.02em;
}
.heroToolHead{
  font-family: SF Pro Black;
  font-size: 24px;
  font-weight: 900;
  line-height: 30px;
  letter-spacing: 0.03em;
}
.heroToolValue{
  font-family: SF Pro;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: 0.02em;
  color:#FFFFFF60
}
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
}

.semicircle {
  width: 100vw;
  height: 25vw;
  border-bottom-left-radius: 50%;
  border-bottom-right-radius: 50%;
  background-color: #fff;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}
@media screen and (max-width:920px) {
  .heroToolHead{
    font-size: 18px !important;
  }
  .heroTool{
    font-size: 14px !important;
  }
  .heroToolValue{
    font-size: 12px !important;
  }
  .semicircle{
    height: 70vw;
  }
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
