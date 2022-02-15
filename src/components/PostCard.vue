<template>
  <article class="post-card p-1 mb-5 border border-gray-500 shadow-lg grey-300 bg-white rounded-md">
    <div class="">
      <router-link :to="`/posts/${id}`">
        <div class="px-6 py-4">
          <div class="font-black text-xl mb-1 text-gray-600">{{ title_ja }}</div>
          <div class="font-bold text-sm mb-5 text-blue-600">{{ title }}</div>
          <!-- <p class="text-gray-600 text-sm mb-2">{{ body_ja }}</p> -->
          <p class="text-gray-500 font-semibold text-sm">{{ formattedSelftext }}</p>
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
      </router-link>
    </div>
  </article>
</template>

<script>
import { onMounted, computed, ref } from "@vue/composition-api"
import { Tweet } from 'vue-tweet-embed'
import translatePost from '@/hooks/translatePost.js'

export default {
  props: ["id", "title", "selftext", "num_comments", "score", "url"],
  components: {
    Tweet
  },
  setup(props) {
    // self text
    // routerによって挙動変えたい
    const formattedSelftext = computed(() => {
      if (props.selftext && props.selftext.length > 200) {
        return props.selftext.substr(0, 200) + '...'
      }
      return props.selftext
    })

    const title_ja = ref(null)
    const body_ja = ref(null)
    onMounted(async() => {
       const tmp = await translatePost(props.id, props.title, props.selftext)
       title_ja.value = tmp.title_ja
       body_ja.value = tmp.body_ja
    })

    // validator
    const getExt = url => url.split(/[#?]/)[0].split('.').pop().trim()
    const getTwitterID = url => url.split(/[#?]/)[0].split('/').pop().trim()

    const isImg = computed(() => {
      let ext = getExt(props.url)
      if (ext == "jpg" || ext == "png") {
        return true
      }
      return false
    })

    const twitter_id = ref(null)
    const isTwitter = computed(() => {
        const parser = new URL(props.url)
        const host = parser.host
        if (host == "www.twitter.com" || host == "twitter.com") {

          twitter_id.value = getTwitterID(props.url)
          return true
        }

        return false
      }
    )

    return {
      formattedSelftext,
      // translated
      title_ja,
      body_ja,
      // validators
      isImg,
      isTwitter,
      twitter_id,
    }
  }
}
</script>
