<template>
	<div class="">
		<h2>Edit Promotion</h2>
		<div v-if="errors.length > 0">
			<div class="alert alert-danger">
				<strong>Oh snap!</strong>
				<div v-for="error in errors">
					{{ error.msg }}
				</div>
			</div>
		</div>
		<br>
		<div v-if="msg.length != 0" class="alert alert-success">
			<strong>{{msg}}</strong>
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter details" v-model="promotion.details">
		</div>
		<div class="form-group">
			<input class="form-control" placeholder="Enter discount value" type="number" v-model="promotion.discountValue">
		</div>
		<div class="form-group">
            <label for="image" class="actionfont">Picture</label>
			<input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
		</div>
		<br>
		<div class="center">	
			<pulseLoader :loading="loading"></pulseLoader>
		</div>
		<div class="center">
			<button v-if="!loading" class="backgroudcolor3" @click="submit">Edit</button>
		</div>
	</div>
</template>
<script>
import pulseLoader from './PulseLoader.vue'
 var URL = require('./env.js').HostURL;
	export default {
		props: ['activity', 'promotion', 'close'],
		data() {
			return {
				image:'',
				errors: [],
				msg: '',
				loading:false
			}
		},

		methods: {

			submit: function (e) {

				// this.startP();
				this.loading=true;
				e.preventDefault();
				var context = this;
				var form = new FormData();
				form.append('promotionId',this.promotion._id)
				form.append('discountValue',this.promotion.discountValue)
				form.append('details',this.promotion.details)
				form.append('image',this.image)

				var uri = URL+'/business/editPromotion';

				this.$http.post(uri,form)
					.then(function (res) {
						// this.endP();
						this.loading=false;
						if (res.data.errors) {
							this.errors = res.data.errors;
							this.$swal(
								'Failed!',
								res.data.errors[0].msg,
								'error'
							);
						} else {
							this.msg = res.data.msg;
							this.close();
							this.$swal(
								'Promotion Edited!',
								'Promotion has been edited.',
								'success'
							);
						}
					}, (err) => {
							context.errors = "Internal Server Error";
						});
			},
			fileChanged: function(e) {
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

	.editContainer {
		position: relative;
	}
</style>