<template>
    <div class="">

        <div class="center" style="background-image: url('/static/default/images/bgPattern.jpg')">
            <div class="row promoContainer">
                <div class="col-lg-4" v-for="business in businesses" style="margin-top:30px">
                    <businessCard :business="business"></businessCard>
                </div>
            </div>
        </div>

        <div v-if="!hideButton" class="text-center" style="margin-top:40px">
            <button v-on:click="loadMore" class='backgroudcolor1'> More</button>
        </div>
        <br><br><br><br>

    </div>

</template>

<script>
    import businessCard from './businessCard';
    import popUp from './popUp';
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
                hideButton: false
            }
        },
        components: {
            businessCard: businessCard,
            popUp: popUp
        },
        created: function () {
            this.startP();
            this.$http.get(URL + '/businesses/page/0')
                .then(function (res) {
                    this.endP();
                    if (res.data.data.businesses.length < 6) {
                        this.hideButton = true;
                    }
                    this.businesses = res.data.data.businesses;
                });
        },
        methods: {
            loadMore: function () {
                this.startP();
                this.page = this.page + 1;
                this.$http.get(URL + '/businesses/page/' + this.page)
                    .then(function (res) {
                        this.endP();
                        if (res.data.data.businesses.length < 6) {
                            this.hideButton = true;
                        }
                        this.businesses = this.businesses.concat(res.data.data.businesses);
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



    .shad {
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>