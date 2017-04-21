<template>
    <div class="container">

        <div class="row" v-if="userType!='Site Admin'">
            <button v-on:click="formTypeClient" class="btn btn-danger" type="button" name="button">Client  </button>
            <button v-on:click="formTypeBusiness" class="btn btn-danger" type="button" name="button">Business</button>
        </div>

        <registerForm v-bind:formType="formType"></registerForm>


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
            this.formType = type;
        }
    }
</script>