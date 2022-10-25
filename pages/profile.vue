<template>
  <div class="profile">
    <div v-if="this.$store.state.user !== null">
      <p class="movies__title">Favourite movies</p>
      <Movies :props="this.$store.state.favList" />
      <p></p>
      <button class="button">change name</button>
    </div>

    <div v-else>
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
  padding: 60px;
  color: white;
}
.movies__title {
  font-size: 40px;
  text-align: center;
  font-weight: bold;
  margin: 20px;
}
</style>
