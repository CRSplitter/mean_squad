<template>
  <div>
      <div class="container">

          <h3>Register</h3>

          <div class="btn-group">
              <button v-on:click="formTypeClient" class="btn btn-danger" type="button" name="button">Client</button>
              <button v-on:click="formTypeBusiness" class="btn btn-danger" type="button" name="button">Business</button>
          </div>
          <hr>

          <registerForm v-bind:formType=formType></registerForm>

          <div class="oauth-button">
              <span><i class="fa fa-facebook"></i> </span>
         </div>

      </div>

  </div>
</template>

<script>
    import RegisterForm from './registerForm';

    export default {
        props: [],
        name: 'registerPage',
        data() {
            return {
                formType: "Client"
            }
        },
        components: {
            registerForm: RegisterForm
        },
        methods: {
            formTypeClient: function() {
                this.formType = "Client";
            },
            formTypeBusiness: function() {
                this.formType = "Business";
            }
        }
    }
</script>

<style scoped>
    .oauth-button .fa {
        cursor: pointer;
        margin-top: 10px;
        color: inherit;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        margin: 5px;
        margin-top: 15px;
    }

    .oauth-button .fa:hover {
        color: white;
    }

    .oauth-button .fa-facebook:hover {
        background: #3b5998;
    }
</style>
