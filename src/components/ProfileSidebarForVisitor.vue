<script lang="ts">
  export default {
    name:'profileSidebarForVisitor',
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
        :src="other.avatarURL" 
        fit="cover" 
        class="avatar"
        :preview-src-list="[other.avatarURL]" 
        :initial-index="0"
      />
    </div>
    <div class="user-info">    
      <el-text tag="p" class="nickname">
        {{ other.nickname }}
        <el-tag :type="user.auth.type" effect="dark" class="tag">
          {{ user.auth.label }}
        </el-tag>
      </el-text>
      <div class="other-info" v-if="!loading">
        <el-text class="info-item">UID：{{ props.uid }}</el-text>
        <el-divider direction="vertical" />
        <el-text class="info-item">发帖数：{{ other.postNum }}</el-text>
        <el-divider direction="vertical" />
        <el-text class="info-item">加入时间：{{ other.registerTime }}</el-text>
      </div>
      <el-text tag="p" class="signature">简介: {{ other.signature }}</el-text>
    </div>
  </div>

  <div class="page-content-box">
    <div class="left-side">
      <nav class="nav-tabs">

        <!-- <RouterLink to="/personal/activity" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 动态 </span>
        </RouterLink> -->

        <RouterLink :to="`/visit/other/person/${props.uid}/post`" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 个人 </span>
        </RouterLink>

        <RouterLink :to="`/visit/other/person/${props.uid}/marked`" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 收藏 </span>
        </RouterLink>

        <!-- <RouterLink to="/personal/setting" class="router cta" active-class="router-choose">
          <span class="hover-underline-animation"> 设置 </span>
        </RouterLink> -->
      </nav>
      <RouterView />
    </div>
    <div class="right-side">
      <div class="follow-section-box">
        <FollowSectionInPersonalPageForVisitor/>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts" setup>
  import { ref, onBeforeMount, reactive } from 'vue';
  import Cookies from 'js-cookie';
  import axios from 'axios';
  import { useHttpStore } from '@/store/Http';
  import { ElMessageBox } from 'element-plus';
  import { useRouter } from 'vue-router';
  import { useUserInfoStore } from '@/store/UserInfo';
  import FollowSectionInPersonalPageForVisitor from './FollowSectionInPersonalPageForVisitor.vue';
  const props = defineProps([
  "uid"
  ])
  const isLoading = ref(true);
  const loading = ref(true);
  const { ip_port } = useHttpStore();
  const router = useRouter();
  const user = useUserInfoStore();
  let other = reactive<{
    nickname: string,
    postNum: number,
    registerTime: string,
    signature: string,
    avatarURL: string,
    sid:string,
    authority:number,
    bookmarkNum:number,
    joinNum:number,
    likeNum:number,
    realName:string,
  }>({
  nickname: '',
  postNum: 0,
  registerTime: '',
  signature: '',
  avatarURL: '',
  sid: '',
  authority: 0,
  bookmarkNum: 0,
  joinNum: 0,
  likeNum: 0,
  realName: '',
});

  onBeforeMount(()=>{
    if (user.uid !== -1) {
    isLoading.value = false;
  } else if (Cookies.get('uid') === undefined) {
    // ElMessageBox.alert("请登录!", "", {confirmButtonText: 'OK'});
    router.push('/main');
  } else {
    axios({
      method:"get",
      url: ip_port + "/user/other/info?uid="+props.uid,
      headers: {
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      }
    })
    .then(function (response){
      const data = response.data;
      if (data.code == 200) {
        console.log(data.data);
        other = data.data;
        console.log(other.nickname);
        loading.value = false;
      } else {
        ElMessageBox.alert(data.message)
      }
    })
    .catch((error)=>{
      console.log(error);
    })
    .finally(()=>{
      isLoading.value = false;
    })
  }
  })
</script>

<style scoped>
@import "@/assets/cta-button.css";

.profile-sidebar {
  flex: 7; /* 70% 宽度 */
  background-color: #F5F7FA;
  padding: 20px;
  padding-top: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-top: 1px;
  margin: 0 auto;
}

.avatar-box {
  margin-top:-45px;
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 125px;
  height: 125px;
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}
.avatar:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
}

.user-info {
  margin-left: 10px;
}
.nickname {
  display: flex;
  flex-direction: row;
  color: #000;
  font-size: 23px;
  font-weight: bold;
}
.tag {
  height: 20px;
  width: 40px;
  justify-self: center;
  align-self: center;
  margin-left: 7px;
}
.other-info {
  margin-top: 1px;
}
.signature {
  margin-top: 6px;
}



.page-content-box {
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