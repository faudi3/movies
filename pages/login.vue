<template>
  <main>
    <section class="forms">
      <form class="register" @submit.prevent="registerbtn">
        <h2>register</h2>
        <input type="email" placeholder="Email" v-model="register_form.email" />
        <input
          type="password"
          placeholder="password"
          v-model="register_form.password"
        />
        <input type="submit" value="register" />
      </form>
      <form class="register" @submit.prevent="loginbtn">
        <h2>login</h2>
        <input type="email" placeholder="Email" v-model="login_form.email" />
        <input
          type="password"
          placeholder="password"
          v-model="login_form.password"
        />
        <input type="submit" value="login" />
      </form>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      login_form: {},
      register_form: {},
    };
  },
  methods: {
    loginbtn() {
      this.$store.dispatch("login", {
        email: this.login_form.email,
        password: this.login_form.password,
      });
    },
    registerbtn() {
      this.$store.dispatch("register", {
        email: this.register_form.email,
        password: this.register_form.password,
      });
    },
  },
};
</script>

<style scoped>
main {
  padding: 50px;
}
input {
  background-color: white;
}
</style>
