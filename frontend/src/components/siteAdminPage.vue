<template>
    <div>
        <div class="container">
            <div class="row">
                <button @click="viewRequests" class="btn btn-danger">Business requests</button>
                &nbsp;
                <button @click="addAdmin" class="btn btn-danger" data-toggle="modal" data-target="#registerModal">Add admin</button>
                <br>
            </div>
            <div class= "container">
                <br>
                <li style="list-style: none;" v-if="pendingBusinesses.length>0" v-for="business in pendingBusinesses" v-show="showRequests">
                {{business}}
               <businessRequestViewCard :business="business"></businessRequestViewCard>
               <br>
                </li>
              </div>
              <div v-show="showForm">
                <registerPage></registerPage>
              </div>
             
        </div>
    </div>
</template>

<script>
    import registerPage from './registerPage';
    import businessRequestViewCard from './businessRequestViewCard';

    var URL = require('./env.js').HostURL;

    export default {
        props: [],
        name: 'siteAdminPage',
        data() {
            return {
                pendingBusinesses: [],
                showForm: false,
                showRequests: false
            }
        },
        methods: {

            viewRequests: function(e) {
                    e.preventDefault();
                    this.$http.get(URL+'/admin/viewBusinessRequests')
                        .then(function(res) {
                            console.log(res);
                            this.pendingBusinesses = res.data.data.businesses;
                            console.log(res.data.data.businesses);
                            this.showRequests = true;
                            this.showForm = false;
                            
                        }, function(res) {
                            console.log("error");
                        });
                },
                 addAdmin: function() {
                     this.showRequests = false;
                     this.showForm = true;
                 }
        },
        components: {
            businessRequestViewCard: businessRequestViewCard,
            registerPage: registerPage
        }
    }
</script>