<template>
  <div style="height: 95%; width: 99%; position: absolute;">
    <!-- 背景图 -->
    <!-- <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;">
      <img :src="ip_port + '/image/static/background002.jpg'" style="width: 100%; height: 100%; object-fit: cover;" alt="背景图">
    </div> -->
    
    <!-- 导航栏 -->
    <NavBar/>

    <!-- 主视图 -->
    <div class="view-box">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
// import { useHttpStore } from './store/Http';
// import use3DBackground from './hooks/Background3D';

// const { ip_port } = useHttpStore();
// use3DBackground(ip_port);

</script>

<style>
.view-box {
  margin-top: 37px;
  padding-top: 10px;
  z-index: 1; /* 确保内容在背景图之上 */
}

canvas {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
}
</style>
