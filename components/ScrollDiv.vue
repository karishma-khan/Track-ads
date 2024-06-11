<template>
  <div class="container text-red-500">
    <section v-for="(section, index) in sections"
             :key="index"
             :class="['section', { active: currentSection === index }]"
             :id="'section' + (index + 1)">
      <h2>{{ section.title }}</h2>
      <p>{{ section.content }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sections: [
        { title: 'Section 1', content: 'Content for section 1...' },
        { title: 'Section 2', content: 'Content for section 2...' },
        { title: 'Section 3', content: 'Content for section 3...' }
      ],
      currentSection: 0
    };
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const scrollPosition = window.scrollY;
      const viewportHeight = window.innerHeight;

      if (scrollPosition > (this.currentSection + 1) * viewportHeight - viewportHeight / 2) {
        if (this.currentSection < this.sections.length - 1) {
          this.currentSection++;
        }
      } else if (scrollPosition < this.currentSection * viewportHeight - viewportHeight / 2) {
        if (this.currentSection > 0) {
          this.currentSection--;
        }
      }
    }
  }
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  font-family: Arial, sans-serif;
}

.container {
  position: relative;
  width: 100%;
  height: 300vh; /* Adjust based on your content */
}

.section {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  transition: height 0.5s ease-in-out, visibility 0.5s ease-in-out;
}

.section h2 {
  margin: 20px;
}

.section p {
  margin: 20px;
}

.section:not(.active) {
  height: 0;
  visibility: hidden;
}

.section.active {
  visibility: visible;
}
</style>
