<template>
  <div>
    <h1>{{msg}}</h1>
    <businessCard :business=business></businessCard>
    <!--v-bind: business(defined in props of child component) = business(data model property)-->
  </div>
</template>

<script>
  import businessCard from './businessCard';
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
        }
      }
    },
    components: {
        businessCard: businessCard
      }
  }

</script>
