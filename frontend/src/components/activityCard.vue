<template>
    <div class="grow">
        
    <div v-if="errors>0">
        <div class="alert alert-danger" v-for="error in errors">
                <strong>Oh snap!</strong><br/> {{ error.msg }}
        </div>    
    </div>
        <div class="activityCard  center box_shadow" v-if="open">
            <div class="activityBox">
                <div class="activityImage center">
                    <img v-if="activity.image" :src="url+'/uploads/'+activity.image">
                    <img v-else src="/static/default/images/defaultPic.png">
                </div>
                <div class="activity-wide center">
                    <router-link :to="'/activity/'+activity._id" class="font_large actionfont mira">{{ activity.name }}</router-link>
                </div>

                <div class="activity-wide center">
                    <router-link :to="'/profile/?username='+activity.businessId.userId.username" class="actionfont font_medium second mira" href="">
                        {{activity.businessId.name}}
                    </router-link>
                </div>

                <div class="activity-wide center font_medium">
                    {{ activity.description }}
                </div>
                <br>

                <div v-if="user" class="btnActivity ">
                    <!--<div v-if="user.userType === 'Client' && !search" class="btnBox center">
                        <button v-on:click="parentOpenForm('reservationForm',activity)" type="button" class="backgroudcolor2">Reserve</button>
                    </div>-->
                    <div v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search" class="btnBox center">
                        <button v-on:click="parentOpenForm('activityEditForm',activity)" class="backgroudcolor3"> Edit </button>
                    </div>
                    <div class="btnBox center" v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search">
                        <button v-on:click="confirmDel" class="backgroudcolor1 font_medium "> Delete </button>
                    </div>
                    <div class="btnBox center" v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search">
                        <button v-on:click="parentOpenForm('promotionForm',activity)" type="button" name="button" class="backgroudcolor2 font_medium ">Add Promotion</button>
                    </div>
                </div>
            </div>

            <div v-if="errors.length > 0">
                <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong>
                    <div v-for="error in errors">
                        {{ error.msg }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ReservationForm from './reservationForm';
    var user = JSON.parse(localStorage.getItem('userObj'));
    var hostURL = require('./env').HostURL;

    export default {
        props: ['activity', 'parentOpenForm', 'search', 'removeActivity','startP','endP'],
        name: 'ActivityCard',
        data() {
            return {
                user: user,
                errors: [],
                businessLogged: {},
                owner: {},
                url: hostURL,
                open: true
            }
        },
        methods: {
            close: function () {
                this.open = false;
            },
            del: function () {
                //this.startP();
                var self = this;
                this.$http.post(hostURL + '/business/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function (res) {
                        //this.endP();
                        if (res.body.errors) {
                            this.$swal(
                                'Failed!',
                                res.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            self.close();
                            this.$swal(
                                'Activity Deleted!',
                                'Activity has been deleted!',
                                'success'
                            );
                            self.removeActivity(self.activity._id);

                        }
                    }, (err) => {
							slef.errors = "Internal Server Error";
						});
            },
            confirmDel: function () {
                var self = this;
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Delete!',
                    cancelButtonText: 'No, take me back!',
                    buttonsStyling: true
                }).then(function () {
                    self.del();
                });
            }
        },
        components: {
            reservationForm: ReservationForm
        },
        created: function () {
            var context = this;
            if(this.user){
            if (this.user.userType === 'Business') {
                this.$http.get(hostURL + '/business/' + this.user.username)
                    .then(function (res) {
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.businessLogged = res.body.data.business;
                        }
                    }, function (res) {
                        // TODO
                    });
                this.$http.post(hostURL + '/user/getById', {
                        userId: this.activity.businessId.userId
                    })
                    .then(function (res) {
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.owner = res.body.data.user;
                        }
                    }, function (err) {
                        context.errors = "Internal Server Error"
                    });
            }
            }
        }
    }
</script>

<style scoped>
    .activityCard {
        position: relative;
        width: 500px;
        height: auto;
        border-radius: 10px;
        padding-bottom: 20px;
        background-color: white;
    }
    .grow:hover
    {
            -webkit-transform: scale(1.0);
            -ms-transform: scale(1.0);
            transform: scale(1.05);
            transition:all 0.1s ease;
    }

    .activity-wide {
        position: relative;
        width: 100%;
    }

    .btnActivity {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .activityBox {
        position: relative;
        width: 100%;
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

    input {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }

    .btnBox {
        position: relative;
        width: 25%;
    }

    .activityImage {
        position: relative;
        width: 100%;
        height: 120px;
    }

    img {
        position: relative;
        max-width: 120px;
        height: 110px;
        border-radius: 50%;
    }

    .font_small {
        color: gray !important;
    }
	.mira{
		text-decoration:none;
	}
</style>