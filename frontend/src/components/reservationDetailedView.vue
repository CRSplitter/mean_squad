<template>
    <div v-if="reservation" class="container" style="border: red 2px solid; border-radius: 10px; padding: 20px; width: 450px; text-align: center;">
        <h3>#{{reservation._id}}</h3>
        {{disableCancel()}}
        <a :href="businessUrl">{{reservation.activityId.businessId.name}}</a>
        &bull;
        <a :href="activityUrl">{{reservation.activityId.name}}</a>
        <br>
        <br>
        <div style="text-align: left; margin-left: auto; margin-right: auto; width: 200px;">
            <div v-if="userType=='Client'">
            <span class="label">Reserved By:</span><span v-if="reservation">{{reservation.clientId.userId.name}}</span><br>
            </div>
            <span class="label">Number of participants: </span><span v-if="reservation">{{reservation.countParticipants}}</span><br>
            <span class="label">Details: </span><span v-if="reservation">{{reservation.details}}</span><br>
            <span class="label">Date: </span><span v-if="reservation">{{frontFormat(this.reservation.date)}}</span><br>
        </div>
        <br>
        <div  class="container">
            <!-- <button class="btn btn-primary myBtn" style="margin-right: 40px;" v-on:click="edit" :disabled="disabled">Edit</button> -->
            
            <button v-if="userType == 'Client'" class="btn btn-primary myBtn " v-on:click="openForm('paymentForm',reservation)">Pay</button>

            <button class="btn btn-danger myBtn" v-on:click="confirmCancel" :disabled="disabled">Cancel</button>
        </div>
    </div>
</template>
<style type="text/css" scooped>
    .label {
        color: #CC2839;
    }
    .myBtn {
        min-width: 100px;
        cursor: pointer;
        border-radius: 100px;
    }
</style>
<script>
    import moment from 'moment';
    import VueSweetAlert from 'vue-sweetalert';
    import Vue from 'vue';
    var user = localStorage.getItem('user');
    var userType = localStorage.getItem('userType');
    var URL = require('./env.js').HostURL;

    Vue.use(VueSweetAlert);

    export default {
        name: 'reservationCard',
        props: ['reservation','openForm','closeForm'],
        data() {
            return {
                user: user,
                errors: [],
                disabled: false,
                userType: userType
            }
        },
        methods: {
            edit: function() {
                // TODO
            },
            cancelReservation: function() {
                var self = this;
                var subroute;
                if(userType=="Business Operator")
                    subroute = "businessOperator";
                if(userType=="Client")
                    subroute = "client";
                this.$http.post(URL+'/'+subroute+'/cancelReservation/', {reservationId: this.reservation._id})
                .then(function(response) {
                    console.log(response.data.errors.length)
                    if(response.data.errors.length>0)
                        this.$swal(
                            'Failed!',
                            response.data.errors[0].msg,
                            'error'
                          );
                    else {
                        this.$swal(
                            'Cancelled!',
                            'Your reservation has been canceled.',
                            'success'
                        );
                        this.disableCancel();
                    }
                });
            },
            confirmCancel: function() {
                var self = this;
                this.$swal({
                  title: 'Are you sure?',
                  text: "You won't be able to revert this!",
                  type: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '#3085d6',
                  confirmButtonText: 'Yes, cancel it!',
                  cancelButtonText: 'No, take me back!',
                  buttonsStyling: true
                }).then(function () {
                    self.cancelReservation();
                });
            },
            disableCancel: function() {
                if(this.reservation.confirmed==="Cancelled")
                    this.disabled = true;
            },
            frontFormat: function(date) {
                return moment(date, 'YYYY-MM-DD').format('DD/MM/YYYY  h:mm a');
            }
        },
        computed: {
            businessUrl: function() {
                return '/profile/'+this.reservation.activityId.businessId.userId.username;
            },
            activityUrl: function() {
                return '/activity/'+this.reservation.activityId._id;
            },
            date: function() {
                return this.reservation.date;
            }
        },
        mounted() {
            
        }
    }
</script>
