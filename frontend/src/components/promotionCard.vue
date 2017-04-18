<template>
    <div class="container">
    <h1 v-if="activity">{{activity.name}}</h1>
    <p v-if = > </p>
    <!--check if theres an edit business component-->
    <button v-if="(this.loggedInUser.userType == 'Business') || (this.loggedInUser.userType == 'BusinessOperator')" @click="edit">Edit</button>
    <button v-if="(this.loggedInUser.userType == 'Business') || (this.loggedInUser.userType == 'BusinessOperator')" @click="delete">Delete</button>
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
        props: ['activity'], //props passed from parent to child  
        name: 'PromotionCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    user: localStorage.getItem('user')
                },
                errors: [],
                
            };
        },
        methods: {
            edit: function(e){
                e.preventDefault();

                this.$http.post(url+ '/business/editPromotion',
                {})
                .then(function(res){
                    console.log(res);
                    if(res.body.errors) {//result callback
                            this.errors = res.body.errors;
                        } else {
                            //TODO SUCCESS
                        }
                    }, function(res){//error callback
                        console.log("error");    
                    });
            },
            delete: function(){
                
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
</script>

<style scoped>

</style>