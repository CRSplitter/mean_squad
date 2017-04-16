<template>
    <div class="col-sm-8 col-sm-offset-4">
        <div id="activity"
             v-if="activity">
            <h2 v-if="activity.name">{{activity.name}}</h2>
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
    
            <div id="images"
                 v-if="activity.images.length > 0">
                 <h5>Images:</h5>
                    <div v-for="image in activity.images">
                        <img v-bind:src ="image"/>
                    </div>
            </div>

            <!--TODO: Button for reservation-->
        </div>
    </div>
</template>

<script>
var URL = require('../env.js').HostURL;
export default {
    name: 'ActivityDetails',
    data() {
        return {
            activity: null,
            msg: '',
            errors: null
        }
    },
    created() {
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
    }

}
</script>