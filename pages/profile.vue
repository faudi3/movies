<template>
  <div class="profile container">
    <div v-if="this.$store.state.user.email !== ''">
      <p class="movies__title">Избранные фильмы</p>
      <button
        :class="this.$store.state.mode"
        class="button clear"
        @click="clearList"
      >
        Очистить избранные
      </button>
      <newMovies :props="this.$store.state.favList" />
    </div>

    <!--    <div v-else>
      <h2>Авторизируйтесь,чтобы увидеть свой профиль</h2>
      <LoginModal />
    </div>-->
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
  methods: {
    async clearList() {
      let c = this.$store.state.user.email;
      await this.$store.dispatch("clearList", { c });
    },
  },
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
.clear {
  display: flex;
  margin-left: 10px;
  background-color: red;
}
</style>
