<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Log In</h2>
    <p>Log in to your account to get some great quotes.</p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <div class="form-group">
      <input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
    </div>
    <div class="form-group">
      <input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
    </div>
    <button class="btn btn-primary" @click="submit">Access</button>
  </div>
</template>

<script>
  import auth from '../auth'

  export default {

    data() {
      return {
        credentials: {
          username: '',
          password: ''
        },
        error: ''
      }
    },

    methods: {

      submit: function (e) {

        // auth.login(this, {
        //     username: this.credentials.username,
        //     password: this.credentials.password
        //   }, 'home');

        this.$http.post('http://localhost:8000/user/login', {
            username: this.credentials.username,
            password: this.credentials.password
          })
          .then(function (response) {
            if (response.data.data.errors) {
              console.log("responded with errors");
            }
            //console.log(response.data.data.token);
            localStorage.setItem('id_token', response.data.data.token)

            console.log(localStorage.getItem('id_token'));

          }, function (response) {
            console.log("error happened with http");
          });

      }
    }

  }
</script>