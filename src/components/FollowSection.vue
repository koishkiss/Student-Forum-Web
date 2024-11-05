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
  import { ref } from 'vue'
  //板块信息
  const blocks = ref(['板块1', '板块2', '板块3', '板块4'])
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
  