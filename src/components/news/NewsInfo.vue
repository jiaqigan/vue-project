<template lang="html">
<div class="newsinfo-container">
  <!-- 大标题 -->
  <h3 class="title">{{ newsinfo.title }}</h3>
  <!-- 子标题 -->
  <p class="subtitle">
    <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
    <span>点击：{{ newsinfo.click }} 次</span>
  </p>
  <hr>
  <!-- 内容区 -->
  <!-- 因为 newsinfo.content 带html标签，所以需要用v-html渲染-->
  <div class="content" v-html="newsinfo.content"></div>
  <!-- 评论区子组件 -->
  <!-- 父组件向子组件传参 -->
  <comment-box :id="this.id"></comment-box>
</div>
</template>

<script>
import comment from "@/components/subcomponents/comment"

import { Toast } from "mint-ui";
export default {
  data(){
    return{
      // 将url中传递来的id，挂载在data上，方便以后调用
      id: this.$route.params.id,
      newsinfo:{} //新闻对象
    }
  },
  created(){
    this.getNewsInfo();
  },
  methods:{
    getNewsInfo(){ //获取新闻详情
      this.$http.get("api/getnew/" + this.id).then(result =>　{
      if (result.body.status === 0) {
        // console.log(this);
        this.newsinfo = result.body.message[0];
      } else {
        Toast("新闻详情获取失败");
      }
    })
    }
  },
  components:{
    // 用来注册子组件
    "comment-box":comment
  }
}
</script>

<style lang="less">
.newsinfo-container{
  padding: 0 4px;
  .title{
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
    color: red;
  }
  .subtitle{
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    color: #226aff;
  }
  .content{
    // img{
    //   width: 100%;
    // }
  }
}
</style>
