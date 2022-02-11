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
        :score="post.score"
        :url="post.url"
      />
    </div>
    <!-- <div class="flex justify-center" v-if="fetchable">
      <button class="bg-yellow-500 hover:bg-yellow-700 text-gray-200 font-bold py-2 px-4 rounded inline-flex items-center" @click="fetchMore">
        <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
        <span>もっとみる</span>
      </button>
    </div>
    <div class="flex justify-center" v-else>
      <button class="text-gray-200 font-bold py-2 rounded inline-flex items-center" @click="fetchMore">
        <svg class="fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M14.238 15.348c.085.084.085.221 0 .306-.465.462-1.194.687-2.231.687l-.008-.002-.008.002c-1.036 0-1.766-.225-2.231-.688-.085-.084-.085-.221 0-.305.084-.084.222-.084.307 0 .379.377 1.008.561 1.924.561l.008.002.008-.002c.915 0 1.544-.184 1.924-.561.085-.084.223-.084.307 0zm-3.44-2.418c0-.507-.414-.919-.922-.919-.509 0-.923.412-.923.919 0 .506.414.918.923.918.508.001.922-.411.922-.918zm13.202-.93c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-5-.129c0-.851-.695-1.543-1.55-1.543-.417 0-.795.167-1.074.435-1.056-.695-2.485-1.137-4.066-1.194l.865-2.724 2.343.549-.003.034c0 .696.569 1.262 1.268 1.262.699 0 1.267-.566 1.267-1.262s-.568-1.262-1.267-1.262c-.537 0-.994.335-1.179.804l-2.525-.592c-.11-.027-.223.037-.257.145l-.965 3.038c-1.656.02-3.155.466-4.258 1.181-.277-.255-.644-.415-1.05-.415-.854.001-1.549.693-1.549 1.544 0 .566.311 1.056.768 1.325-.03.164-.05.331-.05.5 0 2.281 2.805 4.137 6.253 4.137s6.253-1.856 6.253-4.137c0-.16-.017-.317-.044-.472.486-.261.82-.766.82-1.353zm-4.872.141c-.509 0-.922.412-.922.919 0 .506.414.918.922.918s.922-.412.922-.918c0-.507-.413-.919-.922-.919z"/></svg>
        <span>redditでみる</span>
      </button>
    </div> -->
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import PostCard from "../components/PostCard.vue";
import getPosts from "@/hooks/getPosts.js"

export default {
  name: "PostList",
  components: {
    PostCard,
  },
  setup() {
    const { posts, error, load } = getPosts()
    let subreddit = ref("washingtonwizards");
    onMounted(async() => {
      await load(subreddit.value, 7)
    })

    return {
      posts,
      error,
    };
  },
};
</script>
