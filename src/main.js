import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import './sass/main.sass'

Vue.config.productionTip = false

Vue.component('NavLine', () => import('./components/NavLine'))
Vue.component('LoginForm', () => import('./components/LoginForm'))
Vue.component('ChatWindow', () => import('./components/ChatWindow'))

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
