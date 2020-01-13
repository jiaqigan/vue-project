// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 入口文件
import Vue from 'vue'
import App from './App'
import router from './router'
import index from './index'

// 导入 vue-resource
 import VueResource from "vue-resource"
 // 安装 vue-resource
Vue.use(VueResource)

// 导入mui的样式
import "./mui/css/mui.css"
import "./mui/css/icons-extra.css"

// 按需导入 mint-ui 中的组件
import { Header, Swipe, SwipeItem } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: c => c(index)
})
