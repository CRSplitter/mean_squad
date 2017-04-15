<template>
  <div>
    <link rel="stylesheet" href="/static/profile/css/profile.css" scoped>
    <div class="profile-container">
      <div class="profile-pop-form">

      </div>
      <div class="profile-name-pic center">
        <div class="profile-name-pic-box action_border">
          <div class="profile-pic center">
            <img  v-if="user.profileImage" src="/static/default/images/defualtPic.png" alt="">
            <img  v-else src="/static/default/images/defualtPic.png" alt="">
          </div>
          <div class="profile-name center actionfont font_medium">
            {{user.name}}
          </div>
        </div>
      </div>

      <div v-if="user.userType=='Business'"  class="profile-business-des center">
        <div class="profile-des">
          {{business.description}}
        </div>
      </div>
    </div>
    <div class="profile-tabbar">
      <tabBar v-bind:activities="activities" v-bind:promotions="promotions" v-bind:info="info" payments="JH" reservations="s" operators="ss" ></tabBar>
    </div>
  </div>
</template>

<script>
import tabBar from './tabBar'
export default {
  name: 'profile',
  data () {
    return {
      user:{},
      business:{},
      activities:["1","2","3"],
      promotions:["1p","2p","3p"],
      info:undefined,
      reservations:undefined,
      payments:undefined,
      operators:undefined
    }
  },
  components:{
    tabBar
  },
  created:function() {
    this.user = {
      email:"email",
      username:"fawzy",
      password: "12345",
      name: "BreakOut",
      userType: "Business",
    };
    if(this.user.userType == "Business"){
      this.business = {
        name : "BreakOut" ,
        userId : "1" ,
        description : "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic" ,
        address : "101 street, maadi, cairo",
        contactInfo:"010089234"
      }
      this.info = this.business
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
