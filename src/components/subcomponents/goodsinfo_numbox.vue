<template lang="html">
  <!-- 因为不知道何时会获取到max的值，但是总有一刻，会得到一个真正的max的值 -->
  <!-- 使用 watch 属性监听父组件传递过来的 max 值，不管watch被触发几次，
  最后一次一定是合法的max值 -->
  <div class="mui-numbox" data-numbox-min='1'>
  	<button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
  	<input id="test" class="mui-input-numbox" type="number" value="1"
    @change="countChange" ref="numBox" />
    <!-- @change 监听数据的变化 -->
  	<button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
  </div>
</template>

<script>
import mui from '@/mui/js/mui.js'

export default {
  mounted(){
    // 初始化数字选择框组件
    mui('.mui-numbox').numbox();
    // console.log(this.max);
  },
  methods:{
    countChange(){
      // 每当文本框数字改变时，立即把最新的数据，通过事件调用，传递给父组件
      // console.log(this.$refs.numBox.value);
      // 父组件监听的名字，要传递给父组件的参数
      this.$emit("getcount", parseInt(this.$refs.numBox.value));
    }
  },
  // 接收父组件传递过来的参数
  props:["max"],
  watch:{
    //属性监听
    // 监听 max 属性，每当 max 发生变化，就会触发回调函数
    "max": function(newVal, oldVal){
      // 通过 JS API 设置 numbox 的最大值
      mui('.mui-numbox').numbox().setOption("max", newVal);
    }
  }
}
</script>

<style lang="less" scoped>

</style>
