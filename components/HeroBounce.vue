<template>
  <div id="container" class="Herocontainer" ref="container">
    <div id="canvasHome" ref="forceGraph">
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
      isToolTip:false,
      infoDetail:false,
      toolTipVal:0,
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
    this.addCircles();
    this.createForceDirectedGraph();
  },
  methods: {
    createForceDirectedGraph() {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
    const radius = (height/2);
    const centerX = width / 2;
    const centerY = 20;
    const bounceLineY = (height / 2);

    const svg = d3.select(this.$refs.forceGraph)
      .append('svg')
      .attr('width', width)
      .attr('height', (height/3)*2);

    const node = svg.selectAll('circle')
      .data(this.balls)
      .enter().append('circle')
      .attr('r', d => d.radius / 2)
      .attr('cx', d => d.x)  // Set initial x coordinate
      .attr('cy', d => d.y)
      .attr('fill', d => d.backgroundColor)
      .style('stroke', '#a9b3a0')
      .style('stroke-width', 2)
      .on('click', (event, d) => this.toggleHover(d,true));

    const bounceDuration = 1000;
    const returnDuration = 1000; 
    node.transition()
      .duration(bounceDuration)
      .attr('cy', bounceLineY)
      .on('end', () => {
        node.transition()
          .duration(returnDuration)
          .attr('cx', centerX)
          .attr('cy', centerY)
          .on('end', () => {
            const simulation = d3.forceSimulation(this.balls)
              .force('x', d3.forceX(centerX).strength(0))
              .force('y', d3.forceY(centerY).strength(0))
              .force('collide', d3.forceCollide().radius(d => (d.radius / 2) + 2).iterations(16))
              .force('charge', d3.forceManyBody().strength(-1))
              .on('tick', ticked);

            function ticked() {
              node
                .attr('cx', d => {
                  const dx = d.x - centerX;
                  const dy = d.y - centerY;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  if (d.y < centerY) d.y = centerY + Math.abs(centerY - d.y);
                  if (distance > radius) {
                    const angle = Math.atan2(d.y - centerY, d.x - centerX);
                    d.x = centerX + (radius) * Math.cos(angle);
                    d.y = centerY + (radius) * Math.sin(angle);
                  }
                  return d.x;
                })
                .attr('cy', d => d.y);
            }

            function dragstarted(event, d) {
              if (!event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            }

            function dragged(event, d) {
              d.fx = event.x;
              d.fy = event.y;
            }

            function dragended(event, d) {
              if (!event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            }

            node.call(d3.drag()
              .on('start', dragstarted)
              .on('drag', dragged)
              .on('end', dragended));
          });
      });
  },
    toggleHover(circle,bool)
    {
      this.isToolTip = bool
      this.toolTipVal = circle
    },
    addCircles() {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.8;
      this.balls = this.indexData.map((item, idx) => {
        let radius = Math.floor(Math.random() * (91 - 39 + 1)) + 39;
        return {
          i:idx,
          x: Math.random() * width,
          y: Math.random() * (height/4),
          radius: radius,
          style: {
            width: `${radius}px`,
            height: `${radius}px`,
            left: '0px',
            top: '0px',
            backgroundColor: this.randomColors[Math.floor(Math.random() * this.randomColors.length)],
          },
          backgroundColor: this.randomColors[Math.floor(Math.random() * this.randomColors.length)],
          id: item.advertiser_ad_id,
          name: item.advertiser,
          amount: item.amount,
          count: item.count,
        };
      });
    },
  },
};
</script>

<style scoped>
#canvasHome {
  position: relative;
  overflow: hidden;
}
.ball {
  position: absolute;
  border-radius: 50%;
  background-color: red;
}
svg {
  display: block;
  margin: auto;
  width: 100vw;
  overflow: hidden;
}
@media screen and (max-width:920px) {
  #canvasHome{
    height: 50vh;
  }
}
</style>
