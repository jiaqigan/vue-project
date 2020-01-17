<template lang="html">
<div class="goodsinfo-container">
  <transition
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter">
    <!-- 加入购物车 时的小球动画 -->
    <!-- 有时候需要操作DOM节点，比如获取DOM节点中的内容，那就可以给DOM一个ref引用 -->
    <!-- this.$refs.ball 获取节点（vue提供的方法） -->
    <div class="ball" v-show="ballFlag" ref="ball"></div>
  </transition>
  <!-- 商品轮播图区域 -->
  <div class="mui-card">
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<slideshow :slideshowList="slideshowList" :isfull="false"></slideshow>
			</div>
		</div>
	</div>
  <!-- 商品购买区域 -->
	<div class="mui-card">
		<div class="mui-card-header">{{goodsInfo.title}}</div>
			<div class="mui-card-content">
				<div class="mui-card-content-inner">
					<p class="price">
          市场价：<del>￥{{goodsInfo.market_price}}</del>&nbsp;&nbsp;市场价：
          <span class="current_price">￥{{goodsInfo.sell_price}}</span>
          </p>
          <!-- 父组件向子组件传值，通过属性绑定 :max="goodsInfo.stock_quantity"，
        将库存量传递给子组件 -->
          <p>购买数量：<goodsinfoNumbox @getcount="getSelectedCount"
            :max="goodsInfo.stock_quantity"></goodsinfoNumbox></p>

            <div class="purchase-btn">
              <mt-button type="primary" size="small">立即购买</mt-button>
              <mt-button type="danger" size="small" @click="add">加入购物车</mt-button>
            </div>

				</div>
			</div>
	</div>
  <!-- 商品参数区域 -->
	<div class="mui-card">
		<div class="mui-card-header">商品参数</div>
		<div class="mui-card-content">
			<div class="mui-card-content-inner">
				<p>商品货号：{{goodsInfo.goods_no}}</p>
        <p>库存情况：{{goodsInfo.stock_quantity}} 件</p>
        <p>上架时间：{{goodsInfo.add_time | dateFormat}}</p>
			</div>
		</div>
		<div class="mui-card-footer">
      <mt-button type="primary" size="large" plain @click="getDesc(id)">商品详情</mt-button>
      <mt-button type="danger" size="large" plain @click="getComment(id)">商品评价</mt-button>
		</div>
	</div>
</div>
</template>

<script>
import {
  Toast
} from "mint-ui";
// 导入轮播图组件
import slideshow from "@/components/subcomponents/slideshow";
// 导入数组选择框组件
import goodsinfoNumbox from "@/components/subcomponents/goodsinfo_numbox";

export default {
  data() {
    return {
      // 将路由参数中的id挂载到data中，方便调用
      // goodsinfo/id
      id: this.$route.params.id,
      slideshowList: [], //轮播图数据
      goodsInfo: {}, //获取到的商品信息
      ballFlag: false, //控制小球显示隐藏
      selectedNum: 1, //保存用户选择要加入购物车的商品数量，默认为1
    }
  },
  created() {
    this.getSlideshow();
    this.getGoodsInfo();
  },
  methods: {
    getSlideshow() {
      this.$http.get("api/getthumimages/" + this.id).then(result => {
        if (result.body.status === 0) {
          // this.slideshowList = result.body.message;
          // 先循环轮播图数组的每一项，为item添加img属性；因为在轮播图组件中，
          // 只认识item.img 不认识item.src
          result.body.message.forEach(item => {
            item.img = item.src;
          })
          this.slideshowList = result.body.message;
          // console.log(result.body.message);
        } else {
          Toast("商品详情获取失败");
        }
      });
    },
    getGoodsInfo() {
      // 获取商品信息
      this.$http.get("api/goods/getinfo/" + this.id).then(result => {
        if (result.body.status === 0) {
          this.goodsInfo = result.body.message[0];
        } else {
          Toast("商品详情获取失败");
        }
      });

    },
    getDesc(id) {
      // 点击使用编程式导航，进入商品详情页面
      this.$router.push({
        name: "goodsdesc",
        params: {
          id
        }
      });
    },
    getComment(id) {
      // 点击使用编程式导航，进入商品评价页面
      this.$router.push({
        name: "goodscomment",
        params: {
          id
        }
      });
    },
    add() {
      this.ballFlag = !this.ballFlag;
      // 拼接处一个要保存到store中的cart数组里的商品信息对象
      var goodsinfo = {
        id: this.id,
        count: this.selectedNum,
        price: this.goodsInfo.sell_price,
        selected: true
      };
      // 调用 store 中的 mutations 来将商品加入购物车
      this.$store.commit("addToCart", goodsinfo);
    },
    beforeEnter(el) {
      el.style.transform = "translate(0, 0)"
    },
    enter(el, done) {
      // 通过 domObject.getBoundingClientRect() 方法 获取小球和购物车图标的位置
      // 获取小球在页面中的位置
      const ballPos = this.$refs.ball.getBoundingClientRect();
      // 获取购物车徽标在页面中的位置
      const badgePos = document.getElementById("badge").getBoundingClientRect();
      const xDiff = badgePos.left - ballPos.x;
      const yDiff = badgePos.top - ballPos.top;

      el.offsetWidth;
      // el.style.transform = "translate("+xDiff+"px, "+yDiff+"px)";
      // es6模板字符串
      el.style.transform = `translate(${xDiff}px, ${yDiff}px)`;
      el.style.transition = "all 1s cubic-bezier(.4, -0.3, 1, .68)";
      done();
    },
    afterEnter(el) {
      this.ballFlag = !this.ballFlag;
    },
    getSelectedCount(count) {
      // 当子组件把选中的数量传递给父组件时，把选中的值保存到 data 中
      // count 子组件通过 countChange() 方法，传递过来的参数
      this.selectedNum = count;
    },
  },
  components: {
    slideshow,
    goodsinfoNumbox
  }
}
</script>

<style lang="less" scoped>
.goodsinfo-container {
    background-color: #eee;
    overflow: hidden;
    // 因为 mui-card 有margin 会把bgc往下顶
    // position: relative;
    .current_price {
        color: red;
        font-size: 16px;
        font-weight: 700;
    }

    .mui-card-footer {
        display: block;
        button {
            margin: 10px 0;
        }
    }

    .ball {
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        z-index: 99;
        top: 390px;
        left: 147px;
    }

    .purchase-btn {
        button {
            width: 49%;
        }
    }
}
</style>
