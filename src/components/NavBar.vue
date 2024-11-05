<template>
  <nav class="navbar">
    <div class="search-container">
      <input type="text" placeholder="搜索..." v-model="searchQuery" class="search-input" />
      <button class="btn-3d">搜索</button> <!-- 添加点击事件@click -->
      <img :src="avatarUrl" alt="" class="avatar" />
      <div class="nav-buttons">
        <div class="dropdown" v-for="(item, index) in navItems" :key="index">
          <button class="dropbtn">{{ item.label }}</button>
          <div class="dropdown-content">
            <a v-for="(option, idx) in item.options" :key="idx" href="#">{{ option }}</a>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup name="NavBar">
import { ref } from 'vue'

const searchQuery = ref('');
const avatarUrl = ref('');  //url
const navItems = ref([
  { label: '导航1', options: ['选项1', '选项2'] },
  { label: '导航2', options: ['选项1', '选项2'] },
  { label: '导航3', options: ['选项1', '选项2'] },
  { label: '导航4', options: ['选项1', '选项2'] },
]);
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  background-color: #f8f8f8;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 10px;
  margin-left: 500px;
  width: 300px;
  flex: 0.6;
}

.btn-3d {
  border: none;
  color: #fff;
  font-size: 18px;
  line-height: 1;
  margin: 20px;
  padding: 7px 12px;
  position: relative;
  text-align: center;
  text-shadow: rgba(0,0,0,.4)1px 1px;
  transform-style:preserve-3d;
  transition:all .3s ease-out;
  background:linear-gradient(to bottom,#556270 0%,#616161 100%);
  background-color:#556270;
}

btn-3d:before,
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
}

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

.avatar {
  display: flex;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 2px solid #1800b5;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  margin-left: auto;
}

.nav-buttons {
  display: flex;
  align-items: center;
  margin-left: auto;
  margin-right: 20px;
}

.dropdown {
  position: relative;
  display: inline-block;
  margin: 0 10px
}

.dropbtn {
  background-color: #01a2ff;
  color: white;
  padding: 15px 21px;
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