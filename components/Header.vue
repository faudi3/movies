<template>
  <header class="header">
    HEADER
    <NuxtLink to="/login">login</NuxtLink>
    <button @click="logout">logout</button>
  </header>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style scoped>
header {
  height: 50px;
  display: flex;
  width: 100vw;
  color: white;
  background-color: #211f1f;
  border-bottom: 2px solid gray;
  position: fixed;
  z-index: 102;
}
</style>
