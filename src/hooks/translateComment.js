import axios from '@/axios.js';

const translateComment = async (id, post_id, body) => {
  try {
    const { data } = await axios.post('/comments/translate', {
        id,
        post_id,
        body
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export default translateComment