<template>
    <div>
        <div v-if="errors.length > 0">
            <div class="alert alert-danger" v-for="error in errors">
                <strong class="center">{{error.type}}</strong>
                <div class="center">{{ error.msg }}</div>
            </div>
        </div>
        <div>
            <strong class="center">{{msg}}</strong>
        </div>

    </div>
</template>

<script>
    var URL = require('./env.js').HostURL;

    export default {
        name: 'FacebookLogin',
        data() {
            return {
                msg: 'Authenticating...',
                errors: []

            }
        },
        created: function() {
            var context = this;

            var token = this.$route.query.token;
            if (token == '0') {
                this.errors = [{
                    type: "Authentication Failed",
                    msg: "Authentication Failed"
                }]
            } else {
                context.$http.get(URL + '/login/facebook/token/' + token)
                    .then(function(res) {
                        if (res.body.errors) {
                            context.errors = res.body.errors;
                            return;
                        }

                        context.msg = 'Redirecting..'
                        localStorage.setItem('id_token', res.body.data.token)
                        localStorage.setItem('user', res.body.data.user.username)
                        localStorage.setItem('userType', res.body.data.user.userType)
                        localStorage.setItem('userObj', JSON.stringify(res.body.data.user))

                        window.location = '/profile/?username=' + res.body.data.user.username;



                    }, function(err) {

                        context.errors = err.body.errors;
                        return;

                    })

            }

        }
    }
</script>