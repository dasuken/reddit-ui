import axios from '@/axios.js';

const translatePost = async (id, title, body) => {
  try {
    const { data } = await axios.post('/posts/translate', {
        id,
        title,
        body
    })

    return data
  } catch (error) {
    console.log(error)
  }
}

export default translatePost