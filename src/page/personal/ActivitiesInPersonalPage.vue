<script lang="ts">
import PostPreviewScrollList from '../../components/PostPreviewScrollList.vue';
export default {
  name:'ActivitiesPesonalPage',  //组件名
  components:{
    PostPreviewScrollList
  }
}
</script>

<template>
<div class="activities-post-box">
  <el-text  class="page-title" tag="p" >动态</el-text>
  <PostPreviewScrollList/>
</div>
</template>


<script lang="ts" setup>

</script>


<style scoped>
.activities-post-box {
  padding: 0 20px;
}

.page-title {
  font-size: 34px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>