<template>
  <div>
    <div>
        <businessCard :business = business></businessCard>   
         <!--v-bind: business(defined in props of child component) = business(data model property)-->
      </div>
  </div>
</template>

<script>
  import businessCard from './businessCard';
  export default {
    props:[],
    name: 'HomePage',
    data () {
      return {
          business: {
            name: 'Scuba',
            description: 'gamed',
            avgRating: 2,
            contactInfo: ['scuba@duba', '23443']
          }
        }
      },
    components: {
        businessCard: businessCard
      }
    }
</script>