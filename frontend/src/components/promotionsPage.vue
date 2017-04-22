<template>
    <div class="container text-center">
        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>
        <h1>Promotions</h1>
        <div v-for="promotion in promotions">
            <promotionCard :parentOpenForm="formOpen" :promotion="promotion"></promotionCard>
        </div>

        <div class="text-center">
            <button v-on:click="loadMore">Load More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import promotionCard from './promotionCard';
    import popUp from './popUp';

    export default {
        props: [],
        name: 'activityPageMain',
        data() {
            return {
                promotions: [],
                page: 0,
                openForm: false,
                formType: 'reservationForm',
                activity: undefined
            }
        },
        components: {
            promotionCard: promotionCard,
            popUp: popUp
        },
        created: function () {
            this.$http.get('http://localhost:8080/promotions/page/0')
                .then(function (res) {
                    this.promotions = res.data.data.promotions;
                });
        },
        methods: {
            loadMore: function () {
                this.page = this.page + 1;
                this.$http.get('http://localhost:8080/promotions/page/' + this.page)
                    .then(function (res) {
                        this.promotions = this.promotions.concat(res.data.data.promotions);
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