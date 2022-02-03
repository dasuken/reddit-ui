import { ref } from '@vue/composition-api';
import axios from 'axios';

const getPosts = () => {
  const posts = ref([]);
  const error = ref(null);
  const after = ref("");
  const total = ref(null)

  const load = async (limit) => {
    try {
      if (!limit) limit = 5
      const { data } = await axios.get(`https://www.reddit.com/r/washingtonwizards.json?limit=${limit}&after=${after.value}`)
      after.value = data.data.after
      total.value += limit
      posts.value.push(...data.data.children.map(post => {
        return post.data
      }))
    } catch (err) {
      error.value = err.message;
    }
  };

  return { posts, total, error, load };
};

export default getPosts;
