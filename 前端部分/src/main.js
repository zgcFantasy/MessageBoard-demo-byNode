import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import App from './App'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUi)

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
