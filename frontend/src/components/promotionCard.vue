<template>
    <div class="promotionContainer box_shadow" v-if="visible">
        <div class="activityImage center">
            <img v-if="activity.image" :src="url+'/uploads/'+promotion.image">
            <img v-else src="/static/default/images/defaultPic.png">
        </div>
        <div class="promotionWide center actionfont font_small">
            <router-link :to="'/activity/'+promotion.activityId._id" class="font_large actionfont">{{ promotion.activityId.name }}</router-link>
        </div>
        <div class='center discount actionfont'>
            {{promotion.discountValue}}% OFF
        </div>
        <div class='center actionfont'>
            from {{promotion.activityId.price}} LE to {{newVal}} LE
        </div>
        <div v-if="hasAccess" class="btn center">
            <button v-on:click="parentOpenForm('promotionEditForm',promotion)" v-if="hasAccess" class="backgroudcolor3" @click="edit">Edit</button>
        </div>
        <div v-if="hasAccess" class="btn center">
            <button v-if="hasAccess" class="backgroudcolor1" @click="confirmRemove">Delete</button>
        </div>

        <div v-if="loggedInUser.userType == 'Client'" class="btn center">
            <button v-on:click="parentOpenForm('reservationForm',promotion.activityId)" class="backgroudcolor2">Reserve</button>
        </div>

    </div>
</template>

<script>
    var url = require('./env.js').HostURL;
    import editPromotion from './editPromotion';

    export default {
        props: ['promotion', 'parentOpenForm', 'removePromotion'],
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
                logo: '/static/default/images/defaultPic.png',
                newActivity: this.promotion.activityId,
                newActivityUpdated: false,
                newVal: {},
                url: url,
                visible: true
            };
        },
        components: {
            editPromotion: editPromotion
        },
        methods: {
            edit: function (e) {
                e.preventDefault();
                this.editform = true;
            },
            confirmRemove: function () {
                var self = this;
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Yes, Delete!',
                    cancelButtonText: 'No, take me back!',
                    buttonsStyling: true
                }).then(function () {
                    self.remove();
                });
            },
            remove: function () {
                
                var context = this;

                this.$http.post(url + '/business/removePromotion', {
                        promotionId: this.promotion._id
                    })
                    .then(function (res) {
                        if (res.body.errors) {
                            this.errors = res.body.errors;
                        } else {
                            //you can use sweetalert HEREEE 
                            context.visible = false;
                            this.$swal(
                                'Promotion Removed!',
                                'Successfully removed selected promotion',
                                'success'
                            );
                            context.removePromotion(context.promotion._id);
                        }
                    }, function (res) {
                    });
            }
        },
        created: function () {
            this.newVal = this.promotion.activityId.price - ((this.promotion.discountValue / 100) * this.promotion.activityId
                .price)
            this.promotion.activityId.discountValue = this.promotion.discountValue
            if (this.promotion.image) {
                this.logo = this.promotion.image;
            }
            //when given an activity id return an activity object //bec. view My promotions msh shaghala fal activity msh populated
            this.$http.get(url + '/activity/' + this.promotion.activityId._id)
                .then(function (activityRes) { //be route gets the activity object of the promotion.activityId
                    if (activityRes.body.errors) {
                        this.errors = activityRes.body.errors;
                    } else {
                        this.activity = activityRes.body.data.activity;

                        this.$http.get(url + '/business/byid/' + this.activity.businessId._id)
                            .then(function (businessRes) {
                                if (businessRes.body.errors) {
                                    this.errors = businessRes.body.errors;
                                } else { //TODO SUCCESS     
                                    this.business = businessRes.body.data.business;

                                    if (this.loggedInUser.user._id == this.business.userId) {
                                        this.hasAccess = true;
                                    } else {
                                        this.hasAccess = false;
                                    }
                                }
                            }, function (businessRes) {
                                //TODO ERROR HANDLING
                            });
                    }
                }, function (activityRes) {
                    //TODO ERROR HANDLING;
                });
        }
    }
</script>

<style scoped>
    .promotionWide {
        position: relative;
    }

    .promotionContainer {
        position: relative;
        width: auto;
        min-width: 300px;
        height: auto;
        padding: 10px;
        background-color: white;
    }

    .discount {
        position: relative;
        font-size: 40px;
    }

    img {
        position: relative;
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }

    .activityImage {
        position: relative;
        width: 100%;
        height: 120px;
    }

    button {
        position: relative;
        height: 30px;
        border-radius: 20px;
        color: white;
        font-weight: bold;
        width: auto;
        min-width: 100px;
    }

    .btn {
        height: 50px;
    }
</style>