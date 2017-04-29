<template>
  <div>
    <link rel="stylesheet" href="/static/profile/css/profile.css" scoped>
    <div v-if="openForm">
      <popUp :promotionEditObject='promotionEditObject' :activityEditObject='activityEditObject' :activityObjectPromotionForm='activityObjectPromotionForm'
        v-bind:closeFormFun="closeForm" v-bind:formType="formType" :reservationPaymentObject='reservationPaymentObject' :activity='activityForReservationForm'
        :business='info' :clientEditUsername='this.$route.query.username' :appendActivity="appendActivity" :appendPromotion="appendPromotion"></popUp>
    </div>
    <div class="profile-container content">
       <div class="alert alert-danger actionfont font_small center actionfont" v-if="errors.length > 0">
					{{ errors[0].msg}}
				</div>
        <br/>
      <div class="profile-name-pic center">
       
        <div class="profile-name-pic-box action_border">
          <div class="profile-pic center">
            <img v-if="user.profileImage && !user.facebook && !(user.profileImage.length > 0)" src="/static/default/images/defaultPic.png"
              alt="">
            <img v-if="user.profileImage && !user.facebook && user.profileImage.length > 0" :src="url + '/uploads/' + user.profileImage"
              alt="">
            <img v-if="user.profileImage && user.facebook && user.profileImage.includes('http')" :src="user.profileImage" alt="">
            <img v-if="user.profileImage && user.facebook && !(user.profileImage.includes('http'))" :src="url + '/uploads/' + user.profileImage"
              alt="">
            <img v-if="!user.profileImage" src="/static/default/images/defaultPic.png" alt="">
          </div>
          <div class="profile-name center actionfont font_medium">
            <div v-if="user.name">
              {{user.name}}
            </div>
            <div v-else>
              {{user.username}}
            </div>
          </div>
        </div>
      </div>

      <div v-if="user.userType=='Business'" class="profile-business-des center">
        <div class="profile-des">
          {{business.description}}
        </div>
      </div>
    </div>
    <div class="profile-tabbar">
      <tabBar v-bind:formType="formType" v-bind:activities="activities" v-bind:promotions="promotions" v-bind:info="info" v-bind:payments="payments"
        v-bind:forbidden="forbidden" v-bind:ParentFormType="openFormFun" v-bind:reservations="reservations" v-bind:operators="operators"
        :user="user" :removeActivity="removeActivity" :removePromotion="removePromotion"  :startP="startP" :endP="endP"></tabBar>
    </div>
  </div>
</template>

