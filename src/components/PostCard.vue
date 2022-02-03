<template>
  <article class="post-card p-1 mb-5 border border-gray-500 shadow-lg grey-300 bg-white rounded-md">
    <div class="">
      <div class="px-6 py-4">
        <router-link :to="`/posts/${id}`">
          <div class="font-black text-xl mb-1 text-gray-600">{{ title }}</div>
          <div class="font-bold text-xl mb-4 text-blue-600">(ウィザーズの出席率はここ)</div>
        </router-link>
        <p class="text-gray-700 text-sm">{{ formattedSelftext }}</p>
        <div class="text-gray-700 text-sm">
          <div v-html="unescapedSelftext"></div>
        </div>
      </div>
      <div v-if="isImg" class="flex justify-center mb-3">
        <img :src="url_overridden_by_dest" class="md:max-w-md w-full" alt="">
      </div>
      <div v-else-if="isTwitter" class="mb-3 px-6">
        <a :href="url_overridden_by_dest" class="text-blue-500 border-b border-blue-700">{{ url_overridden_by_dest }}</a>
      </div>
      <div class="px-4 pb-2">
        <span class="inline-block  px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">👍 {{ ups }}</span>
        <span class="inline-block  px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">💬 {{ num_comments }}</span>
      </div>
    </div>
  </article>
</template>

<script>
import { computed } from "@vue/composition-api"
// import translate from '@/hooks/translate'

export default {
  props: ["id", "title", "selftext", "selftext_html", "num_comments", "ups", "name", "url_overridden_by_dest", "media"],
  setup(props) {
    // self text
    const formattedSelftext = computed(() => {
      if (props.selftext && props.selftext.length > 300) {
        return props.selftext.substr(0, 300) + '...'
      }
      return props.selftext
    })

    const escapeHTML = (target) => {
      if (typeof target !== 'string') return target;

      var patterns = {
        '&lt;'   : '<',
        '&gt;'   : '>',
        '&amp;'  : '&',
        '&quot;' : '"',
        '&#x27;' : '\'',
        '&#x60;' : '`'
      };

      return target.replace(/&(lt|gt|amp|quot|#x27|#x60);/g, function(match) {
        return patterns[match];
      });
    };


    const unescapedSelftext = computed(() => {
      if (props.selftext_html == null) {
        return ""
      }
      return escapeHTML(props.selftext_html)
    })

    // translate title
    // const title_jp = ref(null)
    // onMounted(async() => {
    //   title_jp.value = await translate(props.title)
    // })

    // validators
    const isImg = computed(() => {
      if (props.url_overridden_by_dest != null && props.media == null) {
        return true
      }

      return false
    })
    const isTwitter = computed(() => {
      if (props.media && props.media.type == "twitter.com") {
        return true
      }

      return false
    })

    return {
      unescapedSelftext,
      formattedSelftext,

      // 翻訳
      // title_jp,

      // validators
      isImg,
      isTwitter,
    }
  }
}
</script>
