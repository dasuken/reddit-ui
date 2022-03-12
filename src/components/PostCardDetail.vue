<template>
  <article class="post-card p-1 mb-5 border border-gray-500 shadow-lg grey-300 bg-white rounded-md">
    <div class="px-6 py-4">
      <div class="font-black text-xl mb-1 text-gray-600">{{ title_ja }}</div>
      <div class="font-bold text-sm mb-5 text-blue-600">{{ title }}</div>
      <p class="text-gray-600 font-bold text-md mb-2">{{ body_ja }}</p>
      <p class="text-gray-500 text-sm mb-2">{{ selftext }}</p>
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
    const title_ja = ref(null)
    const body_ja = ref(null)

    if (props.title.startsWith('Post Game')) {
      props.selftext = ''
      props.url = 'https://twitter.com/washwizardsjp/status/1502524571903488000'
    }

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
