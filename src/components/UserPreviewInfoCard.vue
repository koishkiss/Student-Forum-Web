<script lang="ts">
  export default {
    name:'UserPreviewInfoCard'  //组件名
  }
</script>

<template>
  <div class="user-preview-info-box">
    <div class="avatar-box">
      <el-avatar :src="avatarURL" fit="cover" shape="square" class="avatar"/>
    </div>
    <div class="nickname-box">
      <el-text class="nickname">{{ nickname }}</el-text>
    </div>
  </div>
</template>


<script lang="ts" setup>

defineProps(["avatarURL","uid","nickname"])

</script>


<style scoped>
.user-preview-info-box {
  display: flex;
  flex-direction: column;
  align-self: center;
}

.avatar-box {
  height: 50px;
}
</style>