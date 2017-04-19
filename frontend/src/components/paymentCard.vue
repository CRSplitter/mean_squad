<template>
<div>
    <div class="container">
      <div class="card-block">
        <h3 class="card-title">
            <router-link :to="'/payment/'+payment._id">Transaction Number: {{ payment._id }}
            </router-link>
            </h3>
    <p>Amount Paid: {{ payment.amount }}</p>

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
        props: ['paayment'], 
        name: 'PaymentCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    username: localStorage.getItem('user'),
                    user: localStorage.getItem('userObj')
                },
                errors: []
            };
        },
        methods: {
        },
        computed:{
        }
 }
</script>