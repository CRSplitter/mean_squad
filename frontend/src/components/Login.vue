<template>
	<div class="loginContainer center">

		<div>
			<div class="login-box box_shadow">
				<div class="login-btn-box center actionfont">

					<h2>Log In</h2>
				</div>
				<p>Login and reserve your favorite activities .</p>
				<div class="actionfont font_small center actionfont" v-if="error">
					{{ error }}
				</div>
				<div class="form-group">
					<input type="text" class="form-control" placeholder="Enter your username" v-model="credentials.username">
				</div>
				<div class="form-group">
					<input type="password" class="form-control" placeholder="Enter your password" v-model="credentials.password">
				</div>
				<br>
				<div class="login-btn-box center">
					<button class="backgroudcolor3" v-on:click="submit">Login</button>
					<br/>
				</div>
				<br/>

				<div class="center">
					<!--<a class="btn btn-block btn-social" :href="URL + '/login/auth/facebook'">
						<span class="fa fa-facebook"></span> Sign in with Facebook
					</a>-->
					<router-link to="/request_reset_password" href=""  :startP="startP" :endP="endP">Forgot My Password</router-link>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import auth from '../auth'
	var URL = require('./env.js').HostURL;

	export default {
		props:['startP','endP'],
		data() {
			return {
				credentials: {
					username: '',
					password: ''
				},
				error: '',
				URL: 'http://localhost:8080'
			}
		},

		methods: {

			submit: function (e) {
				this.startP();
				this.$http.post(URL + '/user/login', {
						username: this.credentials.username,
						password: this.credentials.password
					})
					.then(function (response) {
						this.endP();
						if (response.data.errors) {
							this.error = response.data.errors[0].msg;
						} else {

							localStorage.setItem('id_token', response.data.data.token)
							localStorage.setItem('user', response.data.data.user.username) //response.body.data(bta3tna di).user 
							localStorage.setItem('userType', response.data.data.user.userType)
							localStorage.setItem('userObj', JSON.stringify(response.data.data.user))
							if (response.data.data.user.userType == 'Site Admin') {
								window.location = 'adminPage'
							} else {
								window.location = 'profile/?username=' + response.data.data.user.username
							}

						}

					}, function (response) {
						this.error = "Username or Password is wrong."
					});

			},
			callFacebook: function (e) {
				this.startP();
				this.$http.get(URL + '/login/auth/facebook')
					.then(function (res) {
						this.endP()
						console.log("success");
						console.log(res);
					}).catch(function (err) {
						console.log(err);
						console.log("error connecting with Facebook!");
					});
			}
		},
		created: function () {
			this.URL = URL;
			this.endP();																																												
			// if(this.$route.query.logout){
			// 	window.location='/login'
			// }
		}

	}
</script>


<style scoped>
	.loginContainer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-image: url('/static/default/images/bgPattern.jpg');
		top: 0;
	}

	.login-box {
		position: relative;
		padding: 40px;
		width: auto;
		height: auto;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
		-webkit-animation-name: example;
		/* Safari 4.0 - 8.0 */
		-webkit-animation-duration: 0.5s;
		/* Safari 4.0 - 8.0 */
		animation-name: example;
		animation-duration: 0.5s;
	}

	@keyframes example {
		from {
			transform: translateY(200px);
			opacity: 0;
		}
		to {
			transform: translateY(0);
			opacity: 1;
		}
	}

	.filter-login {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.login-btn-box {
		position: relative;
		width: 100%;
	}

	button {
		position: relative;
		height: 30px;
		border-radius: 20px;
		color: white;
		font-weight: bold;
		width: 100px;
	}

	input {
		border-radius: 20px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.5)
	}
</style>