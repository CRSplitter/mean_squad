<template>
    <div class="col-sm-4 col-sm-offset-4">
        <h2>Email Verification</h2>
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
        <div v-if="verified">
            Your Email has been successfully verified.
        </div>
    </div>
</template>

<script>
var URL = require('./env.js').HostURL;
export default {
    name: 'verifyEmail',
    props: ['startP','endP'],
    data() {
        return {
            errors: null,
            msg: '',
            verified: false,

        }
    },
    created: function() {
        this.startP();
        var context = this;
        this.$http.get(URL + '/user/verify/' + context.$route.params.token)
            .then(function (response) {
                this.endP();
                if (response.body.errors) {
                    context.errors = response.body.errors
                    return;
                }
                context.msg = response.body.msg;
                context.verified = true;
            }, function (err) {
                context.errors = err.body.errors
            });
    }

}
</script>