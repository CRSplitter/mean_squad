<template>
    <div class="container">
        <!-- Modal -->
        <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="registerModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="registerModalLabel" v-if="userType==='Site Admin'">Add another admin</h5>
                        <h5 class="modal-title" id="registerModalLabel" v-else>Register as a {{ formType }}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                    </div>
                    <div class="modal-body">

                        <div class="btn-group offset-md-4" v-if="userType!='Site Admin'">
                            <button v-on:click="formTypeClient" class="btn btn-danger" type="button" name="button">Client  </button>
                            <button v-on:click="formTypeBusiness" class="btn btn-danger" type="button" name="button">Business</button>
                        </div>

                        <registerForm v-bind:formType="formType"></registerForm>

                    </div>
                </div>
            </div>
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
            this.formType = type;
        }
    }
</script>