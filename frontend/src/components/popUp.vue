<template>
  <div>
    <div class="pop-form-container">
      <div class="filter" v-on:click='close()'>
      </div>
      <div class="form-card-box center">
        <div class="form-card box-shadow center">
          <div v-if="formType=='reservationForm'">
            <reservationForm :close="closeFormFun" :activity='activity'>

            </reservationForm>
          </div>
          <div v-if="formType=='paymentForm'">
            <paymentForm :close="closeFormFun" :reservation='reservationPaymentObject'>

            </paymentForm>
          </div>

          <div v-if="formType=='promotionForm'">
            <promotionForm :close="closeFormFun" :activity='activityObjectPromotionForm' :appendPromotion="appendPromotion">

            </promotionForm>
          </div>
          <div v-if="formType=='activityForm'">
            <activityForm :close="closeFormFun" :businessID='business._id' :appendActivity="appendActivity">
            </activityForm>
          </div>
          <div v-if="formType=='businessEditForm'">
            <businessEdit :close="closeFormFun" :business='business'>
            </businessEdit>
          </div>

          <div v-if="formType=='editActivity'">
            <editActivity :close="closeFormFun" :activity='activity' :business='businessObject'>
            </editActivity>
          </div>

          <div v-if="formType=='addTiming'">
            <addTiming :close="closeFormFun" :activity='activity'>

            </addTiming>
          </div>
          <div v-if="formType=='activityEditForm'">
            <editActivity :close="closeFormFun" :activity='activityEditObject' :business='activityEditObject.businessId'>

            </editActivity>
          </div>
          <div v-if="formType=='promotionEditForm'">
            <editPromotion :close="closeFormFun" :promotion='promotionEditObject' :activity='promotionEditObject.activityId'></editPromotion>

          </div>
          <div v-if="formType=='clientEditForm'">
            <clientEditForm :close="closeFormFun" :clientUsername="clientEditUsername"></clientEditForm>
          </div>
          <div v-if="formType=='operatorForm'">
            <h2>Add Business Operator</h2>
            <br>
            <registerForm formType="Business Operator" :close="closeFormFun"></registerForm>
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
  import clientEditForm from './clientEditForm'
  import registerForm from './registerForm'






  export default {
    props: ['formType', 'closeFormFun', 'activityObjectPromotionForm', 'reservationPaymentObject', 'business',
      'activity', 'activityEditObject', 'promotionEditObject', 'clientEditUsername',
      'appendActivity', 'appendPromotion'
    ],
    name: 'popUp',
    data() {
      return {}
    },
    components: {
      reservationForm: reservationForm,
      paymentForm: paymentForm,
      addTiming: addTiming,
      promotionForm: promotionForm,
      activityForm: activityForm,
      businessEdit: businessEdit,
      editActivity: editActivity,
      editPromotion: editPromotion,
      clientEditForm: clientEditForm,
      registerForm: registerForm
    },
    methods: {
      close: function () {
        this.closeFormFun()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>