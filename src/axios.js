import axiosBuilder from 'axios';


const axios = axiosBuilder.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
})

const env = process.env.VUE_APP_NODE_ENV
if (env == "production") {
  axios.baseURL = process.env.VUE_APP_BASE_URL_PRD
}

export default axios;