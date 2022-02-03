<template>
  <div class="home">
    <post-list />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'

export default {
  name: 'Subreddit',
  components: {
    PostList
  },
  setup() {}
}
</script>
