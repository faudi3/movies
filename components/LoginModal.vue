<template>
  <v-row class="login" align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="elevation-4 text-left" shaped color="yellow">
        <v-card-title>Авторизация</v-card-title>
        <v-card-subtitle>Зайдите в свой аккаунт</v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Логин"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="login_form.email"
            />

            <v-text-field
              label="Пароль"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="login_form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn class="login-button" @click="loginbtn" depressed large
            >Войти</v-btn
          >
        </v-card-actions>
        <v-card-actions class="text-center">
          <v-btn class="login-button" @click="registerbtn" depressed large
            >Зарегистрироваться</v-btn
          >
        </v-card-actions>
      </v-card>
      <v-snackbar :timeout="4000" v-model="snackbar" absolute bottom center>
        {{ snackbarText }}
      </v-snackbar>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      login_form: {},
      register_form: {},
      snackbarText: "No error message",
      snackbar: false,
    };
  },
  methods: {
    async loginbtn() {
      let e = this.login_form.email;
      let p = this.login_form.password;
      await this.$store.dispatch("login", {
        email: e,
        password: p,
      });
      localStorage.name = this.$store.state.user.email;
      localStorage.logged = this.$store.state.isLogged;
    },
    async registerbtn() {
      let e = this.login_form.email;
      let p = this.login_form.password;
      await this.$store.dispatch("register", {
        email: e,
        password: p,
      });
      localStorage.name = this.$store.state.user.email;
      localStorage.logged = this.$store.state.isLogged;
    },
  },
};
</script>

<style scoped>
.login {
  padding-top: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
</style>
