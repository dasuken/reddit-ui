<template>
  <article class="post-card grey-300 bg-gray-100 rounded-sm mb-2">
    <div class="overflow-hidden">
      <div class="px-5 py-3">

        <!-- author info -->
        <p class="author text-gray-600 text-sm mb-4">
          <span class="incline-block mr-5">
            {{ author }}
          </span>
          <span class="text-gray-400 text-xs inline-block">
            {{created_utc}}
          </span>
        </p>

        <div>
          <div class="text-gray-700 text-sm font-semibold pl-3 border-l-2 border-gray-300">

            <!-- body messages -->
            <div class="content mb-2">
              <p class="font-bold pb-4">{{ body_ja }}</p>
              <p class="text-gray-500">{{ body }}</p>
            </div>

            <!-- under labels -->
            <div class="labels">
              <span
                class="
                  inline-block
                  text-sm
                  font-semibold
                  text-gray-700
                  mr-2
                  mb-2
                "
                >⬆︎ {{ score }}</span
              >
              <!-- <button
                class="
                  inline-block
                  pl-3
                  text-sm
                  font-semibold
                  text-gray-700
                  border-black
                  mb-2
                "
                @click="toggleLanguage"
                >翻訳</button
              > -->
              <button
                class="
                  inline-block
                  pl-3
                  text-sm
                  font-semibold
                  text-blue-500
                  mr-2
                  mb-2
                "
                v-if="!!replies"
                @click="toggleReplies"
              >
                返信を見る
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div v-if="isReplyOpened">
      <comment-card
        v-for="comment in replies"
        :key="comment.id"
        :body="comment.body"
        :score="comment.score"
        :author="comment.author"
        :replies="comment.replies"
        class="ml-7"
      ></comment-card>
    </div>
  </article>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api";
import CommentCard from "@/components/CommentCard.vue";
import translateComment from '@/hooks/translateComment.js'

export default {
  name: "comment-card",
  props: ["id", "post_id", "body", "score", "author", "created_utc", "replies"],
  components: {
    CommentCard,
  },
  setup(props) {
    const isReplyOpened = ref(false);
    const toggleReplies = () => (isReplyOpened.value = !isReplyOpened.value);
    // 翻訳
    const body_ja = ref(null)
    onMounted(async () => {
      const tmp = await translateComment(props.id, props.post_id, props.body)
      body_ja.value = tmp.body_ja
    })

    return {
      isReplyOpened,
      toggleReplies,

      body_ja,
    };
  },
};
</script>
