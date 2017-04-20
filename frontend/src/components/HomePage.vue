<template>
  <div>

    <h1>Home</h1>
<<<<<<< HEAD
   <!-- <addTimingForm> </addTimingForm>
    <businessCard :business=business></businessCard>-->
    <!--v-bind: business(defined in props of child component) = business(data model property)
    <promotionCard :promotion="promotion"></promotionCard>-->
    <activityDetails></activityDetails>


=======
    <businessCard :business=business></businessCard>
    <!--v-bind: business(defined in props of child component) = business(data model property)-->
    <promotionCard :promotion=promotion></promotionCard>
    <paymentCard :payment = payment> </paymentCard>
>>>>>>> ab21a9fe1229e31d56b14cce4f09e524bb7d3242
  </div>
</template>

<script>
  import paymentCard from './paymentCard';
  import businessCard from './businessCard';
  import promotionCard from './promotionCard';
  import addTimingForm from './addTimingForm';
  import activityDetails from '/home/mekladious/Semester6/mean_squad/frontend/src/components/activity/activityDetails';

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
<<<<<<< HEAD
        }
        ,
        //  activity: {
        //    businessId: ,
        //    name: 'Penguin Hugs/',
        //    description: 'creepy',
        //    price: '800',
        //    maxParticipants: 2,
        //    minParticipants: 1,
        //    minAge: 10,
        //    image: ,
        //  },
=======
        },
>>>>>>> ab21a9fe1229e31d56b14cce4f09e524bb7d3242
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
<<<<<<< HEAD
      addTimingForm,
      activityDetails
=======
      paymentCard: paymentCard
>>>>>>> ab21a9fe1229e31d56b14cce4f09e524bb7d3242
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
