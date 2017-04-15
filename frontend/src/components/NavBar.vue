<template>
  <div class="container">

    <h1>NavBar</h1>

    <button type="button" class="btn btn-danger btn-large" data-toggle="modal" data-target="#registerModal">Register</button>
    <registerPage></registerPage>
    <h2>Try this <a href="/home">route</a></h2>

    <router-view></router-view>

  </div>
</template>

<script>
    import RegisterPage from './registerPage';

    export default {
        name: 'NavBar',
        data() {
            return {
                msg: 'NavBar'
            }
        },
        components: {
            registerPage: RegisterPage
        }

    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h1,
    h2 {
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
