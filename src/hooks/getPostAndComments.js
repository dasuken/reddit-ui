import { ref } from '@vue/composition-api';
import axios from 'axios';

const getPostAndComments = () => {
  const post = ref();
  const comments = ref([]);
  const error = ref(null);

  const load = async (postId) => {
    try {
      const { data } = await axios.get(`https://www.reddit.com/r/washingtonwizards/comments/${postId}.json?sort=top`)
      data[0].data.children[0].data.id = postId
      post.value = data[0].data.children[0].data
      const commentArray = data[1].data.children
      comments.value = commentArray.filter(c => c.kind == "t1").map(c => c.data)
    } catch (err) {
      error.value = err.message;
      console.log(error.value);
    }
  };

  return { post, comments, error, load };
};

export default getPostAndComments;
