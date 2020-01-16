<template lang="html">
  <div class="goods-list">
    <!-- <router-link class="goods-item" v-for="item in goodsList"
    :key="item.id" :to="'/home/goodsinfo/' + item.id" tag="div">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>库存：{{item.stock_quantity}}件</span>
        </p>
      </div>
    </router-link> -->

<!-- 在网页中，有两种跳转方式： -->
<!-- 方式1：使用 a 标签的形式叫做 标签跳转 -->
<!-- 方式2：使用 window.location.href 的形式，叫做编程式导航（通过js） -->

    <div class="goods-item" v-for="item in goodsList" :key="item.id"
    @click="getDetails(item.id)">
      <img :src="item.img_url" alt="">
      <h1 class="title">{{item.title}}</h1>
      <div class="info">
        <p class="price">
          <span class="now">￥{{item.sell_price}}</span>
          <span class="old">￥{{item.market_price}}</span>
        </p>
        <p class="sell">
          <span>热卖中</span>
          <span>库存：{{item.stock_quantity}}件</span>
        </p>
      </div>
    </div>

    <mt-button type="danger" size="large" @click="loadMore">加载更多</mt-button>
  </div>
</template>

<script>
import { Toast } from "mint-ui";

export default {
  data(){
    return{
      num:0,
      pageindex:1,  //分页的页数
      goodsList:[]  //存放商品列表的数组
    }
  },
  created(){
    this.getGoodsList();
  },
  methods:{
    getGoodsList(){
      // 获取商品列表
      this.$http.get("api/getgoods?pageindex=" +　this.pageindex).then(result => {
        if (result.body.status === 0) {
          // this.goodsList = result.body.message;
          // 先拼接数据，再赋值
          this.goodsList = this.goodsList.concat(result.body.message);
          // console.log(result.body);
          this.num = result.body.message.length;
        } else {
          Toast("商品列表获取失败");
        }
      })
    },
    loadMore(){
      if (this.num < 10) {
        return Toast({message:"已加载全部商品", duration: 500});
      }else{
        this.pageindex++;
        this.getGoodsList();
      }
    },
    getDetails(id){
      // 使用js的方式，进行路由导航
      // 注意区分 this.$route 和 this.$router 对象
      // this.$route 是路由【参数对象】，所有路由中的参数，params，query 都属于他
      // this.$router 是一个路由【导航对象】，用它可以方便的使用js代码实现路由的
      // 前进，后退，跳转到新的 url 地址
      // 方式1
      // this.$router.push("/home/goodsinfo/" + id);
      // 方式2: 传递对象
      // this.$router.push({path: "/home/goodsinfo/" + id});
      // 方式3：传递命名路由
      this.$router.push({name:"goodsinfo", params:{id}});
      // 如果提供了path，params会被忽略
    }
  }
}
</script>

<style lang="less" scoped>
.goods-list{
  padding: 7px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .goods-item{
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 3px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 290px;

    img{
      width: 100%;
    }

    .title {
      font-size: 14px;
    }

    .info {
      background-color: #eee;
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: 700;
          font-size: 16px;
        }

        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }

      .sell {
        display: flex;
        justify-content: space-between;
      }
    }

  }
  button{
    margin: 10px 0;
  }
}
</style>
