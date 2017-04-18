<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title" v-if="business.name">{{ business.name }}</h3>
        <h4 class="card-title">{{ business.description }}</h4>
        <h4 class="card-title">{{ business.address }}</h4>
        <h4 class="card-title">{{ business.contactInfo }}</h4>
        <h4 class="card-title">{{ business.approved }}</h4>
        <div class="row">
            <button v-on:click="accept" class="btn btn-danger offset-md-1">Accept</button>
            <button v-on:click="reject" class="btn btn-danger offset-md-1">Reject</button>
        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
    var URL = require('./env.js').HostURL;
    export default {
        props: ['business'],
        name: 'businessRequestViewCard',
        data() {
            return {}
        },
        methods: {
            accept: function(e) {
                console.log(this.business.name);
                e.preventDefault();
                this.$http.post(URL + '/business/' + this.business._id + '/accept', {
                        businessId: this.business._id
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

            reject: function(e) {
                e.preventDefault();
                this.$http.post(URL + '/business/' + this.business._id + '/reject', {
                        businessId: this.business._id
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