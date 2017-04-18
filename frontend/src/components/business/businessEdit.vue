<template>
  <div>
    <form @submit="onSubmit" method="post">
      <br>
      <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">Name</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="name" name="name" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-text-input" class="col-2 col-form-label">Email</label>
        <div class="col-10">
          <input class="form-control" type="email" v-model="email" name="email" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-search-input" class="col-2 col-form-label">Description</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="description" name="description" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-email-input" class="col-2 col-form-label">Address</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="address" name="address" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-url-input" class="col-2 col-form-label">Longitude</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="longitude" name="longitude" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-tel-input" class="col-2 col-form-label">Latitude</label>
        <div class="col-10">
          <input class="form-control" type="number" v-model="latitude" name="latitude" value="">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-password-input" class="col-2 col-form-label">Contact Info</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="contactInfo" name="contactInfo" value="">
        </div>
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
  props:['activity',
          'business'
        ],
  data() {
    return {
      name : '',
      email: '',
      description :'',
      address : '',
      longitude : '',
      latitude : '',
      contactInfo : '',
      errors:[]

    }
  },
  methods: {
    onSubmit(){
      this.$http.post(URL + '/business/edit', {

            name : this.name,
            description : this.description,
            email: this.email,
            address : this.address,
            longitude : this.longitude,
            latitude : this.latitude,
            contactInfo : this.contactInfo

          })
          .then(function (response) {
            console.log("success");
              if (response.body.errors) {
                console.log(response);
                  this.errors = response.body.errors
                  console.log(response.body);
                  console.log(JSON.stringify(response));
              } else {
                console.log(response.body.msg);
                this.$swal("success");
                this.$route.router.go('/');
              }
          }).catch(function (err){
            console.log(err);
          });
    }
  }

}
</script>

<style lang="css">
.btn-danger {
  margin : auto;
  display: block;
  margin-top: 3%;
  width: 20%
}
</style>
