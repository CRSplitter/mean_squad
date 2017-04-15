<template>
<div>
    <div class="jumbotron">
        <h2>{{ businessOperator.name }}</h2>
        <img :src=businessOperator.user.profileImage alt="profile picture">
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
