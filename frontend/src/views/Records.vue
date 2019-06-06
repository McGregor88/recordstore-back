<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="teal lighten-1">
            <v-toolbar-title>Add a new record</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="addRecord">
              <v-alert v-if="error" :value="true" type="warning" class="mb-4">{{ error }}</v-alert>

              <v-text-field
                v-model="newRecord.title"
                name="record-title"
                label="Title"
                id="record-title"
                type="text"
              ></v-text-field>

              <v-text-field
                v-model="newRecord.year"
                name="record-year"
                label="Year"
                id="record-year"
                type="text"
              ></v-text-field>

              <v-select
                v-model="newRecord.artist"
                :items="items"
                label="Select an artist"
              ></v-select>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn block color="success" type="submit">Add record</v-btn>
          </v-card-actions>
          <div class="v-card__link text-xs-center">
            <p>Don't see an artist?</p>
            <v-btn small outline color="indigo" to="/artists">Create one </v-btn>
          </div>
        </v-card>

        <ul class="list">
          <li v-for="record in records" :key="record.id" :record="record">
            <div>
              <p>{{ record.title }} &mdash; {{ record.year }}</p>
              <p>{{ getArtist(record) }}</p>
            </div>
            <div>
              <v-btn color="success" @click.prevent="editRecord(record)">Edit</v-btn>
              <v-btn color="success" @click.prevent="removeRecord(record)">Delete</v-btn>
            </div>

            <div v-if="record == editedRecord">
              <v-form @submit.prevent="updateRecord(record)">

                <v-text-field
                  v-model="record.title"
                  name="record-title-upd"
                  label="Title"
                  id="record-title-upd"
                  type="text"
                ></v-text-field>

                <v-text-field
                  v-model="record.year"
                  name="record-year-upd"
                  label="Year"
                  id="record-year-upd"
                  type="text"
                ></v-text-field>

                <v-select
                  v-model="record.artist"
                  :items="items"
                  label="Select an artist"
                ></v-select>

                <v-btn block color="success" type="submit">Update</v-btn>

              </v-form>
            </div>
          </li>
        </ul>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Records',
  data () {
    return {
      items: ['1', '2'],
      artists: [],
      records: [],
      newRecord: [],
      error: '',
      editedRecord: ''
    }
  },
  created() {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/records')
        .then(response => {
          this.records = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))

      this.$http.secured.get('/api/v1/artists')
        .then(response => {
          this.artist = response.data
        })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError(error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getArtist(record) {
      const recordArtistValues = this.artists.filter(artist => artist.id === record.artist_id)

      let artist

      recordArtistValues.forEach(function(el) {
        artist = el.name
      })

      return artist
    },
    addRecord() {
      const value = this.newRecord
      if (!value) {
        return
      } else {
        this.$http.secured.post(
          '/api/v1/records/', 
          {
            record: {
              title: this.newRecord.title,
              year: this.newRecord.year,
              artist_id: this.newRecord.artist
            }
          }
        )
          .then(response => {
            this.records.push(response.data)
            this.newRecord = ''
          })
          .catch(error => this.setError(error, 'Cannot create record'))
      }
    },
    removeRecord(record) {
      this.$http.secured.delete(`/api/v1/records/${record.id}`)
        .then(response => {
          this.records.splice(this.records.indexOf(record), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete record'))
    },
    editRecord(record) {
      this.editedRecord = record
    },
    updateRecord(record) {
      this.editRecord = ''
      this.$http.secured.patch(
        `/api/records/${record.id}`, 
        {
          record: {
            title: record.title,
            year: record.year,
            artist_id: record.artist
          }
        }
      )
        .catch(error => this.setError(error, 'Cannot update record'))
    }
  }
}
</script>

<style lang="sass" scoped>
</style>