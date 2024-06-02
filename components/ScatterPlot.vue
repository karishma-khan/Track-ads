<template>
  <div ref="graph" style="overflow-x: auto; overflow-y: auto; max-height: 500px; max-width: 800px; width: 100%;"></div>
</template>

<script>
export default {
  data() {
    return {
      chartData: Array.from({ length: 50 }, (_, i) => ({
        x: i % 10,
        y: Math.floor(i / 10),
        value: Math.floor(Math.random() * 10) + 2,  // Random natural numbers between 1 and 10
        imgUrl: `https://picsum.photos/seed/${Math.floor(Math.random() * 1000)}/30`
      }))
    };
  },
  mounted() {
    this.createGraph();
  },
  methods: {
    createGraph() {
      const margin = { top: 20, right: 20, bottom: 30, left: 40 };
      const spacing = 70;
      const numFaces = this.chartData.length;
      const facesPerRow = 10;

      // Filter out data points where either x or y value is zero
      const filteredData = this.chartData.filter(d => d.x !== 0 && d.y !== 0);

      // Calculate the required width and height
      const width = facesPerRow * (spacing / 2);
      const numRows = Math.ceil(filteredData.length / facesPerRow);
      const height = numRows * spacing + margin.top + margin.bottom;

      const svg = d3.select(this.$refs.graph)
        .append("svg")
        .attr("width", "100%")
        .attr("height", height + margin.top + margin.bottom)
        .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
        .attr("preserveAspectRatio", "xMidYMid meet")
        .style("overflow", "visible");

      const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain([0, facesPerRow - 1])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([1, d3.max(filteredData, d => d.value)])
        .range([height - margin.top - margin.bottom, 0]);

      const xAxis = d3.axisBottom(xScale).ticks(facesPerRow).tickFormat(d3.format("d"));
      const yAxis = d3.axisLeft(yScale).ticks(d3.max(filteredData, d => d.value)).tickFormat(d3.format("d"));

      g.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0,${height - margin.top - margin.bottom})`)
        .call(xAxis);

      g.append("g")
        .attr("class", "y axis")
        .call(yAxis);

      const faces = g.selectAll("g.face")
        .data(filteredData)
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
div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;  /* Ensure the div takes full width of the parent */
}
</style>
