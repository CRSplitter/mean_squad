<template>
    <div class="container">
         <img :src="logo" alt="Promotion Image">
        <!--<h2 v-if="(promotion) && (promotion.activityId) && (promotion.activityId.businessId)"> {{promotion.activityId.businessId.name}} </h2> -->
        <!--<button v-if="hasAccess" @click="edit">Edit</button>-->

        <!-- check maarek's route //remove edit then-->
        <!--<router-link v-if="hasAccess" :to=" '/' + promotion._id" class="btn btn-success">Edit</router-link>-->
        <button v-if="hasAccess" class="btn btn-danger" @click="remove">Delete</button>

        <div v-if="errors.length > 0">
            <div class="alert alert-danger" role="alert">
                <strong>Oh snap!</strong>
                <div v-for="error in errors">
                    {{error.type}} : {{ error.msg }}
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    var url = require('./env.js').HostURL;

    export default {
        props: ['promotion'], 
        name: 'PromotionCard',
        data() {
            return {
                loggedInUser: {
                    userType: localStorage.getItem('userType'),
                    username: localStorage.getItem('user'),
                    user: JSON.parse(localStorage.getItem('userObj'))
                },       
                userId: '',         
                hasAccess: false,
                errors: [],
                activity: undefined, //activity of this promotion card
                businessId: '', //businessId of this ^ activity
                logo: '/static/default/images/defaultPic.png'
            };
        },
        methods: {
            edit: function(e){
                e.preventDefault();
                this.$http.post(url+ '/business/editPromotion',
                {
                    promotionId: this.promotion._id
                })
                .then(function(res){
                    console.log(res);
                    if(res.body.errors) {//result callback
                            this.errors = res.body.errors;
                    }else {//TODO success
                        console.log("redirecting to edit form");
                    }
                }, function(res){//error callback
                        console.log("err: " +res);    
                    });
            },
            remove: function(e){
                e.preventDefault();
                this.$http.post(url+ '/business/removePromotion', 
                {
                    promotionId: this.promotion._id
                })
                .then(function(res){
                    console.log(res);
                    if(res.body.errors){
                        this.errors = res.body.errors;
                    }else {//TODO success
                        console.log("Promotion Removed");          
                    }
                },function(res){
                        console.log("ERROR" + res);
                    });
            }       
        },
        created: function() {
            if(this.loggedInUser.user){
                this.userId = this.loggedInUser.user._id;
            }

            if(this.promotion.image){
                this.logo = this.promotion.image;
            }

            //when given an activity id return an activity object //bec. view My promotions msh shaghala fal activity msh populated
            this.$http.get(url + '/activity/' + this.promotion.activityId)
            .then(function(activityRes){
                if(activityRes.body.errors){
                    this.errors = activityRes.body.errors;
                }else{
                    this.activity = activityRes.body.data.activity;

                    this.$htttp.get(url+ '/busienss/byid/'+ this.activity.businessId)
                    .then(function(businessRes){
                        if(businessRes.body.errors){
                            this.errors = businessRes.body.errors;
                        }else{//TODO SUCCESS     
                            this.businessId = businessRes.body.data.business._id;
                            console.log("BUSINES ID IS" + businessId);

                            if(this.userId == this.businessId.userId){
                                console.log("logged in user id is : " + this.userId);
                                console.log("user id of business that owsnt this promotion is " + this.businessId.userId);
                                this.hasAccess = true;
                                }else {
                                    this.hasAccess = false; //ehtyaty
                                }
                            }
                    }, function(businessRes){
                        console.log("error getting business id" + businessRes);
                        //TODO ERROR HANDLING
                    });
                }
            }, function(activityRes){
                    console.log("error getting activity obj: " + activityRes);
            });
        }
    }
</script>

<style scoped>
    </style>