<template>
    <div class="">

        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="promotion.activityId" :business="promotion.activityId.businessId" v-bind:formType="formType"></popUp>
        </div>
        <div class="center shad">

        </div>
        <div class="center" style="      background-image: url('/static/default/images/bgPattern.jpg')
">
            <div class="row promoContainer">
                <div class="col-lg-4" v-for="promotion in promotions" style="margin-top:30px">
                    <promotionCard :parentOpenForm="formOpen" :promotion="promotion"></promotionCard>
                </div>
            </div>
        </div>

        <div class="text-center" style="margin-top:40px">
				<pulseLoader :loading="loading" :color="color"></pulseLoader>
        </div>
        <div v-if="!hideButton && !loading" class="text-center" style="margin-top:40px">
            <button v-on:click="loadMore" class="backgroudcolor1"> More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import promotionCard from './promotionCard';
    import popUp from './popUp';
    import pulseLoader from './PulseLoader.vue'
    var URL = require('./env.js').HostURL;

    export default {
        name: 'promotionsPageMain',
        props: ['startP','endP'],
        data() {
            return {
                promotions: [],
                page: 0,
                openForm: false,
                formType: 'reservationForm',
                promotion: undefined,
                activity: undefined,
                hideButton: true,
                loading:false,
                color:"#D0021B"
            }
        },
        components: {
            promotionCard: promotionCard,
            popUp: popUp,
            pulseLoader: pulseLoader
        },
        created: function () {
            var context = this;
            this.startP();
            this.$http.get(URL + '/promotions/page/0')
                .then(function (res) {
                    this.endP();
                    this.hideButton=false;
                    if (res.data.data.promotions.length < 6) {
                        this.hideButton = true;
                    }
                    this.promotions = res.data.data.promotions;
                }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});
        },
        methods: {
            loadMore: function () {
                var context = this;
                this.loading = true;
                this.page = this.page + 1;
                this.$http.get(URL + '/promotions/page/' + this.page)
                    .then(function (res) {
                        this.loading= false;
                        if (res.data.data.promotions.length < 6) {
                            this.hideButton = true;
                        }
                        this.promotions = this.promotions.concat(res.data.data.promotions);
                    }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});
            },
            formOpen: function (type, promotion) {
                this.openForm = true;
                this.formType = type;
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

    .promoContainer {
        position: relative;
        margin-top: 50px;
    }

    .shad {
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>