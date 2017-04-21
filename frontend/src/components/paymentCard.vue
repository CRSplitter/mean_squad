<template>
    <div v-if="payment" class="container" style="border: red 2px solid; border-radius: 10px; padding: 20px; width: 450px; text-align: center;">
        <h3>Payment ID: <span style="font-size: 15px;">{{payment._id}}</span></h3>
        <br>
        <div style="text-align: left; margin-left: auto; margin-right: auto; width: 200px;">
            <div>
            <span class="label">Amount Paid: </span><span v-if="payment">{{payment.amount}} EGP</span><br>
            </div>
            <div v-if="errors.length > 0">
                <div class="alert alert-danger" role="alert">
                    <strong>Oh snap!</strong>
                    <div v-for="error in errors">
                        {{error.type}} : {{ error.msg }}
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div  class="container">
            <button class="btn btn-primary">
            <router-link :to="'/reservation/' + payment.reservationId" class="btn btn-default" id="reserveationBtn">Go To Reservation</router-link>
            </button>
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
    #reserveationBtn:hover {
        color: white;
    }
</style>
<script>

    export default {
        name: 'PaymentCard',
        props: ['payment'],
        data() {
            return {
                errors: [],

            }
        },
        methods: {
            edit: function() {
                // TODO
            }
        },
        computed: {
            
        },
        mounted() {
            
        }
    }
</script>
