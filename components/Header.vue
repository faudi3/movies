<template>
  <header class="header">
    <NuxtLink to="/" class="header__title button">Header</NuxtLink>
    <div class="right">
      <NuxtLink class="button" to="/profile">Profile</NuxtLink>
      <NuxtLink class="button" to="/login">login</NuxtLink>
      <button class="button" @click="logout">logout</button>
    </div>
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
  justify-content: space-between;
  align-items: center;
}
.header__title {
  margin-left: 20px;
}
.right {
  margin-right: 20px;
}
</style>
