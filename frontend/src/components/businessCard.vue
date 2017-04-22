<template>
    <div class="businessCard box_shadow">
        <div class="center">
            <img v-if="business.userId.profileImage" :src="url+'/uploads/'+business.userId.profileImage">
            <img v-else src="/static/default/images/defaultPic.png">
        </div>
        <br>
        <div v-if="business" class="center actionfont font_large">
            <a :href="'profile/?username='+business.userId.username">{{business.name}} </a>

        </div>
        <br>
        <div v-if="business" class="center  large_medium">
            {{business.description}}
        </div>
        <br>
        <div v-if="business" class="center large_medium">
            <a :href="'profile/?username='+business.userId.username">
                <button class="backgroudcolor2">View</button>
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
                logo: '/static/default/images/defaultPic.png',
                url: url
            };
        },
        methods: {
            expand: function () { //consider changing the size --fawzy
                this.more = !this.more;
                this.counter = 1 - this.counter;
            }
        },
        created: function () {
            if ((this.business.userId) && (this.business.userId.profileImage)) {
                this.logo = '/static/default/images/' + this.business.userId.profileImage; //string
            }
            this.$http.post('http://localhost:8080/user/getById', {
                userId: this.business.userId
            }).then(function (res) {
                if (res.body.errors) {
                    this.errors = res.body.errors;
                } else {
                    this.businessUsername = res.body.data.user.username; //supposing islam hyrg3li data.user = {} --> user object
                    console.log(this.businessUsername);
                }
            }, function (res) {
                console.log("err" + res.body);
            });
        }
    }
</script>
<style scoped>
    img {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    input {
        border-radius: 10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    }

    .min {
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

    .businessCard {
        position: relative;
        width: 350px;
        padding: 20px;
        border-radius: 20px;
        background-color: white;
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