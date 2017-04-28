<template>
    <div class="">
    <div v-if="errors>0">
        <div class="alert alert-danger" v-for="error in errors">
                <strong>Oh snap!</strong><br/> {{ error.msg }}
        </div>    
    </div>

        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>

        <div class="center" style="background-image: url('/static/default/images/bgPattern.jpg')">
            <div class="row promoContainer">
                 <div class="col-lg-6" v-for="activity in activities" style="margin-top:30px">
                    <activityCard :parentOpenForm="formOpen" :activity="activity" :startP="startP" :endP="endP"></activityCard>
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
    import activityCard from './activityCard';
    import popUp from './popUp';
    var URL = require('./env.js').HostURL;
    

    export default {
        props: ['startP','endP'],
        name: 'activityPageMain',
        data() {
            return {
                activities: [],
                page: 0,
                openForm: false,
                formType: 'reservationForm',
                activity: undefined,
                hideButton: false,
                errors:[]
            }
        },
        components: {
            activityCard: activityCard,
            popUp: popUp
        },
        created: function () {
            this.startP();
            this.$http.get(URL + '/activities/page/0')
                .then(function (res) {
                        this.endP();
                        if(res.data.data.activities.length < 6) {
                            this.hideButton = true;
                        }
                        this.activities = res.data.data.activities;
                    }
                );
        },
        methods: {
            loadMore: function () {
                this.startP();
                this.page = this.page + 1;
                this.$http.get(URL + '/activities/page/' + this.page)
                    .then(function (res) {
                        this.endP();
                        if(res.data.data.activities.length < 6) {
                            this.hideButton = true;
                        }
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
        width: 1100px;
        margin-top: 50px;
    }
    .shad{
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>