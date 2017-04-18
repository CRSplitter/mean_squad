<template>
    <div class="container">
        <!--<img v-if="business" src="/static/default/images/defaultPic.png" alt="Logo">-->
        <h1 v-if="business"> {{business.name}} </h1>
        <router-link v-if="business" :to=" '/home/' + business.userId" class="btn btn-success"> View Profile </router-link>
        <!-- to = "'/profile/' + business.userId.username "-->
        <br></br>
        <label for="add"> Address: </label>
        <p name="add" v-if="business.address"> {{business.address}} </p>
        <label for="conInfo">Contact Info: </label>
        <ul class="hul" v-if="business.contactInfo">
            <li class="hl" name ="conInfo" v-for="contact in business.contactInfo">{{contact}}</li>
        </ul>
        <label> About Us: </label>    
        <button @click="expand" class="btn btn-success" v-if="counter"> Show More </button>
        <button @click="expand" class="btn btn-danger" v-else="counter"> Show Less </button>
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
    // console.log(url);
    export default {
        props: ['business'], //props passed from parent to child  
        name: 'BusinessCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    user: localStorage.getItem('user')
                },
                logo: undefined,
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
            // ,
            // viewProfile: function(e){
            //     e.preventDefault();
            //     this.$http.get(url+ '/business/' + this.business.userId.username)
            //     .then(function(res){
            //         if(res.body.errors){
            //             console.log(res);
            //             this.errors = res.body.errors;
            //         }else{
            //             if(res.body.data)
            //                 this.$routes.go('/profile/' + res.body.data.business.username);  
            //             //check with fawzy that this is the route for business profile
            //         }
            //     },function(res){
            //         console.log(res);
            //     });
            // }
        },
        created: function(){
            if(this.business.userId)
                this.logo = this.business.userId.profileImage;
        }
 }
</script>

<style scoped>
.hl{
    display: inline;
    list-style-type: circle;
};
/*askfawzy*/

.hul{
    display: inline;
    list-style-type: circle;
}

</style>