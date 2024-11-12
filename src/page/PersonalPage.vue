<template>
  <div class="app">
    
    <div class="content">
      <ProfileSidebar />
      <FollowSection />
    </div>

  </div>
</template>

<script lang="ts" setup name="personal-page">

import ProfileSidebar from '../components/ProfileSidebar.vue'
import FollowSection from '../components/FollowSection.vue'
</script>

<style scoped>
.app {
  width: 85%;
  height: 100vh;
  background-color: #f0f0f0;
  margin: 0 auto;
}

.content {
  display: flex;
  margin-top: 20px;
  gap: 5%;
  padding: 20px;
  margin: 0 auto;
}
</style>
