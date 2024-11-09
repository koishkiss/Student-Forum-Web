<script lang="ts">
  import AnnouncementBar from '@/components/AnnouncementBar.vue';
  import FollowSection from '@/components/FollowSectionInMainPage.vue';
  export default {
    name:'MainPage',  //组件名
    components:{
      AnnouncementBar,FollowSection
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
        
      </div>

      <div class="hot-issue-box">
        
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>

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
  background-color: blueviolet;
  min-height: 300px;
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
  min-width: 70%;
  min-height: 700px;
  background-color: #199600;
}

.hot-issue-box {
  min-width: 30%;
  min-height: 500px;
  max-height: 600px;
  background-color: #c200f3;
}

</style>