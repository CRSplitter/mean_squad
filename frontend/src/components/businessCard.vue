<template>
    <div class="container">
        <h1 v-if="business">{{business.name}}</h1>
        <label>Address: 
            <p v-if="business.address"> {{business.address}}  </p>
        </label>
        <ul v-if="business.contactInfo">
            <li v-for="contact in business.contactInfo">{{contact}}</li>
        </ul>
    <!--check if theres an edit business component-->
    <button v-if="((this.loggedInUser.userType == 'Business')||(this.loggedInUser.userType == 'BusinessOperator'))&&(this.loggedInUser.user == business.username)" @click="editInfo">Edit Info </button>
            <button @click="expand" v-if="counter">Show More</button>
            <button @click="expand" v-else="counter">Show Less</button>
        <p v-show="more"> About Us: {{business.description}} </p>
    <div v-if="errors.length > 0">
        <div class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong>
            <div v-for="error in errors">
                {{ error.msg }}
            </div>
        </div>
    </div>
    </div>
</template>

<script>
    var url = require('./env.js').HostURL;
    // console.log(env.HostURL);
    import router from '../router'; //import the router to use it to redirect
    console.log(router);
    export default {
        props: ['business'], //props passed from parent to child  
        name: 'BusinessCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    user: localStorage.getItem('user')
                },
                errors: [],
                more: false,
                counter: 1
            };
        },
        methods: {
            expand: function(){ //consider changing the size --fawzy
                this.more = !this.more;
                this.counter = 1-this.counter;
            },
            editInfo: function(e) {
                e.preventDefault();
                this.$http.post(url+ '/business/edit', {
                })
                .then(function(res) {
                        console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            // TODO success 
                            this.$routes.router.go('/business/update'); //redirects to the edit business form 
                        }
                    }, function(res) {
                        console.log("error");
                    });
            }
        }
        // ,
        // mounted(){
        // },
        // computed: {
        // },
        // created: function() {
        // }
    }
        // console.log(business.userId);
</script>

<style scoped>

</style>