<template>
	<div class="editContainer">
		<div class="center">
			<h2>Edit Profile</h2>
		</div>
		<form @submit="onSubmit">
			<br>
			<div class="form-group row">
				<input class="form-control" type="text" v-model="business.name" name="name" placeholder="Name" required>
			</div>
			
			<div class="form-group row ">
            <div class="center">
                <label for="image" class="actionfont">Profile picture</label>
            </div>
				<input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
			</div>
			<div class="form-group row">
				<input class="form-control" type="email" v-model="business.userId.email" name="email" placeholder="Email" required>
			</div>
			<div class="form-group row">
				<input class="form-control" type="text" v-model="business.description" name="description" placeholder="Description">
			</div>
			<div class="form-group row">
				<input class="form-control" type="text" v-model="business.address" name="address" placeholder="Address">
			</div>
			<div id="registerMap">
				<gmap-map :center="center" :zoom="12" style="width: 100%; height: 100%" @click="moveMarker">
					<gmap-marker :position="m.position" :clickable="true" :draggable="true" @position_changed="updMarker(m, $event)"></gmap-marker>
				</gmap-map>
			</div>
			<div class="form-group">
				<input class="form-control" type="text" v-model="business.contactInfo" name="contactInfo" placeholder="Contact Info">
			</div>

			<button type="submit" class="btn btn-danger">Edit</button>

		</form>

		<div v-if="errors.length > 0">
			<div class="alert alert-danger" role="alert">
				<strong>Oh snap!</strong>
				<div v-for="error in errors">
					{{ error.msg }}
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	var URL = require('../env.js').HostURL;

	export default {
		props: ['business', 'close', 'loadBar'],
		data() {
			return {
				image: '',
				errors: [],
				pos: {
					lat: 29.99137716486692,
					lng: 31.407180786132812
				},
				center: {
					lat: 29.99137716486692,
					lng: 31.407180786132812
				},
				m: {
					position: {
						lat: 29.99137716486692,
						lng: 31.407180786132812
					}
				},
				markers: [{
					position: {
						lat: 29.99137716486692,
						lng: 31.407180786132812
					}
				}]

			}
		},
		created: function () {
			this.loadBar();
			if (this.business.latitude && this.business.longitude) {
				this.pos = {
					lat: parseFloat(this.business.latitude),
					lng: parseFloat(this.business.longitude)
				}
				this.center = {
					lat: parseFloat(this.business.latitude),
					lng: parseFloat(this.business.longitude)
				}
				this.m.position = {
					lat: parseFloat(this.business.latitude),
					lng: parseFloat(this.business.longitude)
				}

			}
		},
		methods: {
			onSubmit(e) {
				this.loadBar();
				e.preventDefault();

				var form = new FormData();
				form.append('name', this.business.name);
				form.append('description', this.business.description);
				form.append('email', this.business.userId.email);
				form.append('address', this.business.address);
				form.append('longitude', this.pos.lng);
				form.append('latitude', this.pos.lat);
				form.append('contactInfo', this.business.contactInfo);
				form.append('image', this.image)

				this.$http.post(URL + '/business/edit', form)
					.then(function (response) {
						if (response.data.errors) {
							this.errors = response.data.errors
							this.close();
							this.$swal(
								'Failed!',
								response.data.errors[0].msg,
								'error'
							);

						} else {
							this.close();
							this.$swal(
								'Updated!',
								'Your info has been updated.',
								'success'
							);

						}
					}).catch(function (err) {
						this.close();
						this.$swal(
								'Failed!',
								err.data.errors[0].msg,
								'error'
							);
					});
			},
			updMarker(m, event) {
				m.position = {
					lat: event.lat(),
					lng: event.lng()
				}
				this.pos = {
					lat: event.lat(),
					lng: event.lng()
				}
			},
			moveMarker(mouseArgs) {
				this.m.position = {
					lat: mouseArgs.latLng.lat(),
					lng: mouseArgs.latLng.lng()
				}
				this.pos = {
					lat: mouseArgs.latLng.lat(),
					lng: mouseArgs.latLng.lng()
				}
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

<style lang="css" scoped>
	.btn-danger {
		margin: auto;
		display: block;
		margin-top: 3%;
		width: 20%
	}
	#registerMap {
		width: 525px;
		height: 150px;
	}

	input {
		border-radius: 10px;
		box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
		height: 45px;
	}

	.editContainer {
		position: relative;
		padding: 20px;
	}
</style>