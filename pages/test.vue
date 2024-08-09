<!-- components/D3ForceGraph.vue -->
<template>
  <div ref="graph"></div>
</template>

<script>
import * as d3 from 'd3';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      indexData: "get_index_data",
      dateRange: "get_date",
    })
  },
  async mounted() {
    await this.$store.dispatch("get_advertisers", this.dateRange);
    this.createForceGraph();
  },
  methods: {
    createForceGraph() {
      const width = 800;
      const height = 600;

      const svg = d3.select(this.$refs.graph)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      const nodes = this.indexData.map((item, idx) => ({
        id: idx,
        group: Math.floor(Math.random() * (91 - 39 + 1)) + 39
      }));

      const links = this.indexData.map((item, idx) => ({
        source: idx,
        target: idx == Object.keys(this.indexData).length -1 ? 0 : idx+1
      }));

      console.log('nodes', nodes);
      console.log('links', links);

      const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2));

      const link = svg.append('g')
        .selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('stroke-width', 2)
        .attr('stroke', '#999');

      const node = svg.append('g')
        .selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 5)
        .attr('fill', '#69b3a2')
        .call(d3.drag()
          .on('start', dragstarted)
          .on('drag', dragged)
          .on('end', dragended));

      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y);
      });

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
    }
  }
};
</script>

<style scoped>
svg {
  border: 1px solid #ccc;
}
</style>
