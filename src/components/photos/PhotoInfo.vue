<template lang="html">
<div class="photoinfo-container">
  <h3>{{photoinfo.title}}</h3>
  <p class="subtitle">
    <span>发布时间：{{photoinfo.add_time | dateFormat}}</span>
    <span>点击：{{photoinfo.click}} 次</span>
  </p>
  <hr>
  <!-- 缩略图区域 -->
  <div class="thumbs">
    <vue-preview :slides="list"></vue-preview>
  </div>
  <!-- 图片内容区 -->
  <div class="content" v-html="photoinfo.content"></div>
  <!-- 评论区 -->
  <comment-box :id="id"></comment-box>
</div>
</template>

<script>
import comment from "@/components/subcomponents/comment"
import { Toast } from "mint-ui";

export default {
  data(){
    return {
      // 从路由中获取的图片 id
      // home/photoinfo/id
      id: this.$route.params.id,
      photoinfo:{}, //图片详情
      list: []
    }
  },
  created(){
    this.getPhotoInfo();
    this.getThumbs();
  },
  methods:{
    getPhotoInfo(){
      // 获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          console.log(result.body);
          // 通过photolist页 可以获取到 result.body.message 的所有 message对象数组
          // 在photoinfo页面，通过 id 取到 id对应的 message 数组元素
          this.photoinfo = result.body.message[0];
        } else {
          Toast("获取图片详情失败");
        }
      })
    },
    getThumbs(){
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          console.log(result.body);
          // 循环每个图片数据，补全图片宽和高
          result.body.message.forEach(item => {
            item.w = 600;
            item.h = 400;
            item.msrc = item.src;
        })
        // 把完整的数据保存到slide中
        this.list = result.body.message;
        console.log(this.slide);
        } else {
          Toast("获取图片详情失败");
        }
      })
    }
  },
  components: {
    // 用来注册子组件
    "comment-box": comment
  }
}
</script>

<style lang="less" scoped>
.photoinfo-container {
  padding: 3px;

  h3 {
    color: #226aff;
    font-size: 16px;
    text-align: center;
    margin: 15px 0;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  .content {
    font-size: 14px;
    line-height: 30px;
    text-indent: 2em;
  }
}
</style>
<style lang="less" media="screen">
.thumbs{
  .my-gallery{
      display: flex;
      flex-wrap:wrap;//默认换行
        figure{
          width: 30%;
          margin: 5px;
          img{
            width: 100%;
            box-shadow: 0 0 8px #999;
      }
    }
  }
}
</style>
