<script lang="ts">
  import AnnouncementBar from '@/components/AnnouncementBar.vue';
  export default {
    name:'MainPage',  //组件名
    components:{
      AnnouncementBar
    }
  }
</script>

<template>
<div class="main-page-box">
  <div class="announcement-bar-box">
    <AnnouncementBar/>
  </div>
</div>
</template>


<script lang="ts" setup>

</script>


<style scoped>

.main-page-box {
  padding: 150px 300px;
}

.announcement-bar-box {
  width: 300px;
}

</style>