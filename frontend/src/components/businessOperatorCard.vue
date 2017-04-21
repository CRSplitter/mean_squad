<template>
<div>

    <div class="card card-outline-danger text-center">
      <div class="card-block">
        <img :src=businessOperator.userId.profileImage alt="profile picture">
        <h3 class="card-title">{{ businessOperator.name }}</h3>
        <div class="row">
            <router-link :to="'/profile/?username='+businessOperator.userId.username" class="btn btn-primary offset-md-1">View</router-link>
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
        }
    }
</script>
