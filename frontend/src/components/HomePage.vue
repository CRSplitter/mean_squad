<template>
  <div>
    <h1>{{msg}}</h1>
    <businessCard :business=business></businessCard>
    <!--v-bind: business(defined in props of child component) = business(data model property)-->
    <promotionCard :promotion=promotion></promotionCard>
  </div>
</template>

<script>
  import businessCard from './businessCard';
  import promotionCard from './promotionCard';

  export default {
    props: [],
    name: 'HomePage',
    data() {
      return {
        msg: 'Home Page',
        business: {
          userId: {profileImage: '/static/img/logo.png' }, 
          name: 'Scuba',
          description: 'gamed',
          avgRating: 2,
          contactInfo: ['scuba@duba', '23443'],
          latitude: "123456",
          longitude: "12456576",
          
        },
        // activity: {
          // businessId: ,
          // name: 'Penguin Hugs/',
          // description: 'creepy',
          // price: '800',
          // maxParticipants: 2,
          // minParticipants: 1,
          // minAge: 10,
          // image: ,
        // },
        promotion: {
          activityId: '',
          discountValue: 50,
          image: '64534233232432',
          details: 'aqwa okazion'
        }
      }
    },
    components: {
      businessCard: businessCard,
      promotionCard: promotionCard
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
