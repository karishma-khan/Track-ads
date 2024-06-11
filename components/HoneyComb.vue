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
          <div class="containerWall">
            <div v-for="item in items" :key="item" :title="'Action #' + item" style="background-image: url(https://picsum.photos/200/300);"></div>
          </div>
        </div>
      </div>
      </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title:'Image Wall',
        items: Array.from({ length: 100 }, (_, i) => i),
      };
    },
    
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
  
  .card {
    background-color: transparent;
    max-width: 100%;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
  }
  </style>
  