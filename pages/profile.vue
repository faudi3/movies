<template>
  <div class="profile container">
    <div v-if="this.$store.state.user.email !== ''">
      <p class="movies__title">Favourite movies</p>
      <Movies :props="this.$store.state.favList" />
      <p>{{ this.$store.state.favList.length }}</p>
    </div>

    <div v-else>
      <h2>Login to see profile page</h2>
      <LoginModal />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      result: "",
    };
  },
  name: "profile",
  methods: {},
  async beforeMount() {
    let c = this.$store.state.user.email;
    await this.$store.dispatch("showList", { c });
  },
};
</script>

<style scoped>
.profile {
  padding-top: 60px;
  color: white;
}
.movies__title {
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  margin: 20px;
}
h2 {
  font-size: 40px;
  text-align: center;
}
</style>
