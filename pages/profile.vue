<template>
  <div>
    <p v-if="this.$store.state.user !== null">
      {{ this.$store.state.user.email }}
    </p>
    <div v-else>
      <LoginModal />
    </div>
  </div>
</template>

<script>
export default {
  name: "profile",
};
</script>

<style scoped>
p {
  padding: 60px;
  color: white;
}
</style>
