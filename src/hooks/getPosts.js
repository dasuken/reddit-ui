import { ref } from '@vue/composition-api';
import axios from '@/axios.js';

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);

  const load = async (text, limit) => {
    try {
      if (!limit) limit = 10
      const { data } = await axios.get(`/posts?subreddit=${text}&limit=${limit}`)
      posts.value.push(...data)
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, error, load };
};

export default getPosts;
