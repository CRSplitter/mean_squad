<template>
    <div class="loginContainer ">
        
            <div class="center">
        	<div class="login-box box_shadow">
                <div class="login-btn-box center actionfont">

					<h2>Register</h2>
				</div>
            <div class="row" v-if="userType!='Site Admin'">
            <!--<button v-on:click="formTypeClient" class="btn btn-danger" type="button" name="button">Client  </button>
            <button v-on:click="formTypeClient" class="btn btn-danger" type="button" name="button">Business</button>-->
            <div class="tabBar-bar center">
			<div class="tabBar-tabs action_border">
				<div class="tab1-activities tab"><button v-on:click="formTypeClient" type="button" name="button" class=" actionfont font_medium">Client</button>
					<div v-if="formType=='Client'" class="tab-highlight backgroudcolor1"></div>
				</div>
                <div class="tab1-activities tab"><button v-on:click="formTypeBusiness" type="button" name="button" class=" actionfont font_medium">Business</button>
					<div v-if="formType=='Business'" class="tab-highlight backgroudcolor1"></div>
				</div>
			</div>
		</div>
        </div>

        <registerForm v-bind:formType="formType"></registerForm>
        			</div>
                    <br>
                                </div>

    </div>


</template>

<script>
    import RegisterForm from './registerForm';  

    var type = localStorage.getItem('userType');

    export default {
        props: [],
        name: 'registerPage',
        data() {
            return {
                formType: "Client",
                userType: ""
            }
        },
        components: {
            registerForm: RegisterForm
        },
        methods: {
            formTypeClient: function () {
                this.formType = "Client";
            },
            formTypeBusiness: function () {
                this.formType = "Business";
            }
        },
        created: function () {
            this.userType = type;
        }
    }
</script>
<style scoped>
	.loginContainer {
		position: relative;
		width: 100vw;
		height: 100vh;
		background-image: url('/static/default/images/bgPattern.jpg');
	}

	.login-box {
		position: relative;
		padding: 40px;
		width: 400px;
		height: auto;
		background-color: rgba(255, 255, 255, 0.8);
		border-radius: 20px;
        margin-bottom: 30px;
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
        height: 20px !important;
	}
    .tabBar-bar{
  position: relative;
  height: 143px;
  width: 100vw;
}

.tabBar-tabs{
  position: relative;
  width: auto;
  height:55px;
  display: flex;
}

.tab{
  position:relative;
  height: 100%;
  width: 130px;
}
.tab button{
  position: relative;
  height: 90%;
  width: 100%;
  font-weight: bold !important;
}
.tab-highlight{
  position: relative;
  width: 100%;
  height: 10%;
}
.form-open{
  position: relative;
  width: 100vw;
}
.form-open button{
  position: relative;
  border-radius: 20px;
  height: 30px;
  width: auto;
  color: white;
}
.content{
  position: relative;
  width: 100vw;
  justify-content: space-around;
  padding-bottom: 20px;
      background-image: url('/static/default/images/bgPattern.jpg')

}
.card-tab{
  position: relative;
  margin-top: 20px;
}

</style>