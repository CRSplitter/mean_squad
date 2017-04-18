<template>
<div>
    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title">{{ activity.name }}</h3>
        <h4 class="text-muted"><small>{{ activity.business.name }}</small></h4>
        <p class="card-text">{{ activity.description }}</p>

        <div v-if="user" class="row">
            <button v-if="user.userType === 'Client' || user.userType === 'Business'" v-on:click="reserve" class="btn btn-success offset-md-1">Reserve</button>
            <button v-if="user.userType === 'Business'" v-on:click="edit" class="btn btn-primary offset-md-1">Edit</button>
            <form v-if="user.userType === 'Business'" v-on:submit="del" class="offset-md-1">
                <input type="submit" class="btn btn-danger" value="Delete">
            </form>
        </div>
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
</template>

<script>
    var user = {
        username: localStorage.getItem('user'), //username
        userType: localStorage.getItem('userType')
    };
    // console.log(user.userType);
    // console.log("HERE");
    export default {
        props: ['activity'],
        name: 'ActivityCard',
        data() {
            return {
                user: user,
                errors: []
            }
        },
        methods: {
            reserve: function() {},
            edit: function() {},
            del: function(e) {
                e.preventDefault();
                this.$http.post('http://localhost:8080/business/removeActivity', {
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
                        console.log("error");
                    });
            }
        }
    }
</script>

