<template>
    <div class="container">
        <!--<img v-if="activity" src="/static/default/images/defaultPromotion.png" alt="PROMO">-->
        <h1 v-if="activity">{{activity.name}}</h1>
<!--name of business offering the promotion//assuming populated activity -->
        <h2 v-if="activity.businessId"> {{activity.businessId.name}} </h2> 
        <button v-show="hasAccess" class="btn btn-success" @click="edit">Edit</button>
        <button v-show="hasAccess" class="btn btn-danger" @click="remove">Delete</button>

        <div v-if="errors.length > 0">
            <div class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong>
                <div v-for="error in errors">
                    {{error.type}} : {{ error.msg }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    var url = require('./env.js').HostURL;

    export default {
        props: ['activity'], //props passed from parent to child  
        name: 'PromotionCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    username: localStorage.getItem('user'),
                    userId: JSON.parse(localStorage.getItem('userObj'))._id 
                },
                hasAccess: false,
                errors: []
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
                        console.log("ERROR" +res);    
                    });
            },
            remove: function(e){
                e.preventDefault();
                this.$http.post(url+ '/business/removePromotion', 
                {})
                .then(function(res){
                    console.log(res);
                    if(res.body.errors){
                        this.errors = res.body.errors;
                    }
                    else {
                        // success TODO
                    }}, function(res){
                        console.log("ERROR" + res);
                    });
            }       
        },
        created:{
            checkAccess: function(){
                console.log("HERE");
                if((this.loggedInUser)&&(activity)&&(this.loggedInUser.userId == activity.businessId.userId)){
                // it's redundant to check on this (this.loggedInUser.userType =='Business' || this.loggedInUser.userType =='BusinessOperator')
                    this.hasAccess = true;
                }else{
                    this.hasAccess = false; 
                }
            }
        }
    }
</script>

<style scoped>
    </style>