<template>
  <div>
      <div class="container">


          <hr>

          <reservationCard v-bind:reservation="reservation"></reservationCard>

      </div>

  </div>
</template>
<script>

    var URL = require('./env.js').HostURL;
    import reservationCard from './reservationDetailedView';

    export default {
        name: 'ReservationDetails',
        components: {
            reservationCard: reservationCard
        },
        data() {
            return {
                reservation: null,
                msg: '',
                errors: null
            }
        },
        created() {
            var context = this;

            this.$http.get(URL + '/activity/reservation/' + this.$route.params.id)
                .then(function (response) {
                    if (response.data.errors) {
                        console.log("responded with errors");
                    }
                    console.log(response.data.msg);
                    console.log(response.data.data);
                    this.reservation = response.data.data;

                }, function (response) {
                    console.log("error happened with http");
                });
        }

    }
</script>