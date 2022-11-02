<template>
  <div class="app" :class="this.$store.state.mode">
    <Header />
    <Nuxt />
  </div>
</template>

<script>
export default {
  data() {
    return {
      /*mode: "dark",*/
    };
  },
  methods: {},
};
</script>

<style scoped>
.app {
  width: 100vw;
  min-height: 100vh;
  background-color: #211f1f;
  color: #15202b;
  transition: background 0.3s ease-in-out;
}

.light {
  background: #06375b;
  color: #e8e8e8;
}
/*.header {
  background: #bcdfff;
}*/
</style>
