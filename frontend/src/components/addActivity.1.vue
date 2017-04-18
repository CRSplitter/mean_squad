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
			<input type="text" class="form-control" placeholder="Enter activity price" v-model="activity.price">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter maximum number of participants" v-model="activity.maxParticipants">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter minimum number of participants" v-model="activity.minParticipants">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter minumum age" v-model="activity.minAge">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Hours" v-model="activity.durationHours">
			<input type="text" class="form-control" placeholder="Minutes" v-model="activity.durationMinutes">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter average rating" v-model="activity.avgRating">
		</div>
		<div class="form-group">
			<input type="text" class="form-control" placeholder="Enter activity type" v-model="activity.activityType">
		</div>
				
		<button class="btn btn-primary" @click="submit">Add</button>
	</div>
</template>
