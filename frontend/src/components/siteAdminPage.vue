<template>
    <div v-if="userType==='Site Admin'">
        <div class="container">
            <div class="row">
                <button @click="viewRequests" class="btn btn-danger">Business requests</button>
                &nbsp;
                <button @click="addAdmin" class="btn btn-danger" data-toggle="modal" data-target="#registerModal">Add admin</button>
                <br>
            </div>
            <div class= "container">
                <br>
                <li style="list-style: none;" v-if="pendingBusinesses && pendingBusinesses.length>0" v-for="business in pendingBusinesses" v-show="showRequests">
               <businessRequestViewCard :business="business" :removeBusinessCard="removeBusinessCard"></businessRequestViewCard>
               <br>
                </li>
                <div class="actionfont font_small center actionfont" v-if="errors.length>0">{{errors[0].msg}}</div>
            </div>
              <div v-show="showForm">
                <registerPage></registerPage>
              </div>
             
        </div>
    </div>
    <div v-else>
        <unauthorized></unauthorized>
    </div>
</template>

<script>
    import registerPage from './registerPage';
    import businessRequestViewCard from './businessRequestViewCard';
    import unauthorized from './unauthorized'

    var URL = require('./env.js').HostURL;
    var type = localStorage.getItem('userType');

    export default {
        props: ['loadBar'],
        name: 'siteAdminPage',
        data() {
            return {
                pendingBusinesses: [],
                showForm: false,
                showRequests: false,
                userType:'', 
                errors:[],
                formType:"Site Admin"
            }
        },
        methods: {

            viewRequests: function(e) {
                    this.loadBar();
                    e.preventDefault();
                    this.$http.get(URL+'/admin/viewBusinessRequests')
                        .then(function(res) {
                            if(res.data.errors){
                                this.errors=res.data.errors;
                            }else{
                                this.pendingBusinesses = res.data.data.businesses;
                                this.showRequests = true;
                                this.showForm = false;
                            }
                        }, function(res) {
                            
                        });
                },
                 addAdmin: function() {
                     this.loadBar();
                     this.showRequests = false;
                     this.showForm = true;
                 },
                 removeBusinessCard: function(businessId) {
                     this.loadBar();
                    for(var i = 0; i < this.pendingBusinesses.length; i++) {
                        if(this.pendingBusinesses[i]._id == businessId) {
                            this.pendingBusinesses.splice(i, 1);
                            break;
                        }
                    }
                 }
        },
        components: {
            businessRequestViewCard: businessRequestViewCard,
            registerPage: registerPage,
            unauthorized: unauthorized
        }, 
        created:function(){
            this.userType=type
        }
    }
</script>