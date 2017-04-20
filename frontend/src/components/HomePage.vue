<template>
  <div>

    <h1>Home</h1>
    <businessCard :business=business></businessCard>
    <!--v-bind: business(defined in props of child component) = business(data model property)-->
    <promotionCard :promotion=promotion></promotionCard>
    <paymentCard :payment = payment> </paymentCard>
  </div>
</template>

<script>
  import paymentCard from './paymentCard';
  import businessCard from './businessCard';
  import promotionCard from './promotionCard';
  export default {
    props: [],
    name: 'HomePage',
    data() {
      return {
        business: { 
          name: 'Scuba',
          description: 'gamed',
          avgRating: 2,
          contactInfo: ['scuba@duba', '23443'],
          latitude: "123456",
          longitude: "12456576",
        },
        promotion: {
          activityId: "58f7800d3cb10f26f321103a",
          discountValue: 50
        },
        reservation: {
          totalPrice: 100,
          details: 'v excited',
          countParticipants: 2,
          expirationInHours: 5,
          activityId: '58f7800d3cb10f26f321103a' 
        },
        payment: {
          amount: 100,
          reservationId: reservation._id
        }
      }
    },

    components: {
      businessCard: businessCard,
      promotionCard: promotionCard,
      paymentCard: paymentCard
    },
      created: function() {
        // this.$http.get('http://localhost:8080/business/carsoli22')
        //     .then(function(res){
        //       this.business = res.data.data.business;
        //     }, function(res) {

        //     });
      }

  }

</script>
