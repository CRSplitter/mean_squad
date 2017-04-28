<template>
	<div class="payment-cont">
		<h2>Online Payment</h2>
		<form v-on:submit="submit" id="payment-form">
			<div class="form-row">
				<label for="card-element" class="form-group">
          Credit or debit card
        </label>
				<div id="card-error" class="alert alert-danger" v-if="errors.length > 0">
					<ul id="errors">
						<li v-for="error in errors">
							<p>{{ error.type }} : {{error.msg}}</p>
						</li>
					</ul>
				</div>
				<div id="card-msg" class="alert alert-info" v-if="msg">
					<p>{{msg}}</p>
				</div>
				<div id="card-element" class="form-group">
					<!-- a Stripe Element will be inserted here. -->
				</div>

				<!-- Used to display Element errors -->
				<div id="card-errors"></div>

			</div>
			<br>
			<div class="center">
				<strong>Amount: {{amount/100}} L.E.</strong>

			</div>
			<br>

			<div class="center">
				<button :disabled="disable" class="backgroudcolor3">Submit</button>

			</div>
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
				errors: [],
				amount: this.reservation.totalPrice * 100,
				disable: false
			}
		},
		props: [
			'reservation',
			'close'
		],
		methods: {
			submit(e) {

				var stripe = this.stripe;
				var card = this.card;
				var context = this;
				this.disable - true;

				e.preventDefault();
				context.$swal(
					'Please hold',
					'Contacting server to confirm payment.',
					'success',
					2500
				);
				stripe.createToken(card).then(function (result) {
					if (result.error) {
						// Inform the user if there was an error
						var errorElement = document.getElementById('card-errors');
						errorElement.textContent = result.error.message;
					} else {
						// Send the token to your server
						context.$http.post(URL + "/client/charge", {
							stripeToken: result.token.id,
							reservationId: context.reservation._id,
							amount: context.amount
						}).then((response) => {

							if (response.body.errors) {
								context.errors = response.body.errors;
								context.$swal(
									'Failed!',
									response.data.errors[0].msg,
									'error'
								);
							}
							else {
								context.close();
								context.$swal(
									'Reservation Confirmed!',
									'Your payment has been accepted and reservation is complete. An email has been sent to you.',
									'success'
								);
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
<style scoped>
	.payment-cont {
		position: relative;
		width: 100%;
	}

	.TextField {
		width: 300px !important;
	}

	input {
		border-radius: 10px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
	}

	.min {
		margin-left: 10px;
	}

	#card-element {
		width: 400px;
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

	.editContainer {
		position: relative;
	}
</style>