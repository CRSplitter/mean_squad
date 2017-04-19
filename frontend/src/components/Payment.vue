
<template>
  <div class="col-sm-4 col-sm-offset-4">
    <h2>Online Payment</h2>
    <form v-on:submit="submit"
          id="payment-form">
      <div class="form-row">
        <label for="card-element"
               class="form-group">
          Credit or debit card
        </label>
        <div id="card-error"
             class="alert alert-danger"
             v-if="errors">
          <ul id="errors">
            <li v-for="error in errors">
              <p>{{ error.type }} : {{error.msg}}</p>
            </li>
          </ul>
        </div>
        <div id="card-msg"
             class="alert alert-info"
             v-if="msg">
          <p>{{msg}}</p>
        </div>
        <div id="card-element"
             class="form-group">
          <!-- a Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display Element errors -->
        <div id="card-errors"></div>

      </div>
      <button class="btn btn-danger">Submit Payment</button>
    </form>
  </div>
</template>

<script>
var URL = require('./env.js').HostURL;
var stripeKey = require('./env.js').StripeSecret

export default {
  name: 'Payment',
  data() {
    return {
      stripe: Stripe(stripeKey),
      card: '',
      msg: '',
      errors: null
    }
  },
  props: [
    'activity',
    'reservation'
  ],
  methods: {
    submit(e) {

      var stripe = this.stripe;
      var card = this.card;
      var context = this;
      this.errors = null;

      e.preventDefault();
      stripe.createToken(card).then(function (result) {
        if (result.error) {
          // Inform the user if there was an error
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        } else {
          // Send the token to your server
          context.$http.post(URL+"/client/charge", {
            stripeToken: result.token.id,
            // reservationId: context.reservation._id,
            // amount: context.activity.price * 100
          }).then((response) => {
            if (response.body.errors) {
              context.error = response.body.errors
            }
            context.msg = response.body.msg;
          }, (err) => {
            context.errors = err.body.errors;
          })
        }
      });
    }
  },
  mounted() {
    var stripe = this.stripe;
    var elements = stripe.elements();
    var style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };

    // Create an instance of the card Element
    var card = elements.create('card', {
      style: style
    });
    this.card = card;

    // Add an instance of the card Element into the `card-element` <div>
    card.mount('#card-element');

    card.addEventListener('change', function (event) {
      var displayError = document.getElementById('card-errors');
      if (event.error) {
        displayError.textContent = event.error.message;
      } else {
        displayError.textContent = '';
      }
    });
  }
}

</script>
