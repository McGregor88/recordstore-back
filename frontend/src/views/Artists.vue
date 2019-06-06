<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="teal lighten-1">
            <v-toolbar-title>Add a new artist</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="addArtist">
              <v-alert v-if="error" :value="true" type="warning" class="mb-4">{{ error }}</v-alert>

              <v-text-field
                v-model="newArtist.name"
                name="artist"
                label="Type an artist name"
                id="artist"
                type="text"
                autofocus
                autocomplete="off"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success" type="submit">Add artist</v-btn>
          </v-card-actions>
        </v-card>

        <ul class="list-reset">
          <li class="artist" v-for="artist in artists" :key="artist.id" :artist="artist">
            <div class="artist__name">{{ artist.name }}</div>
            <v-btn color="success" @click.prevent="editArtist(artist)">Edit</v-btn>
            <v-btn color="success" @click.prevent="removeArtist(artist)">Delete</v-btn>

            <div v-if="artist == editedArtist">
              <v-card class="elevation-12">
                <v-card-text>
                  <v-form @submit.prevent="updateArtist(artist)">
                    <v-text-field
                      v-model="artist.name"
                      name="artist-name"
                      label="Artist name"
                      id="artist_name"
                      type="text"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-btn block color="success" type="submit">Update</v-btn>
                </v-card-actions>
              </v-card>
            </div>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Artists',
  data() {
    return {
      artists: [],
      newArtist: [],
      error: '',
      editArtist: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/artists')
        .then(response => { this.artists = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addArtist() {
      const value = this.newArtist
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/artists', {artist: { name: this.newArtist.name }})
        .then(response => {
          this.artists.push(response.data)
          this.newArtist= ''
        })
        .catch(error => this.setError(error, 'Cannot create artist'))
    },
    removeArtist(artist) {
      this.$http.secured.delete(`/api/v1/artists${artist.id}`)
        .then(response => {
          this.artist.splice(this.artist.indexOf(artist), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete artist'))
    },
    editArtist(artist) {
      this.editedArtist = artist
    },
    updateArtist(artist) {
      this.editedArtist = ''
      this.$http.secured.patch(`/api/v1/artist/${artist.id}`, {artist: { title: artist.name }})
        .catch(error => setError(error, 'Cannot update artist'))
    }
  }
}
</script>

<style lang="sass" scoped>
</style>