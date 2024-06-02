<template>
    <div class="card">
      <h3>Action status</h3>
      <div class="main flex">
        <div class="container">
          <div v-for="item in items" :key="item" :title="'Action #' + item" style="background-image: url(https://picsum.photos/200/300);"></div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        items: Array.from({ length: 100 }, (_, i) => i),
      };
    },
    
  };
  </script>
  
  <style scoped>
  .main {
    display: flex;
    --s: 50px; /* size */
    --m: 1px; /* margin */
    --f: calc(1.732 * var(--s) + 4 * var(--m) - 1px);
    /* overflow: scroll; */
  }
  
  .container {
    font-size: 0; /* disable white space between inline block element */
  }
  
  .container div {
    width: var(--s);
    margin: var(--m);
    height: calc(var(--s) * 1.1547);
    display: inline-block;
    font-size: initial;
    clip-path: polygon(0% 25%, 0% 75%, 50% 100%, 100% 75%, 100% 25%, 50% 0%);
    /* background: #bababa; */
    margin-bottom: calc(var(--m) - var(--s) * 0.2885);
  }
  
  .container div {
    /* background: #00aa5d; */
  }
  
  
  .container::before {
    content: "";
    width: calc(var(--s) / 2 + var(--m));
    float: left;
    height: 200%;
    shape-outside: repeating-linear-gradient(
      #0000 0 calc(var(--f) - 3px),
      #000 0 var(--f)
    );
  }
  
  body {
    background-color: #fef3fe;
  }
  
  .card {
    background-color: white;
    max-width: 100%;
    padding: 20px;
    border-radius: 10px;
    margin: auto;
    border: 1px solid lightgrey;
  }
  
  h3 {
    font-family: sans-serif;
    font-weight: 400;
    color: #011001;
    margin-top: 0;
    text-align: center;
  }
  </style>
  