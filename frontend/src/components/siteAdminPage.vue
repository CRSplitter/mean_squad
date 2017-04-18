<template>
    <div>
        <div class="container">
            <div class="row">
                <button v-on:click="viewRequests" class="btn btn-danger">Business requests</button>
                <button v-on:click="addAdmin" class="btn btn-danger">Add admin</button>
                <li v-for="business in pendingBusinesses" v-show="showRequests">
                    <businessRequest :business="business"></businessRequest>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
    import registerForm from './registerForm';
    import businessRequestViewCard from './businessRequestViewCard';

    var URL = require('./env.js').HostURL;

    export default {
        name: 'siteAdminPage',
        data() {
            return {
                pendingBusinesses: [],
                showRequests: false,
                showForm: false
            }
        },
        methods: {
            viewRequests: function(){
                    this.$http.get('http://localhost:8080/admin/viewBusinessRequests')
                .then(function(res){
                    pendingBusinesses= res.data.data.businesses;
                    showRequests = true;
                    showForm = false;
                })
            },
            addAdmin: function(){
               this.$http.get('http://localhost:8080/admin/register')
                .then(function(res){
                    
                    showRequests = false;
                    showForm = true; 
                })
            }
        },
        components: {
            businessRequest: businessRequestViewCard
        }
    }
</script>