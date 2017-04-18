<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <img :src=businessOperator.userId.profileImage alt="profile picture">
        <h3 class="card-title">{{ businessOperator.name }}</h3>
        <div class="row">
            <button v-on:click="view" class="btn btn-success offset-md-1">view</button>
        </div>
      </div>
    </div>

    </div>
</div>
</template>

<script>
    export default {
        props: ['businessOperator'],
        name: 'BusinessOperatorCard',
        data() {
            return {}
        },
        methods: {
            view: function() {}
        }
    }
</script>
