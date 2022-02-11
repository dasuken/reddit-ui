import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import './assets/fontawesome-free/css/all.min.css'

import VueGtag from "vue-gtag"

import VueCompositionApi from '@vue/composition-api';
Vue.use(VueCompositionApi);
Vue.use(VueGtag, {
  config: { id: "G-ZL8HYW9VXV" }
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
