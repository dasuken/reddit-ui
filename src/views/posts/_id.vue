<template>
  <div class="mb-10">
    <div v-if="!post">loading...</div>
    <div v-else>
      <post-card
        :id="post.id"
        :title="post.title"
        :selftext_html="post.selftext_html"
        :num_comments="post.num_comments"
        :url_overridden_by_dest="post.url_overridden_by_dest"
        :ups="post.ups"
        :name="post.name"
        :url="post.url"
      />
    </div>
    <comment-card
      v-for="comment in comments"
      :key="comment.id"
      :body="comment.body"
      :ups="comment.ups"
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
