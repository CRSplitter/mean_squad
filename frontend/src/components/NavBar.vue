<template>
	<div>
		<link rel="stylesheet" href="/static/navBar/css/navBar.css">
		<link rel="stylesheet" href="/static/default/css/default.css" scoped>

		<div class="navbar-container">
			<div class="navbar-logo-box center grow">
				<router-link to="/" class="actionfont font_medium mira" href=""><img src='/static/navBar/images/logo.png'></router-link>
				</a>
			</div>
			<div class="navbar-routes">
				<div v-if="loggedIn" class="navBar-profile box">
					<div class="navbar-search-route el center">
						<router-link :to="'/profile/?username='+currentUsername" class="actionfont font_medium first mira" href=""><img src='/static/navBar/images/profile.png'></router-link>
						<router-link :to="'/profile/?username='+currentUsername" class="actionfont font_medium second mira" href="">Profile</router-link>

					</div>
					<div class="navbar-profile-route el center">
						<router-link to="/search" class="actionfont font_medium first mira" href=""><img src='/static/navBar/images/search.png'></router-link>
						<router-link to="/search" class="actionfont font_medium second mira" href="">Search</router-link>

					</div>

					<div v-if="userLog.userType=='Client'" class="navbar-search-route el center">
						<router-link to="/" class="actionfont font_medium first mira" href=""><img src='/static/navBar/images/Home.png'></router-link>
						<router-link to="/" class="actionfont font_medium second mira" href="">Home</router-link>

					</div>
					<div class="navbar-search-route el center">
						<button v-on:click="logout" class="actionfont font_medium first mira">
                <img src='/static/navBar/images/Log.png'>
            </button>
						<button v-on:click="logout" class="actionfont font_medium second mira">
                Logout
            </button>
					</div>
				</div>
				<div v-else class="navBar-auth box">
					<div class="navbar-search-route el center">
						<router-link to="/" class="actionfont font_medium first mira" href=""><img src='/static/navBar/images/Home.png'></router-link>
						<router-link to="/" class="actionfont font_medium second mira" href="">Home</router-link>
					</div>
					<div class="navbar-profile-route el center">
						<router-link to="/search" class="actionfont font_medium first mira" href=""><img src='/static/navBar/images/search.png'></router-link>
						<router-link to="/search" class="actionfont font_medium second mira" href="">Search</router-link>
					</div>
					<div class="navbar-signin-route el center">
						<router-link to='/login' class="actionfont font_medium mira">Login</router-link>
					</div>
					<div class="navbar-signup-route el center">
						<router-link to='/register' class="actionfont font_medium mira" data-toggle="modal" data-target="#registerModal">Sign up</router-link>
					</div>
				</div>
			</div>
		</div>
		<div id="nprogress" class="bar">
			<topProgress style="background-color: #26C281;" ref="topProgress"></topProgress>
		</div>
		<div class="navBar-routerview">
			<router-view :startP="startP" :endP="endP"></router-view>
			<router-link to="/contactus" class="actionfont font_medium mira" href="">Contact Us</router-link>
		</div>
		
	</div>
</template>

<script>
	var URL = require('./env.js').HostURL;
	import topProgress from 'vue-top-progress'

	export default {
		name: 'navBar',
		data() {
			return {
				loggedIn: false,
				currentUsername: "",
				userLog: {}
			}
		},
		methods: {
			loadBar: function () {
				this.$refs.topProgress.start();

				setTimeout(() => {
					this.$refs.topProgress.done()
				}, 2000)
			},
			startP: function () {
				this.$refs.topProgress.start();
			},
			endP: function () {
				this.$refs.topProgress.done();
			},
			logout: function () {
				var context = this;
				this.startP();
				this.$http.get(URL + '/user/logout').then(function (response) {
					this.endP();
					if (!response.data.errors) {
						localStorage.clear();
						this.loggedIn = false;
						this.startP();
						window.location = '/login?logout=yes'
					}
				}, (err) => {
							context.errors = "Internal Server Error";
						})

			},
			mouse: function () {
				console.log("hi")
			}
		},
		created: function () {
			if (localStorage.user) {
				this.loggedIn = true
				this.currentUsername = localStorage.user
				this.userLog = JSON.parse(localStorage.userObj)
			}
		},
		mounted() {
			this.startP();
			this.endP();
		},
		components: {
			topProgress
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.el {
		-webkit-transition: all 0.75s ease-in-out;
		/* For Safari 3.1 to 6.0 */
		transition: all 0.75s ease-in-out;
	}

	.el:hover .first {
		transform: translateY(-100px)
	}

	.first {
		-webkit-transition: all 0.75s ease-in-out;
		/* For Safari 3.1 to 6.0 */
		transition: all 0.75s ease-in-out;
	}

	.el:hover .second {
		transform: translateY(0px)
	}
    .grow:hover
    {
            -webkit-transform: scale(1.0);
            -ms-transform: scale(1.0);
            transform: scale(1.05);
    }

	.second {
		-webkit-transition: all 0.75s ease-in-out;
		/* For Safari 3.1 to 6.0 */
		transition: all 0.75s ease-in-out;
		position: absolute;
		transform: translateY(50px)
	}

	#nprogress .bar {
		background: #000000;
	}

	.mira{
		text-decoration:none;
	}
</style>