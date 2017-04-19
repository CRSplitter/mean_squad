<template>
    <div class="container">
        <img :src="logo" alt="Default Profile Pic">

        <h1 v-if="business"> {{business.name}} </h1>
        <router-link v-if="(username.length>0)" :to=" '/profile/' + username" class="btn btn-success"> View Profile </router-link>
        <p v-if="username == '' ">for debugging: no username retrieved</p> 
        <p v-if="business.address">Address: {{business.address}} </p>
        <label for="conInfo">Contact Info: </label>
        <ul v-if="business.contactInfo" class>
            <li name ="conInfo" v-for="contact in business.contactInfo">{{contact}}</li>
        </ul>
        <button @click="expand" class="btn btn-info" v-if="counter"> Show More </button>
        <button @click="expand" class="btn btn-inverse" v-else="counter"> Show Less </button>
        <p v-show="more"> {{business.description}} </p>
        <div v-if="errors.length> 0">
        <div class="alert alert-danger" role="alert">
            <strong>Oh Snap =( </strong>
            <div v-for="error in errors"> {{error.type}} : {{ error.msg }}</div>
        </div>
    </div>
    </div>
</template>

<script>
    var url = require('./env.js').HostURL;
    export default {
        props: ['business'], 
        name: 'BusinessCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    user: localStorage.getItem('user')
                },
                errors: [],
                more: false,
                counter: 1,
                username: '',
                logo: '/static/default/images/defaultPic.png'
            };
        },
        methods: {
            expand: function(){ //consider changing the size --fawzy
                this.more = !this.more;
                this.counter = 1-this.counter;
            }
        },
        created: function() {
            if(this.business.userId.profileImage){
                this.logo = '/static/default/images/' + this.business.userId.profileImage; //string
            }
           //islam routes CHECCCCK
            // this.$http.get('/user/business.userId').then(function(res){
            //     if(res.body.errors){
            //         this.errors = res.body.errors;
            //     }else{
            //         this.username = res.body.data.user.username; //supposing islam hyrg3li data.user = {} --> user object
            //         console.log(this.username);
            // }
            // },function(res){
            //     console.log("errrr" + res.body);
            // });
        }
 }
</script>
