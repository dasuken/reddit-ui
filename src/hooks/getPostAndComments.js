import { ref } from '@vue/composition-api';
import axios from 'axios';

const getPostAndComments = () => {
  const post = ref();
  const comments = ref([]);
  const error = ref(null);

  const load = async (postId) => {
    try {
      const baseUrl = process.env.VUE_APP_BASE_URL
      const { data } = await axios.get(`${baseUrl}/post?id=${postId}`)
      post.value = data.post
      comments.value = data.comments
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { post, comments, error, load };
};

export default getPostAndComments;
