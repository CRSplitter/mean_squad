<template>
    <div>
        <div class="center" style="background-image: url('/static/default/images/bgPattern.jpg')">
            <div class="row container">
                <div class="col-lg-4" v-for="business in businesses" style="margin-top:30px">
                    <businessCard :business="business"></businessCard>
                </div>
            </div>
        </div>

        <div class="text-center" style="margin-top:40px">
				<pulseLoader :loading="loading" :color="color"></pulseLoader>
        </div>
        <div v-if="!hideButton && !loading" class="text-center" style="margin-top:40px">
            <button v-on:click="loadMore" class='backgroudcolor1'> More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import businessCard from './businessCard';
    import popUp from './popUp';
    import pulseLoader from './PulseLoader.vue'
    var URL = require('./env.js').HostURL;


    export default {
        name: 'businessesPageMain',
        props: ['startP', 'endP'],
        data() {
            return {
                businesses: [],
                page: 0,
                openForm: false,
                business: undefined,
                loading: false,
                color:"#D0021B",
                hideButton: true
            }
        },
        components: {
            businessCard: businessCard,
            popUp: popUp,
            pulseLoader:pulseLoader
        },
        created: function () {
            var context = this;
            this.startP();
            this.$http.get(URL + '/businesses/page/0')
                .then(function (res) {
                    this.endP();
                    this.hideButton=false;
                    if (res.data.data.businesses.length < 6) {
                        this.hideButton = true;
                    }
                    this.businesses = res.data.data.businesses;
                }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});
        },
        methods: {
            loadMore: function () {
                var context = this;
                this.loading=true;
                this.page = this.page + 1;
                this.$http.get(URL + '/businesses/page/' + this.page)
                    .then(function (res) {
                        this.loading= false;
                        if (res.data.data.businesses.length < 6) {
                            this.hideButton = true;
                        }
                        this.businesses = this.businesses.concat(res.data.data.businesses);
                    }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});

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
        margin-top: 50px;
    }

    .shad {
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>