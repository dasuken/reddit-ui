import Vue from 'vue'
import VueRouter from 'vue-router'
import Subreddit from '../views/Subreddit.vue'
import Post from '../views/posts/_id.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Subreddit',
    component: Subreddit,
  },
  {
    path: '/posts/:id',
    name: 'Post',
    component: Post,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
