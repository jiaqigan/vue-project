<template lang="html">
<div class="goodsdesc-container">
  <h3>{{info.title}}</h3>
  <hr>
  <div class="content" v-html="info.content">

  </div>
</div>
</template>

<script>
import {
  Toast
} from "mint-ui";
export default {
  data(){
    return{
      id: this.$route.params.id,
      info:{} //商品详情数据
    }
  },
  created(){
    this.getGoodsDesc();
  },
  methods:{
    getGoodsDesc(){
      this.$http.get("api/goods/getdesc/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.info = result.body.message[0];
        } else {
          Toast("商品详情获取失败");
        }
      });
    }
  }
}
</script>

<style lang="less">
.goodsdesc-container{
  h3{
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    p{
      padding: 5px;
    }
    img{
      width: 100%;
    }
  }
}

</style>
