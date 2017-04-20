<template>
    <div class="container">
      <div class="card-block">
        <h3 class="card-title">
            <p>Payment ID: {{payment._id}}
                </p>
            </h3>
        <p>Amount Paid: {{payment.amount}} EGP</p>
    <!--when clicking on the reservation Id the user is redirected to the reservation page(which renders the cards-->
        <router-link :to="'/reservation/' + payment.reservationId" class="btn btn-default">Reservation Number: {{payment.reservationId}}</router-link>
       
        <div v-if="errors.length > 0">
          <div class="alert alert-danger" role="alert">
              <strong>Oh snap!</strong>
              <div v-for="error in errors">
                 {{error.type}} : {{ error.msg }}
              </div>
          </div>
        </div>
  </div>

</div>
</template>

<script>
  var url = require('./env.js').HostURL;
    export default {
        props: ['payment'], 
        name: 'PaymentCard',
        data() {
            return {
                //useless
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    username: localStorage.getItem('user'),
                    user: localStorage.getItem('userObj')
                },
                errors: []
            };
        },
        created: function(){

        },
        methods: {
        }
 }
</script>