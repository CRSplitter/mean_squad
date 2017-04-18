<template>
    <div>
        <div class="container" v-if='adminForm'>
            <div class="row">
                <button @click="viewRequests" class="btn btn-danger">Business requests</button>
                &nbsp;
                <button @click="addAdmin" class="btn btn-danger" data-toggle="modal" data-target="#registerModal">Add admin</button>
                <br>
            </div>
            <div class= "container">
                <br>
                <li style="list-style: none;" v-if="pendingBusinesses" v-for="business in pendingBusinesses" v-show="showRequests">
               <businessRequestViewCard :business="business"></businessRequestViewCard>
               <br>
                </li>
              </div>
              <div v-if='adminForm === true' v-show="showForm">
                <registerPage :adminForm="adminForm"></registerPage>
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
                adminForm: true,
                showRequests: false,
                showForm: false
            }
        },
        methods: {

            viewRequests: function(e) {
                    e.preventDefault();
                    this.$http.get(URL+'/admin/viewBusinessRequests')
                        .then(function(res) {
                            console.log(res);
                            this.pendingBusinesses = res.data.data.businesses;
                            this.showRequests = true;
                            this.showForm = false;
                            
                        }, function(res) {
                            console.log("error");
                        });
                },
                 addAdmin: function() {
                     this.showRequests = false;
                     this.showForm = true;
                     console.log(this.adminForm);
                 }
        },
        components: {
            businessRequestViewCard: businessRequestViewCard,
            registerPage: registerPage
        },
        created: function(){
            this.adminForm=true;
        }
    }
</script>