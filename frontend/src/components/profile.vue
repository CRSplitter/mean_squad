<template>
  <div>
    <link rel="stylesheet" href="/static/profile/css/profile.css" scoped>
    <div v-if="openForm">
      <popUp v-bind:closeFormFun="closeForm"  v-bind:formType="formType"></popUp>
    </div>
    <div class="profile-container">
      <div class="profile-name-pic center">
        <div class="profile-name-pic-box action_border">
          <div class="profile-pic center">
            <img v-if="user.profileImage" src="/static/default/images/defualtPic.png" alt="">
            <img v-else src="/static/default/images/defualtPic.png" alt="">
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
      <tabBar v-bind:formType="formType" v-bind:activities="activities" v-bind:promotions="promotions" v-bind:info="info" v-bind:payments="payments" v-bind:forbidden="forbidden" v-bind:ParentFormType="openFormFun" v-bind:reservations="reservations"
        v-bind:operators="operators" :user="user"></tabBar>
    </div>
  </div>
</template>

<script>
import tabBar from './tabBar'
import popUp from './popUp'
export default {
  name: 'profile',
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
      forbidden:false,
      openForm:false,
      formType:""
    }
  },
  components: {
    tabBar,
    popUp
  },
  methods: {
    openFormFun: function(type) {
      this.openForm = true
      console.log(type)
    },
    closeForm:function(){
      this.openForm = false
    },
    //for business
    getBusinessActivities: function (business) {
      this.$http.get('http://localhost:8080/activities/' + business._id).then(function (response) {
        if (response.data.msg == "Activities found") {
          this.activities = response.data.data.activities;
        }
      })
    },
    getBusinessPromotions: function (business) {
      this.$http.get('http://localhost:8080/' + business._id + '/promotions').then(function (response) {
        if (response.data.msg == "Promotions found") {
          this.promotions = response.data.data.promotions;
        } else {
          this.promotions = [];
        }
      })
    },
    getBusinessOperators: function (business) {
    },
    //for operator
    getBusinessReservationsForOperator: function () {
      this.reservations = []
      this.$http.get('http://localhost:8080/businessOperator/reservations/').then(function (response) {
        if (response.data.error == "Unauthorized to access please login as businessOperator") {
          this.forbidden = true
				}
        if (response.data.msg == 'Reservations retirieved successfully') {
          this.reservations = response.data.data.reservations;
        }
      })
    },
    getBusinessActivitiesForOperator: function () {
      this.activities = []
      this.$http.get('http://localhost:8080/businessOperator/activities/').then(function (response) {
        if (response.data.msg == 'Activities retirieved successfully') {
          this.activities = response.data.data.activities;
        }
      })
    },
    getBusinessPaymentsForOperator: function () {
      this.payments = []
      this.$http.get('http://localhost:8080/businessOperator/payments/').then(function (response) {
        if (response.data.msg == 'Payments retirieved successfully') {
          this.payments = response.data.data.payments;
        }
      })
    },
    getBusinessPromotionsForOperator: function () {
      this.promotions = []
      this.$http.get('http://localhost:8080/businessOperator/viewpromotions').then(function (response) {
        console.log(response)
        if (response.data.msg == 'Promotions retirieved successfully') {
          this.promotions = response.data.data.promotions;
        }
      })
    },
    //client
    getBusinessReservationsForClient: function () {
      this.reservations = []
      this.$http.get('http://localhost:8080/client/viewReservations/').then(function (response,error) {
        if (response.data.msg == 'Reservations retrieved') {
          this.reservations = response.data.data.reservations;
        }
      },function(error){
        this.forbidden = true
      })
    },
  },
  created: function () {
    var username = this.$route.params.username

    this.$http.get('http://localhost:8080/user/getuserbyusername?username=' + username)
      .then(function (response) {
                    console.log(response)

        if (response.data.data[0]) {
          this.user = response.data.data[0];
        } else {
          console.log("Error 404 ");
        }
        if (this.user.userType == "Business") {
          this.$http.get('http://localhost:8080/business/' + username).then(function (response) {
            console.log(response)
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
      }, function (response) {
        console.log("error happened with http");
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
