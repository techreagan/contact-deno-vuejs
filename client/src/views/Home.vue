<template>
  <div id="home">
    <v-container>
      <!-- <v-btn color="primary" bottom fab right fixed dark class="mb-2" v-on="on"
        ><v-icon>mdi-plus</v-icon></v-btn
      > -->
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn
            color="primary"
            bottom
            right
            fab
            dark
            fixed
            class="mb-2"
            v-on="on"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="editedItem.firstName"
                    label="First Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="editedItem.lastName"
                    label="Last Name"
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="editedItem.phoneNumber"
                    label="Phone Number"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="contacts"
        :loading="loading"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Contact List</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="deleteDialog" persistent max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="headline">Permanently delete this video?</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-card class="card" tile flat>
                      <v-row no-gutters>
                        You wanna delete something
                      </v-row>
                    </v-card>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="deleteDialog = !deleteDialog"
                    >Cancel</v-btn
                  >

                  <v-btn
                    :loading="deleteBtnLoading"
                    color="blue darken-1"
                    text
                    @click="deleteItem"
                    >Delete Forever</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteBtn(item)">
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import ContactService from '@/services/ContactService'

export default {
  name: 'home',
  data: () => ({
    dialog: false,
    deleteDialog: false,
    loading: false,
    deleteBtnLoading: false,
    headers: [
      {
        text: 'First Name',
        align: 'start',
        value: 'firstName'
      },
      {
        text: 'Last Name',
        align: 'start',
        value: 'lastName'
      },
      {
        text: 'Phone Number',
        align: 'start',
        value: 'phoneNumber'
      },
      { text: 'Actions', value: 'actions', sortable: false }
    ],
    contacts: [],
    editedIndex: -1,
    editedItem: {
      firstName: '',
      lastName: '',
      phonenumber: 0
    },
    defaultItem: {
      firstName: '',
      lastName: '',
      phonenumber: 0
    },
    itemToDelete: {}
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Add Contact' : 'Edit Contact'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  created() {
    this.initialize()
  },

  methods: {
    async initialize() {
      this.loading = true
      const contacts = await ContactService.getAll()
        .catch((err) => console.log(err))
        .finally(() => {
          this.loading = false
          console.log(contacts)
          this.contacts = contacts.data
        })
      // this.contacts = [
      //   {
      //     firstName: 'Hello world',
      //     lastName: 'dddd',
      //     phoneNumber: 1223434
      //   }
      // ]
    },

    editItem(item) {
      this.editedIndex = this.contacts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteBtn(item) {
      this.deleteDialog = true
      this.itemToDelete = item
    },
    deleteItem(item) {
      const index = this.contacts.indexOf(item)

      this.contacts.splice(index, 1)
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.contacts[this.editedIndex], this.editedItem)
      } else {
        this.contacts.push(this.editedItem)
      }
      this.close()
    }
  }
}
</script>
