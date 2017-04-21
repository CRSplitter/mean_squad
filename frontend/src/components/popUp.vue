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

                <div v-if="formType=='promotionForm'">
                  <promotionForm :activity='activityObjectPromotionForm'>
                    
                  </promotionForm>
                </div>  
                <div v-if="formType=='activityForm'">
                 <activityForm :businessID='business._id'>
                 </activityForm>
                </div>
                <div v-if="formType=='businessEditForm'">
                  <businessEdit :business='business'>
                  </businessEdit>
                </div>   

                 <div v-if="formType=='editActivity'">
                  <editActivity :activity='activity' :business= 'businessObject'>

                  </editActivity>
                </div>
                   
                 <div v-if="formType=='addTiming'">
                  <addTiming :activity='activity'>

                  </addTiming>
                </div>
                <div v-if="formType=='activityEditForm'">
                  <editActivity :activity='activityEditObject' :business= 'activityEditObject.businessId'>

                  </editActivity>
                </div>  
                <div v-if="formType=='promotionEditForm'">
                  <editPromotion :promotion='promotionEditObject' :activity='promotionEditObject.activityId'></editPromotion>
                  
                </div>     
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import reservationForm from './reservationForm'
import paymentForm from './Payment'
import promotionForm from './PromotionForm'
import activityForm from './addActivity'
import businessEdit from './business/businessEdit'
import editActivity from './activity/activityEditForm'
import addTiming from './addTimingForm'
import editPromotion from './editPromotion'





export default {
  props:['formType','closeFormFun','activityObjectPromotionForm','reservationPaymentObject','business','activity','activityEditObject','promotionEditObject'],
  name: 'popUp',
  data () {
    return {
    }
  },
  components:{
    reservationForm,
    paymentForm,
    addTiming,
    promotionForm,
    activityForm,
    businessEdit,
    editActivity,
    editPromotion
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
