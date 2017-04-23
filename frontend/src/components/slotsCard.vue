<template>
    <div v-if="userType==='Business'">

        <span id="availableTimings" class="actionfont">{{day.day}} available timings:</span>
        <br/>
        <br/>

        <div class="row" v-for="time in timings">
            <timingCard :time="time" :day="day" ></timingCard>
        </div>

        <div>
            <unauthorized v-if="userType!='Business'"></unauthorized>
        </div>

    </div>
</template>

<script>
    import unauthorized from './unauthorized'
    import timingCard from './timingCard'

    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');

    export default {
        props: ['activity', 'day'],
        name: 'slotsCard',
        data() {
            return {
                timings: [],
                errors: [],
                msg: []
            }
        },
        methods: {},
        created: function () {
            this.userType = type;
            this.timings = this.day.slots;
        },
        components: {
            unauthorized,
            timingCard
        }
    }
</script>