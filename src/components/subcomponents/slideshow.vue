<template lang="html">
  <div class="">
    <mt-swipe :auto="4000">
      <!-- 如果在组件中使用 v-for，一定要使用 key -->
      <!-- 以后，谁使用 轮播图组件， 谁传递 slideshowList -->
      <!-- 此时 slideshowList 应该是 父组件向子组件传值 -->
      <mt-swipe-item v-for="item in slideshowList" :key="item.id">
        <img :src="item.img" alt="" :class="{'full': isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  mounted(){
    // console.log("thissss", this);
    // console.log("length", this.slideshowList.length);
    // console.log("slideshowList", this.slideshowList);
  },
  props:["slideshowList", "isfull"]
}
</script>

<style lang="less" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
      text-align: center;
        img {
            height: 100%;
        }
    }
}
.full{
  width: 100%;
}
</style>
