<template>
<div>
    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title"><router-link :to="'/activity/'+activity._id">{{ activity.name }}</router-link></h3>
        <router-link :to="'/profile/'+owner.username" class="text-muted"><small>{{ activity.businessId.name }}</small></router-link>
        <p class="card-text">{{ activity.description }}</p>

        <div v-if="user" class="row">
            <button type="button" v-if="user.userType === 'Client' || user.userType === 'Business Operator'" class="btn btn-success offset-md-1" data-toggle="modal" :data-target="'#'+activity._id+'Modal'">Reserve</button>

            <!-- Modal -->
            <div class="modal fade" :id="activity._id+'Modal'" tabindex="-1" role="dialog" :aria-labelledby="activity._id+'ModalLabel'" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" :id="activity._id+'ModalLabel'">Activity reservation</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <reservationForm :activity="activity"></reservationForm>
                        </div>
                    </div>
                </div>
            </div>

            <router-link to="/" v-if="user.userType === 'Business' && businessLogged._id === activity.businessId._id" class="btn btn-primary offset-md-1">Edit</router-link>

            <form v-if="user.userType === 'Business'" v-on:submit="del" class="offset-md-1">
                <input type="submit" class="btn btn-danger" value="Delete">
            </form>
        </div>
      </div>

      <div v-if="errors.length > 0">
          <div class="alert alert-danger" role="alert">
              <strong>Oh snap!</strong>
              <div v-for="error in errors">
                  {{ error.msg }}
              </div>
          </div>
      </div>
  </div>

</div>
</template>

<script>
    import ReservationForm from './reservationForm';

    var user = JSON.parse(localStorage.getItem('userObj'));
    var hostURL = require('./env').HostURL;
    
    export default {
        props: ['activity'],
        name: 'ActivityCard',
        data() {
            return {
                user: user,
                errors: [],
                businessLogged: {},
                owner:{}
            }
        },
        methods: {
            del: function(e) {
                e.preventDefault();
                this.$http.post(hostURL+'/business/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function(res) {
                        // console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            // TODO success
                        }
                    }, function(res) {
                        // TODO
                        console.log("error");
                    });
            }
        },
        components: {
            reservationForm: ReservationForm
        },
        created: function() {
            console.log(this.user)
            if (this.user.userType === 'Business') {
                this.$http.get(hostURL+'/business/' + this.user.username)
                    .then(function(res) {
                        console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.businessLogged = res.body.data.business;
                        }
                    }, function(res) {
                        // TODO
                        console.log("error");
                    });
                    this.$http.post(hostURL+'/user/getById', {userId: this.activity.businessId.userId})
                        .then(function(res) {
                            console.log(res);
                            if (res.body.errors) {
                                this.errors = res.body.errors;
                            } else {
                                this.owner = res.body.data.user;
                            }
                        }, function(res) {
                            // TODO
                            console.log("error");
                        });

            }
        }
    }
</script>

