import Vue from 'vue'
import App from './App.vue'
//引入 element-ui css 文件
import 'element-ui/lib/theme-chalk/index.css'
//引入 element-ui.js
import '@/plugins/element'
// 引入 mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 注册 mavon-editor
Vue.use(mavonEditor)
//引入 request.js
import {$get, $post, $del} from '@/plugins/request'
//引入路由
import router from '@/router/index'

Vue.prototype.$post = $post
Vue.prototype.$get = $get
Vue.prototype.$del = $del

import highlight from 'highlight.js'
import 'highlight.js/styles/github.css'
//自定义代码高亮指令
Vue.directive('highlight', function (element) {
    const highlightCodes = element.querySelectorAll('pre code')
    highlightCodes.forEach(block => {
        highlight.highlightElement(block)
    })
})

//自定义指令
Vue.directive('rainbow', {
    bind(element) {
        element.style.color = `#${Math.random().toString(16).slice(2, 8)}`
    }
})

//格式化时间函数
Vue.prototype.$formateDate = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    const minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return `${year}-${month}-${day} ${hour}:${minute}`
}

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
