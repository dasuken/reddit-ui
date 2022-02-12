<template>
  <div class="mb-10">
    <div v-if="!post">
      <vue-loading type="spin" color="orange" :size="{ width: '100px', height: '100px' }"></vue-loading>
    </div>
    <div v-else>
      <post-card
        :id="post.id"
        :title="post.title"
        :selftext="post.selftext"
        :num_comments="post.num_comments"
        :score="post.score"
        :url="post.url"
      />
    </div>
    <comment-card
      v-for="comment in comments"
      :key="comment.id"
      :id="comment.id"
      :post_id="post.id"
      :body="comment.body"
      :score="comment.score"
      :author="comment.author"
      :created_utc="comment.created_utc"
      :replies="comment.replies"
    ></comment-card>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import CommentCard from "@/components/CommentCard.vue";
import PostCard from "@/components/PostCard.vue";
import getPostAndComments from "@/hooks/getPostAndComments.js";

import { VueLoading } from 'vue-loading-template'

export default {
  components: {
    CommentCard,
    PostCard,
    VueLoading,
  },
  setup(_, context) {
    const route = context.root.$route;
    const { id } = route.params
    const { post, comments, error, load } = getPostAndComments();

    onMounted(async () => {
      await load(id);
    });

    return {
      post,
      comments,
      error,
    };
  },
};
</script>
