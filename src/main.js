import Vue from 'vue'
import App from './App'
import router from './router'
// 引入index.css
import "./assets/index.css"
import "./assets/iconfont/iconfont.css"
import axios from "axios"
import store from "./store/index"

import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant);


// 解决移动端点击300毫秒延迟的问题
import fastclick from 'fastclick'
fastclick.attach(document.body)

import vuelazyload from "vue-lazyload"
Vue.use(vuelazyload, {
    loading: require('./assets/logo.png')
})

axios.defaults.baseURL = "http://localhost:3000"

Vue.config.productionTip = false



new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})