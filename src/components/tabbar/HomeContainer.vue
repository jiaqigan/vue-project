<template lang="html">
  <div class="">
      <h3>HomeContainer</h3>
      <!-- 轮播图区域 -->
      <mt-swipe :auto="4000">
        <!-- 如果在组件中使用 v-for，一定要使用 key -->
        <mt-swipe-item v-for="item in slideshowList" :key="item.id">
          <img :src="item.img" alt="">
        </mt-swipe-item>
      </mt-swipe>

      <!-- 九宫格 改造 六宫格 -->
      <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu1.png" alt="">
      		<div class="mui-media-body">新闻资讯</div></a></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu2.png" alt="">
          <span class="mui-badge">5</span>
      		<div class="mui-media-body">图片分享</div></a></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu3.png" alt="">
      		<div class="mui-media-body">商品购买</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu4.png" alt="">
      		<div class="mui-media-body">留言反馈</div></a></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu5.png" alt="">
      		<div class="mui-media-body">视频专区</div></a></li>
      	<li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
          <img src="../../images/menu6.png" alt="">
      		<div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
import {
  Toast
} from "mint-ui"

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
      this.$http.get('http://www.liulongbin.top:3005/api/getlunbo').then(result => {
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
  }
  // 使用 vue-resource 的 this.$http.get 获取数据
  // 获取的数据要保存到 data 中
  // 使用 v-for 循环渲染到 每个 item 上

}
</script>

<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        &:nth-child(1) {
            background-color: red;
        }
        &:nth-child(2) {
            background-color: green;
        }
        &:nth-child(3) {
            background-color: green;
        }
        img {
            width: 100%;
            height: 100%;
        }
    }
}

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
