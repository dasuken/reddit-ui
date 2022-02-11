<template>
  <article class="post-card p-1 mb-5 border border-gray-500 shadow-lg grey-300 bg-white rounded-md">
    <div class="">
      <div class="px-6 py-4">
        <router-link :to="`/posts/${id}`">
          <div class="font-black text-xl mb-1 text-gray-600">{{ title }}</div>
          <div class="font-bold text-xl mb-4 text-blue-600">(ウィザーズの出席率はここ)</div>
        </router-link>
        <p class="text-gray-700 text-sm">{{ formattedSelftext }}</p>
      </div>
      <div v-if="isImg" class="flex justify-center mb-3">
        <img :src="url" class="md:max-w-md w-full" alt="">
      </div>
      <div v-else-if="isTwitter" class="mb-3 px-6">
        <a :href="url" class="text-blue-500 border-b border-blue-700">{{ url }}</a>
        <Tweet :id="twitter_id"></Tweet>
      </div>
      <div class="px-4 pb-2">
        <span class="inline-block  px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">👍 {{ score }}</span>
        <span class="inline-block  px-3 py-1 text-md font-semibold text-gray-700 mr-2 mb-2">💬 {{ num_comments }}</span>
      </div>
    </div>
  </article>
</template>

<script>
import { computed, ref } from "@vue/composition-api"
import { Tweet } from 'vue-tweet-embed'
// import translate from '@/hooks/translate'

export default {
  props: ["id", "title", "selftext", "num_comments", "score", "url"],
  components: {
    Tweet
  },
  setup(props) {
    // self text
    // routerによって挙動変えたい
    const formattedSelftext = computed(() => {
      if (props.selftext && props.selftext.length > 500) {
        return props.selftext.substr(0, 500) + '...'
      }
      return props.selftext
    })

    // translate title
    // const title_jp = ref(null)
    // onMounted(async() => {
    //   title_jp.value = await translate(props.title)
    // })

    // validator

    const parser = new URL(props.url)
    const host = parser.host
    const pathname = parser.pathname

    const getExt = url => url.split(/[#?]/)[0].split('.').pop().trim()

    const isImg = computed(() => {
      let ext = getExt(props.url)
      if (ext == "jpg" || ext == "png") {
        return true
      }
      return false
    })

    const twitter_id = ref(null)
    const isTwitter = computed(() => {
        if (host == "www.twitter.com" || host == "twitter.com") {
          var pathArray = pathname.split("/")
          twitter_id.value = pathArray[pathArray.length-1]
          return true
        }

        return false
      }
    )

    return {
      formattedSelftext,
      // validators
      isImg,
      isTwitter,
      twitter_id,
    }
  }
}
</script>
