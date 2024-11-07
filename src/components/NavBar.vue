<script lang="ts">
  export default {
    name:'NavBar'  //组件名
  }
</script>

<template>
  <nav class="navbar">
    <div class="mainpage-return">
      <SduIcon/>

      <el-button type="primary" class="mainpage-button">
        首页
      </el-button>
    </div>

    <div class="search-container">
      <input type="text" placeholder="搜索..." v-model="searchQuery" class="search-input" />
      <button class="btn-3d">搜索</button> <!-- 添加点击事件@click -->
    </div>

    <div class="item-container">
      <img :src="avatarUrl" alt="" class="avatar" />

      <div class="nav-buttons">
        <div class="dropdown" v-for="(item, index) in navItems" :key="index">
          <button class="dropbtn">{{ item.label }}</button>
          <div class="dropdown-content">
            <a v-for="(option, idx) in item.options" :key="idx">{{ option }}</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>


<script lang="ts" setup name="NavBar">
import { ref } from 'vue'
import SduIcon from './icon/SduIcon.vue';

const searchQuery = ref('');
const avatarUrl = ref('');  //url
const navItems = ref([
  { label: '消息', options: ['点赞', '回复', '通知'] },
  { label: '动态', options: ['个人', '广场'] },
  { label: '收藏' },
  { label: '历史' },
]);
</script>


<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 10px;
  background-color: #f8f8f8;
}

.mainpage-return {
  display: flex;
  flex-direction: row;
}

.mainpage-button {
  margin-left: 10px;
}

.search-container {
  margin-left: 600px;
  display: flex;
}

.search-input {
  margin-bottom: auto;
  margin-top: auto;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 270px;
  height: 15px;
}

.btn-3d {
  margin-bottom: auto;
  margin-top: auto;
  margin-left: 10px;
  height: 25px;
  width: 50px;
  border: none;
  color: #fff;
  font-size: 15px;
  line-height: 1;
  border-radius: 5px;
  padding: 6px 10px;
  text-align: center;
  text-shadow: rgba(0,0,0,.4)1px 1px;
  transform-style:preserve-3d;
  transition:all .3s ease-out;
  background:linear-gradient(to bottom,#556270 0%,#616161 100%);
  background-color:#556270;
}

/* btn-3d:before,
btn-3d:after {
  border: none;
  content: '';
  position: absolute;
  top: calc(50%- 2px);
  left: 0;
  height: 4px;
  width: 100%;
  transform-style: preserve-3d;
  transition: all .3s ease-out;
} */

.btn-3d:before {
  background: #BD3F32;
  transform:translateZ(-1px);
  box-shadow:0 0 8px rgba(189,63,50,.7);
}

.btn-3d:after {
  background: #3F7FBC;
  transform-origin: left;
  transform: rotateY(90deg) translateZ(-1px);
  box-shadow: 0 0 8px rgba(63,127,188,.7);
}

.btn-3d:hover {
  background: linear-gradient(to bottom,skyblue 0%,#616161 100%);
  transform: translateZ(-6px);
  text-shadow: none;
  box-shadow: 0 0 8px rgba(0,0,0,.5);
}

.btn-3d:hover:before {
  transform:translatez(-13px) rotateY(60deg);
}

.btn-3d:hover:after{
  transform: rotateY(-60deg) translateZ(-13px);
 transition-delay: .05s;
}

.item-container {
  display: flex;
  flex-direction: row;
  margin-left: 200px;
}

.avatar {
  margin-top: auto;
  margin-bottom: auto;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #1800b5;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
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

.dropbtn {
  background-color: #686868;
  color: white;
  padding: 15px 10px;
  height: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #f1f1f1;
}
</style>