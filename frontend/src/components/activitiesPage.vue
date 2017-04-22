<template>
    <div class="">

        <div v-if="openForm && formType == 'reservationForm'">
            <popUp v-bind:closeFormFun="closeForm" :activity="activity" :business="activity.businessId" v-bind:formType="formType"></popUp>
        </div>

        <div class="center shad">
        </div>
        <div class="center" style="background-image: url('/static/default/images/bgPattern.jpg')
">
            <div class="promoContainer">
                 <div v-for="activity in activities" style="margin-top:30px">
                    <activityCard :parentOpenForm="formOpen" :activity="activity"></activityCard>
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
        width: 500px;
        margin-top: 50px;
    }
    .shad{
        box-shadow: 4px 2px 4px rgba(0, 0, 0, 0.2)
    }
</style>