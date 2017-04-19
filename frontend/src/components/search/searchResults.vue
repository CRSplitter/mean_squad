<template lang="html">
  <div class="">
    {{searchContent}}
    <!-- <div v-if="searchType=='activity'">
      <div v-for= "activity in searchContent">
        <activityCard :activity="activity"></activityCard>
      </div>
    </div> -->
  </div>
</template>

<script>
import ActivityCard from '../activityCard'
var URL = require('../env.js').HostURL;
export default {
  props: [
    'searchType',
    'content'
  ],
  data() {
    return {
      errors: [],
      searchContent:''
    }
  },
  components: {
      activityCard : ActivityCard
   },
  mounted(){
    if(this.searchType=='business') {
      console.log('business search');
      this.$http.get(URL + '/search/businesses/?q=' + this.content)
      .then(function(res){
        if(res.body.errors){
          console.log(res.body.errors);
          this.erros = res.body.errors;
        }
        console.log(res.body.data);
        this.searchContent=res.body.data;
      }).catch(function(err){
        console.log(err);
      });
    } else {

      console.log('activity search');
      this.$http.get(URL + '/search/activities/?q=' + this.content)
      .then(function(res){
        if(res.body.errors){
          console.log(res.body.errors);
          this.errors = res.body.errors;
        }
        console.log(res.body.data);
        this.searchContent=res.body.data;
      }).catch(function(err){
        console.log(err);
      });
    }

  }


}
</script>

<style lang="css">
</style>
