<template>
  <div>
    <link rel="stylesheet" href="/static/navBar/css/navBar.css">
    <link rel="stylesheet" href="/static/default/css/default.css" scoped>

    <div class="navbar-container">
      <div class="navbar-logo-box center">
        <a href="/" class="actionfont font_medium"> <img src='/static/navBar/images/logo.png'>
      </a>
      </div>
      <div class="navbar-routes">
        <div v-if="loggedIn" class="navBar-profile box">
          <div class="navbar-search-route el center">
            <a :href="'/profile/?username='+currentUsername" class="actionfont font_medium first"><img src='/static/navBar/images/profile.png'></a>
            <a :href="'/profile/?username='+currentUsername" class="actionfont font_medium second">Profile</a>

          </div>
          <div class="navbar-profile-route el center">
            <router-link to="/search" class="actionfont font_medium first" href=""><img src='/static/navBar/images/search.png'></router-link>
            <router-link to="/search" class="actionfont font_medium second" href="">Search</router-link>

          </div>
          
          <div v-if="userLog.userType=='Client'" class="navbar-search-route el center">
            <a href="/" class="actionfont font_medium first"><img src='/static/navBar/images/Home.png'></a>
            <a href="/" class="actionfont font_medium second">Home</a>

          </div>
          <div class="navbar-search-route el center">
            <button v-on:click="logout" class="actionfont font_medium first">
                <img src='/static/navBar/images/Log.png'>
            </button>
            <button v-on:click="logout" class="actionfont font_medium second">
                Logout
            </button>
          </div>
        </div>
        <div v-else class="navBar-auth box" >
           <div class="navbar-search-route el center" >
            <a  href="/" class="actionfont font_medium first" ><img src='/static/navBar/images/Home.png'></a>
            <a  href="/" class="actionfont font_medium second" >Home</a>
            </div>
          <div class="navbar-profile-route el center">
            <router-link to="/search" class="actionfont font_medium first" href=""><img src='/static/navBar/images/search.png'></router-link>
            <router-link to="/search" class="actionfont font_medium second" href="">Search</router-link>
          </div>
          <div class="navbar-signin-route el center">
            <router-link to='/login' class="actionfont font_medium">Sign in</router-link>
          </div>
          <div class="navbar-signup-route el center">
            <router-link to='/register' class="actionfont font_medium" data-toggle="modal" data-target="#registerModal">Sign up</router-link>
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
      currentUsername: "",
      userLog:{}
    }
  },
  methods:{
    logout:function(){

      this.$http.get(URL + '/user/logout').then(function (response) {
        if (!response.data.errors) {
            localStorage.clear();
            this.loggedIn = false;
            window.location = '/login?logout=yes'
        }
      })

    },
    mouse:function(){
      console.log("hi")
    }
  },
  created: function () {
    if (localStorage.user) {
      this.loggedIn = true
      this.currentUsername = localStorage.user
      this.userLog = JSON.parse(localStorage.userObj)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el{
    -webkit-transition: all 0.75s ease-in-out ; /* For Safari 3.1 to 6.0 */
    transition: all 0.75s ease-in-out ;
  }
 .el:hover .first{
    transform: translateY(-100px)
  }
.first{
-webkit-transition: all 0.75s ease-in-out ; /* For Safari 3.1 to 6.0 */
    transition: all 0.75s ease-in-out ;
      }
  .el:hover .second{
    transform: translateY(0px)
  }
    .second{
    -webkit-transition: all 0.75s ease-in-out ; /* For Safari 3.1 to 6.0 */
    transition: all 0.75s ease-in-out ;
    position: absolute;
    transform: translateY(50px)

  }
  
</style>
