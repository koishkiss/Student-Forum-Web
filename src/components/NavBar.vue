<script lang="ts">
  export default {
  components: { IdentityCard },
    name:'NavBar'  //组件名
  }
</script>

<template>
  <nav class="navbar">
    <div class="mainpage-return">
      <SduIcon/>

      <el-button :icon="House" type="success" plain text class="mainpage-button" @click="toMainPage">
        首页
      </el-button>
    </div>

    <div class="search-container">
      <el-input v-model="searchQuery" class="search-input" placeholder="搜索..." :prefix-icon="Search"/>
      <el-button :icon="Search" class="search-button" />
    </div>

    <div class="item-container">
      <div class="avatar-container" 
        @mouseenter="showIdentityCard=true" 
        @mouseleave="showIdentityCard=false"
      >
        <transition name="identity-card-content">
          <div class="identity-card-container" v-if="showIdentityCard">
            <IdentityCard/>
          </div>
        </transition>
        <el-avatar :src="user.avatarURL" class="avatar" @click="toPersonalPage"/>
      </div>

      <div class="nav-buttons">
        <div class="dropdown" v-for="(item, index) in navItems" :key="index">
          <div @mouseenter="item.visible=true" @mouseleave="item.visible=false">
            <el-button plain :icon="item.labelIcon" text class="dropbtn" @click="item.to">
              {{ item.label }}
            </el-button>

            <transition name="down-content">
              <div class="dropdown-content" v-if="item.visible">
                <a v-for="(option, idx) in item.options" :key="idx" @click="option.to">
                  {{ option.label }}
                </a>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script lang="ts" setup name="NavBar">
import { onBeforeMount, reactive, ref, markRaw } from 'vue'
import SduIcon from './icon/SduIcon.vue';
import { useRouter } from 'vue-router';
import { Clock, House, Message, Search, Star, View }  from '@element-plus/icons-vue';
import IdentityCard from './MyIdentityCard.vue';
import { useUserInfoStore } from '@/store/UserInfo';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHttpStore } from '@/store/Http';

const router = useRouter();
const { ip_port } = useHttpStore();
const user = useUserInfoStore();

const searchQuery = ref('');
const showIdentityCard = ref(false);
const navItems = reactive([
  { 
    label: '消息', 
    labelIcon: markRaw(Message), 
    options: [{label:'点赞', to:toPersonalPage}, {label:'回复', to:toPersonalPage}, {label:'通知', to:toPersonalPage}], 
    visible: false,
    to:toPersonalPage
  },
  { 
    label: '动态', 
    labelIcon: markRaw(View), 
    options: [{label:'个人', to:toPersonalPostPage}, {label:'广场', to:toPersonalPage}], 
    visible: false,
    to:toPersonalPostPage
  },
  { 
    label: '收藏', 
    labelIcon: markRaw(Star), 
    options: [], 
    visible: false,
    to:toPersonalMarkPage
  },
  { 
    label: '历史', 
    labelIcon: markRaw(Clock), 
    options: [], 
    visible: false,
    to:toPersonalPage
  }
]);

//去首页
function toMainPage() {
  router.push("/main")
}

//去个人主页动态页面
function toPersonalPage() {
  if (user.uid !== -1) {
    router.push("/personal/Activities");
  } else {
    router.push("/login")
  }
}

//去个人收藏页
function toPersonalMarkPage() {
  router.push("/personal/Collections")
}

//去个人发帖页
function toPersonalPostPage() {
  router.push("/personal/Person")
}

//初始化
onBeforeMount(()=>{
  if (user.uid === -1 && Cookies.get("Authorization") !== undefined) {
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
        window.alert(data.message);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
})

</script>


<style scoped>
@import "@/assets/avatar.css";

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1350px;
  height: 37px;
  padding: 10px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column; 
  flex-wrap: nowrap;
  justify-content: center;
  z-index: 1;
}

.mainpage-return {
  position: absolute;
  margin-left: 30px;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
}

.mainpage-button {
  margin-left: 10px;
}

.search-container {
  position: absolute;
  align-self: center;
  align-items: center;
  display: flex;
  flex-shrink: 1;
}

.search-input {
  width: 300px;
}

.search-button {
  width: 32px;
  height: 32px;
  margin-left: 10px;
}

.item-container {
  position: absolute;
  display: flex;
  align-self: flex-end;
  align-items: center;
  flex-direction: row;
  flex-shrink: 1;
}

.avatar-container {
  position: relative;
  margin-top: auto;
  margin-bottom: auto;
  width: 35px;
  height: 35px;
  /* 下面这三个让头像向下扩大，虽然我也不知道为什么 */
  display: flex;
  flex-direction: column;
  align-items: center;
}
.avatar-container:hover .avatar {
  width: 65px;
  height: 65px;
}

.identity-card-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 38px;
}

.nav-buttons {
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 45px;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin: 0 auto
}

.dropbtn:hover {
  transition: all 0.3s;
  color: #00bfff;
}

.dropbtn:active {
  transition: all 0.3s;
  color: #002aff;
}

.dropdown-content {
  cursor: pointer;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  display: block;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}

/* 身份卡片动画 */
.identity-card-content-enter-active  {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.identity-card-content-leave-active {
  transition: opacity 0.3s ease-out, transform 0.2s ease-out;
}
.identity-card-content-enter-from,
.identity-card-content-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

/* 下拉菜单动画 */
.down-content-enter-active,
.down-content-leave-active {
  transition: opacity 0.3s ease-out, transform 0.2s ease-out;
}
.down-content-enter-from,
.down-content-leave-to {
  transform: translateY(-3px);
  opacity: 0;
}
</style>