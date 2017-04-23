<template>
  <div>
    <div v-if="type=='business'" class="center">
        <h4>
            Businesses
        </h4>
    </div>
    <div v-if="type=='activity'" class="center">
        <h4>
            Activities
        </h4>
    </div>
    <div v-if="type=='promotion'" class="center">
        <h4>
            Promotions
        </h4>
    </div>
    <div class="center drop-box ">
        <select class="form-control drop backgroudcolor1" v-model="type">
                        <option value="business">
                          Business
                        </option>
                        <option value="activity">
                          Activity
                        </option>
                        <option value="promotion">
                          Promotion
                        </option>
        </select>
    </div>
    <div v-if="type=='business'">
        <businessPage></businessPage>
    </div>
    <div v-if="type=='activity'">
        <activityPage></activityPage>
    </div>
    <div v-if="type=='promotion'">
        <promotionPage></promotionPage>
    </div>
  </div>
</template>

<script>

  import businessPage from './businessesPage'
  import activityPage from './activitiesPage'
  import promotionPage from './promotionsPage'


  export default {
      props: [],
      name: 'home',
      data() {
          return {
              type: 'business'
          }
      },

      components: {
          businessPage,
          activityPage,
          promotionPage
      },
      created: function () {}

  }

</script>
<style scoped>
.drop-box{
    position: relative;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
    	animation-name: example;
    	animation-duration: 0.75s;
}
h4{
   -webkit-animation-name: example; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
    	animation-name: example;
    	animation-duration: 0.75s; 
}
@keyframes example {
    from {transform: translateY(-200px);
		opacity: 0;
	}
    to {transform: translateY(0);
		opacity: 1;}
    }

</style>