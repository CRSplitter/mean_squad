<template>
    <div class="container">

        <img :src="logo" alt="Promotion Image">

        <button v-if="hasAccess" class="btn btn-success" @click="edit">Edit</button>
        <!--FAWZY POPUP-->
        <editPromotion v-show="(editform)&&(promotion)&&(activity)" :promotion=promotion :activity=activity ></editPromotion>
        
        <button v-if="hasAccess" class="btn btn-danger" @click="remove">Delete</button>

        <div v-if="errors.length> 0">
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
    import editPromotion from './editPromotion';

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
                editform: false, 
                errors: [],
                activity: undefined, //activity of this promotion card
                business: '', //businessId of this ^ activity
                logo: '/static/default/images/defaultPic.png'
            };
        },
        components:{
            editPromotion: editPromotion
        },
        methods: {
            edit: function(e){
                e.preventDefault();
                this.editform = true;
            },
            remove: function(e){
                e.preventDefault();
                this.$http.post(url+ '/business/removePromotion', 
                {
                    promotionId: this.promotion._id
                })
                .then(function(res){
                    // console.log(res.body);
                    if(res.body.errors){
                        this.errors = res.body.errors;
                    }else {//TODO success
                        console.log("Promotion Removed"); 
                        //you can use sweetalert HEREEE         
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
            console.log(this.promotion.activityId);
            //when given an activity id return an activity object //bec. view My promotions msh shaghala fal activity msh populated
            this.$http.get(url + '/activity/' + this.promotion.activityId)
            .then(function(activityRes){//be route gets the activity object of the promotion.activityId
                if(activityRes.body.errors){
                    this.errors = activityRes.body.errors;
                }else{
                    this.activity = activityRes.body.data.activity;

                    this.$http.get(url+ '/business/byid/'+ this.activity.businessId._id)
                    .then(function(businessRes){
                        if(businessRes.body.errors){
                            this.errors = businessRes.body.errors;
                        }else{//TODO SUCCESS     
                            this.business = businessRes.body.data.business;
                            if(this.userId == this.business.userId){
                                this.hasAccess = true;
                                }else {
                                    this.hasAccess = false; 
                                }
                            }
                    }, function(businessRes){
                        console.log("error getting business id" + businessRes);
                        //TODO ERROR HANDLING
                    });
                }
            }, function(activityRes){
                    console.log("error getting activity obj: " + activityRes);
                              //TODO ERROR HANDLING;
            });
        }
    }
</script>

<style scoped>
    </style>