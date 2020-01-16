import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/index'

// 导入对应的路由组件
// @ 默认跳转至 .src 文件
import HomeContainer from "@/components/tabbar/HomeContainer"
import MemberContainer from "@/components/tabbar/MemberContainer"
import CartContainer from "@/components/tabbar/CartContainer"
import SearchContainer from "@/components/tabbar/SearchContainer"
import NewList from "@/components/news/NewsList"
import NewsInfo from "@/components/news/NewsInfo"
import PhotoList from "@/components/photos/PhotoList"
import PhotoInfo from "@/components/photos/PhotoInfo"
import GoodsList from "@/components/goods/GoodsList"
import GoodsInfo from "@/components/goods/GoodsInfo"
import GoodsDesc from "@/components/goods/GoodsDesc"
import GoodsComment from "@/components/goods/GoodsComment"

Vue.use(Router)

export default new Router({
  routes: [ //配置路由规则
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'homepage',
      redirect:"/home"
    },
    {
      path: '/home',
      name: 'home',
      component: HomeContainer
    },
    {
      path: '/member',
      name: 'member',
      component: MemberContainer
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartContainer
    },
    {
      path: '/search',
      name: 'search',
      component: SearchContainer
    },
    {
      path: '/home/newslist',
      name: 'newslist',
      component: NewList
    },
    {
      // 为了匹配id，必须加:id
      path: '/home/newsinfo/:id',
      name: 'newsinfo',
      component: NewsInfo
    },
    {
      path: '/home/photolist',
      name: 'photolist',
      component: PhotoList
    },
    {
      path: '/home/photoinfo/:id',
      name: 'photoinfo',
      component: PhotoInfo
    },
    {
      path: '/home/goodslist',
      name: 'goodslist',
      component: GoodsList
    },
    {
      path: '/home/goodsinfo/:id',
      name: 'goodsinfo',
      component: GoodsInfo
    },
    {
      path: '/home/goodsdesc/:id',
      name: 'goodsdesc',
      component: GoodsDesc
    },
    {
      path: '/home/goodscomment/:id',
      name: 'goodscomment',
      component: GoodsComment
    }
  ],
  linkActiveClass: "mui-active" //覆盖默认的路由高亮的类
  // 默认的类为: router-link-active
})
