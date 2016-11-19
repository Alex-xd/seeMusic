import './css/main.css'
import 'font-awesome/css/font-awesome.css'
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
