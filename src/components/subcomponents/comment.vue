<template lang="html">
<div class="cmt-container">
  <h3>发表评论</h3>
  <hr>
  <textarea placeholder="请输入评论内容（最多出入120字）" maxlength="120"></textarea>
  <mt-button type="primary" size="large">发表评论</mt-button>
  <div class="cmt-list">
    <div class="cmt-item" v-for="(item, i) in comments" :key="item.add_time">
      <div class="cmt-title">
        第{{ i + 1 }}楼&nbsp;&nbsp;{{item.user_name}}
        &nbsp;&nbsp;发表时间：{{item.add_time | dateFormat}}
      </div>
      <div class="cmt-body">
        {{item.content === "undefined" ? "此用户很懒，什么都没说" : item.content}}
      </div>
    </div>
  </div>



  <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button>
  <!-- 点击加载更多按钮，让pageIndex ++，然后重新调用this.getcomments()
  方法获取最新一页的评论数据 -->
</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  data(){
    return {
      pageIndex: 1, //默认展示第一页的评论数据
      comments:[]
    }
  },
  created(){
    this.getComments();
  },
  methods:{
    getComments(){  //获取评论
      this.$http.get("api/getcomments/" + this.id + "?pageindex="
      + this.pageIndex).then(result => {
        if (result.body.status === 0) {
          // this.comments = result.body.message;
          // 每当获取新的评论数据时，应当以老数据拼接新数据，而不是清空老数据
          this.comments = this.comments.concat(result.body.message);
        } else {
          Toast("评论获取失败");
        }
      })
    },
    getMore(){  //加载更多评论
      this.pageIndex++;
      this.getComments();
    }
  },
  props:["id"]
}
</script>

<style lang="less" scoped>
.cmt-container {
    h3 {
        font-size: 18px;
    }
    textarea {
        font-size: 14px;
        height: 85px;
        margin: 0;
    }
    .cmt-list {
        margin: 5px 0;
        .cmt-item {
            font-size: 14px;
            .cmt-title {
                line-height: 30px;
                background-color: #ccc;
            }
            .cmt-body {
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>
