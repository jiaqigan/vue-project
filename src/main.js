// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import index from './index'
// 导入 VuePreview 图片预览 插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入格式化时间插件
import moment from 'moment'
// 定义全局过滤器
Vue.filter('dateFormat', function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss"){
  return moment(dataStr).format(pattern);
})



// 导入 vue-resource
import VueResource from "vue-resource"
// 安装 vue-resource
Vue.use(VueResource)
// 设置请求的根路径
Vue.http.options.root = "http://www.liulongbin.top:3005";
// 全局设置post时候的表单数据格式组织形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;
// 导入mui的样式
import "./mui/css/mui.css"
import "./mui/css/icons-extra.css"

// 按需导入 mint-ui 中的组件
// import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
// Vue.component(Header.name, Header);
// Vue.component(Swipe.name, Swipe);
// Vue.component(SwipeItem.name, SwipeItem);
// Vue.component(Button.name, Button);
// Vue.use(Lazyload);

// 完整引入 mint-ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: c => c(index)
})