<script>
  import tabBar from './tabBar'
  import popUp from './popUp'
  var URL = require('./env.js').HostURL;
  export default {
    name: 'profile',
    props:['startP', 'endP'],
    data() {
      return {
        user: {},
        business: {},
        activities: undefined,
        promotions: undefined,
        info: undefined,
        reservations: undefined,
        payments: undefined,
        operators: undefined,
        forbidden: false,
        openForm: false,
        formType: "",
        reservationPaymentObject: {},
        activityObjectPromotionForm: {},
        activityForReservationForm: {},
        activityEditObject: {},
        promotionEditObject: {},
        url: '',
        errors:[]
      }
    },
    components: {
      tabBar: tabBar,
      popUp: popUp
    },
    methods: {
      openFormFun: function (type, object) {
        this.openForm = true
        this.formType = type
        if (this.formType == 'paymentForm') {
          this.reservationPaymentObject = object
        } else if (this.formType == 'promotionForm') {
          this.activityObjectPromotionForm = object
        } else if (this.formType == 'reservationForm') {
          this.activityForReservationForm = object
        } else if (this.formType == 'activityEditForm') {
          this.activityEditObject = object
        } else if (this.formType == 'promotionEditForm') {
          this.promotionEditObject = object
        } else if (this.formType == 'clientEditForm') {

        }
      },
      closeForm: function () {
        this.openForm = false
      },
      appendActivity: function (activityId) {
        // this.startP();

        var context = this;

        this.$http.get(URL + '/activity/' + activityId)
          .then((res) => {
          // this.endP();
            if (res.data.errors) {
              context.errors = res.body.errors;
              return;
            }
            context.activities.push(res.data.data.activity);
          }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      appendPromotion: function (promotion) {
        this.startP();
        var context = this;

        this.$http.get(URL + '/activity/' + promotion.activityId)
          .then((res) => {
          this.endP();
            if (res.data.errors) {
              context.errors = res.body.errors;
              return;
            }
            promotion.activityId = res.data.data.activity;
            context.promotions.push(promotion);
          }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      removePromotion: function (promtoionId) {
        
        this.startP();
        for (var i = 0; i < this.promotions.length; i++) {
          if (this.promotions[i]._id == promtoionId) {
            this.promotions.splice(i, 1);
            break;
          }
        }
        this.endP();
      },
      removeActivity: function (activityId) {
        this.startP();
        for (var i = 0; i < this.activities.length; i++) {
          if (this.activities[i]._id == activityId) {
            this.activities.splice(i, 1);
            break;
          }
        }
        this.endP();
      },
      //for business
      getBusinessActivities: function (business) {
        this.startP();
        var context = this;
        this.$http.get(URL + '/activities/' + business._id).then(function (response) {
          this.endP();
          if (!response.data.errors) {
            this.activities = response.data.data.activities;
          } else {
            this.activities = [];
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      getBusinessPromotions: function (business) {
        this.startP();
        var context = this;
        console.log(localStorage.userType)
        this.$http.get(URL + '/' + business._id + '/promotions').then(function (response) {
          this.endP();
          if (!response.data.errors) {
            this.promotions = response.data.data.promotions;
          } else {
            this.promotions = [];
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      getBusinessOperators: function (business) {},
      //for operator
      getBusinessReservationsForOperator: function () {
        this.startP();
        var context = this;
        this.reservations = []
        this.$http.get(URL + '/businessOperator/reservations/').then(function (response) {
          this.endP();
          if (response.data.error == "Unauthorized to access please login as businessOperator") {
            this.forbidden = true
          }
          if (!response.data.errors) {
            this.reservations = response.data.data.reservations;
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      getBusinessActivitiesForOperator: function () {
        this.startP();
        var context = this;
        this.activities = []
        this.$http.get(URL + '/businessOperator/activities/').then(function (response) {

          this.endP();
          if (!response.data.errors) {
            this.activities = response.data.data.activities;
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      getBusinessPaymentsForOperator: function () {
        this.startP();
        var context = this;
        this.payments = []
        this.$http.get(URL + '/businessOperator/payments/').then(function (response) {
          this.endP();
          if (!response.data.errors) {
            this.payments = response.data.data.payments;
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      getBusinessPromotionsForOperator: function () {
        this.startP();
        var context = this;
        this.promotions = []
        this.$http.get(URL + '/businessOperator/viewpromotions').then(function (response) {

          this.endP();
          if (!response.data.errors) {
            this.promotions = response.data.data.promotions;
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						})
      },
      //client
      getBusinessReservationsForClient: function () {
        this.startP();
        this.reservations = []
        this.$http.get(URL + '/client/viewReservations/').then(function (response, error) {
          this.endP();
          if (!response.data.errors) {
            this.reservations = response.data.data.reservations;
          }
        }, function (error) {
          this.forbidden = true
        })
      }
    },
    created: function () {
        this.startP();
      var username = this.$route.query.username
      this.url = URL;
      var context = this;
      this.$http.get(URL + '/user/getuserbyusername?username=' + username)
        .then(function (response) {

          this.endP();
          if (response.data.data && response.data.data[0]) {
            this.user = response.data.data[0];
          } else {

          }
          if (this.user.userType == "Business") {
            this.$http.get(URL + '/business/' + username).then(function (response) {

             this.endP();
              this.business = response.data.data.business;
              this.info = this.business;
              this.getBusinessActivities(this.business);
              this.getBusinessPromotions(this.business);
              this.getBusinessOperators(this.business);
            })
          } else if (this.user.userType == "Business Operator") {
            this.getBusinessReservationsForOperator();
            this.getBusinessActivitiesForOperator();
            this.getBusinessPaymentsForOperator();
            this.getBusinessPromotionsForOperator();
            this.info = this.user;
          } else {
            this.info = this.user;
            this.getBusinessReservationsForClient()
          }
        }, (err) => {
							context.errors = [{msg:"Internal Server Error"}];
						});
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content{
  position: relative;
  width: 100vw;
  justify-content: space-around;
  padding-bottom: 20px;
      background-image: url('/static/default/images/bgPattern.jpg')

}
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
  }

  .profile-container {
    -webkit-animation-name: example;
    /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1s;
    /* Safari 4.0 - 8.0 */
    animation-name: example;
    animation-duration: 1s;
  }

  @keyframes profile {
    from {
      transform: translateY(-200px);
      opacity: 0.5;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style>