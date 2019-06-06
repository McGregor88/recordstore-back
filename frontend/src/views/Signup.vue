<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="teal lighten-1">
            <v-toolbar-title>Sign Up</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="signup">
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

              <v-text-field
                prepend-icon="lock"
                v-model="password_confirmation"
                name="password-confirmation"
                label="Password Confirmation"
                id="password-confirmation"
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success" type="submit">Sign Up</v-btn>
          </v-card-actions>
          <div class="v-card__link text-xs-center">
            <v-btn small outline color="indigo" to="/">Sign In</v-btn>
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      email: "",
      password: "",
      password_confirmation: "",
      error: ""
    };
  },
  created() {
    this.checkedSignedIn();
  },
  updated() {
    this.checkedSignedIn();
  },
  methods: {
    signup() {
      this.$http.plain
        .post("/signup", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error));
    },
    signupSuccessful(response) {
      if (!response.data.csrf) {
        this.signupFailed(response);
        return;
      }

      localStorage.csrf = response.data.csrf;
      localStorage.signedIn = true;
      this.error = "";
      this.$router.replace("/records");
    },
    signupFailed(error) {
      this.error =
        (error.response && error.response.data && error.response.data.error) ||
        "Something went wrong";
      delete localStorage.csrf;
      delete localStorage.signedIn;
    },
    checkedSignedIn() {
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

  &__link
    padding-bottom: 30px
</style>
