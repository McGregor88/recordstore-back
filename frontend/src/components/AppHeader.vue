<template>
  <v-toolbar app color="grey darken-4" dark>
    <router-link to="/" tag="span" style="cursor:pointer">
      <v-toolbar-title class="headline text-uppercase">
        <span>APP</span>
        <span class="font-weight-light">Recorstore</span>
      </v-toolbar-title>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn flat to="/" v-if="!signedIn()">Sign in</v-btn>
      <v-btn flat to="/signup" v-if="!signedIn()">Sign up</v-btn>
      <v-btn flat to="/records" v-if="signedIn()">Records</v-btn>
      <v-btn flat to="/artists" v-if="signedIn()">Artists</v-btn>
      <v-btn flat @click.prevent="signOut" v-if="signedIn()">Sign out</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      //
    };
  },
  created() {
    this.signedIn()
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn() {
      return localStorage.signedIn
    },
    signOut() {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
};
</script>

<style lang="sass">
</style>