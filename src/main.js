// main.js的作用是：
// 把所有的资源集中在一起，交给webpack方便打包
// 同时将顶层的App.vue组件挂载到index.html上
import './css/main.css'
import Vue from 'vue'
import App from './components/App.vue'
import {time} from './filters.js'

//注册filter
Vue.filter('time', time);

//挂载到index.html
new Vue({
    el: '#app',
    components: { App }    
});
