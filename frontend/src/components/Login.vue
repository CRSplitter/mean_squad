<template>
	<div class="loginContainer center">
		<div class="filter-login">
		</div>
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
				</div>
				<!--<a href="http://localhost:8080/login/auth/facebook">LOGIN WITH FB</a>-->
			</div>
		</div>
	</div>
</template>

<script>
	import auth from '../auth'
	var URL = require('./env.js').HostURL;

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

				this.$http.post(URL + '/user/login', {
						username: this.credentials.username,
						password: this.credentials.password
					})
					.then(function (response) {
						if (response.data.errors) {
							console.log(response.data.errors);
						}
						console.log(response.body.data.user);
						localStorage.setItem('id_token', response.data.data.token)
						localStorage.setItem('user', response.data.data.user.username) //response.body.data(bta3tna di).user 
						localStorage.setItem('userType', response.data.data.user.userType)
						localStorage.setItem('userObj', JSON.stringify(response.data.data.user))
						window.location = 'profile/' + response.data.data.user.username

						console.log(JSON.parse(localStorage.getItem('userObj')).email);

					}, function (response) {
						this.error = "Username or Password is wrong."
					});

			},
			callFacebook: function (e) {
				this.$http.get(URL + '/login/auth/facebook')
					.then(function (res) {
						console.log("success");
						console.log(res);
					}).catch(function (err) {
						console.log(err);
						console.log("error connecting with Facebook!");
					});
			}
		}

	}
</script>


<style scoped>
	.loginContainer {
		position: fixed;
		width: 100vw;
		height: 100vh;
		background-image: url('/static/login/images/bgLogin.jpg');
		background-repeat: no-repeat;
		background-size: cover;
		top: 0;
	}

	.login-box {
		position: relative;
		padding: 40px;
		width: auto;
		height: auto;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
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
	}
</style>