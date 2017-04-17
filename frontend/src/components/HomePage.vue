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
        msg: 'HomePage',
        business: {
          name: 'Scuba',
          description: 'gamed',
          avgRating: 2,
          contactInfo: ['scuba@duba', '23443']
        }, 
        components: {
          businessCard: businessCard
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<!--<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>-->
