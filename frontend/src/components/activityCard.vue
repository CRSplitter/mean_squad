<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <h3 class="card-title">{{ activity.name }}</h3>
        <h4 class="text-muted"><small>{{ activity.business.name }}</small></h4>
        <p class="card-text">{{ activity.description }}</p>

        <div v-if="user" class="row">
            <button v-if="user.type === 'Client' || user.type === 'Business'" v-on:click="reserve" class="btn btn-success offset-md-1">reserve</button>
            <button v-if="user.type === 'Business'" v-on:click="edit" class="btn btn-primary offset-md-1">edit</button>
            <button v-if="user.type === 'Business'" v-on:click="del" class="btn btn-danger offset-md-1">delete</button>
        </div>
      </div>
    </div>

</div>
</template>

<script>
    var user = localStorage.getItem('user');

    export default {
        props: ['activity'],
        name: 'ActivityCard',
        data() {
            return {
                user: user
            }
        },
        methods: {
            reserve: function() {},
            edit: function() {},
            del: function() {}
        }
    }
</script>
