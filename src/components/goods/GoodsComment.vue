<template lang="html">
<div class="comment-container">
  <comment-box :id="this.id"></comment-box>
</div>
</template>

<script>
import comment from "@/components/subcomponents/comment"
export default {
  data(){
    return{
      id: this.$route.params.id
    }
  },
  components:{
    "comment-box": comment
  }
}
</script>

<style lang="less" scoped>
.comment-container{
  padding: 3px;
}
</style>
