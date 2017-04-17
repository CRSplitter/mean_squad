<template>
    <div v-if="reservation">
        <h3>Reserve: {{reservation._id}}</h3>
        hh{{reservation.activityId.businessId}}
        <div>
            <span>{{reservation.activityId.name}}</span>
            <span>business</span>
        </div>
        <span>Reserved By:</span><span v-if="reservation">{{reservation.clientId}}</span>
        <br>
        <span>Number of participants:</span><span v-if="reservation">{{reservation.countParticipants}}</span><br>
        <span>Details:</span><span v-if="reservation">{{reservation.details}}</span><br>
        <span>Date:</span><span v-if="reservation">{{reservation.activityId}}</span><br>
    </div>
</template>

<script>
    var user = localStorage.getItem('user');

    export default {
        name: 'reservationCard',
        props: ['reservation'],
        data() {
            return {
                user: user,
                errors: [],
            }
        },
        methods: {
            view: function(e) {
                e.preventDefault();
            }
        }
    }
</script>
