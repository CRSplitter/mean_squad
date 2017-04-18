<template>
    <div class="container">
        <!--TODO-->
        <!--if there's a logo, go to its path  src:"'/folder for storing these'+ {{logo}}" -->
        <img v-if="logo" src="/assets/logo.png" alt="Business Logo">
        <img v-else="logo" src="http://www.jqueryscript.net/images/jQuery-Plugin-For-Fullscreen-Image-Viewer-Chroma-Gallery.jpg" alt="Default">
        <h1 v-if="business"> {{business.name}} </h1>
        <!--TODO-->
        <router-link v-if="business" :to=" '/home/' + business.userId" class="btn btn-success"> View Profile </router-link>
        <!-- to = "'/profile/' + business.userId.username "-->
        <br></br>
        <label for="add"> Address: </label>
        <p name="add" v-if="business.address"> {{business.address}} </p>
        <br></br>
        <label for="conInfo">Contact Info: </label>
        <ul v-if="business.contactInfo">
            <li name ="conInfo" v-for="contact in business.contactInfo">{{contact}}</li>
        </ul>
        <button @click="expand" class="btn btn-info" v-if="counter"> Show More </button>
        <button @click="expand" class="btn btn-inverse" v-else="counter"> Show Less </button>
        <p v-show="more"> {{business.description}} </p>
        <div v-if="errors.length > 0">
        <div class="alert alert-danger" role="alert">
            <strong>Oh snap!</strong>
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
                counter: 1
            };
        },
        methods: {
            expand: function(){ //consider changing the size --fawzy
                this.more = !this.more;
                this.counter = 1-this.counter;
            }
        },
        computed:{
            logo: function(){ //TODO
                if(this.business.userId){
                    return this.business.userId.profileImage; //string
                }else{
                    console.log("HERE");
                    return undefined;
                }
            }
        }
 }
</script>

<style scoped>
</style>