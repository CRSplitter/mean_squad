<template>
  <div>
    <link rel="stylesheet" href="/static/userInfo/css/userInfo.css" scoped>
    <div class="userInfo-container">
      <div class="userInfo-box action_border">
        <div v-if="sameUser" class="userInfo-edit">
          <div v-if="!info.username" class="userInfo-edit-box-btn center">
            <button style="width:120px" v-on:click="openForm('operatorForm')" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Add Operator</button>
          </div>

          <div v-if="info.userType == 'Business Operator'" class="userInfo-edit-box-btn center">
            <button style="width:120px" v-on:click="openForm('operatorForm')" type="button" name="button" class="backgroudcolor2 font_medium box_shadow">Edit Business</button>
          </div>
          <div v-if="info.username" class="userInfo-edit-box-btn center">
            <button v-on:click="openForm('userEditForm')" type="button" name="button" class="backgroudcolor3 font_medium box_shadow">Edit</button>
          </div>
          <div v-if="!info.username" class="userInfo-edit-box-btn center">
            <button v-on:click="openForm('businessEditForm')" type="button" name="button" class="backgroudcolor3 font_medium box_shadow">Edit</button>
          </div>
        </div>
        <div v-if="info && info.address" class="userInfo-address">
          <span class="actionfont">Address:</span>
          <br>
          <br>

          <div class="userInfo-data">
            {{info.address}}
          </div>
          <br>

        </div>
        <div v-if="info &&info.description" class="userInfo-description">
          <span class="actionfont">About:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.description}}
          </div>
          <br>

        </div>
        <div v-if="info && info.contactInfo" class="userInfo-contact">
          <span class="actionfont">contact:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.contactInfo}}
          </div>
          <br>
        </div>
        <div v-if="empty" class="userInfo-contact">
          <span class="actionfont">No Info</span>
          <br>
          <br>
          <div class="userInfo-data">
          </div>
          <br>
        </div>
        <div v-if="info && info.username" class="userInfo-username">
          <span class="actionfont">Username:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.username}}
          </div>
          <br>
        </div>

        <div v-if="info && info.name" class="userInfo-username">
          <span class="actionfont">Name:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.name}}
          </div>
          <br>
        </div>

        <div v-if="info && info.email" class="userInfo-email">
          <span class="actionfont">Email:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.email}}
          </div>
        </div>


      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info', 'sameUser','openForm'],
  name: 'userInfo',
  data() {
    return {
      empty: false
    }
  },
  created: function () {
    if (localStorage.user) {
      this.loggedIn = localStorage.user
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
