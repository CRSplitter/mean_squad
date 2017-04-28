<template>
	<div class="">
		<div class="">
			<div class="center">
				<h2>Add Promotion</h2>
			</div>
			<div v-if="errors.length > 0">
				<div class="alert alert-danger">
					<strong>Oh snap!</strong>
					<div v-for="error in errors">
						{{ error.msg }}
					</div>
				</div>
			</div>
			<br>
			<form @submit="onSubmit" enctype="multipart/form-data">
				<div class="form-group">
					<input type="number" v-model="discount" name="discountValue" class="form-control" placeholder="Discount Value" required>
				</div>
				<div class="form-group">
					<input type="textarea" v-model="details" name="details" class="form-control" placeholder="Promo details">
				</div>
				<div class="form-group">
					<label for="image" class="actionfont">Picture</label>
					<input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
				</div>
				<br>
				<div class="center">	
					<pulseLoader :loading="loading"></pulseLoader>
				</div>
				<div class="center" v-if="!loading">
					<button type="submit" class="backgroudcolor3">Add</button>

				</div>
			</form>
		</div>


	</div>
</template>


<script>
	import axios from 'axios';	
	import pulseLoader from '../../node_modules/vue-spinner/src/PulseLoader.vue'

	var URL = require('./env.js').HostURL;

	export default {
		props: ['activity', 'close', 'appendPromotion','startP','endP'],
		name: 'PromotionForm',
		data() {
			return {
				discount: '',
				details: '',
				image: '',
				errors: [],
				loading:false
			}
		},

		methods: {
			onSubmit(e) {
				e.preventDefault();
				this.loading = true;
				// this.startP();
				var self = this;

				var form = new FormData();
				form.append('discountValue', this.discount)
				form.append('details', this.details)
				form.append('image', this.image)
				form.append('activityId', this.activity._id)
				this.$http.post(URL + '/business/createpromotion', form)
					.then(function (res) {
						this.loading=false;
						// this.endP();
						if (res.body.errors) {
							this.errors = res.body.errors;
							this.$swal(
								'Failed!',
								res.data.errors[0].msg,
								'error'
							);
						} else {
							
							this.close();
							this.$swal(
								'Promotion Added!',
								'New promotion added.',
								'success'
							);
							self.appendPromotion(res.data.data.promotion);
						}
					}).catch(function (err) {

					});
			},
			fileChanged(e) {
				const files = e.target.files || e.dataTransfer.files;
				if (files.length > 0) {
					this.image = files[0];
				}
			}
		},
		components:{
			pulseLoader
		}
	}
</script>
<style scoped>
	input {
		border-radius: 10px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
	}

	.min {
		margin-left: 10px;
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