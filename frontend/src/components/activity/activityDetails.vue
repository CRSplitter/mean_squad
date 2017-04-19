<template>
    <div>
        <link rel="stylesheet" href="/static/userInfo/css/userInfo.css" scoped>
         <div v-if="openForm">
                <popUp v-bind:closeFormFun="closeForm" :activity="activity" v-bind:formType="formType"></popUp>
                </div>
        <div class="userInfo-container center"> 
            <div class="userInfo-box action_border">
                <div class="wide-container center">
                    <img class="" src="/static/default/images/defualtPic.png">
                </div>
                <br>
                <div v-if="userType == 'Client'" class="wide-container center actionfont ">
                    Rate Activity
                    <br>
                </div>
                <div class="wide-container center">
                    <star-rating v-if="userType == 'Client'"
                         v-model="activity.avgRating"
                         v-bind:star-size="50"
                         v-bind:show-rating="false"
                         @rating-selected="setRating"></star-rating>
                </div>
                

                <div class="wide-container center">
                    <star-rating v-if="userType != 'Client'"
                         v-model="activity.avgRating"
                         v-bind:star-size="50"
                         v-bind:show-rating="false"
                         v-bind:read-only="true"></star-rating>
                </div>
                
                                    <br>

                <div  class="userInfo-address">

                    <span class="actionfont">Activity Name:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.name}}
                    </div>
                    <br>
                </div>
                <br>

                <div  class="userInfo-address">

                    <span class="actionfont">Business Name:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        <a :href="'/profile/'+activity.businessId.userId.username" class="">{{activity.businessId.name}}</a>
                    </div>
                    <br>
                </div>
                <br>

                    <div  class="userInfo-address">
                    <span class="actionfont">Description:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.description}}
                    </div>
                    <br>
                </div>
                <br>

                <div  class="userInfo-address">
                    <span class="actionfont">Max Participants:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.maxParticipants}}
                    </div>
                    <br>
                </div>
                <br>
                <div  class="userInfo-address">
                    <span class="actionfont">Min Participants:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.minParticipants}}
                    </div>
                    <br>
                </div>
                <br>

                <div  class="userInfo-address">
                    <span class="actionfont">Duration:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.durationHours}} hr and {{activity.durationMinutes}} Min
                    </div>
                    <br>
                </div>
                <br>
                
                <div  class="userInfo-address">
                    <span class="actionfont">Type:</span>
                    <br>
                    <br>

                    <div class="userInfo-data">
                        {{activity.activityType}}
                    </div>
                    <br>
                </div>
                <br>
                <div class="wide-container center" v-if="userType == 'Client'">
                    <button v-on:click="openFormFun('reservationForm')" class="backgroudcolor2 font_medium box_shadow">Reserve</button>
                </div>
                 <div class="wide-container center" v-if="userType != 'Client'">
                    <button v-on:click="loginRedirect" class="backgroudcolor2 font_medium box_shadow">Login to Reserve</button>
                </div>
                
            </div>
            <br>
        </div>
    </div>
</template>

<script>
var URL = require('../env.js').HostURL;
import StarRating from 'vue-star-rating'
import popUp from '../popUp'


export default {
    name: 'ActivityDetails',
    components: {
        StarRating,
        popUp
    },
    data() {
        return {
            activity: null,
            msg: '',
            errors: null,
            userType: null,
            openForm:false,
            formType:''
        }
    },
    created() {
        this.userType = localStorage.getItem('userType');
        var context = this;

        this.$http.get(URL + '/activity/' + this.$route.params.id)
            .then((res) => {
                console.log(res)
                if (res.body.errors) {
                    context.errors = res.body.errors;
                    return;
                }
                console.log(res.body.data.activity);
                context.activity = res.body.data.activity;

            }, (err) => {
                context.errors = err.body.errors
            })
    },
    methods: {
        loginRedirect: function(){
            window.location='/login';
        },
        setRating: function (e) {
            var context = this;
            console.log(e);
            this.$http.post(URL + '/client/rate_activity', {
                activityId: context.activity._id,
                rating: e
            })
                .then((res) => {
                    if (res.body.errors) {
                        context.errors = res.body.errors;
                        return;
                    }
                    console.log(res.body.data.activity);
                    context.activity = res.body.data.activity;

                }, (err) => {
                    context.errors = err.body.errors
                })
        },
        closeForm: function(){
            this.openForm = false
        }, 
        openFormFun: function(type){
            this.openForm = true
            this.formType = type
        }
    }

}
</script>


<style scoped>

.container-activity{
    position: relative;
    width: 100vw;
    height: auto;
}

.wide-container{
    position: relative;
    width: 100%;
    height: auto;
}

button{
  position: relative;
  height: 30px;
  border-radius: 20px;
  color: white;
  font-weight: bold;
  width: auto;
  min-width: 100px;
}

</style>