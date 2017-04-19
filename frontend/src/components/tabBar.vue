<template>
  <div>
    <link rel="stylesheet" href="../static/tabbar/css/tabbar.css">
    <div class="tabBar-bar center">
      <div class="tabBar-tabs action_border">
        <div class="tab1-activities tab" v-if="activities"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Activities</button>
          <div v-if="currentTab=='activities'" class="tab-highlight backgroudcolor1"></div>
        </div>
        <div class="tab2-info tab" v-if="info"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Info</button>
          <div v-if="currentTab=='info'" class="tab-highlight backgroudcolor1"></div>
        </div>
        <div class="tab3-promotions tab" v-if="promotions"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Promotions</button>
          <div v-if="currentTab=='promotions'" class="tab-highlight backgroudcolor1"></div>
        </div>
        <div class="tab4-payments tab" v-if="payments"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Payments</button>
          <div v-if="currentTab=='payments'" class="tab-highlight backgroudcolor1"></div>
        </div>
        <div class="tab5-reservations tab" v-if="reservations"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Reservations</button>
          <div v-if="currentTab=='reservations'" class="tab-highlight backgroudcolor1"></div>
        </div>
        <div class="tab6-reservations tab" v-if="operators"><button v-on:click="changeCurrentTab" type="button" name="button" class=" actionfont font_medium">Operators</button>
          <div v-if="currentTab=='operators'" class="tab-highlight backgroudcolor1"></div>
        </div>
      </div>
    </div>
    <div v-if="user.username==loggedInUser" class="form-open center">
      <button v-on:click="ParentFormType('activityForm')" v-if="currentTab=='activities'" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Activity</button>
      <button v-on:click="ParentFormType('promotionsForm')" v-if="currentTab=='promotions'" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Promotion</button>
      <button v-on:click="ParentFormType('operatorForm')" v-if="currentTab=='operators'" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Operator</button>
    </div>
    <div v-if="!forbidden" class="content center">
      <div v-if="currentTab=='activities'" class="activities">
        <div v-for="activity in activities" class="card">
          {{activity}}
        </div>
      </div>
      <div v-if="currentTab=='promotions'" class="promotions">
        <div v-for="promotion in promotions" class="card">
          {{promotion}}
        </div>
      </div>
      <div v-if="currentTab=='info'" class="info">
        <userInfo v-bind:info="info" v-bind:openForm="ParentFormType" :sameUser="user.username==loggedInUser"></userInfo>
      </div>
      <div v-if="currentTab=='payments'" class="promotions">
        <div v-for="payment in payments" class="card">
          {{payment}}
        </div>
      </div>
      <div v-if="currentTab=='reservations'" class="promotions">
        <div v-for="reservation in reservations" class="card">
          <ReservationCard :reservation="reservation"></ReservationCard>
        </div>
      </div>
      <div v-if="currentTab=='operators'" class="promotions">
        <div v-for="operator in operators" class="card">
          {{operator}}
        </div>
      </div>
    </div>
    <div v-else class="content center actionfont">
      Forbidden To View Page Data
    </div>
  </div>
</template>

<script>
import HomePage from './HomePage'
import userInfo from './userInfo'
import ActivityCard from './activityCard'
import ReservationCard from './reservationDetailedView'

export default {
  props: ["activities", "info", "promotions", "payments", "reservations", "user", "operators", "forbidden","ParentFormType"],
  name: 'tabBar',
  data() {
    return {
      currentTab: "info",
      loggedInUser: undefined,
    }
  },
  methods: {
    changeCurrentTab: function (e) {
      var innerText = e.srcElement.textContent;
      this.currentTab = innerText.toLowerCase()
    },
    formType:function(){
      this.ParentFormType()
    }
  },
  components: {
    HomePage,
    userInfo,
    ActivityCard,
    ReservationCard

  },
  created: function () {
    if (localStorage.user) {
      this.loggedInUser = localStorage.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
