<template>
  <div>
    <div>
        <business v-bind:business = business></business>   
         <!--v-bind: business(data model prop) = business(component)-->
      </div>
  </div>
</template>

<script>
  import businessViewCard from './businessCard';
  export default {
    props:[],
    name: 'HomePage',
    data () {
      return {
        msg: 'HomePage',
        business: {
          name: 'b-n',
          description: 'b-d',
          avgRating: 5,
          contactInfo: ['email', '23443']
        }, 
        components: {
          business: businessViewCard
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
</style>
