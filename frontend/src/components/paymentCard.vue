<template>
    <div v-if="payment" class="container box_shadow" style="border-radius: 10px; padding: 20px; width: 450px; text-align: center;            background-color: white;
">
       <span class="actionfont">{{payment.amount}} EGP</span>
        <br>
        <br>
        <div style="text-align: left; margin-left: auto; margin-right: auto; width: 200px;">
            <div>
            <div class="center">
                    <span v-if="payment">{{payment.amount}} EGP</span><br>
            </div>    
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
            <button class="backgroudcolor3">
            <router-link :to="'/reservation/' + payment.reservationId" class="" id="reserveationBtn">Go To Reservation</router-link>
            </button>
        </div>
    </div>
</template>
<style type="text/css" scoped>
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
    button {
		position: relative;
		height: 30px;
		border-radius: 20px;
		color: white;
		font-weight: bold;
		width: auto;
		min-width: 100px;
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
        }
    }
</script>
