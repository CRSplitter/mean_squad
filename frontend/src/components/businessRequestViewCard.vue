<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title">{{ businessObject.name }}</h3>
        <h4 class="card-title">{{ businessObject.description }}</h4>
        <h4 class="card-title">{{ businessObject.address }}</h4>
        <h4 class="card-title">{{ businessObject.contactInfo }}</h4>
        <h4 class="card-title">{{ businessObject.approved }}</h4>
        <div class="row">
            <button v-on:click="approve" class="btn btn-success offset-md-1" v-if="!businessObject.approved">Approve</button>
        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
    export default {
        props: ['businessObject'],
        name: 'businessRequestViewCard',
        data() {
            return {}
        },
        methods: {
            approve: function(e) {
                e.preventDefault();
                this.$http.post('http://localhost:8080/business/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function(res) {
                        console.log(res);
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            // TODO success
                        }
                    }, function(res) {
                        console.log("error");
                    });
            },
            
            reject: function(e){
                e.preventDefault();
                this.$http.post('http://localhost:8080/admin/removeActivity', {
                        activityId: this.activity._id
                    })
                    .then(function(res) {
                        console.log(res);
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