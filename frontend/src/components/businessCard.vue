<template>
    <div class="businessCard box_shadow">
        <div class="center">
        <img :src="logo" alt="Default Profile Pic">
        </div>
        <br>    
        <div class="center actionfont font_large">
            <a :href="'profile/'+business.name">{{business.name}} </a>
                                
        </div>
        <br>
        <div class="center  large_medium">
                  {{business.description}}               
        </div>
        <br>
        <div class="center  large_medium">
                        <a :href="'profile/'+business.name">
                                          <button  class="backgroudcolor2">View</button>             
 </a>

        </div>
        <!--<div class="alert alert-danger" role="alert">
            <strong>Oh Snap =( </strong>
            <div v-for="error in errors"> {{error.type}} : {{ error.msg }}</div>
        </div>-->
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
                businessUsername: '',
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
            if((this.business.userId) && (this.business.userId.profileImage)){
                this.logo = '/static/default/images/' + this.business.userId.profileImage; //string
            }
            this.$http.post('http://localhost:8080/user/getById', {userId : this.business.userId}).then(function(res){
                if(res.body.errors){
                    this.errors = res.body.errors;
                }else{
                    this.businessUsername = res.body.data.user.username; //supposing islam hyrg3li data.user = {} --> user object
                    console.log(this.businessUsername);
            }
            },function(res){
                console.log("err" + res.body);
            });
        }
 }
</script>
<style scoped>

input{
	border-radius: 10px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
}
.min{
	margin-left: 10px;
}
button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }
.businessCard{
    position: relative;
    width: 350px;
    padding: 20px;
    border-radius: 20px;
}
button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }   

</style>