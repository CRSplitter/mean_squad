import router from '../router'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'user/login/'
const SIGNUP_URL = API_URL + 'users/'

export default {

  user: {
    authenticated: false
  },

  login(context, creds, redirect) {
    context.$http.post(LOGIN_URL, creds)
          .then(function (response) {
            if (response.data.data.errors) {
              console.log("responded with errors");
            }
                console.log(response.data.data.id_token)
                localStorage.setItem('id_token', response.data.data.id_token)
                //this.user.authenticated = true
                console.log(localStorage.getItem('id_token'));
            //console.log(response.data.data.token);
            localStorage.setItem('id_token', response.data.data.token)

            //console.log(localStorage.getItem('id_token'));

          }, function (response) {
            console.log("error happened with http");
          });

  },

  signup(context, creds, redirect) {
    context.$http.post(SIGNUP_URL, creds, (data) => {
      localStorage.setItem('id_token', data.id_token)

      this.user.authenticated = true

      if(redirect) {
        router.go(redirect)        
      }

    }).error((err) => {
      context.error = err
    })
  },

  logout() {
    localStorage.removeItem('id_token')
    this.user.authenticated = false
  },

  checkAuth() {
    var jwt = localStorage.getItem('id_token')
    if(jwt) {
      this.user.authenticated = true
    }
    else {
      this.user.authenticated = false      
    }
  },


  getAuthHeader() {
    return {
      'Authorization': 'JWT ' + localStorage.getItem('id_token')
    }
  }
}
