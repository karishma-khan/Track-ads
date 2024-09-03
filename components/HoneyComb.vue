<template>
  <div class="bg-[#FFFBEF] text-black common-container overflow-x-auto">
    <!-- Header section with title and image -->
    <div class="flex gap-4 mb-8">
      <img src="img/imageGallery.svg" alt="">
      <span class="common-heading">
        {{ title }}
      </span>
    </div>
    
    <!-- Container for image tiles -->
    <div class="m-auto overflow-x-auto overflow-y-hidden w-full md:w-fit">
      <div class="max-w-[1319px] w-[1319px]">
        <div class="card">
          <div class="main flex">
            <!-- Container for hexagon tiles -->
            <div class="containerWall" @mouseleave="hideTooltip">
              <!-- Render hexagon tiles from the items array -->
              <div 
                v-for="(item, index) in items" 
                :key="index" 
                class="hexagon" 
                :style="{ backgroundImage: 'url('+item+')' }"
                @mouseenter="showTooltip($event, 'Action #' + item)" 
                @mouseover="updateTooltipPosition($event)"
                @mouseleave="hideTooltip">
              </div>
            </div>
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
      title: 'Image Wall', // Title for the gallery
      items: ['https://www.shutterstock.com/shutterstock/photos/2291856643/display_1500/stock-photo-male-indian-voter-hand-with-a-voting-sign-or-ink-pointing-vote-for-india-on-background-with-copy-2291856643.jpg',
          'https://www.shutterstock.com/shutterstock/photos/2364545147/display_1500/stock-vector-indian-political-party-india-alliance-vector-background-2364545147.jpg',
          'https://www.onmanorama.com/content/dam/mm/en/in-depth/assembly-polls/images/samajwadi-party.jpg.image.470.246.jpg',
          'https://www.shutterstock.com/shutterstock/photos/2074154267/display_1500/stock-vector-mahatma-gandhi-colorful-vector-illustration-art-gandhi-jayanti-indian-freedom-of-india-background-2074154267.jpg',
          'https://www.shutterstock.com/shutterstock/photos/1261864627/display_1500/stock-photo-supreme-court-of-india-1261864627.jpg',
          'https://www.shutterstock.com/shutterstock/photos/1354871789/display_1500/stock-vector-vote-for-bjp-1354871789.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Indian_National_Congress_hand_logo.svg/150px-Indian_National_Congress_hand_logo.svg.png',
          'https://e7.pngegg.com/pngimages/721/548/png-clipart-all-india-anna-dravida-munnetra-kazhagam-political-party-election-india-leaf-logo-thumbnail.png',
          'https://vajiram-prod.s3.ap-south-1.amazonaws.com/Recognised_political_parties_in_India_0b18020205.jpg',
          'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Elephant_Bahujan_Samaj_Party.svg/1200px-Elephant_Bahujan_Samaj_Party.svg.png',
          'https://p7.hiclipart.com/preview/456/693/98/indian-general-election-2014-political-party-electoral-symbol-sikkim-democratic-front-others-thumbnail.jpg',
          'https://www.designerpeople.com/wp-content/uploads/2018/08/Free-Vector-EPS-Logo-Download-All-India-Trinamool-Congress-AITC.jpg',
          'https://e7.pngegg.com/pngimages/824/489/png-clipart-ceiling-fans-electoral-symbol-political-party-india-ceiling-angle-technic-thumbnail.png',
          'https://w7.pngwing.com/pngs/27/966/png-transparent-india-electoral-symbol-political-party-election-dravida-munnetra-kazhagam-india-purple-blue-text.png',
          'https://www.shutterstock.com/shutterstock/photos/2368070093/display_1500/stock-photo-chief-minister-yogi-aditya-nath-lucknow-uttar-pradesh-india-chief-minister-yogi-aditya-nath-2368070093.jpg',
          'https://www.shutterstock.com/shutterstock/photos/2291832711/display_1500/stock-vector--indian-man-showing-namaskar-an-indian-politician-2291832711.jpg',
          'https://w7.pngwing.com/pngs/897/1012/png-transparent-orange-and-green-waterlily-flower-art-bharatiya-janata-party-logo-indian-national-congress-indian-general-election-2014-delhi-miscellaneous-food-leaf-thumbnail.png',
          'https://www.shutterstock.com/shutterstock/photos/2321806307/display_1500/stock-vector-bhimrao-ramji-ambedkar-vector-illustration-2321806307.jpg',
          'https://www.shutterstock.com/shutterstock/photos/2011223210/display_1500/stock-photo-concept-of-indian-justice-system-showing-by-using-judge-gavel-balance-scale-on-indian-flag-as-2011223210.jpg',
          'https://www.shutterstock.com/shutterstock/photos/2116616324/display_1500/stock-vector-happy-national-voters-day-illustration-of-showing-voting-finger-with-electronic-voting-machine-2116616324.jpg','https://www.shutterstock.com/shutterstock/photos/2481421811/display_1500/stock-photo-new-delhi-india-may-bharatiya-janata-party-logo-of-indian-political-party-bjp-2481421811.jpg'],
      tooltip: {
        visible: false, // Tooltip visibility state
        text: '', // Tooltip text
        x: 0, // Tooltip X position
        y: 0 // Tooltip Y position
      }
    };
  },
  methods: {
    // Shows the tooltip with the given text
    showTooltip(event, text) {
      this.tooltip.text = text;
      this.tooltip.visible = true;
      this.updateTooltipPosition(event); // Update position to follow the cursor
    },
    
    // Updates the position of the tooltip based on the cursor position
    updateTooltipPosition(event) {
      const tooltipOffset = 10; // Offset to position the tooltip slightly away from the cursor
      this.tooltip.x = event.pageX + tooltipOffset;
      this.tooltip.y = event.pageY + tooltipOffset;
    },
    
    // Hides the tooltip
    hideTooltip() {
      this.tooltip.visible = false;
    }
  }
};
</script>

<style scoped>
.main {
  display: flex;
  justify-content: center; /* Centers content horizontally */
  --s: 100px; /* Size of hexagon */
  --m: 8px; /* Margin around hexagon */
  --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px); /* Calculated width */
}

.containerWall {
  font-size: 0; /* Removes extra space around inline-block elements */
}

.containerWall div {
  width: var(--s); /* Width of hexagon */
  margin: var(--m); /* Margin around hexagon */
  height: calc(var(--s) * 1.1547); /* Height of hexagon */
  display: inline-block; /* Ensures hexagons align correctly */
  font-size: initial; /* Resets font size for hexagon */
  clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%); /* Creates hexagon shape */
  margin-bottom: calc(var(--m) - var(--s) * 0.2885); /* Adjusts margin */
}

.containerWall::before {
  content: "";
  width: calc(var(--s) / 2 + var(--m)); /* Helper element for layout */
  float: left;
  height: 200%;
  shape-outside: repeating-linear-gradient(
    #0000 0 calc(var(--f) - 3px),
    #000 0 var(--f)
  );
}

.hexagon {
  background-size: cover; /* Ensures image covers hexagon */
  background-position: center; /* Centers image within hexagon */
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
  background-color: white; /* Tooltip background */
  color: #000; /* Tooltip text color */
  padding: 5px 10px;
  border-radius: 4px;
  pointer-events: none; /* Prevents tooltip from capturing mouse events */
  white-space: nowrap; /* Prevents text wrapping */
  z-index: 1000; /* Ensures tooltip is on top */
  transform: translate(-50%, -100%); /* Centers tooltip above cursor */
}
</style>
