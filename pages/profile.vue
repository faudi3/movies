<template>
  <div class="profile">
    <div v-if="this.$store.state.user !== null">
      <p @click="show">Ur name</p>
      {{ this.$store.state.favList }}
      <p></p>
      <button class="button" @click="changeName">change name</button>
    </div>

    <div v-else>
      <LoginModal />
    </div>
  </div>
</template>

<script>
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "~/plugins/firebase";
export default {
  data() {
    return {
      result: "",
    };
  },
  name: "profile",
  methods: {
    changeName() {},
    show() {
      console.log(this.$store.state.user.favList);
    },
  },
  beforeMount() {
    let c = this.$store.state.user.email;
    this.$store.dispatch("showList", { c });
  },
};
</script>

<style scoped>
.profile {
  padding: 60px;
  color: white;
}
</style>
