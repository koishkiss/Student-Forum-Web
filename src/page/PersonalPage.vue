<template>
  <div class="app">
    
    <div class="content">
      <ProfileSidebar />
    </div>

  </div>
</template>

<script lang="ts" setup name="personal-page">
import ProfileSidebar from '@/components/ProfileSidebar.vue';

</script>

<style scoped>
.app {
  background-color: #f0f0f0;
  margin: 0 auto;
}

.content {
  padding: 150px 300px;
  display: flex;
  margin-top: 20px;
  gap: 5%;
  margin: 0 auto;
}
</style>
