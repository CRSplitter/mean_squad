<template>
    <div class="">
        <div v-if="openForm && formType == 'promotionEditForm'">
            <popUp v-bind:closeFormFun="closeForm" :promotionEditObject="promotion" v-bind:formType="formType"></popUp>
        </div>
        <div class="center shad">

        </div>
        <div class="center" style="      background-image: url('/static/default/images/bgPattern.jpg')
">
            <div class="promoContainer">
                <div v-for="promotion in promotions" style="margin-top:30px">
                    <promotionCard :parentOpenForm="formOpen" :promotion="promotion"></promotionCard>
                </div>
            </div>
        </div>

        <div class="text-center" style="margin-top:40px">
            <button v-on:click="loadMore" class="backgroudcolor1"> More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import promotionCard from './promotionCard';
    import popUp from './popUp';
    var URL = require('./env.js').HostURL;

    export default {
        props: [],
        name: 'activityPageMain',
        data() {
            return {
                promotions: [],
                page: 0,
                openForm: false,
                formType: 'promotionEditForm',
                promotion: undefined,
                activity: undefined
            }
        },
        components: {
            promotionCard: promotionCard,
            popUp: popUp
        },
        created: function () {
            this.$http.get(URL + '/promotions/page/0')
                .then(function (res) {
                    this.promotions = res.data.data.promotions;
                });
        },
        methods: {
            loadMore: function () {
                this.page = this.page + 1;
                this.$http.get(URL + '/promotions/page/' + this.page)
                    .then(function (res) {
                        this.promotions = this.promotions.concat(res.data.data.promotions);
                    });
            },
            formOpen: function (type, promotion) {
                this.openForm = true;
                this.promotion = promotion;
            },
            closeForm: function () {
                this.openForm = false;
            }

        }
    }
</script>

<style scoped>
	button {
		position: relative;
		height: 30px;
		border-radius: 20px;
		color: white;
		font-weight: bold;
		width: auto;
		min-width: 100px;
	}
    .promoContainer{
        position: relative;
        width: 400px;
        margin-top: 50px;
    }
    .shad{
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>