import './css/main.scss'
import 'csshake/dist/csshake.min.css'
import 'css/textinput/input-text-effect.css'
import Vue from 'vue'
import filters from './filters.js'
import router from './router'
import App from './components/App'
import Loading from 'components/Loading'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
});

// 全局注册Loading组件
Vue.component('Loading', {...Loading });

Vue.config.productionTip = false;

const app = new Vue({
  el: '#app',
  router,
  ...App
})
