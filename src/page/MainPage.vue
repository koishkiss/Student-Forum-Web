<script lang="ts">
  import { Refresh } from "@element-plus/icons-vue";
  import AnnouncementBar from '@/components/AnnouncementBar.vue';
  import FollowSection from '@/components/FollowSectionInMainPage.vue';
  import PostPreviewScrollList from '@/components/PostPreviewScrollList.vue';
  export default {
    name:'MainPage',  //组件名
    components:{
      AnnouncementBar,FollowSection,PostPreviewScrollList,Refresh
    }
  }
</script>

<template>
<div class="main-page-box">
  <div class="left-sidebar-box">
    <div class="announcement-bar-box">
      <AnnouncementBar/>
    </div>

    <div class="section-classification-box">

    </div>
  </div>

  <div class="right-sidebar-box">
    <div class="follow-section-box">
      <FollowSection/>
    </div>

    <div class="right-bottom-item-box">
      <div class="public-trend-box">
        <div class="public-trend-title">
          丨 热门动态
          <el-icon class="top-control-icon" @click="reloadPostList" >
            <Refresh />
          </el-icon>
        </div>
        <PostPreviewScrollList ref="postList"/>
      </div>

      <div class="hot-issue-box">
        
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { ref } from "vue";

let postList = ref();

function reloadPostList() {
  postList.value.reloadAll();
}

</script>


<style scoped>

.main-page-box {
  padding: 150px 300px;
  display: flex;
}

.left-sidebar-box {
  width: 32%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.announcement-bar-box {
  max-height: 400px;
}

.section-classification-box {
  background-color: brown;
  min-height: 300px;
}

.right-sidebar-box {
  min-width: 600px;
  width: 68%;
  height: 100px;
}

.follow-section-box {
  min-height: 180px;
  max-height: 400px;
  scroll-behavior: smooth;
}

.right-bottom-item-box {
  display: flex;
  flex-direction: row;
}

.public-trend-box {
  display: flex;
  flex-direction: column;
  min-width: 70%;
  min-height: 700px;
}

.public-trend-title {
  display: flex;
  flex-direction: row;
  height: 40px;
  font-size: 28px;
  font-weight: bold;
  border: thick double rgb(255, 255, 255);
  border-start-start-radius: 5px;
  border-start-end-radius: 5px;
  border-bottom: none;
  background-color: #efefef;
}

.top-control-icon {
  font-size: 18px;
  color: grey;
  cursor: pointer;
  margin: auto;
  margin-right: 10px;
}

.hot-issue-box {
  min-width: 30%;
  min-height: 500px;
  max-height: 600px;
  background-color: #c200f3;
}

</style>