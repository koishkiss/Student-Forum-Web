<script lang="ts">
import FollowSection from '@/components/FollowSection.vue';
import ProfileSidebar from '@/components/ProfileSidebar.vue';
export default {
  name:'PersonalPage',
  components: {
    FollowSection,ProfileSidebar
  }
}
</script>

<template>
<div class="personal-page-box">
  <div class="profile-sidebar-box">
    <ProfileSidebar/>
  </div>

  <div class="display-box">
    <div class="child-page-box">

    </div>

    <div class="follow-section-box">
      <FollowSection/>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>

</script>


<style scoped>

.personal-page-box {
  padding: 150px 300px;
}

.profile-sidebar-box {
  min-width: 800px;
}

.display-box {
  display: flex;
}

.child-page-box {
  background-color: #6b6b6b;
  width: 68%;
  min-width: 600px;
}

.follow-section-box {
  width: 32%;
  min-width: 200px;
}

</style>