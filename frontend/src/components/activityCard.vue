<template>
    <div>
        <div class="activityCard  center box_shadow">
            <div class="activityBox">
                <div class="activityImage center">
                    <img :src="url+'/uploads/'+activity.image">
                </div>
                <div class="activity-wide center">
                    <router-link :to="'/activity/'+activity._id" class="font_large actionfont">{{ activity.name }}</router-link>
                </div>

                <div class="activity-wide center">
                    <a class="font_small" :href="'/profile/?username='+activity.businessId.userId.username">{{activity.businessId.name}}</a>
                </div>

                <div class="activity-wide center font_medium">
                    {{ activity.description }}
                </div>
                <br>

                <div v-if="user" class="btnActivity ">
                    <div v-if="user.userType === 'Client' && !search" class="btnBox center">
                        <button v-on:click="parentOpenForm('reservationForm',activity)" type="button" class="backgroudcolor2">Reserve</button>
                    </div>
                    <div v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search" class="btnBox center">
                        <button v-on:click="parentOpenForm('activityEditForm',activity)"  class="backgroudcolor3"> Edit </button>
                    </div>
                    <div class="btnBox center" v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search">
                        <button v-on:click="del"  class="backgroudcolor1 font_medium "> Delete </button>
                    </div>
                    <div class="btnBox center" v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id && !search">
                        <button  v-on:click="parentOpenForm('promotionForm',activity)"
                            type="button" name="button" class="backgroudcolor2 font_medium ">Add Promotion</button>
                    </div>
                </div>
            </div>

            <div v-if="errors.length > 0">
                <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong>
                    <div v-for="error in errors">
                        {{ error.msg }}
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import ReservationForm from './reservationForm';
    var user = JSON.parse(localStorage.getItem('userObj'));
    var hostURL = require('./env').HostURL;

    export default {
        props: ['activity', 'parentOpenForm','search'],
        name: 'ActivityCard',
        data() {
            return {
                user: user,
                errors: [],
                businessLogged: {},
                owner: {},
                url:hostURL
            }
        },
        methods: {
            del: function (e) {
                e.preventDefault();
                this.$http.post(hostURL + '/business/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function (res) {
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            // TODO success
                        }
                    }, function (res) {
                        // TODO
                        console.log("error");
                    });
            }
        },
        components: {
            reservationForm: ReservationForm
        },
        created: function () {
            if (this.user.userType === 'Business') {
                this.$http.get(hostURL + '/business/' + this.user.username)
                    .then(function (res) {
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.businessLogged = res.body.data.business;
                        }
                    }, function (res) {
                        // TODO
                    });
                this.$http.post(hostURL + '/user/getById', {
                        userId: this.activity.businessId.userId
                    })
                    .then(function (res) {
                        console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.owner = res.body.data.user;
                        }
                    }, function (res) {
                        // TODO
                        console.log("error");
                    });
            }
        }
    }
</script>

<style scoped>
    .activityCard {
        position: relative;
        width: 500px;
        height: auto;
        border-radius: 10px;
        padding-bottom: 20px;
            background-color: white;

    }

    .activity-wide {
        position: relative;
        width: 100%;
    }

    .btnActivity {
        position: relative;
        width: 100%;
        display: flex;
        justify-content: space-around;
    }

    .activityBox {
        position: relative;
        width: 100%;
    }

    button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }

    input {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }

    .btnBox {
        position: relative;
        width: 25%;
    }

    .activityImage {
        position: relative;
        width: 100%;
        height: 120px;
    }

    img {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .font_small {
        color: gray !important;
    }
</style>