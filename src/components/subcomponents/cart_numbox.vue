<template lang="html">
  <div class="mui-numbox" data-numbox-min='1'>
  	<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
    <!-- 初始化购物车中，所选商品的数量 -->
  	<input id="test" class="mui-input-numbox" type="number" :value="initCount"
    @change="countChange" ref="numbox"/>
  	<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import {
  Toast
} from "mint-ui";
import mui from '@/mui/js/mui.js'
export default {
  data(){
    return{

    }
  },
  mounted(){
    // 初始化数字选择框组件
    mui('.mui-numbox').numbox();
    // console.log(this.max);
  },
  methods:{
    countChange(){
      // 每当购物车数据改变时，立即把最新的数据同步到购物车的 store 中，覆盖之前的数据
      this.$store.commit("updateGoodsInfo", {
        id:this.goodsid,
        count: this.$refs.numbox.value
      });
    }
  },
  props:["initCount", "goodsid"]
}
</script>

<style lang="less" scoped>
  .mui-numbox{
     height:25px;
     width:100px;
     padding:0 30px 0 30px;
     button{
       width: 30px;
     }
     input{
       font-size: 14px;
     }
  }
</style>
