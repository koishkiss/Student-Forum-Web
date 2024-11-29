<script lang="ts">
import { Loading, User, Position }  from '@element-plus/icons-vue';
import { useRoute, useRouter } from 'vue-router';
  export default {
    name:'IdentityCard',  //组件名
    components: {
      Loading,User,Position
    }
  }
</script>

<template>
<div class="identity-card-box">
  <el-icon class="is-loading" v-if="isLoading">
    <Loading/>
  </el-icon>

  <div class="loading-finish" v-if="!isLoading">
    <div class="not-login" v-if="!hasLogin">
      <el-text class="not-login-text" size="large">
        欢迎登入学生论坛系统!
      </el-text>
      <el-button type="success" size="large" plain class="not-login-button" @click="toLoginPage">
        登录
      </el-button>
    </div>

    <div class="has-login" v-if="hasLogin">
      <el-text class="nickname-text" @click="toPersonalPage">
        {{ user.nickname }}
      </el-text>

      <el-tag :type="user.auth.type" effect="dark" class="tag-item">
        {{ user.auth.label }}
      </el-tag>

      <div class="data-statistics">
        <div class="statistics-item" @click="toMyLikesPage">
          <span class="statistics-num">{{ user.likeNum }}</span> 
          <span class="statistics-describe">获赞</span>
        </div>
        <el-divider direction="vertical" class="column-divider" />
        <div class="statistics-item" @click="toMyPostPage">
          <span class="statistics-num">{{ user.postNum }}</span> 
          <span class="statistics-describe">发帖</span>
        </div>
        <el-divider direction="vertical" class="column-divider" />
        <div class="statistics-item" @click="toPersonalPage">
          <span class="statistics-num">{{ user.joinNum }}</span> 
          <span class="statistics-describe">关注</span>
        </div>
      </div>

      <el-text class="register-time-text">
        于 {{ user.registerTime }} 成为论坛中的一员
      </el-text>

      <div class="operator-box">
        <button class="cta" @click="toPersonalPage">
          <el-icon class="preIcon"><User /></el-icon>
          <span class="hover-underline-animation">个人中心</span>
          <RightArraySVG class="icon"/>
        </button>
        
        <button class="cta" @click="toPersonalPostPage">
          <el-icon class="preIcon"><Position /></el-icon>
          <span class="hover-underline-animation">我的发帖</span>
          <RightArraySVG class="icon"/>
        </button>

        <el-divider class="row-divider" />
        
        <button class="cta logout" @click="doLogout">
          <el-icon class="preIcon"><LogoutSVG /></el-icon>
          <span class="hover-underline-animation">退出登录</span>
          <NoneIcon class="icon"/>
        </button>
      </div>

    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useUserInfoStore } from '@/store/UserInfo';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import axios from 'axios';
import RightArraySVG from './icon/RightArraySVG.vue';
import LogoutSVG from './icon/LogoutSVG.vue';
import NoneIcon from './icon/NoneIcon.vue';

const {ip_port} = useHttpStore();
const user = useUserInfoStore();
const router = useRouter();
const route = useRoute();

const isLoading = ref(true);
const hasLogin = ref(false);

function toMyLikesPage() {
  router.push("/message/like");
}

function toMyPostPage() {
  router.push("/personal/post/mine")
}

function toLoginPage() {
  router.push("/login");
}

function toPersonalPage() {
  router.push("/personal/activity");
}

function toPersonalPostPage() {
  router.push("/personal/post/mine")
}

//登出
function doLogout() {
  isLoading.value = true;

  Cookies.remove("Authorization");
  Cookies.remove("uid");

  user.$patch({
    uid:-1,
    sid:"",
    authority:-1,
    realName:"",
    nickname:"",
    signature:"",
    registerTime:"",
    likeNum:-1,
    bookmarkNum:-1,
    postNum:-1,
    joinNum:-1,
    avatarURL:"http://47.113.194.64:22222/image/default-avatar.png"
  })

  if (route.path === "/main") {
    window.location.reload();
  } else {
    router.push("/"); 
  }
  
  hasLogin.value = false;
  isLoading.value = false;
}

//初始化
onBeforeMount(()=>{
  if (user.uid === -1 && Cookies.get("Authorization") === undefined) {
    isLoading.value = false;
  } else if (user.uid !== -1) {
    hasLogin.value = true;
    isLoading.value = false;
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
        hasLogin.value = true;
      } else {
        window.alert(data.message);
      }
      isLoading.value = false;
    })
    .catch(function (error) {
      console.log(error);
      isLoading.value = false;
    });
  }
})

</script>


<style scoped>
@import "@/assets/cta-button.css";

.identity-card-box {
  border-radius: 8px;
  position: absolute;
  background-color: var(--vt-c-white);
  min-width: 280px;
  padding: 12px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 3;
  display: flex;
  flex-direction: column;
}

.is-loading {
  font-size: 40px;
  color: rgb(155, 155, 155);
  align-self: center;
  top: 40%;
}

.loading-finish {
  align-self: center;
  padding: 5px;
  width: 100%;
  height: 100%;
}

.not-login {
  height: 140px;
  margin-top: 13%;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
}

.not-login-text {
  font-size: 25px;
  color: #010f00;
  font-weight: bolder;
}

.not-login-button {
  margin-top: 40px;
}

/* 登入后展示的 */

.has-login {
  height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.nickname-text {
  cursor: pointer;
  margin-top: 18px;
  font-size: 30px;
}

.tag-item {
  margin-top: 13px;
}

.data-statistics {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.statistics-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.statistics-num {
  font-size: large;
  font-weight: bold;
}
.statistics-describe {
  font-size: smaller;
  color: #959595;
}
.column-divider {
  height: 25px;
  margin: 0 30px;
}

.register-time-text {
  margin-top: 13px;
  font-size: 11px;
  color: #959595;
}

.operator-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
}
.row-divider {
  width: 230px;
  margin: 9px 0;
}
.cta {
  margin: 15px 0;
}
.logout .hover-underline-animation {
  color: red;
}
.logout .hover-underline-animation:after {
  background-color: red;
}

</style>
