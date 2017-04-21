<template>
    <div class="container text-center">

        <h1>Promotions</h1>
        <div v-for="promotion in promotions">
            <promotionCard :promotion="promotion"></promotionCard>
        </div>

        <div class="text-center">
            <button v-on:click="loadMore">Load More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import promotionCard from './promotionCard';

    export default {
        props: [],
        name: 'activityPageMain',
        data() {
            return {
                promotions: [],
                page: 0
            }
        },
        components: {
            promotionCard: promotionCard
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
            }
        }
    }
</script>