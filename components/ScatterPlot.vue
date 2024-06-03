<template>
  <div ref="graph" class="graph-container"></div>
</template>

<script>
// import * as d3 from 'd3';

export default {
  data() {
    return {
      chartData: Array.from({ length: 50 }, (_, i) => ({
        x: i % 8 + 1,
        y: Math.floor(i / 8),
        value: Math.floor(Math.random() * 8) + 2,  // Random natural numbers between 2 and 11
        imgUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/30`
      }))
    };
  },
  mounted() {
    this.createGraph();
    window.addEventListener('resize', this.createGraph);  // Recreate the graph on resize
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.createGraph);
  },
  methods: {
    createGraph() {
      const container = this.$refs.graph;
      container.innerHTML = '';  // Clear any existing content
      
      const margin = { top: 20, right: 20, bottom: 50, left: 50 };
      const spacing = 60;
      const facesPerRow = 10;

      // Get container width
      const containerWidth = container.clientWidth;
      
      // Calculate the required width and height
      const width = containerWidth - margin.left - margin.right;
      const numRows = Math.ceil(this.chartData.length / facesPerRow);
      const height = numRows * spacing + margin.top + margin.bottom;

      const svg = d3.select(container)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "visible");

      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain([1, facesPerRow])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(this.chartData, d => d.value)])
        .range([height - margin.top - margin.bottom, 0]);

      const xAxis = d3.axisBottom(xScale)
        .ticks(facesPerRow)
        .tickFormat((d, i) => (i % 2 === 0 ? d : ""));

      const yAxis = d3.axisLeft(yScale)
        .ticks(d3.max(this.chartData, d => d.value))
        .tickFormat(() => "");  // Hide y-axis tick values

      g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis);

      g.append("g")
        .attr("class", "y axis");

      // Add vertical lines for each x tick
      g.selectAll(".x.axis .tick")
        .each(function(d) {
          d3.select(this)
            .append("line")
            .attr("class", "grid-line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", 0)
            .attr("y2", -(height - margin.top - margin.bottom))
            .attr("stroke", "lightgray")
            .attr("stroke-width", "1")
            .attr("shape-rendering", "crispEdges");
        });

      const faces = g.selectAll("g.face")
        .data(this.chartData)
        .enter()
        .append("g")
        .attr("class", "face")
        .attr("transform", d => `translate(${xScale(d.x)},${yScale(d.value)})`);

      faces.append("circle")
        .attr("r", 15)  // Circle to create the border
        .attr("fill", "none")
        .attr("stroke", "#000");

      faces.append("image")
        .attr("xlink:href", d => d.imgUrl)
        .attr("x", -15)
        .attr("y", -15)
        .attr("width", 30)
        .attr("height", 30)
        .attr("clip-path", "circle(15px)");  // Clip the image to make it circular
    }
  }
}
</script>

<style scoped>
.graph-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;  /* Ensure the div takes full width of the parent */
  overflow: auto;
}
.x.axis path {
  display: none;
}
</style>
