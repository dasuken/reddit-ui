<template>
  <div class="mb-10">
    <div v-if="!post">loading...</div>
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
      :body="comment.body"
      :score="comment.score"
      :author="comment.author"
      :replies="comment.replies"
    ></comment-card>
  </div>
</template>

<script>
import { onMounted } from "@vue/composition-api";
import CommentCard from "@/components/CommentCard.vue";
import PostCard from "@/components/PostCard.vue";
import getPostAndComments from "@/hooks/getPostAndComments.js";

export default {
  components: {
    CommentCard,
    PostCard,
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
