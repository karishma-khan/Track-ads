<template>
    <div class="container">
      <div class="animated-div" ref="animatedDiv">
        <p>Hello, I animate on scroll!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        lastScrollY: 0,
        scrollDirection: null
      };
    },
    mounted() {
      this.$nextTick(() => {
        const animatedDiv = this.$refs.animatedDiv;
  
        if (animatedDiv) {
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                animatedDiv.classList.add('in-view');
              } else {
                animatedDiv.classList.remove('in-view');
              }
            });
          }, {
            threshold: 0.1
          });
  
          observer.observe(animatedDiv);
        }
  
        window.addEventListener('scroll', this.handleScroll);
      });
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
      handleScroll() {
        const currentScrollY = window.scrollY;
        this.scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        this.lastScrollY = currentScrollY;
  
        const animatedDiv = this.$refs.animatedDiv;
        if (animatedDiv) {
          if (this.scrollDirection === 'down') {
            animatedDiv.classList.add('scrolling-down');
            animatedDiv.classList.remove('scrolling-up');
          } else {
            animatedDiv.classList.add('scrolling-up');
            animatedDiv.classList.remove('scrolling-down');
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  body, html {
    height: 200%;
    margin: 0;
    font-family: Arial, sans-serif;
  }
  
  .container {
    position: relative;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .animated-div {
    width: 300px;
    height: 200px;
    background-color: lightblue;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition: transform 0.5s ease;
  }
  
  .animated-div.in-view {
    /* base state when in view */
  }
  
  .animated-div.scrolling-down {
    transform: translateY(-50px); /* Move up by 50px when scrolling down */
  }
  
  .animated-div.scrolling-up {
    transform: translateY(50px); /* Move down by 50px when scrolling up */
  }
  </style>
  