<template>
  <div>
    <link rel="stylesheet" href="/static/userInfo/css/userInfo.css" scoped>
    <div class="userInfo-container">
      <div class="userInfo-box action_border">
        <div class="userInfo-edit">
          <button type="button" name="button" class="backgroudcolor3 font_medium box_shadow">Edit</button>
        </div>
        <div class="userInfo-address">
          <span class="actionfont">Address:</span>
          <br>
          <br>

          <div class="userInfo-data">
            {{info.address}}
          </div>
        </div>
        <br>
        <div class="userInfo-description">
          <span class="actionfont">About:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.description}}
          </div>
        </div>
        <br>
        <div class="userInfo-contact">
          <span class="actionfont">contact:</span>
          <br>
          <br>
          <div class="userInfo-data">
            {{info.contactInfo}}
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['info'],
  name: 'userInfo',
  data () {
    return {

    }
  },
  created:function() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
