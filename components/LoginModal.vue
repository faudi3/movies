<template>
  <v-row class="login" align="center" justify="center">
    <v-col cols="12" sm="8" md="4" align="center">
      <v-card width="500" class="elevation-4 text-left" shaped color="yellow">
        <v-card-title>Login</v-card-title>
        <v-card-subtitle>Login to your dashboard</v-card-subtitle>
        <v-card-text>
          <v-form>
            <v-text-field
              label="Login"
              name="login"
              prepend-icon="mdi-account"
              type="text"
              v-model="login_form.email"
            />

            <v-text-field
              label="Password"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
              v-model="login_form.password"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="text-center">
          <v-btn class="login-button" @click="loginbtn" depressed large
            >Login</v-btn
          >
        </v-card-actions>
        <v-card-actions class="text-center">
          <v-btn class="login-button" @click="registerbtn" depressed large
            >register</v-btn
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
    },
    async registerbtn() {
      let e = this.login_form.email;
      let p = this.login_form.password;
      await this.$store.dispatch("register", {
        email: e,
        password: p,
      });
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
