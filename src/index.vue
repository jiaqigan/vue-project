<template>
<div class="app-container">
  <!-- 顶部 header 区域 -->
  <mt-header fixed title="Vue Project">
    <span slot="left" @click="goBack" v-show="flag">
      <mt-button icon="back">返回</mt-button>
    </span>
  </mt-header>



  <!-- 中间的路由 router-view 区域 -->
  <transition>
    <router-view></router-view>
  </transition>
  <!-- 底部的 tabbar 区域 -->
  <nav class="mui-bar mui-bar-tab">
    <router-link class="mui-tab-item-my" to="/home">
      <span class="mui-icon mui-icon-home"></span>
      <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link class="mui-tab-item-my" to="/member">
      <span class="mui-icon mui-icon-contact"></span>
      <span class="mui-tab-label">会员</span>
    </router-link>
    <router-link class="mui-tab-item-my" to="/cart">
      <span class="mui-icon mui-icon-extra mui-icon-extra-cart">
        <span class="mui-badge" id="badge">{{$store.getters.getAllCount}}</span>
      </span>
      <span class="mui-tab-label">购物车</span>
    </router-link>
    <router-link class="mui-tab-item-my" to="/search">
      <span class="mui-icon mui-icon-search"></span>
      <span class="mui-tab-label">搜索</span>
    </router-link>
  </nav>


</div>
</template>

<script>
export default {
  data() {
    return {
      flag: false
    }
  },
  created() {
    // 在页面创建后，只要路由不为首页，就显示返回按钮
    this.flag = this.$route.path === "/home"? false: true
  },
  methods: {
    goBack(){
      // 点击后退
      this.$router.go(-1);
    }
  },
  watch:{
    // 监听路由的改变
    "$route.path": function(newVal){
      // 如果路由为 /home 则隐藏返回按键
      if (newVal === '/home') {
        this.flag = false;
      }else {
        this.flag = true;
      }
    }
  }
}
</script>

<style lang="less" scoped>
.mint-header{
  z-index: 99;
}
.app-container {
    padding-top: 40px;
    padding-bottom: 50px;
    // 解决页面左右切换导致header和tabbar移动的问题
    overflow-x: hidden;
}

.v-enter {
    opacity: 0;
    // 当前页面向左侧移动100%的宽度
    transform: translateX(100%);
}

.v-leave-to {
    opacity: 0;
    // 当前页面离开时的位置为-100%
    transform: translateX(-100%);
    // 解决页面切换上下移动的问题
    position: absolute;
}
.v-enter-active,
.v-leave-active {
    transition: all 0.2s ease;
}

// 改类名，解决tabbar点击无法切换的问题
.mui-bar-tab .mui-tab-item-my.mui-active {
    color: #007aff;
}

.mui-bar-tab .mui-tab-item-my {
    display: table-cell;
    overflow: hidden;
    width: 1%;
    height: 50px;
    text-align: center;
    vertical-align: middle;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #929292;
}

.mui-bar-tab .mui-tab-item-my .mui-icon {
    top: 3px;
    width: 24px;
    height: 24px;
    padding-top: 0;
    padding-bottom: 0;
}

.mui-bar-tab .mui-tab-item-my .mui-icon ~ .mui-tab-label {
    font-size: 11px;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>
