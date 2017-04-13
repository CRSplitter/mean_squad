<template>
  <div>
    <h1>NavBar Here: Its Working </h1>
    <h2>Try Route  http://localhost:8080/home </h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data () {
    return {
      msg: 'NavBar'
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
