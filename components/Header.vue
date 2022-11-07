<template>
  <header class="header">
    <NuxtLink
      to="/"
      class="header__title button"
      :class="this.$store.state.mode"
      >главная</NuxtLink
    >
    <p
      v-if="this.$store.state.user.email !== ''"
      class="button"
      :class="this.$store.state.mode"
    >
      авторизован как {{ this.$store.state.user.email }}
    </p>
    <p v-else>не авторизован</p>
    <Toggle />
    <div class="right">
      <NuxtLink
        class="button"
        :class="this.$store.state.mode"
        to="/profile"
        @click="loadList"
        >профиль</NuxtLink
      >
      <NuxtLink
        v-show="!$store.state.isLogged"
        class="button"
        to="/login"
        :class="this.$store.state.mode"
        >логин</NuxtLink
      >
      <button
        v-show="$store.state.isLogged"
        class="button"
        :class="this.$store.state.mode"
        @click="logout"
      >
        выход
      </button>
    </div>
  </header>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";
export default {
  props: ["mode"],
  async fetch() {
    await this.loadList();
  },
  name: "Header",
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },

    async loadList() {
      if (this.$store.state.user.email) {
        let c = this.$store.state.user.email;
        await this.$store.dispatch("showList", { c });
      }
    },
  },
};
</script>

<style scoped>
p {
  color: inherit;
}
.button {
  color: white;
}
header {
  height: 50px;
  display: flex;
  width: 100vw;
  color: inherit;
  background-color: inherit;
  border-bottom: 2px solid gray;
  position: fixed;
  z-index: 102;
  justify-content: space-between;
  align-items: center;
}
.header__title {
  margin-left: 20px;
}
/*.header__login {
  border: 1px solid white;
  padding: 5px;
}*/
.right {
  margin-right: 20px;
}
</style>
