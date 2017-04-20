<template>
	<div class="col-sm-4 col-sm-offset-4">
		<h2>Add a new Activity</h2>
		<p>Add a new activity to your business</p>
		<div v-if="errors && errors.length > 0">
			<div class="alert alert-danger">
				<strong>Oh snap!</strong>
				<div v-for="error in errors">
					{{ error.msg }}
				</div>
			</div>
		</div>
        <div v-if="msg" class="alert alert-success">
            <strong>{{msg}}</strong>
        </div>
		<form v-on:submit="submit">
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Enter activity name" v-model="activity.name" required>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Enter activity description" v-model="activity.description" required>
			</div>
			<div class="form-group">
				<input type="number" class="form-control" placeholder="Enter activity price" v-model="activity.price" required>
			</div>
			<div class="form-group">
				<input type="number" class="form-control" placeholder="Enter maximum number of participants" v-model="activity.maxParticipants"
				    required>
			</div>
			<div class="form-group">
				<input type="number" class="form-control" placeholder="Enter minimum number of participants" v-model="activity.minParticipants"
				    required>
			</div>
			<div class="form-group">
				<input type="number" class="form-control" placeholder="Enter minumum age" v-model="activity.minAge" required>
			</div>
			<div class="form-group">
				<h5>Activity Duration</h5>
				<div style="float:left">
					<input type="number" class="form-control" placeholder="Hours" v-model="activity.durationHours" required>
				</div>
				<div style="float:left">
					<input type="number" class="form-control" placeholder="Minutes" v-model="activity.durationMinutes" required>
				</div>
			</div>
			<div class="form-group">
				<input type="text" class="form-control" placeholder="Enter activity type" v-model="activity.activityType" required>
			</div>

			<button type="submit" class="btn btn-primary">Add</button>
		</form>
	</div>
</template>

<script>
	export default {
		props: ['businessID'],
		data() {
			return {
				activity: {
					name: '',
					description: '',
					price: '',
					maxParticipants: '',
					minParticipants: '',
					minAge: '',
					durationHours: '',
					durationMinutes: '',
					avgRating: '',
					activityType: '',
					
				},
				errors: [],
				msg:''
			}
		},

		methods: {

			submit: function (e) {
				e.preventDefault();
				var newActivity = {
					name: this.activity.name,
					description: this.activity.description,
					price: this.activity.price,
					maxParticipants: this.activity.maxParticipants,
					minParticipants: this.activity.minParticipants,
					minAge: this.activity.minAge,
					durationHours: this.activity.durationHours,
					durationMinutes: this.activity.durationMinutes,
					activityType: this.activity.activityType
				};

				var uri = 'http://localhost:8080/business/addActivity';


				this.$http.post(uri, newActivity)
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