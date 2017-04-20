<template>
  <div>
    <div class="pop-form-container">
        <div class="filter" v-on:click='close()'>
        </div>
        <div class="form-card-box center">
          <div class="form-card box-shadow center">
                <div v-if="formType=='reservationForm'">
                  <reservationForm :activity='activity'>

                  </reservationForm>
                </div> 
                <div v-if="formType=='paymentForm'">
                  <paymentForm :reservation='reservationPaymentObject'>

                  </paymentForm>
                </div>   
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import reservationForm from './reservationForm'
import paymentForm from './Payment'

export default {
  props:['formType','closeFormFun','activity','reservationPaymentObject'],
  name: 'popUp',
  data () {
    return {
    }
  },
  components:{
    reservationForm,
    paymentForm
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
