<template>
    <div class="col-sm-4 col-sm-offset-4">
        <h2>Reset Password</h2>
        <p>Enter your email below</p>
        <div class="alert alert-danger"
             v-if="errors">
            <ul id="errors">
                <li v-for="error in errors">
                    <p>{{ error.type }} : {{error.msg}}</p>
                </li>
            </ul>
        </div>
        <div class="alert alert-info"
             v-if="msg">
            <p>{{msg}}</p>
        </div>
        <div class="form-group">
            <input type="email"
                   class="form-control"
                   placeholder="Enter your email"
                   v-model="email"
                   required>
        </div>
        <button class="btn btn-danger"
                @click="submit">Submit</button>
    </div>
</template>

<script>
var URL = require('../env.js').HostURL;
export default {
    name: 'RequestResetPassword',
    props:['loadBar'],
    data() {
        return {
            email: '',
            msg: '',
            errors: null
        }
    },

    methods: {

        submit: function (e) {
            this.loadBar();
            var context = this;
            this.errors = null;
            this.$http.post(URL+'/user/reset_password', {
                email: context.email
            })
                .then(function (response) {
                    if (response.body.errors) {
                        context.errors = response.body.errors
                    }
                    context.msg = response.body.msg;
                }, function (err) {
                    context.errors = err.body.errors
                });

        }
    }

}
</script>