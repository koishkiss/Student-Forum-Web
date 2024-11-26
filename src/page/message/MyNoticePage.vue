<script lang="ts">
export default {
  name: "MyNoticePage",
};
</script>

<template>
  <div class="my-notice-page-box">
    <el-text class="box-title" tag="p">
      通知中心
    </el-text>
    <div class="my-notice-list-box">
      <ul class="notice-list">
        <li v-for="(notice, index) in noticeList" :key="index" class="notice-item">
          <div class="notice-item-box">
            <el-text tag="p" class="notice-content">{{ notice }}</el-text>
          </div>
          <el-divider style="margin-top: 10px; margin-bottom: 10px;" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

// 静态数据
const noticeList = reactive([
  "通知1：这是第一条通知",
  "通知2：这是第二条通知",
]);
</script>

<style scoped>
.box-title {
  position: sticky;
  top: 57px;
  background-color: #fff;
  z-index: 1;
  color: #343434;
  font-size: 30px;
  font-weight: bold;
}

.my-notice-list-box {
  margin-top: 10px;
}

.notice-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.notice-item {
  background-color: #fff;
  padding: 5px;
}

.notice-item-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
}

.notice-content {
  color: #141414;
  font-size: 16px;
}
</style>
