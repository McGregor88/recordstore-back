<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="teal lighten-1">
            <v-toolbar-title>Sign In</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="signin">
              <v-alert v-if="error" :value="true" type="warning" class="mb-4">{{ error }}</v-alert>

              <v-text-field
                prepend-icon="person"
                v-model="email"
                name="email"
                label="E-mail Address"
                id="email"
                type="email"
              ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                v-model="password"
                name="password"
                label="Password"
                id="password"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" type="submit">Sign In</v-btn>
            <v-btn color="primary" to="/signup">Sign Up</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: "",
      error: ""
    };
  },
  created() {
    this.checkSignedIn();
  },
  updated() {
    this.checkSignedIn();
  },
  methods: {
    signin() {
      this.$http.plain
        .post("/signin", { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error));
    },
    signinSuccessful(response) {
      if (!response.data.csrf) {
        this.signinFailed(response);
        return;
      }

      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = "";
      this.$router.replace("/records");
    },
    signinFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "";
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkSignedIn() {
      if (localStorage.signedIn) {
        this.$router.replace("/records");
      }
    }
  }
};
</script>

<style lang="sass" scoped>
.v-toolbar

  &__title
    margin-left: auto
    margin-right: auto

.v-card

  &__text
    padding:
      top: 40px
      left: 15%
      right: 15%

  &__actions
    padding:
      left: 15%
      right: 15%
      bottom: 30px
</style>

