<template lang="html">
<div class="">

  <!-- 顶部滑动条区域 -->
  <div id="slider" class="mui-slider">
  	<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
  			<div class="mui-scroll">
  <!-- 给id=0的a链接加上 mui-active 类的效果-->
  				<a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']"
           v-for="item in categoryList" :key="item.id" @tap="getPicListByCateId(item.id)">
  					{{item.title}}
  				</a>
  			 </div>
  			</div>
  	</div>
    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id"
      :to="'/home/photoinfo/' + item.id" tag="li">
      <!-- 通过 tag 指定 router-link 要渲染的样式-->
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{item.title}}</h1>
          <div class="info-body">
            {{item.zhaiyao}}
          </div>
        </div>
      </router-link>
    </ul>
</div>
</template>

<script>
import { Toast } from "mint-ui";
// 导入mui的js文件
import mui from "../../mui/js/mui.js"
// 在导入mui。js时，console报错：Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
// 是因为mui。js中用到了“caller”等，但是vue中启用了严格模式，二者冲突

export default {
  data() {
    return {
      categoryList: [], //所有分类的数组
      list: [] //图片列表数组
    }
  },
  created() {
    this.getAllCategory();
    // 初始加载的是id=0时的图片
    this.getPicListByCateId(0);
  },
  mounted() {
    // 初始化顶部滑动控件
    mui('.mui-scroll-wrapper').scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          // 手动拼接一个完整的分类列表（因为接口返回的数据中不包括 全部 这个分类）
          result.body.message.unshift({
            title: "全部",
            id: 0
          });
          this.categoryList = result.body.message;
        } else {
          Toast("获取分类列表失败");
        }
      });
    },
    getPicListByCateId(cateId) {
      // 根据分类id，获取图片列表
      this.$http.get("api/getimages/" + cateId).then(result => {
        if (result.body.status === 0) {
          // console.log(result.body);
          this.list = result.body.message;
        } else {
          Toast("获取图片列表失败");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
* {
    touch-action: pan-y;
}

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px 10px 0;
    li {
        text-align: center;
        background-color: #ccc;
        margin-bottom: 10px;
        box-shadow: 0 0 6px #999;
        position: relative;
        border-radius: 3px;
        img {
            width: 100%;
            vertical-align: middle;
            border-radius: 3px;
        }
        img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
        .info {
            color: #fff;
            text-align: left;
            position: absolute;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.4);
            max-height: 84px;
            padding: 5px;
            border-bottom-left-radius: 3px;
            border-bottom-right-radius: 3px;
            .info-title {
                font-size: 14px;
            }
            .info-body {
                font-size: 12px;
                word-break: break-all;
                text-overflow: ellipsis;
                overflow: hidden;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}
</style>
