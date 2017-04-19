<template>
	<div class="col-sm-4 col-sm-offset-4">
		<h2>Edit Promotion</h2>
		<p>Edit your promotion's discount value, details, and image</p>
		<div v-if="errors.length > 0">
			<div class="alert alert-danger">
				<strong>Oh snap!</strong>
				<div v-for="error in errors">
					{{ error.msg }}
				</div>
			</div>
		</div>
        <div v-if="msg.length != 0" class="alert alert-success">
            <strong>{{msg}}</strong>
        </div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter details" v-model="promotionNew.details" :value="promotion.details">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter discount value" v-model="promotionNew.discountValue" :value="promotion.details">
		</div>
		<button class="btn btn-primary" @click="submit">Ok</button>
	</div>
</template>
<script>
	export default {
		props: ['activity', 'promotion'],
		data() {
			return {
				promotionNew: {
					details: '',
					discountValue: ''
				},
				errors: []
			}
		},

		methods: {

			submit: function (e) {
				e.preventDefault();
                //console.log(this.time);
                var newPromotion = {
					details: this.promotionNew.details,
					discountValue: this.promotionNew.discountValue,
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