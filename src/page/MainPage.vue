<script lang="ts">
  import { Refresh } from "@element-plus/icons-vue";
  import AnnouncementBar from '@/components/AnnouncementBar.vue';
  import FollowSection from '@/components/FollowSectionInMainPage.vue';
  import PostPreviewScrollList from '@/components/PostPreviewScrollList.vue';
  import ClassificationList from "@/components/ClassificationList.vue";
  import SideBar from "@/components/SideBar.vue";
  export default {
    name:'MainPage',  //组件名
    components:{
      AnnouncementBar,FollowSection,PostPreviewScrollList,ClassificationList,Refresh,SideBar
    }
  }
</script>

<template>
<div class="main-page-box">
  <div class="main-page-flex-box">
    <div class="left-sidebar-box">
      <div class="announcement-bar-box">
        <el-scrollbar max-height="400">
          <AnnouncementBar/>
        </el-scrollbar>
      </div>

      <div class="section-classification-box">
        <ClassificationList/>
      </div>
    </div>

    <div class="right-sidebar-box">
      <div class="follow-section-box">
        <el-scrollbar max-height="400">
          <FollowSection/>
        </el-scrollbar>
      </div>

      <div class="right-bottom-item-box">
        <div class="public-trend-box">
          <div class="public-trend-title">
            丨 最新动态
            <el-icon class="top-control-icon" @click="reloadPostList" >
              <Refresh />
            </el-icon>
          </div>
          <PostPreviewScrollList ref="postList"/>
        </div>

        <div class="hot-issue-box">
          <SideBar/>
        </div>
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
}

.main-page-flex-box {
  gap: 10px;
  display: flex;
}

.left-sidebar-box {
  gap: 10px;
  width: 32%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.announcement-bar-box {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 400px;
}

.section-classification-box {
  position: sticky;
  top: 60px;
}

.right-sidebar-box {
  min-width: 600px;
  width: 68%;
}

.follow-section-box {
  min-height: 200px;
  max-height: 400px;
  scroll-behavior: smooth;
  border-radius: 6px;
  margin-bottom: 10px;
}

.right-bottom-item-box {
  margin-top: 0px;
  gap: 10px;
  display: flex;
  flex-direction: row;
}

.public-trend-box {
  display: flex;
  flex-direction: column;
  min-width: 70%;
  min-height: 700px;
  border-top: none;
  border: solid 1px rgb(201, 201, 201);
  border-radius: 5px;
  border-start-start-radius: 0;
  border-start-end-radius: 0;
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
  min-width: 28%;
  min-height: 500px;
}

</style>