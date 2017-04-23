<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h2 class="card-title" v-if="business.name"> {{ business.name }}</h2>
        <h4 class="card-title" v-if="business.description">Description: {{ business.description }}</h4>
        <h4 class="card-title"v-if="business.address">Address: {{ business.address }}</h4>
        <h4 class="card-title" v-if="business.contactInfo">Contact Info: {{ business.contactInfo }}</h4>
        <h4 class="card-title">Status: {{ business.approved }}</h4>
        <div class="row" style="text-align: center">
            <button :disabled="disable" v-on:click="accept" class="btn btn-danger offset-md-1"style="display: block; margin: 0 auto;">Accept</button>
            <button :disabled="disable" v-on:click="reject" class="btn btn-danger offset-md-1" style="display: block; margin: 0 auto;">Reject</button>
        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
    var URL = require('./env.js').HostURL;
    export default {
        props: ['business', 'removeBusinessCard'],
        name: 'businessRequestViewCard',
        data() {
            return {
                disable: false
            }
        },
        methods: {
            accept: function(e) {
                this.disable = true;
                e.preventDefault();
                this.$http.post(URL + '/business/' + this.business._id + '/accept', {
                        businessId: this.business._id
                    })
                    .then(function(res) {
                        this.disable = false;
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            this.$swal(
                                'Accepted Business!',
                                'Successfully accepted ' + this.business.name,
                                'success'
                            );
                            this.removeBusinessCard(this.business._id);
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
                            this.removeBusinessCard(this.business._id);
                        }
                    }, function(res) {
                        console.log("error");
                    });
            }
        }
    }
</script>