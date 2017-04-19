<template>
  <div>
    <div class="pop-form-container">
        <div class="filter" v-on:click='close()'>
        </div>
        <div class="form-card-box center">
          <div class="form-card box-shadow center">
                {{formType}}
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['formType','closeFormFun'],
  name: 'popUp',
  data () {
    return {
    }
  },
  methods:{
      close:function(){
          console.log("closed")
          this.closeFormFun()
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
