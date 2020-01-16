<template lang="html">
  <div class="">

      <!-- 轮播图区域 -->
      <slideshow :slideshowList="slideshowList" :isfull="true"></slideshow>
      <!-- 九宫格 改造 六宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
          <img src="../../images/menu1.png" alt="">
      		<div class="mui-media-body">新闻资讯</div></router-link></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/photolist">
          <img src="../../images/menu2.png" alt="">
      		<div class="mui-media-body">图片分享</div></router-link></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/goodslist">
          <img src="../../images/menu3.png" alt="">
      		<div class="mui-media-body">商品购买</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home">
          <img src="../../images/menu4.png" alt="">
      		<div class="mui-media-body">留言反馈</div></router-link></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home">
          <img src="../../images/menu5.png" alt="">
      		<div class="mui-media-body">视频专区</div></router-link></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home">
          <img src="../../images/menu6.png" alt="">
      		<div class="mui-media-body">联系我们</div></router-link></li>
        </ul>
    </div>
</template>

<script>
import { Toast } from "mint-ui";
import slideshow from "@/components/subcomponents/slideshow"

export default {
  data() {
    return {
      // 保存轮播图的数组
      slideshowList: []
    };
  },
  created() {
    this.getSlideshow();
  },
  methods: {
    getSlideshow() {
      // 获取轮播图数据的方法
      // vue-resource 前不能带'/'
      this.$http.get('api/getlunbo').then(result => {
        // console.log(result.body);
        // 如果 status = 0，证明请求成功
        if (result.body.status === 0) {
          // Toast("轮播图加载成功");
          this.slideshowList = result.body.message;
        } else {
          Toast("轮播图加载失败");
        }
      });
    }
  },
  components:{
    slideshow
  }
  // 使用 vue-resource 的 this.$http.get 获取数据
  // 获取的数据要保存到 data 中
  // 使用 v-for 循环渲染到 每个 item 上

}
</script>

<style lang="less" scoped>

.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        width: 60px;
        height: 60px;
    }
    .mui-media-body {
        font-size: 14px;
    }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: none;
}
</style>
