<template>
<div>
    <div class="jumbotron">
        <h2>{{ activity.name }}</h2>
        <h4>{{ activity.business.name }}</h4>
        <p>{{ activity.description }}</p>
    </div>
</div>
</template>

<script>
    export default {
        props: ['activity'],
        name: 'ActivityCard',
        data() {
            return {}
        }
    }
</script>
