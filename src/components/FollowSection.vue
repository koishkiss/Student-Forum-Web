<template>
    <div class="follow-section">
      <div class="management">
        <button>管理</button>
      </div>
      <div class="follow-list">
        <div v-for="block in blocks" :key="block" class="follow-item">{{ block }}</div>
      </div>
    </div>
  </template>
  
<script lang="ts" setup>
      import FollowSection from '../components/FollowSection.vue'
      import Cookies from 'js-cookie';
      import { ref, onMounted } from 'vue';
      import axios from 'axios';
      import { useHttpStore } from '@/store/Http';
      
      // 从Cookies中获取授权信息和用户ID
      const Authorization = ref(Cookies.get('Authorization') || '');
      const uidLocal = ref(Cookies.get('uid') || '');
      
      // 使用HttpStore获取IP和端口配置
      const { ip_port } = useHttpStore();
      
      // 定义响应数据的状态
      const loading = ref(false);
      const name = ref('加载中...');
      const uid = ref('');
      const postCount = ref(0); // 发帖数，可以在另一个API请求中获取
      const signature = ref('');
      const blocks=ref([])
      // 在组件挂载时请求用户数据
      onMounted(() => {
          loading.value = true;
    
          // 设置请求头
          const headers = {
              Authorization: Authorization.value,
              uid: uidLocal.value,
          };
      
          // 发送GET请求，获取用户信息
          axios.get(`${ip_port}/section/mine`, { headers })
          .then((response) => {
              const { code, message, data } = response.data;
              if (code === 200 && data) {
              // 将后端返回的数据赋值到Vue状态中
              blocks.value=data
              // 这里假设发帖数为0，具体获取发帖数的API可以再进行调用
              postCount.value = 0; 
              } else {
              console.error(`获取用户信息失败: ${message}`);
              }
          })
          .catch((error) => {
              console.error('请求错误:', error);
          })
          .finally(() => {
              loading.value = false;
          });
      });
      //后端没有发帖数数据，暂时设置为0
      postCount.value=0
</script>
  
<style scoped>
  .follow-section {
    flex: 3; /* 30% 宽度 */
    background-color: #8fbc8f;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .management button {
    width: 100%;
    background-color: #4072b5;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .follow-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }
  
  .follow-item {
    width: calc(50% - 10px);
    height: 160px;
    background-color: #f0a500;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #333;
    border-radius: 4px;
  }
</style>
  