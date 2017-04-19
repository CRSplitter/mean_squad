<template>
  <div>
      <div class="container">

          <h3 v-if="activity">Reserve: {{activity.name}}</h3>

          <hr>

          <reservationForm v-bind:activity='activity'></reservationForm>

      </div>

  </div>
</template>

<script>
    import reservationForm from './reservationForm';

    export default {
        props: [],
        name: 'activityPage',
        data() {
            return {
                activity: null
            }
        },
        components: {
            reservationForm: reservationForm
        },
        created: function() {
            this.$http.get('http://localhost:8080/client/viewActivity/58ee30954aef662bec789f23')
            .then(function(res){
                this.activity = res.data.data.activity;
                //console.log(this.activity);
            });
        }
    }
</script>
