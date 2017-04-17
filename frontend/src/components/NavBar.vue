<template>
  <div class="container">

    <h1>NavBar</h1>

    <div v-if="!user">
        <button type="button" class="btn btn-danger btn-large" data-toggle="modal" data-target="#registerModal">Register</button>
        <registerPage></registerPage>
    </div>

    <h2>Try this <a href="/home">route</a></h2>

    <router-view></router-view>

  </div>
</template>

<script>
    import RegisterPage from './registerPage';

    var user = localStorage.getItem('user');

    export default {
        name: 'NavBar',
        data() {
            return {
                user: user
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
