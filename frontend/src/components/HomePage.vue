<template>
  <div>
    	<div class="loginContainer center">
        			<div class="login-box2 box_shadow">
                <h2>Thank You For registering</h2><br>
                Please check your email
        			</div>
    	</div>
    <h1><strong>Mean Squad</strong> welcome you to the home page</h1>
  </div>
</template>

<script>

  export default {
    props: [],
    name: 'HomePage',
    data() {
      return {
      }
    },

    components: {
    },
    created: function() {
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
  .login-box2{
    position: relative;
    background-color: white;
    width: auto;
    height: auto;
    padding: 20px;
  }
</style>