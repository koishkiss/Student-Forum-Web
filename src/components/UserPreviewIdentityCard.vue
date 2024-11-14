<script lang="ts">
  export default {
    name:'UserPreviewInfoCard'  //组件名
  }
</script>

<template>
  <div class="user-preview-info-box">
    <div class="avatar-box">
      <el-avatar :src="theUser.avatarURL" fit="cover" shape="square" class="avatar"/>
    </div>
    <div class="nickname-box">
      <el-text class="nickname">{{ theUser.nickname }}</el-text>
    </div>
  </div>
</template>


<script lang="ts" setup>
import { UserInfo } from '@/types';
import { reactive } from 'vue';


defineProps(["uid"])

const theUser = reactive<UserInfo>({
  uid:-1,
  sid:"",
  authority:-1,
  nickname:"",
  signature:"",
  registerTime:"",
  likeNum:-1,
  bookmarkNum:-1,
  postNum:-1,
  joinNum:-1,
  avatarURL:"http://47.113.194.64:22222/image/default-avatar.png"
});

</script>


<style scoped>
.user-preview-info-box {
  background-color: white;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-self: center;
  z-index: 1;
}

.avatar-box {
  height: 50px;
}
</style>