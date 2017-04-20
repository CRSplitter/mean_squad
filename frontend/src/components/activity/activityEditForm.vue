<template>
  <div>
    <form @submit="onSubmit">
      <br>
      <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">Name</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="activity.name" name="name">
        </div>
      </div>
      <div class="form-group row">
        <label for="image" class="sr-only col-2 col-form-label">Image</label>
        <div class="col-10">
          <input type="file" name="image" id="image" class="form-control" accept="image/*" @change="fileChanged">
        </div>
      </div>


      <div class="form-group row">
        <label for="example-search-input" class="col-2 col-form-label">Description</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="activity.description" name="description">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-email-input" class="col-2 col-form-label">Price</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.price" name="price">
        </div>
      </div>

      <div class="form-group row">
        <label for="example-url-input" class="col-2 col-form-label">Max participants</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.maxParticipants" name="maxParticipants">
        </div>

      </div>
      <div class="form-group row">
        <label for="example-tel-input" class="col-2 col-form-label">Min participants</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.minParticipants" name="minParticipants">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-password-input" class="col-2 col-form-label">Min age</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.minAge" name="minAge">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-number-input" class="col-2 col-form-label">Duration hours</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.durationHours" name="durationHours">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-datetime-local-input" class="col-2 col-form-label">Duration minutes</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="activity.durationMinutes" name="durationMinutes">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-date-input" class="col-2 col-form-label">Activity type</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="activity.activityType" name="activityType">
        </div>
      </div>

      <button type="submit" class="btn btn-danger">Submit</button>

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