<script lang="ts">
export default {
  name:'ProfileSidebar',  //组件名
  components: {
}
}
</script>

<template>
<div class="profile-sidebar">
  <p v-if="isLoading">
    Loading...
  </p>

  <div class="profile" v-if="!isLoading">
    <div class="avatar-box">
      <el-image 
        :src="user.avatarURL" 
        fit="contain" 
        class="avatar"
        :preview-src-list="[user.avatarURL]" 
        :initial-index="0"
      />
    </div>
    <div>    
      <div class="user-info">
        <span class="inline-block">昵称：{{ user.nickname }}</span>
        <span class="inline-block">UID：{{ user.uid }}</span>
        <span>发帖数：{{ user.postNum }}</span>
      </div>
      <p>个性签名：{{ user.signature }}</p>
    </div>
  </div>

  <div class="total">
    <div class="left-side">
      <nav class="nav-tabs">

        <RouterLink to="/personal/activity" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 动态 </span>
        </RouterLink>

        <RouterLink to="/personal/post" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 个人 </span>
        </RouterLink>

        <RouterLink to="/personal/mark" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 收藏 </span>
        </RouterLink>

        <RouterLink to="/personal/setting" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 设置 </span>
        </RouterLink>
      </nav>
      <RouterView />
    </div>
    <div class="right-side">
      <div class="follow-section-box">
        <FollowSection></FollowSection>
      </div>
    </div>
  </div>
</div>
</template>
  
<script lang="ts" setup>
import FollowSection from './FollowSectionInPersonalPage.vue'

import Cookies from 'js-cookie';
import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import { ElMessageBox } from 'element-plus';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/store/UserInfo';

// 使用HttpStore获取IP和端口配置
const { ip_port } = useHttpStore();
const router = useRouter();

// 定义响应数据的状态
const isLoading = ref(true);
const user = useUserInfoStore();

//初始化
onBeforeMount(()=>{
  if (user.uid !== -1) {
    isLoading.value = false;
  } else if (Cookies.get('uid') === undefined) {
    ElMessageBox.alert("请登录!", "", {confirmButtonText: 'OK'});
    router.push('/main');
  } else {
    axios({
      method: "get",
      url: ip_port + "/user/mine/info",
      headers: {
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      }
    })
    .then(function (response) {
      const data = response.data;
      if (data.code == 200) {
        user.$patch(data.data);
      } else {
        ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        router.push('/main');
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(()=>{
      isLoading.value = false;
    });
  }
});

</script>
  
<style scoped>
@import "@/assets/cta-button.css";

.profile-sidebar {
  flex: 7; /* 70% 宽度 */
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center; /* 垂直居中对齐 */
  gap: 5%;
  padding: 10px;
  margin: 0 auto;
}

.avatar-box {
  margin-top:-100px;
  width: 135px;
  height: 135px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 120px;
  height: 120px;
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  z-index: 2;
}
.avatar:hover {
  width: 123px;
  height: 123px;
  transition: all 0.2s ease-in-out;
}

.user-info {
  display: flex;
  flex-direction: row;
  gap: 5px;
}
.inline-block {
  display: inline-block;
  border-right: 1px solid #ccc;
  padding-right: 10px;
  margin-right: 10px;
  gap: 10px;
}



.total {
  min-width: 900px;
  display: flex; /* 使用 Flexbox 布局 */
  gap: 5px; /* 两边内容的间距 */
  padding: 1px;
  background-color: #ffffffa2; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.left-side {
  flex: 6; /* 占左边 70% */
  background-color: #ffffff; /* 白色背景 */
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.nav-tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #eee;
}
.router {
  text-decoration: none;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-shadow: 1px 1px 2px grey;
  margin-bottom: 10px;
}
.router-choose span {
  color: #0d4700;
}
.router-choose .hover-underline-animation::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.right-side {
  flex: 4; /* 占右边 30% */
}

.follow-section-box {
  background-color: #ffffff; /* 白色背景 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
  position: sticky;
  top: 63px;
}

</style>
  