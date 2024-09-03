<template>
  <!-- Main container for the Hero section -->
  <div id="container" class="Herocontainer" ref="container">
    <!-- Container for the force-directed graph -->
    <div id="canvasHome" ref="forceGraph">
      <!-- Tooltip container that appears when isToolTip is true -->
      <div v-if="isToolTip" class="absolute bottom-0 w-full flex justify-center">
        <div class="z-[20] px-[20px] h-[250px] w-[300px] bg-black rounded-t-[24px] text-left p-[10px] text-white flex flex-col justify-evenly" style="max-width: 300px !important;">
          <!-- Header section of the tooltip with close button -->
          <div class="flex justify-between">
            <!-- Advertiser name which navigates to the advertiser detail page on click -->
            <div @click="$router.push(`/advertiser/${toolTipVal.id}`)" class="heroTool border-b pb-2 border-white cursor-pointer">{{ toolTipVal.name }}</div>
            <!-- Close button for the tooltip -->
            <div @click="isToolTip = false"><img src="../static/img/x.svg" alt=""></div>
          </div>
          <!-- Tooltip section showing total ads count -->
          <div class="mt-4 mb-2">
            <div class="heroToolHead">{{ toolTipVal.count }}</div>
            <div class="heroToolValue">Total Ads</div>
          </div>
          <!-- Tooltip section showing total ads spend -->
          <div class="my-2">
            <div class="heroToolHead">&#8377; {{ toolTipVal.amount }}</div>
            <div class="heroToolValue">Total Ads Spent</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Subsection for the subtitle and additional information -->
    <div class="heroSubtitle z-10 relative">
      <!-- Subtitle with a clickable info icon to toggle additional information -->
      <div class="flex gap-1 text-[#00000059] text-[13px] justify-center cursor-pointer" @click="infoDetail=true">
        <img class="h-[20px] w-[20px]" src="../static/img/heroInfo.svg" /> 
        50 Political Advertisers, since {{ today.getDate() + ' ' + monthNames[today.getMonth()] +', '+ today.getFullYear() }}
      </div>
      <!-- Additional information box that appears when infoDetail is true -->
      <div class="heroInfo absolute bottom-[-130px] left-1/2 transform -translate-x-1/2 -translate-y-[0px] bg-[white]" v-if="infoDetail">
        <!-- Decorative arrow pointing to the info box -->
        <img @click="infoDetail=true" class=" absolute left-[40px] top-[-10px]" src="../static/img/triangleArrow.svg" /> 
        <!-- Text describing what the circles represent -->
        <div class="flex justify-between items-top">
          <div class="text-[12px] text-left text-[#FFFFFFB2] italic leading-[14px]">Each circle represents an advertiser.</div>
          <!-- Close button for the additional information box -->
          <img @click="infoDetail = false" class="h-[12px] w-[12px] mt-1" src="../static/img/infoClose.svg" alt="">
        </div>
        <!-- Further information about circle sizes and advertisers -->
        <div class="my-2">
          <div class="text-[12px] text-left text-[#FFFFFFB2] italic leading-[14px]">Circle size varies according to the total amount spent on ads by that advertiser.</div>
        </div>
        <!-- Legend describing color-coding based on advertiser's spending -->
        <div>
          <div class="flex flex-wrap gap-2 w-full items-center">
            <!-- Legend item for 0-499 spending range -->
            <div class="flex items-center mr-2">
              <div class="rounded-[50%] bg-[#FBE69F] h-[10px] mr-2 w-[10px]"></div>
              <div class="text-[10px] text-[#FFFFFFB2] italic">0-499</div>
            </div>
            <!-- Legend item for 500-999 spending range -->
            <div class="flex items-center mr-2">
              <div class="rounded-[50%] bg-[#C5D6B6] h-[10px] mr-2 w-[10px]"></div>
              <div class="text-[10px] text-[#FFFFFFB2] italic">500-999</div>
            </div>
            <!-- Legend item for 1000-1499 spending range -->
            <div class="flex items-center mr-2">
              <div class="rounded-[50%] bg-[#4CB2AC] h-[10px] mr-2 w-[10px]"></div>
              <div class="text-[10px] text-[#FFFFFFB2] italic">1000-1499</div>
            </div>
            <!-- Legend item for 1500-1999 spending range -->
            <div class="flex items-center mr-2">
              <div class="rounded-[50%] bg-[#326284] h-[10px] mr-2 w-[10px]"></div>
              <div class="text-[10px] text-[#FFFFFFB2] italic">1500-1999</div>
            </div>
            <!-- Legend item for 2000+ spending range -->
            <div class="flex items-center mr-2">
              <div class="rounded-[50%] bg-[#133751] h-[10px] mr-2 w-[10px]"></div>
              <div class="text-[10px] text-[#FFFFFFB2] italic">+2000</div>
            </div>
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
      // Data properties for the component
      balls: [], // Array to hold the circles (nodes) in the force-directed graph
      isToolTip: false, // Boolean to toggle tooltip visibility
      infoDetail: false, // Boolean to toggle additional information visibility
      today: new Date(), // Current date object
      maxAmount: 0, // Maximum amount spent by any advertiser
      maxCount: 0, // Maximum count of ads by any advertiser
      toolTipVal: 0, // Current tooltip value data
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], // Array of month names
      randomColors: ['#FBE69F','#C5D6B6','#4CB2AC','#326284','#133751'], // Array of colors for circles
    };
  },
  computed: {
    ...mapGetters({
      // Vuex getter to fetch index data
      indexData: "get_index_data",
    })
  },
  mounted() {
    // On component mount, calculate max amount and count to determine circle color and size
    this.maxCount = Math.max(...this.indexData.map(item => item.count));
    this.maxAmount = Math.max(...this.indexData.map(item => item.amount));
    this.addCircles(); // Add circles to the data
    this.createForceDirectedGraph(); // Initialize force-directed graph
  },
  methods: {
    // Method to create a force-directed graph using D3.js
    createForceDirectedGraph() {
      const width = window.innerWidth;
      const height = window.innerHeight * 0.8 > 625 ? 625 : window.innerHeight * 0.8;
      const radius = (height/2);
      const centerX = width / 2;
      const centerY = 20;

      const svg = d3.select(this.$refs.forceGraph) // Select the container for the SVG
        .append('svg') // Append an SVG element
        .attr('width', width) // Set the width
        .attr('height', (height/3)*2); // Set the height

      // Initialize D3 force simulation
      const simulation = d3.forceSimulation(this.balls)
        .force('x', d3.forceX(centerX).strength(0))
        .force('y', d3.forceY(centerY).strength(0))
        .force('collide', d3.forceCollide().radius(d => (d.radius/2) + 2).iterations(16))
        .force('charge', d3.forceManyBody().strength(-10))
        .on('tick', ticked); // Define what happens on each simulation tick

      // Create SVG circles for each node
      const node = svg.selectAll('circle')
        .data(this.balls)
        .enter().append('circle')
        .attr('r', d => (d.radius/2)) // Set radius based on data
        .attr('fill', d => d.backgroundColor) // Set fill color
        .style('stroke', '#a9b3a0') // Set border color
        .style('stroke-width', 1) // Set border width
        .on('click', (event, d) => this.toggleHover(d,true)) // Show tooltip on click
        .call(d3.drag() // Enable dragging
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      // Function to update node positions on each tick
      function ticked() {
        node
          .attr('cx', d => {
            // Ensure nodes stay within the lower semicircle
            const dx = d.x - centerX;
            const dy = d.y - centerY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Adjust position if outside lower semicircle
            if (d.y < centerY) d.y = centerY + Math.abs(centerY - d.y);
            if (distance > (radius)) {
              const angle = Math.atan2(d.y - centerY, d.x - centerX);
              d.x = centerX + (radius) * Math.cos(angle);
              d.y = centerY + (radius) * Math.sin(angle);
            }

            return d.x;
          })
          .attr('cy', d => d.y);
      }

      // Drag event handlers
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart(); // Restart simulation
        d.fx = d.x; // Fix x position
        d.fy = d.y; // Fix y position
      }

      function dragged(event, d) {
        d.fx = event.x; // Update fixed x position during drag
        d.fy = event.y; // Update fixed y position during drag
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0); // Stop simulation
        d.fx = null; // Unfix x position
        d.fy = null; // Unfix y position
      }
    },
    // Method to toggle tooltip visibility
    toggleHover(circle, bool) {
      this.isToolTip = bool;
      this.toolTipVal = circle;
    },
    // Method to add circles based on index data
    addCircles() {
      this.balls = this.indexData.map((item, idx) => {
        let radius = (item.amount / this.maxAmount) * 50 + 60; // Calculate radius based on amount
        let colorIdx = Math.floor((item.count / this.maxCount) * (this.randomColors.length - 1)) // Calculate color index based on count
        return {
          i: idx,
          radius: radius,
          style: {
            width: `${radius}px`,
            height: `${radius}px`,
            left: '0px',
            top: '0px',
            backgroundColor: this.randomColors[colorIdx],
          },
          backgroundColor: this.randomColors[colorIdx], // Set background color
          id: item.advertiser_ad_id, // Advertiser ID
          name: item.advertiser, // Advertiser name
          amount: item.amount, // Amount spent
          count: item.count, // Number of ads
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
