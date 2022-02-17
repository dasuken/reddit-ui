<template>
  <div class="home">
    <div class="img-list pb-4 flex justify-center">
      <div v-for="team in teams" :key="team.name" class="flex items-center">
        <img :src="team.thumbnail" class="mr-4" width="75px">
        <span class="font-black text-xl text-gray-300">{{ team.name }}</span>
      </div>
    </div>
    <post-list :subreddit_name="subreddit_name" />
  </div>
</template>

<script>
import PostList from '../components/PostList.vue'
import { reactive, ref } from "@vue/composition-api"
export default {
  name: 'Subreddit',
  components: {
    PostList
  },
  setup() {
    const teams = reactive([{
      thumbnail: require("@/assets/WAS_logo2.png"),
      name: "washingtonwizards"
    }])

    const selectTeam = (team_name) => {
      subreddit_name.value = team_name
    }

    const subreddit_name = ref("washingtonwizards")

    return {
      teams,
      subreddit_name,
      selectTeam
    }
  }
}
</script>
