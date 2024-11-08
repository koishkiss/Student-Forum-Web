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

      <el-button :icon="House" type="success" plain text class="mainpage-button">
        首页
      </el-button>
    </div>

    <div class="search-container">
      <el-input v-model="searchQuery" class="search-input" placeholder="搜索..." :prefix-icon="Search"/>
      <el-button :icon="Search" class="search-button" />
    </div>

    <div class="item-container">
      <div class="avatar-container" @mouseenter="showIdentityCard=true" @mouseleave="showIdentityCard=true">
        <transition name="identity-card-content">
          <div class="identity-card-container" v-if="showIdentityCard">
            <IdentityCard/>
          </div>
        </transition>
        <el-avatar :src="user.avatarURL" class="avatar"/>
      </div>

      <div class="nav-buttons">
        <div class="dropdown" v-for="(item, index) in navItems" :key="index">
          <div @mouseenter="item.visible=true" @mouseleave="item.visible=false">
            <el-button plain :icon="item.labelIcon" text class="dropbtn">
              {{ item.label }}
            </el-button>

            <transition name="down-content">
              <div class="dropdown-content" v-if="item.visible">
                <a v-for="(option, idx) in item.options" :key="idx">
                  {{ option }}
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
import { ref } from 'vue'
import SduIcon from './icon/SduIcon.vue';
import { useRouter } from 'vue-router';
import { Clock, House, Message, Search, Star, View }  from '@element-plus/icons-vue';
import IdentityCard from './IdentityCard.vue';
import { useUserInfoStore } from '@/store/UserInfo';

const user = useUserInfoStore();
const searchQuery = ref('');
const showIdentityCard = ref(false);
const navItems = ref([
  { label: '消息', labelIcon: Message, options: ['点赞', '回复', '通知'], visible: false },
  { label: '动态', labelIcon: View, options: ['个人', '广场'], visible: false },
  { label: '收藏', labelIcon: Star, options: [], visible: false },
  { label: '历史', labelIcon: Clock, options: [], visible: false },
]);

const router = useRouter();

</script>


<style scoped>
@import "@/assets/avatar.css";

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 37px;
  padding: 10px;
  background-color: #f8f8f8;
  display: flex;
  flex-direction: column; 
  justify-content: center;
}

.mainpage-return {
  position: absolute;
  align-self: flex-start;
  display: flex;
  flex-direction: row;
}

.mainpage-button {
  margin-left: 10px;
}

.search-container {
  position: absolute;
  align-self: center;
  align-items: center;
  display: flex;
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