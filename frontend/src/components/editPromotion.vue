<template>
	<div class="col-sm-4 col-sm-offset-4">
		<h2>Edit Promotion</h2>
		<p>Edit your promotion's discount value, details, and image</p>
		<div class="alert alert-danger" v-if="error">
			<p>{{ error }}</p>
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter details" v-model="promotion.details">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter discount value" v-model="promotion.discountValue">
		</div>
		<button class="btn btn-primary" @click="submit">Ok</button>
	</div>
</template>
<script>
	export default {
		props: ['activity'],
		data() {
			return {
				promotion: {
					details: '',
					discountValue: ''
				},
				error: ''
			}
		},

		methods: {

			submit: function (e) {
				e.preventDefault();
                console.log(this.time);
                var newPromotion = {
					details: this.details,
					discountValue: this.discountValue,
					activityID: this.activity._id
                };
                console.log(newPromotion);
				var uri = 'http://localhost:8080/business/editPromotion';


                this.$http.post(uri, newPromotion)
                    .then(function (res) {
                        if (res.data.errors) {
                            this.errors = res.data.errors;
                        } else {
                            this.msg = res.data.msg;
                            console.log(res.data);
                        }
                    });
            	}
			}
		}

	
</script>