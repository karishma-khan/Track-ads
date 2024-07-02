<template>
  <div class="bg-[#FFFBEF] text-black common-container" style="overflow: unset;">
    <div class="flex gap-4 mb-8">
      <img src="img/imageGallery.svg" alt="">
      <span class="common-heading">
        {{ title }}
      </span>
    </div>
    <div class="card">
      <div class="main flex">
        <div class="containerWall" @mouseleave="hideTooltip">
          <div 
            v-for="(item, index) in items" 
            :key="index" 
            class="hexagon" 
            :style="{ backgroundImage: 'url(https://picsum.photos/200/300)' }"
            @mouseenter="showTooltip($event, 'Action #' + item)" 
            @mouseover="updateTooltipPosition($event)"
            @mouseleave="hideTooltip">
          </div>
        </div>
      </div>
    </div>
    <!-- Tooltip div -->
    <div v-if="false" class="tooltip z-100" :style="{ top: tooltip.y + 'px', left: tooltip.x + 'px' }">
      Hello
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: 'Image Wall',
      items: Array.from({ length: 98 }, (_, i) => i),
      tooltip: {
        visible: false,
        text: '',
        x: 0,
        y: 0
      }
    };
  },
  methods: {
    showTooltip(event, text) {
      console.log('inside',event.pageX,event.pageY);
      this.tooltip.text = text;
      this.tooltip.visible = true;
      this.updateTooltipPosition(event);
    },
    updateTooltipPosition(event) {
      const tooltipOffset = 10; // Offset to position the tooltip slightly away from the cursor
      this.tooltip.x = event.pageX + tooltipOffset;
      this.tooltip.y = event.pageY + tooltipOffset;
    },
    hideTooltip() {
      this.tooltip.visible = false;
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center;
  --s: 50px; /* size */
  --m: 1px; /* margin */
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
}

.containerWall {
  font-size: 0;
}

.containerWall div {
  width: var(--s);
  margin: var(--m);
  height: calc(var(--s) * 1.1547);
  display: inline-block;
  font-size: initial;
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
  margin-bottom: calc(var(--m) - var(--s) * 0.2885);
}

.containerWall::before {
  content: "";
  width: calc(var(--s) / 2 + var(--m));
  float: left;
  height: 200%;
  shape-outside: repeating-linear-gradient(
    #0000 0 calc(var(--f) - 3px),
    #000 0 var(--f)
  );
}

.hexagon {
  background-size: cover;
  background-position: center;
}

.card {
  background-color: transparent;
  max-width: 100%;
  padding: 20px;
  border-radius: 10px;
  margin: auto;
}

/* Tooltip styles */
.tooltip {
  position: absolute;
  background-color: white;
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none; /* Prevent the tooltip from capturing mouse events */
  white-space: nowrap;
  z-index: 1000;
  transform: translate(-50%, -100%);
}
</style>
