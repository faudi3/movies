<template>
  <header class="header">
    <NuxtLink to="/" class="header__title button">Header</NuxtLink>
    <p v-if="this.$store.state.user.email !== ''">
      logged as {{ this.$store.state.user.email }}
    </p>
    <p v-else>not logged in</p>
    <div class="right">
      <NuxtLink class="button" to="/profile" @click="loadList"
        >Profile</NuxtLink
      >
      <NuxtLink class="button" to="/login">login</NuxtLink>
      <button class="button" @click="logout">logout</button>
      <button class="button" @click="test">test</button>
    </div>
  </header>
</template>

<script>
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/plugins/firebase";
export default {
  async fetch() {
    await this.loadList();
  },
  name: "Header",
  methods: {
    async logout() {
      await this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    async test() {
      const docRef = await addDoc(collection(db, "users"), {
        email: "hi",
      });
      console.log("Document written with ID: ", docRef.id);
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
