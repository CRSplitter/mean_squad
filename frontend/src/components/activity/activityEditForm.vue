<template>
  <div class="editContainer">
    <div class="center">
			<h2>Add a new Activity</h2>
		</div>
    <br>
    <form @submit="onSubmit">
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
				<div style="float:left" class="min">
					<input type="number" class="form-control" placeholder="Minutes" v-model="activity.durationMinutes" required>
				</div>
			</div>
			<br>
						<br>

			<div class="form-group">
				<input type="text" class="form-control" placeholder="Enter activity type" v-model="activity.activityType" required>
			</div>
			<br>
			<div class="center">
							<button type="submit" class="backgroudcolor3">Edit</button>

			</div>
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

    data() {
      return {
        errors: []

      }
    },
    props: [
      'activity',
      'business'
    ],
    methods: {
      onSubmit(e) {
        var form = new FormData();
        form.append('name', this.activity.name);
        form.append('description', this.activity.description);
        form.append('price', this.activity.price);
        form.append('maxParticipants', this.activity.maxParticipants);
        form.append('minParticipants', this.activity.minParticipants);
        form.append('minAge', this.activity.minAge);
        form.append('durationHours', this.activity.durationHours);
        form.append('durationMinutes', this.activity.durationMinutes);
        form.append('activityType', this.activity.activityType);
        form.append('activityId', this.activity._id)
        form.append('image', this.activity.image)

        e.preventDefault();
        this.$http.post(URL + '/business/editActivity', form)
          .then(function (response) {
            if (response.data.errors) {
              console.log(response);
              this.errors = response.data.errors;
              console.log(response.data);

            }
            console.log(response.data.data);
          }).catch(function (err) {


          });
      },
      fileChanged(e) {
        const files = e.target.files || e.dataTransfer.files;
        if (files.length > 0) {
          this.activity.image = files[0];
        }
      }
    },

  }
</script>

<style scoped>

input{
	border-radius: 10px;
	box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.2);
}
.min{
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
    .editContainer{
      position: relative;
    }

</style>