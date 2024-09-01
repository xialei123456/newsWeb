import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import { createPinia } from 'pinia'  // 使用 Pinia
const pinia = createPinia()

import store from './store' //使用Vuex 用于登录信息保存

loadFonts()

createApp(App)
  .use(router)
  .use(pinia)
  .use(vuetify)
  .use(store)
  .mount('#app')
