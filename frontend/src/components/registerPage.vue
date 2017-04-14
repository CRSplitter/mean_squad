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
