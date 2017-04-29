<template>
    <div>
        <link rel="stylesheet" href="/static/userInfo/css/userInfo.css" scoped>
        <div v-if="openForm && formType == 'activityEditForm'">
            <popUp v-bind:closeFormFun="closeForm" :activityEditObject="activity" v-bind:formType="formType"></popUp>
        </div>
        <div v-if="openForm && formType == 'addTiming'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>
        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>
        <div v-if="!activity && errors">

            <div class="alert alert-danger" v-for="error in errors">
                <strong>Oh snap!</strong><br/> {{ error.msg }}
            </div>
        </div>
        <div class="userInfo-container center" v-if="activity">
            <div class="userInfo-box box_shadow">
                <h3>{{activity.name}}</h3>
                <br>
                <div class="wide-container center">
                    <img v-if="activity.image" :src="url+'/uploads/'+activity.image">
                    <img v-else src="/static/default/images/defaultPic.png">
                </div>
                <br>
                <div v-if="user && user.userType == 'Client'" class="wide-container center actionfont ">
                </div>
                <div class="wide-container center">
                    <star-rating v-if="user && user.userType == 'Client'" v-model="activity.avgRating" v-bind:star-size="50" v-bind:show-rating="false"
                        @rating-selected="setRating"></star-rating>
                </div>


                <div class="wide-container center">
                    <star-rating v-if="!user || user.userType != 'Client'" v-model="activity.avgRating" v-bind:star-size="50" v-bind:show-rating="false"
                        v-bind:read-only="true"></star-rating>
                </div>

                <br>

                <div class="userInfo-address">

                    <span class="actionfont">Activity Name:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.name}}
                    </div>
                    <br>
                </div>
                <br>

                <div class="userInfo-address">

                    <span class="actionfont">Business Name:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        <a :href="'/profile/?username='+activity.businessId.userId.username" class="">{{activity.businessId.name}}</a>
                    </div>
                    <br>
                </div>
                <br>

                <div class="userInfo-address">
                    <span class="actionfont">Description:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.description}}
                    </div>
                    <br>
                </div>
                <br>

                <div class="userInfo-address">
                    <span class="actionfont">Maximum Number of Participants:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.maxParticipants}}
                    </div>
                    <br>
                </div>
                <br>
                <div class="userInfo-address">
                    <span class="actionfont">Minimum Number of Participants:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.minParticipants}}
                    </div>
                    <br>
                </div>
                <br>

                <div class="userInfo-address">
                    <span class="actionfont">Duration:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.durationHours}} hr and {{activity.durationMinutes}} Min
                    </div>
                    <br>
                </div>
                <br>

                <div class="userInfo-address">
                    <span class="actionfont">Type:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.activityType}}
                    </div>
                    <br>
                </div>

                <div v-if="user && user.userType == 'Business' && activity" v-for="slot in activity.activitySlots">
                    <div v-if="slot.slots && slot.slots.length != 0">
                        <slotsCard :activity="activity" :day="slot"></slotsCard>
                        <br>
                    </div>
                </div>

                <div v-if="promotions">
                    <span class="actionfont">Available Promotions:</span>
                    <br>
                    <div v-for="promotion in promotions">
                        <br>
                        <promotionCard :promotion="promotion"></promotionCard>
                    </div>
                </div>

                <br>
                <div class="row">
                <div class="wide-container center" v-if="user && user.userType == 'Client'">
                    <button v-on:click="openFormFun('reservationForm')" class="backgroudcolor2 font_medium ">Reserve</button>
                </div>
                <!--v-if="user._id == activity.businessId.userId"-->
                <div class="wide-container center col-lg-4" v-if="user && activity && user._id == activity.businessId.userId._id">
                    <button v-on:click="openFormFun('activityEditForm')" class="backgroudcolor3 font_medium ">Edit Activity</button>
                </div>
                                <br>

                <div class="wide-container center col-lg-4" v-if="user && activity && user._id == activity.businessId.userId._id">
                    <button v-on:click="openFormFun('addTiming')" class="backgroudcolor2 font_medium ">Add Slot(s)</button>
                </div>
                <br>
                <div class="wide-container center" v-if="!user">
                    <button v-on:click="loginRedirect" class="backgroudcolor2 font_medium ">Login to Reserve</button>
                </div>
                <div class="btnBox center col-lg-4" v-if="user && activity && user._id == activity.businessId.userId._id">
                    <button v-on:click="confirmDel" v-if="!loading" class="backgroudcolor1 font_medium "> Delete </button>
                </div>
                </div>
                <pulseLoader :loading="loading"></pulseLoader>

            </div>
            <br>
        </div>
    </div>
