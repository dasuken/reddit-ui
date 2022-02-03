<template>
  <article class="post-card grey-300 bg-gray-100">
    <div class="overflow-hidden">
      <div class="px-4 py-3">

        <!-- author info -->
        <p class="author text-gray-500 text-sm mb-2">
          {{ author }}
        </p>

        <div>
          <div class="text-gray-700 text-sm font-semibold pl-3 border-l-2 border-gray-300">

            <!-- body messages -->
            <div class="content mb-2">
              <p v-if="isJPN">{{ body_jpn }}</p>
              <p v-else>{{ body }}</p>
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
                >⬆︎ {{ ups }}</span
              >
              <button
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
              >
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
    <div v-if="isOpened">
      <comment-card
        v-for="comment in formattedReplies"
        :key="comment.id"
        :body="comment.body"
        :ups="comment.ups"
        :author="comment.author"
        :replies="comment.replies"
        class="ml-7"
      ></comment-card>
    </div>
  </article>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
import CommentCard from "@/components/CommentCard.vue";
import translate from '@/hooks/translate'

export default {
  props: ["body", "ups", "author", "replies"],
  components: {
    CommentCard,
  },
  setup(props) {
    const isOpened = ref(false);
    const toggleReplies = () => (isOpened.value = !isOpened.value);
    const formattedReplies = computed(() => {
      return props.replies.data.children.filter(reply => reply.kind == "t1").map(reply => reply.data)
    })

    // 翻訳
    const isJPN = ref(false)
    const body_jpn = ref(null)
    const toggleLanguage = async () => {
      // if current language is english and don't translate yet.
      if (!isJPN.value && body_jpn.value == null) {
        body_jpn.value = await translate(props.body)
      }
      isJPN.value = !isJPN.value
    }

    return {
      isOpened,
      formattedReplies,
      toggleReplies,

      isJPN,
      body_jpn,
      toggleLanguage,
    };
  },
};
</script>
