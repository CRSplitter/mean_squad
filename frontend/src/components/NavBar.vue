<template>
  <div>
    <link rel="stylesheet" href="/static/navBar/css/navBar.css">
    <link rel="stylesheet" href="/static/default/css/default.css" scoped>

    <div class="navbar-container">
      <div class="navbar-logo-box center box">
        Logo
      </div>
      <div class="navbar-routes">
        <div v-if="loggedIn" class="navBar-profile box">
          <div class="navbar-search-route el center">
            <a :href="'/profile/'+currentUsername" class="actionfont">{{currentUsername}}</a>
          </div>
          <div class="navbar-profile-route el center">
            <router-link to="/search" class="actionfont" href="">Search</router-link>
          </div>
        </div>
        <div v-else class="navBar-auth box">
          <div class="navbar-signin-route el center">
            <router-link to='/login' class="actionfont">Sign in</router-link>
          </div>
          <div class="navbar-signup-route el center">
            <router-link to='register' class="actionfont" data-toggle="modal" data-target="#registerModal">Sign up</router-link>
          </div>
              <registerPage></registerPage>
        </div>
      </div>

    </div>
    <div class="navBar-routerview">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navBar',
  data() {
    return {
      loggedIn: false,
      currentUsername: ""
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
