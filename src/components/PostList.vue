<template>
  <div class="post-list mb-8">
    <div class="text-red" v-if="error">
      {{error}}
    </div>
    <div class="text-white">
      <post-card
        v-for="post in posts"
        :key="post.id"
        :id="post.id"
        :title="post.title"
        :selftext="post.selftext"
        :num_comments="post.num_comments"
        :ups="post.ups"
        :name="post.name"
        :url_overridden_by_dest="post.url_overridden_by_dest"
        :media="post.media"
      />
    </div>
    <div class="flex justify-center" v-if="fetchable">
      <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center" @click="fetchMore">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>もっとみる</span>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "@vue/composition-api";
import PostCard from "../components/PostCard.vue";
import getPosts from "@/hooks/getPosts.js"

export default {
  name: "PostList",
  components: {
    PostCard,
  },
  setup() {
    const { posts, total, error, load } = getPosts()

    onMounted(async() => {
      await load(5)
    })

    const fetchMore = async() => {
      await load(5)
    }

    const fetchable = computed(() => {
      console.log(total.value)
      if (total.value < 20) {
        return true
      }

      return false
    })

    return {
      posts,
      error,
      fetchMore,
      fetchable
    };
  },
};
</script>
