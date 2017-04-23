<template>
  <div>
    <link rel="stylesheet" href="/static/navBar/css/navBar.css">
    <link rel="stylesheet" href="/static/default/css/default.css" scoped>

    <div class="navbar-container">
      <div class="navbar-logo-box center ">
        <a href="/" class="actionfont font_medium"> <img src='/static/navBar/images/logo.png'>
</a>
      </div>
      <div class="navbar-routes">
        <div v-if="loggedIn" class="navBar-profile box">
          <div class="navbar-search-route el center">
            <a :href="'/profile/?username='+currentUsername" class="actionfont font_medium"><img src='/static/navBar/images/profile.png'></a>
          </div>
          <div class="navbar-profile-route el center">
            <router-link to="/search" class="actionfont font_medium" href=""><img src='/static/navBar/images/search.png'></router-link>
          </div>
          
          <div class="navbar-search-route el center">
            <a href="/" class="actionfont font_medium"><img src='/static/navBar/images/Home.png'></a>
          </div>
          <div class="navbar-search-route el center">
            <button v-on:click="logout" class="actionfont font_medium">
                <img src='/static/navBar/images/Log.png'>
            </button>
          </div>
        </div>
        <div v-else class="navBar-auth box">
           <div class="navbar-search-route el center">
            <a href="/" class="actionfont font_medium"><img src='/static/navBar/images/Home.png'></a>
          </div>
          <div class="navbar-profile-route el center">
            <router-link to="/search" class="actionfont font_medium" href=""><img src='/static/navBar/images/search.png'></router-link>
          </div>
          <div class="navbar-signin-route el center">
            <router-link to='/login' class="actionfont font_medium">Sign in</router-link>
          </div>
          <div class="navbar-signup-route el center">
            <router-link to='register' class="actionfont font_medium" data-toggle="modal" data-target="#registerModal">Sign up</router-link>
          </div>
        </div>
      </div>

    </div>
    <div class="navBar-routerview">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
var URL = require('./env.js').HostURL;

export default {
  name: 'navBar',
  data() {
    return {
      loggedIn: false,
      currentUsername: ""
    }
  },
  methods:{
    logout:function(){
              console.log("response")

      this.$http.get(URL + '/user/logout').then(function (response) {
        if (!response.data.errors) {
            localStorage.clear();
            window.location = '/login?logout=yes'
        }
      })

    }
  },
  created: function () {
    if (localStorage.user) {
      this.loggedIn = true
      this.currentUsername = localStorage.user
      console.log(localStorage.user)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
</style>
