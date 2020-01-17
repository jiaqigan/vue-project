<template lang="html">
  <div class="cart-container">
    <!-- 商品列表区域 -->
      <div class="goods-list" v-for="(item, i) in cartList" :key="item.id">
        <div class="mui-card">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <mt-switch v-model="$store.getters.getGoodsSelected[item.id]"
              @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
              <img :src="item.thumb_path" alt="">
              <div class="info">
                <h1>{{item.title}}</h1>
                <p>
                  <span class="price">￥{{item.sell_price}}</span>
                  <!-- 父组件向子组件传值；通过id 获取到对应商品在购物车中的 count -->
                  <cartNumbox :initCount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></cartNumbox>
                  <!-- 因为是a链接，所以要阻止默认行为 -->
                  <!-- item.id用于删除 store中的数据，i 用来删除cartList中的数据 -->
                  <a href="#" @click.prevent="del(item.id, i)">删除</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

    <!-- 结算区域 -->

      <div class="mui-card">
        <div class="mui-card-content">
          <div class="mui-card-content-inner checkout">
            <div class="left">
              <p>总计（不含运费）</p>
              <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}} </span>件，
                总价 <span class="red">￥{{$store.getters.getGoodsCountAndAmount.amount}}</span> 元</p>
            </div>
            <mt-button type="danger">结算</mt-button>
          </div>
        </div>
      </div>


    </div>
</template>

<script>
import cartNumbox from "@/components/subcomponents/cart_numbox"
export default {
  data() {
    return {
      cartList: [] //购物车中所有商品列表数据
    }
  },
  created() {
    this.getCartInfo();
  },
  methods: {
    getCartInfo() {
      // 获取 store 中所有的商品 id，然后用逗号，拼接出一个字符串
      var idArr = [];
      this.$store.state.cart.forEach(item => idArr.push(item.id));

      // 如果购物车为空，则直接返回，不需要请求接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }

      // 获取购物车商品列表
      this.$http.get("api/goods/getshopcarlist/" + idArr.join(",")).then(result => {
        if (result.body.status === 0) {
          this.cartList = result.body.message;
        } else {
          Toast("商品详情获取失败");
        }
      });
    },
    del(id, index){
      // 点击删除，根据传递的id，把商品从store中删除;
      // 同时使用 index，把 cartList 对应的商品删除
      // 从 index 位置开始，删除1个元素
      this.cartList.splice(index, 1);
      this.$store.commit('delFromCart', id);
    },
    selectedChanged(id, val){
      // id 位商品id，val 为是否selected 的boolean值
      // 每当开关按键状态改变时，同步到store中
      this.$store.commit("updateGoodsSelected", {id, selected: val})
    }
  },
  components: {
    cartNumbox
  }


}
</script>

<style lang="less" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;

  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      .mint-switch-core{


      }

      img {
          width: 60px;
          height: 60px;
          margin: 10px;
      }

      h1 {
          font-size: 14px;
      }

      p {
        display: flex;
        justify-content: space-between;
        margin: 0;
          .price {
            color: red;
            font-weight: 700;
          }
      }
    }
  }

  .checkout{
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
