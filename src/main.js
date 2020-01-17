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

// 配置vuex（用于vue的状态管理，用来存放需要共享的数据）
// 导入包
import Vuex from 'vuex'
// 注册 vuex 到vue中
Vue.use(Vuex)

// 每次进入网站，都会调用 main.js， 在刚调用的时候，先从本地存储中读取购物车的数据
// 放到 store 中
var cart = JSON.parse(localStorage.getItem('cart') || '[]')

var store = new Vuex.Store({
  state:{
    // state 相当于组件中的 data， 专门用来存储数据
    // 如果想在组件中访问 store 中的数据，必须通过 this.$store.state.xxx 来访问
    cart: cart //将购物车中的商品数据，用数组存储起来
  },
  mutations:{
    // 相当于 methods
    // 注意：如果要操作store中的state值，只能通过mutations提供的方法，才能操作对应的数据
    // 不推荐直接操作state中的数据，因为如果导致数据出现紊乱，不能快速定位到错误的原因，
    // 因为每个组件可能都有操作数据的方法

    //如果组件想要调用mutations中的方法，只能通过 this.$store.commit("方法名")
    // 注意：mutations 的函数参数列表中，最多支持两个参数，其中参数1：是state状态
    // 参数2：通过commit 提交过来的参数
    addToCart(state, goodsinfo){
      // 点击加入购物车，把商品信息保存到cart中
      // 1.如果cart中已经有对应得商品，只需要更新数量
      // 2.如果没有 直接push到cart中

      // 假设在购物车中没有找到对应的商品
      var flag = false;

      // some()找到就停止，不需要forEach遍历
      state.cart.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true; //终止循环
        }
      });

      // 如果循环结束，flag任然为false，直接把goodsinfo push 到 cart中
      if (!flag) {
        state.cart.push(goodsinfo);
      };
      // console.log(state.cart);

      // 当更新 cart 之后，把cart数组存储到本地的 localStorage中
      // 数据必须通过 JSON.stringify 转换成字符串才能保存到 localStorage 中
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    updateGoodsInfo(state, goodsinfo){
      // 修改购物车中商品的数量
      state.cart.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count)
          return true
        }
      })
      // 当修改完商品的数量，把最新的购物车数据，保存到本地存储中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    delFromCart(state, id){
      // 根据id，从store删除对应商品
      state.cart.some((item, i)=> {
        if (item.id === id) {
          state.cart.splice(i, 1)
          return true
        }
      })
      // 将删除完毕后的最新数据保存到本地中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    },
    // info是从结算页面传过来的对象，包含了商品id和是否selected的boolean值
    updateGoodsSelected(state, info){
      state.cart.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected
        }
      })
      // 把最新的购物车商品状态保存到store中
      localStorage.setItem('cart', JSON.stringify(state.cart))
    }

  },
  getters:{
    // 注意：getters只负责对外提供数据，不负责修改数据；修改state数据请使用mutations
    // 如果state中的数据，在对外提供的时候需要左一层包装，那么推荐使用getters，
    // 相当于 computed 或 filters
    // this.$store.getters.方法名

    getAllCount(state){
      var c = 0;
      state.cart.forEach(item => {
        c += item.count;
      })
      return c
    },
    getGoodsCount(state){
      var o = {};
      state.cart.forEach(item => {
        // 把id作为属性的键，count作为值
        o[item.id] = item.count;
      });
      return o;
      // 最终会获取到 count 和 id 之间的对应关系
    },
    getGoodsSelected(state){
      var o = {};
      state.cart.forEach(item => {
        o[item.id] = item.selected;
      });
      return o;
    },
    getGoodsCountAndAmount(state){
      var o = {
        count:0,  //勾选的数量
        amount:0  //勾选的总价
      };
      state.cart.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.count * item.price
        };
      });
      return o;
    }

  }
})

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
  render: c => c(index),
  store //将vuex 创建的store 挂载到vue实例上，只要挂载到了实例中，
  // 任何组件都能够使用store来存取数据
})
