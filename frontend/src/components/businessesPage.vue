<template>
    <div class="">

        <div class="center shad">
        </div>
        <div class="center" style="background-image: url('/static/default/images/bgPattern.jpg')">
            <div class="promoContainer">
                 <div v-for="business in businesses" style="margin-top:30px">
                    <businessCard :business="business"></businessCard>
                </div>
            </div>
        </div>

        <div class="text-center" style="margin-top:40px">
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
        props: [],
        name: 'businessesPageMain',
        data() {
            return {
                businesses: [],
                page: 0,
                openForm: false,
                business: undefined
            }
        },
        components: {
            businessCard: businessCard,
            popUp: popUp
        },
        created: function () {
            this.$http.get(URL + '/businesses/page/0')
                .then(function (res) {
                    this.businesses = res.data.data.businesses;
                });
        },
        methods: {
            loadMore: function () {
                this.page = this.page + 1;
                this.$http.get(URL +'/businesses/page/' + this.page)
                    .then(function (res) {
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
    .promoContainer{
        position: relative;
        width: 350px;
        margin-top: 50px;
    }
    .shad{
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>