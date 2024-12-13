<script lang="ts">
export default {
  name:'PersonalPageForVisitors'
}
</script>

<template>
  <div class="content">
    <ProfileSidebarForVisitor :uid = "uid"/>
  </div>
</template>

<script lang="ts" setup>
import ProfileSidebarForVisitor from '@/components/ProfileSidebarForVisitor.vue';
import {useRoute} from 'vue-router';
let route = useRoute();
const uid = route.params.uid;

</script>
<style scoped>
.content {
  padding: 150px 300px;
  display: flex;
  margin-top: 20px;
  gap: 5%;
  margin: 0 auto ;
}

</style>
