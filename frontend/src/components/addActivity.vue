<template>
	<div class="col-sm-4 col-sm-offset-4">
		<h2>Add a new Activity</h2>
		<p>Add a new activity to your business</p>
		<div class="alert alert-danger" v-if="error">
			<p>{{ error }}</p>
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter activity name" v-model="activity.name">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter activity description" v-model="activity.description">
		</div>
		<div class="form-group">
			<input type="number" class="form-control" placeholder="Enter activity price" v-model="activity.price">
		</div>
		<div class="form-group">
			<input type="number" class="form-control" placeholder="Enter maximum number of participants" v-model="activity.maxParticipants">
		</div>
		<div class="form-group">
			<input type="number" class="form-control" placeholder="Enter minimum number of participants" v-model="activity.minParticipants">
		</div>
		<div class="form-group">
			<input type="number" class="form-control" placeholder="Enter minumum age" v-model="activity.minAge">
		</div>
		<div class="form-group">
			<h5>Activity Duration</h5>
			<div style="float:left">
				<input type="number" class="form-control" placeholder="Hours" v-model="activity.durationHours">
			</div>
			<div  style="float:left">
				<input type="number" class="form-control" placeholder="Minutes" v-model="activity.durationMinutes">
			</div>
		</div>
		<div class="form-group">
			<input type="number" class="form-control" placeholder="Enter average rating" v-model="activity.avgRating">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter activity type" v-model="activity.activityType">
		</div>
				
		<button class="btn btn-primary" @click="submit">Add</button>
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
					activityType: ''
				},
				error: ''
			}
		},

		methods: {

			submit: function (e) {
				e.preventDefault();
                console.log(this.time);
                var newActivity = {
					name: this.name,
					description: this.description,
					price: this.price,
					maxParticipants: this.maxParticipants,
					minParticipants: this.minParticipants,
					minAge: this.minAge,
					durationHours: this.durationHours,
					durationMinutes: this.durationMinutes,
					avgRating: this.avgRating,
					activityType: this.activityType
                };
                console.log(newActivity);
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