</template>

<script>
    var URL = require('../env.js').HostURL;
    import StarRating from 'vue-star-rating';
    import popUp from '../popUp';
    import slotsCard from '../slotsCard';
    import addTimingForm from '../addTimingForm';
    import promotionCard from '../promotionCard';
    import pulseLoader from '../PulseLoader';


    export default {
        name: 'ActivityDetails',
        props: ['startP', 'endP'],
        components: {
            StarRating: StarRating,
            popUp: popUp,
            slotsCard: slotsCard,
            promotionCard: promotionCard,
            pulseLoader:pulseLoader
        },
        data() {
            return {
                activity: null,
                msg: '',
                errors: null,
                user: null,
                openForm: false,
                loading: false,
                formType: '',
                url: URL,
                promotions: []
            }
        },
        created: function() {
            this.startP();
            this.user = JSON.parse(localStorage.getItem('userObj'));
            var context = this;

            this.$http.get(URL + '/activity/' + this.$route.params.id)
                .then((res) => {
                        this.endP();
                    if (res.body.errors) {
                        context.errors = res.body.errors;
                        return;
                    }

                    context.activity = res.body.data.activity;

                }, (err) => {
                    context.errors = err.body.errors
                });

            this.$http.get(URL + '/promotions/' + this.$route.params.id)
                .then(function(res) {
                    this.endP();
                    if(res.data.errors){
                        this.errors = res.data.errors;
                    } else {
                        this.promotions = res.data.data.promotions;

                    }

                });
        },
        methods: {
            loginRedirect: function () {
                window.location = '/login';
            },
            setRating: function (e) {
                var context = this;

                this.$http.post(URL + '/client/rate_activity', {
                        activityId: context.activity._id,
                        rating: e
                    })
                    .then((res) => {
                        if (res.body.errors) {
                            context.errors = res.body.errors;
                            return;
                        }

                        context.activity = res.body.data.activity;

                    }, (err) => {
                        context.errors = err.body.errors
                    })
            },
            closeForm: function () {
                this.openForm = false
            },
            openFormFun: function (type) {
                this.openForm = true
                this.formType = type
            },
            del: function () {
                var self = this;

                this.$http.post(URL + '/business/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function (res) {
                        if (res.body.errors) {
                            this.$swal(
                                'Failed!',
                                res.data.errors[0].msg,
                                'error'
                            );
                        } else {
                            this.$swal(
                                'Activity Deleted!',
                                'Activity has been deleted!',
                                'success'
                            );
                            if(localStorage.userObj){
                                var user = JSON.parse(localStorage.userObj);
                                if(user.userType == "Business"){
                                    this.startP();
                                    window.location = '/profile/?username='+ user.username;
                                }
                            }
                        }
                        }, (err) => {
                            context.errors = "Internal Server Error";
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
        }

    }
</script>


<style scoped>
    img {
        width: 100%;
        height: auto;
    }

    .container-activity {
        position: relative;
        width: 100vw;
        height: auto;
    }

    .wide-container {
        position: relative;
        width: 100%;
        height: auto;
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
    .userInfo-box{
        background-color: white;
    }
    .userInfo-container{
       		background-image: url('/static/default/images/bgPattern.jpg');

    }
</style>