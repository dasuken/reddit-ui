import axiosBuilder from 'axios';


const axios = axiosBuilder.create({
    baseURL: process.env.VUE_APP_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
})

export default axios;