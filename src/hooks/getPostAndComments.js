import { ref } from '@vue/composition-api';
import axios from '@/axios.js';

const getPostAndComments = () => {
  const post = ref();
  const comments = ref([]);
  const error = ref(null);

  const load = async (postId) => {
    try {
      const { data } = await axios.get(`/post?id=${postId}`)
      post.value = data.post
      comments.value = data.comments
      console.log(comments.value)
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { post, comments, error, load };
};

export default getPostAndComments;
