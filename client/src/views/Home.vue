<template>
  <div id="home">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="10" lg="8" class="mx-auto">
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
              <ValidationObserver v-slot="{ handleSubmit, reset }">
                <form
                  ref="form"
                  @submit.prevent="handleSubmit(save)"
                  @reset.prevent="reset"
                >
                  <v-card-text class="pt-0">
                    <v-container class="pt-0">
                      <v-row>
                        <v-col cols="12" sm="12" md="12">
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="First Name"
                            rules="required|min:3"
                          >
                            <v-text-field
                              v-model="editedContact.firstName"
                              :error-messages="errors"
                              label="First Name"
                            ></v-text-field>
                          </ValidationProvider>
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Last Name"
                            rules="required|min:3"
                          >
                            <v-text-field
                              v-model="editedContact.lastName"
                              :error-messages="errors"
                              label="Last Name"
                            ></v-text-field>
                          </ValidationProvider>
                          <ValidationProvider
                            v-slot="{ errors }"
                            name="Phone Number"
                            rules="required|numeric|min:5"
                          >
                            <v-text-field
                              v-model="editedContact.phoneNumber"
                              :error-messages="errors"
                              label="Phone Number"
                            ></v-text-field>
                          </ValidationProvider>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      type="reset"
                      color="blue darken-1"
                      text
                      @click="close"
                      >Cancel</v-btn
                    >
                    <v-btn
                      color="blue darken-1 white--text"
                      :loading="saveBtnLoading"
                      type="submit"
                      >Save</v-btn
                    >
                  </v-card-actions>
                </form>
              </ValidationObserver>
            </v-card>
          </v-dialog>
          <v-data-table
            :headers="headers"
            :items="contacts"
            :loading="loading"
            :search="search"
            no-data-text="No contacts for now"
            sort-by="firstName"
            class="elevation-1 mt-6"
          >
            <template v-slot:top>
              <div>
                <v-toolbar flat color="white">
                  <v-toolbar-title>List</v-toolbar-title>

                  <!-- <v-spacer></v-spacer> -->
                  <v-dialog v-model="deleteDialog" persistent max-width="500px">
                    <v-card>
                      <v-card-title>
                        <span class="headline"
                          >Permanently delete this contact?</span
                        >
                      </v-card-title>

                      <v-card-text>
                        <v-container>
                          <v-card class="card" tile flat>
                            <!-- <v-row no-gutters> -->
                            <p>
                              <strong>First Name: </strong
                              >{{ contactToDelete.firstName }}
                            </p>
                            <p>
                              <strong>Last Name: </strong
                              >{{ contactToDelete.lastName }}
                            </p>
                            <p>
                              <strong>Phone Number: </strong
                              >{{ contactToDelete.phoneNumber }}
                            </p>
                            <!-- </v-row> -->
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
                          color="blue darken-1 white--text"
                          @click="deleteContact"
                          >Delete Forever</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </v-toolbar>
                <v-card-title class="pt-0">
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                  ></v-text-field>
                </v-card-title>
              </div>
            </template>
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editContact(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteBtn(item)">
                mdi-delete
              </v-icon>
            </template>
            <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template> -->
          </v-data-table>
          <div class="text-center ma-2">
            <v-snackbar v-model="snackbar">
              {{ message }}
              <v-btn color="pink" text @click="snackbar = false">
                Close
              </v-btn>
            </v-snackbar>
          </div>
        </v-col>
      </v-row>
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
    saveBtnLoading: false,
    snackbar: false,
    message: '',
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
    search: '',
    editedIndex: -1,
    editedContact: {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },
    defaultContact: {
      firstName: '',
      lastName: '',
      phoneNumber: ''
    },
    contactToDelete: {}
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
        })
      if (!contacts) return

      this.contacts = contacts.data.data
    },

    editContact(contact) {
      this.editedIndex = this.contacts.indexOf(contact)
      this.editedContact = Object.assign({}, contact)
      this.dialog = true
    },
    deleteBtn(contact) {
      this.deleteDialog = true
      this.contactToDelete = contact
    },
    async deleteContact() {
      this.deleteBtnLoading = true

      await ContactService.deleteById(this.contactToDelete._id.$oid)
        .catch((err) => console.log(err))
        .finally(() => {
          this.deleteBtnLoading = false
          this.contacts = this.contacts.filter(
            (contact) => this.contactToDelete._id.$oid !== contact._id.$oid
          )
          this.message = 'Contact deleted successfully'
          this.snackbar = true
        })
      this.deleteDialog = false
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedContact = Object.assign({}, this.defaultContact)
        this.editedIndex = -1
      })
    },

    async save() {
      if (this.editedIndex > -1) {
        this.saveBtnLoading = true
        const { firstName, lastName, phoneNumber } = this.editedContact
        await ContactService.updateContact(this.editedContact._id.$oid, {
          firstName,
          lastName,
          phoneNumber
        })
          .catch((err) => console.log(err))
          .finally(() => {
            this.saveBtnLoading = false
            Object.assign(this.contacts[this.editedIndex], this.editedContact)
            this.message = 'Contact updated successfully'
            this.snackbar = true
          })
      } else {
        this.saveBtnLoading = true
        const { firstName, lastName, phoneNumber } = this.editedContact
        const contact = await ContactService.createContact({
          firstName,
          lastName,
          phoneNumber
        })
          .catch((err) => console.log(err))
          .finally(() => {
            this.saveBtnLoading = false

            this.message = 'Contact created successfully'
            this.snackbar = true
          })
        if (!contact) return
        this.contacts.unshift(contact.data.data)
      }
      this.$nextTick(() => {
        this.$refs.form.reset()
      })
      this.close()
    }
  }
}
</script>
