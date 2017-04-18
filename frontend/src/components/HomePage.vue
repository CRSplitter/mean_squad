<template>
  <div>
    <h1>{{msg}}</h1>
    <!--<businessCard :business=business></businessCard>-->
    <!--v-bind: business(defined in props of child component) = business(data model property)-->
    <promotionCard :activity=activity></promotionCard>
  </div>
</template>

<script>
  // import businessCard from './businessCard';
  import promotionCard from './promotionCard';

  export default {
    props: [],
    name: 'HomePage',
    data() {
      return {
        msg: 'Home Page',
        business: {
          userId: '1010', 
          name: 'Scuba',
          description: 'gamed',
          avgRating: 2,
          contactInfo: ['scuba@duba', '23443'],
          latitude: "123456",
          longitude: "12456576"
        },
        activity: {
          // businessId: ,
          name: 'Penguin Hugs',
          description: 'creepy',
          price: '800',
          maxParticipants: 2,
          minParticipants: 1,
          minAge: 10,
          // image: ,
        }
      }
    },
    components: {
        // businessCard: businessCard,
        promotionCard: promotionCard
      }
  }

</script>
