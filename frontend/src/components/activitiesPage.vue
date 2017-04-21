<template>
    <div class="container text-center">

        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>

        <h1>Activities</h1>
        <div v-for="activity in activities">
            <activityCard :parentOpenForm="formOpen" :activity="activity"></activityCard>
        </div>

        <div class="text-center">
            <button v-on:click="loadMore">Load More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import activityCard from './activityCard';
    import popUp from './popUp';

    export default {
        props: [],
        name: 'activityPageMain',
        data() {
            return {
                activities: [],
                page: 0,
                openForm: false,
                formType: 'reservationForm',
                activity: undefined
            }
        },
        components: {
            activityCard: activityCard,
            popUp: popUp
        },
        created: function () {
            this.$http.get('http://localhost:8080/activities/page/0')
                .then(function (res) {
                    this.activities = res.data.data.activities;
                });
        },
        methods: {
            loadMore: function () {
                this.page = this.page + 1;
                this.$http.get('http://localhost:8080/activities/page/' + this.page)
                    .then(function (res) {
                        this.activities = this.activities.concat(res.data.data.activities);
                    });
            },
            formOpen: function (type, activity) {
                this.openForm = true;
                this.activity = activity;
            },
            closeForm: function () {
                this.openForm = false;
            }
        }
    }
</script>