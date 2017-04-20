<template>
<div>
  <form @submit="onSubmit">
    <br>
    <div class="form-group row">
      <label for="example-text-input" class="col-2 col-form-label">Name</label>
      <div class="col-10">
        <input class="form-control" type="text" v-model="name" name="name" :value="activity.name">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-search-input" class="col-2 col-form-label">Description</label>
      <div class="col-10">
        <input class="form-control" type="text" v-model="description" name="description" :value="activity.desccription">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-email-input" class="col-2 col-form-label">Price</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="price" name="price" :value="activity.price">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-url-input" class="col-2 col-form-label">Max participants</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="maxParticipants" name="maxParticipants" :value="activity.maxParticipants">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-tel-input" class="col-2 col-form-label">Min participants</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="minParticipants" name="minParticipants" :value="activity.minParticipants">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-password-input" class="col-2 col-form-label">Min age</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="minAge" name="minAge" :value="activity.minAge">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-number-input" class="col-2 col-form-label">Duration hours</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="durationHours" name="durationHours" :value="activity.durationHours">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-datetime-local-input" class="col-2 col-form-label">Duration minutes</label>
      <div class="col-10">
        <input class="form-control" type="number" v-model="durationMinutes" name="durationMinutes" :value="activity.durationMinutes">
      </div>
    </div>
    <div class="form-group row">
      <label for="example-date-input" class="col-2 col-form-label">Activity type</label>
      <div class="col-10">
        <input class="form-control" type="text" v-model="activityType" name="activityType" :value="activity.activityType">
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
  props: ['activity',
    'business'
  ],
  data() {
    return {
      name: '',
      description: '',
      price: '',
      maxParticipants: '',
      minParticipants: '',
      minAge: '',
      durationHours: '',
      durationMinutes: '',
      activityType: '',
      errors: []

    }
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      this.$http.post(URL + '/business/editActivity', {
          name: this.name,
          description: this.description,
          price: this.price,
          maxParticipants: this.maxParticipants,
          minParticipants: this.minParticipants,
          minAge: this.minAge,
          durationHours: this.durationHours,
          durationMinutes: this.durationMinutes,
          activityType: this.activityType,
          activityId: this.activityId,
          businessId: this.businessId
        })
        .then(function(response) {
          if (response.data.errors) {
            console.log(response);
            this.errors = response.data.errors;
            console.log(response.data);

          }
          console.log(response.data.data);
        }).catch(function(err) {


        });
    }
  }

}
</script>
