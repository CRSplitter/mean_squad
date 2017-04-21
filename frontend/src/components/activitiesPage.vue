<template>
    <div class="container text-center">

        <h1>Activities</h1>
        <div v-for="activity in activities">
            <activityCard :activity="activity"></activityCard>
        </div>

        <div class="text-center">
            <button v-on:click="loadMore">Load More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import activityCard from './activityCard';

    export default {
        props: [],
        name: 'activityPageMain',
        data() {
            return {
                activities: [],
                page: 0
            }
        },
        components: {
            activityCard: activityCard
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
            }
        }
    }
</script>