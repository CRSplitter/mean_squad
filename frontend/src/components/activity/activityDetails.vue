<template>
    <div class="col-sm-8 col-sm-offset-4">
        <div id="errors"
             class="alert alert-danger"
             v-if="errors">
            <ul id="errors">
                <li v-for="error in errors">
                    <p>{{ error.type }} : {{error.msg}}</p>
                </li>
            </ul>
        </div>
        <div id="msgs"
             class="alert alert-info"
             v-if="msg">
            <p>{{msg}}</p>
        </div>
        <div id="activity"
             v-if="activity">
            <h2 v-if="activity.name">{{activity.name}}</h2>
            <div id="image"
                 v-if="activity.image">
                <img v-bind:src="image" />
            </div>
            <star-rating v-if="userType == 'Client'"
                         v-model="activity.avgRating"
                         v-bind:star-size="50"
                         v-bind:show-rating="false"
                         @rating-selected="setRating"></star-rating>
            <star-rating v-if="userType != 'Client'"
                         v-model="activity.avgRating"
                         v-bind:star-size="50"
                         v-bind:show-rating="false"
                         v-bind:read-only="true"></star-rating>
            <div id="description"
                 v-if="activity.description">
                <h5>Description:</h5> {{activity.description}}
            </div>
    
            <div id="business"
                 v-if="activity.businessId.name">
                <h5>Business:</h5> {{activity.businessId.name}}
                <!--TODO: href to business-->
            </div>
    
            <div id="price"
                 v-if="activity.price">
                <h5>Price per person:</h5> {{activity.price}}
            </div>
    
            <div id="participants"
                 v-if="activity.maxParticipants || activity.minParticipants">
                <h5>Number of Participants:</h5>
                <h6 v-if="activity.maxParticipants">Maximum:</h6> {{activity.maxParticipants}}
                <h6 v-if="activity.maxParticipants">Minimum:</h6> {{activity.minParticipants}}
            </div>
    
            <div id="minAge"
                 v-if="activity.minAge">
                <h5>Minimum Age:</h5> {{activity.minAge}}
            </div>
    
            <div id="duration"
                 v-if="activity.durationHours || activity.durationMinutes">
                <h5>Number of Participants:</h5>
                <h6 v-if="activity.durationHours">Hours:</h6> {{activity.durationHours}}
                <h6 v-if="activity.durationMinutes !== null">Minutes:</h6> {{activity.durationMinutes}}
            </div>
    
            <div id="activityType"
                 v-if="activity.activityType">
                <h5>Activity Type:</h5> {{activity.activityType}}
            </div>
    
            <!--TODO: Button for reservation-->
        </div>
    </div>
</template>

<script>
var URL = require('../env.js').HostURL;
import StarRating from 'vue-star-rating'

export default {
    name: 'ActivityDetails',
    components: {
        StarRating
    },
    data() {
        return {
            activity: null,
            msg: '',
            errors: null,
            userType: null
        }
    },
    created() {
        this.userType = localStorage.getItem('userType');
        var context = this;

        this.$http.get(URL + '/activity/' + this.$route.params.id)
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
    methods: {
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
        }
    }

}
</script>