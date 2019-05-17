<template>
  <v-container grid-list-md>
    <v-layout wrap row>
      <v-flex xs12>
        <v-alert :value="true" :type="alert.type" dismissible v-model="alert.show" transition="scale-transition">
          {{ alert.message }}
        </v-alert>
      </v-flex>
      <v-flex xs12>
        <v-toolbar flat dark>
          <v-toolbar-title class="subheading">
            Usuários
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="addNewDialog()">
            <v-icon>add</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table :headers="headers" :items="users" class="elevation-1" :loading="pageLoading">
          <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
          <template v-slot:items="props">
            <td>
              <v-edit-dialog :return-value.sync="props.item.name" lazy> {{ props.item.name }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.name" label="Edit" single-line counter>
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td>
              <v-edit-dialog :return-value.sync="props.item.email" lazy> {{ props.item.email }}
                <template v-slot:input>
                  <v-text-field v-model="props.item.email" label="Edit" single-line counter>
                  </v-text-field>
                </template>
              </v-edit-dialog>
            </td>
            <td>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn flat icon @click="deleteItem(props.item.id)">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </template>
                <span>Delete</span>
              </v-tooltip>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-form ref="form">
        <v-card>
          <v-container grid-list-md>
            <v-card-title>
              <span class="headline">Novo Usuário</span>
            </v-card-title>
            <v-card-text>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Name*" required v-model="fields.name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field type="email" label="Email*" required v-model="fields.email"></v-text-field>
                </v-flex>
              </v-layout>
              <small>*campos obrigatórios</small>
            </v-card-text>
          </v-container>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Fechar</v-btn>
            <v-btn color="blue darken-1" flat @click="submit()" :loading="sending" :disabled="sending">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-dialog>
  </v-container>
</template>
<script>
  export default {
    data() {
      return {
        pageLoading: true,
        dialog: false,
        users: [],
        sending: false,
        baseUrl: "https://ruby-ruby-ruby.herokuapp.com/api/v1/",
        alert: {
          show: false,
          type: null,
          message: null
        },
        fields: {
          name: null,
          email: null
        },
        headers: [{
            text: 'Nome',
            value: 'name',
            sortable: false,
            width: 200
          },
          {
            text: 'Email',
            value: 'email',
            sortable: false,
            width: 200
          },
          {
            text: "Delete",
            value: "delete",
            sortable: false,
            width: 200
          }
        ]
      }
    },

    methods: {
      sendAlert(type, message) {
        this.alert.message = message
        this.alert.type = type
        this.alert.show = true
      },

      getUsers() {
        axios.get(this.baseUrl + "users")
          .then(response => {
            this.users = response.data.data;
            this.pageLoading = false;
          })
      },

      addNewDialog() {
        this.dialog = true
      },

      submit() {
        this.sending = true

        axios.post(this.baseUrl + "users", this.fields)
        .then(response => {
          this.getUsers()
          this.sending = false
          this.sendAlert("success", "Criado com sucesso!")
          this.dialog = false
        })
      },

      deleteItem(id) {
        axios.delete(this.baseUrl + "users/" + id)
        .then(response => {
          this.users = this.users.filter(x => {
            return x.id != id
          })
          this.sendAlert("success", "Deletado com sucesso!")
        })
      }
    },

    beforeMount() {
      this.getUsers();
    }
  }

</script>
