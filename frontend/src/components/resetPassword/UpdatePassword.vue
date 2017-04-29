<template>
    <div class="col-sm-4 col-sm-offset-4">
        <h2>Reset Password</h2>
        <p>Change Your Password</p>
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
        <div v-if="update">
            <label for="password"
                   class="sr-only">Password</label>
            <input type="password"
                   v-model="password"
                   name="password"
                   id="password"
                   class="form-control"
                   placeholder="password"
                   required>
    
            <label for="confirmPassword"
                   class="sr-only">Confirm Password</label>
            <input type="password"
                   v-model="confirmPassword"
                   name="confirmPassword"
                   id="confirmPassword"
                   class="form-control"
                   placeholder="retype password"
                   required>
            <button class="btn btn-danger"
                    @click="submit">Submit</button>
        </div>
    </div>
</template>

<script>
var URL = require('../env.js').HostURL;
export default {
    name: 'UpdatePassword',
    props: ['startP','endP'],
    data() {
        return {
            password: '',
            confirmPassword: '',
            errors: null,
            msg: '',
            update: false,
            user: null
        }
    },
    created: function() {
        this.startP();
        var context = this;
        this.$http.get(URL + '/user/reset/' + context.$route.params.token)
            .then(function (response) {
                this.endP();
                if (response.body.errors) {
                    context.errors = response.body.errors
                    return;
                }
                context.msg = response.body.msg;
                context.update = true;
                context.user = response.body.data.user;
            }, function (err) {
                context.errors = err.body.errors
            });
    },
    methods: {

        submit: function (e) {

            this.startP();
            var context = this;
            this.errors = null;

            this.$http.post(URL + '/user/reset/' + this.$route.params.token, {
                password: context.password,
                confirmPassword: context.confirmPassword,
                user: context.user

            })
                .then(function (response) {
                    this.endP();
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