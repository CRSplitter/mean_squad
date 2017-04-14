<template>
  <div>
      <h2>{{ activity.name }}</h2>
      <p>{{ activity.description }}</p>
  </div>
</template>

<script>
export default {
  props:[activity],
  name: 'ActivityCard',
  data () {
    return {
    }
  }
}
</script>
