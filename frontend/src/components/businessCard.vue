<template>
    <div class="card">
        <!--<img v-if="business" src="/static/default/images/defaultPic.png" alt="Logo">-->
        <h1 v-if="business"> {{business.name}} </h1>
        <label for = "add"> Address: </label>
        <p name= "add" v-if="business.address"> {{business.address}} </p>
        <label for="conInfo">Contact Info: </label>
        <ul class="hul" v-if="business.contactInfo">
            <li class="hl" name ="conInfo" v-for="contact in business.contactInfo">{{contact}}</li>
        </ul>
    <!--check if theres an edit business component-->
    <!--<button v-if="((this.loggedInUser.userType == 'Business')||(this.loggedInUser.userType == 'BusinessOperator'))&&(this.loggedInUser.user == business.username)" @click="editInfo">Edit Info </button>-->
    <button @click="viewProfile"> View Full Profile </button>
    <label> About Us: </label>    
    <button @click="expand" v-if="counter"> Show More </button>
    <button @click="expand" v-else="counter"> Show Less </button>

    <p v-show="more"> {{business.description}} </p>
    
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
    import router from '../router/index.js'; //import the router to use it to redirect
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
            },
            viewProfile: function(e){
                e.preventDefault();
                this.$http.post(url+'/business/show')
                .then(function(res){
                    if(res.body.erros){
                        console.log(res);
                        this.errors = res.body.errors;
                    }else{
                        this.$routes.router.push({path: '/profile/:username', params: business.userId.username});  
                        //check with fawzy that this is the route for business profile
                    }
                },function(res){
                    console.log(res);
                });
            }
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