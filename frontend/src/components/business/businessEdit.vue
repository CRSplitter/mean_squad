<template>
  <div>
    <div class="center">
			<h2>Add a new Activity</h2>
		</div>
    <form @submit="onSubmit">
      <br>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" v-model="name" name="name" :value="business.name" placeholder="Name">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="email" v-model="email" name="email" :value="business.email">
        </div>
      </div>
      <div class="form-group row">
        <div class="col-10">
          <input class="form-control" type="text" v-model="description" name="description" :value="business.description">
        </div>
      </div>
      <div class="form-group row">
        <label for="example-email-input" class="col-2 col-form-label">Address</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="address" name="address" :value="business.address">
        </div>
      </div>
      <div id="registerMap">
          <gmap-map :center="center" :zoom="12" style="width: 100%; height: 100%" @click="moveMarker">
              <gmap-marker v-for="m in markers" :position="m.position" :clickable="true" :draggable="true" @position_changed="updMarker(m, $event)"></gmap-marker>
          </gmap-map>
      </div>


      <div class="form-group row">
        <label for="example-password-input" class="col-2 col-form-label">Contact Info</label>
        <div class="col-10">
          <input class="form-control" type="text" v-model="contactInfo" name="contactInfo" :value="business.contactInfo">
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
  props:[
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
      errors:[],
      pos: {
          lat: 29.99137716486692,
          lng: 31.407180786132812
      },
      center: {
          lat: 29.99137716486692,
          lng: 31.407180786132812
      },
      markers: [{
          position: {
              lat: 29.99137716486692,
              lng: 31.407180786132812
          }
      }],

    }
  },
  created: function() {
    if(this.business.latitude && this.business.longitude) {
    this.pos = {
      lat: parseFloat(this.business.latitude),
      lng: parseFloat(this.business.longitude)
    }
    this.center = {
      lat: parseFloat(this.business.latitude),
      lng: parseFloat(this.business.longitude)
    }
    this.markers[0] = {
      lat: parseFloat(this.business.latitude),
      lng: parseFloat(this.business.longitude)
    }
    }
  },
  methods: {
    onSubmit(e){
      e.preventDefault();
      this.$http.post(URL + '/business/edit', {

            name : this.name,
            description : this.description,
            email: this.email,
            address : this.address,
            longitude : this.pos.lng,
            latitude : this.pos.lat,
            contactInfo : this.contactInfo

          })
          .then(function (response) {
              if (response.data.errors) {
                console.log(response);
                  this.errors = response.data.errors
                  console.log(response.body);

              } else {

              }
          }).catch(function (err){

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
        this.markers[0].position = {
            lat: mouseArgs.latLng.lat(),
            lng: mouseArgs.latLng.lng()
        }
        this.pos = {
            lat: mouseArgs.latLng.lat(),
            lng: mouseArgs.latLng.lng()
        }
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
