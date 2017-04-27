<template>
    <div class="">



    </div>

</template>

<script>
    //import activityCard from './activityCard';
    //import popUp from './popUp';
    var URL = require('./env.js').HostURL;
    

    export default {
        props: [],
        name: 'contactUs',
        data() {
            return {
                activities: [],
                page: 0,
                openForm: false,
                formType: 'reservationForm',
                activity: undefined,
                hideButton: false
            }
        },
        components: {
            activityCard: activityCard,
            popUp: popUp
        },
        created: function () {
            this.$http.get(URL + '/activities/page/0')
                .then(function (res) {
                    this.activities = res.data.data.activities;
                });
        },
        methods: {

        }
    }
</script>
