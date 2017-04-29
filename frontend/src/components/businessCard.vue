<template>
    <div class="businessCard box_shadow grow" style="min-height: 300px;">
        <div class="center">
            <img v-if="business.userId.profileImage" :src="url+'/uploads/'+business.userId.profileImage">
            <img v-else src="/static/default/images/defaultPic.png">
        </div>
        <br>
        <div v-if="business" class="center actionfont font_large">

            <router-link :to="'profile/?username='+business.userId.username" class="actionfont font_medium second mira" href="">
                <h3>{{business.name}}</h3>

            </router-link>

        </div>
        <br>
        <div v-if="business" class="center  large_medium">
            {{business.description}}
        </div>
        <br>
        <div v-if="business" class="center large_medium">
            <router-link :to="'profile/?username='+business.userId.username" class="actionfont font_medium second mira" href="">
                <button class="backgroudcolor2">View</button>
            </router-link>

        </div>
        <div v-if="userType== 'Site Admin'" class="center">
            <br/>
            <br/>
            <button class="btn btn-danger myBtn " v-on:click="confirmReset">Reset Balance</button>
        </div>
        <strong v-if="userType== 'Site Admin'" class="center">{{business.balance}} L.E.</strong>

    </div>
</template>

<script>
    var url = require('./env.js').HostURL;
    var userType = localStorage.getItem('userType');
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
                url: url,
                userType: userType
            };
        },
        methods: {
            expand: function () { //consider changing the size --fawzy
                this.more = !this.more;
                this.counter = 1 - this.counter;
            },
            resetBalance: function () {
                var self = this;
                var balance = this.business.balance;
                this.business.balance = 0;

                this.$http.post(url + '/admin/resetBalance', {
                        businessId: this.business._id
                    })
                    .then(function (response) {
                        if (response.data.errors && response.data.errors.length > 0) {
                            self.business.balance = balance;
                            this.$swal(
                                'Failed!',
                                response.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            this.$swal(
                                'Balance Reset!',
                                'Business Balance has been reset',
                                'success'
                            );

                        }
                    }, (err) => {
							self.errors = [{msg:"Internal Server Error"}];
						});
            },
            confirmReset: function () {
                var self = this;
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Reset!',
                    cancelButtonText: 'No, take me back!',
                    buttonsStyling: true
                }).then(function () {
                    self.resetBalance();
                });
            }
        },
        created: function () {
            var context = this;
            if ((this.business.userId) && (this.business.userId.profileImage)) {
                this.logo = '/static/default/images/' + this.business.userId.profileImage; //string
            }
            this.$http.post(url + '/user/getById', {
                userId: this.business.userId
            }).then(function (res) {
                if (res.body.errors) {
                    this.errors = res.body.errors;
                } else {
                    this.businessUsername = res.body.data.user.username;
                }
            }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});
        }
    }
</script>
<style scoped>
    img {
        position: relative;
        width: 140px;
        height: 150px;
        border-radius: 50%;
    }

    input {
        border-radius: 10px;
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
    }

    .min {
        margin-left: 10px;
    }
    .grow:hover
    {
            -webkit-transform: scale(1.0);
            -ms-transform: scale(1.0);
            transform: scale(1.05);
    }

    .businessCard {
        position: relative;
        width: 350px;
        padding: 20px;
        height: auto;
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

    .myBtn {
        min-width: 100px;
        cursor: pointer;
        border-radius: 100px;
    }

	.mira{
		text-decoration:none;
	}
</style>