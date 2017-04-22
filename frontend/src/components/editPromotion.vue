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
			<input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
		</div>
		<br>

		<div class="center">
			<button class="backgroudcolor3" @click="submit">Edit</button>

		</div>
	</div>
</template>
<script>
 var URL = require('./env.js').HostURL;
	export default {
		props: ['activity', 'promotion'],
		data() {
			return {
				image:'',
				errors: [],
				msg: ''
			}
		},

		methods: {

			submit: function (e) {

				e.preventDefault();

				var form = new FormData();
				form.append('promotionId',this.promotion._id)
				form.append('discountValue',this.promotion.discountValue)
				form.append('details',this.promotion.details)
				form.append('image',this.image)

				var uri = URL+'/business/editPromotion';

				this.$http.post(uri,form)
					.then(function (res) {
						console.log(res)
						if (res.data.errors) {
							this.errors = res.data.errors;
						} else {
							this.msg = res.data.msg;
							console.log(res.data);
						}
					});
			},
			fileChanged(e) {
				const files = e.target.files || e.dataTransfer.files;
				if (files.length > 0) {
					this.image = files[0];
				}
			}
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