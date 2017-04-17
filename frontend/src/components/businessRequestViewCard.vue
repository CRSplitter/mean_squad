<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title">{{ Business.name }}</h3>
        <h4 class="card-title">{{ Business.description }}</h4>
        <h4 class="card-title">{{ Business.address }}</h4>
        <h4 class="card-title">{{ Business.contactInfo }}</h4>
        <h4 class="card-title">{{ Business.approved }}</h4>
        <div class="row">
            <button v-on:click="accept" class="btn btn-success offset-md-1">Accept</button>
            <button v-on:click="reject" class="btn btn-success offset-md-1">Reject</button>
        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
var URL = require('../env.js').HostURL;
export default {
    props: ['Business'],
    name: 'businessRequestViewCard',
    data() {
        return {}
    },
    methods: {
        accept: function(e) {
            e.preventDefault();
            this.$http.post(URL+'/business/'+this.Business._id+'/accept', {
                    businessId: this.Business._id
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
            this.$http.post(URL+'/business/'+this.Business._id+'/reject', {
                    businessId: this.Business._id
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