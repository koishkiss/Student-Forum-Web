<script lang="ts">
export default {
  name:"MessagePage"
}
</script>

<template>
<div class="message-page-box">
  <div class="message-page-content">
    <div class="router-link-box">
      <div class="router-link-content">
        <RouterLink to="/message/like" class="better-router-link" active-class="router-choose">
          <el-text class="router-text">收到的赞</el-text>
        </RouterLink>
        <RouterLink to="/message/reply" class="better-router-link" active-class="router-choose">
          <el-text class="router-text">回复我的</el-text>
        </RouterLink>
        <RouterLink to="/message/notice" class="better-router-link" active-class="router-choose">
          <el-text class="router-text">我的通知</el-text>
        </RouterLink>
      </div>
    </div>

    <div class="router-view-box">
      <RouterView/>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>

</script>


<style scoped>
@import "@/assets/better-router-link.css";

.message-page-box {
  padding: 150px 300px;
  margin-top: 20px;
  margin: 0 auto;
}

.message-page-content {
  flex: 7; 
  background-color: #F5F7FA;
  display: flex;
  flex-direction: row;
  padding-top: 0;
}

.router-link-box {
  flex: 2;
}

.router-link-content {
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  background-color: #f1feff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.better-router-link {
  height: 50px;
  margin-top: 1px;
  margin-bottom: 1px;
  text-decoration: none;
  display: flex;
  align-items: center;
}
.router-text {
  margin-left: 15px;
  text-shadow: 0.8px 0.8px 1.3px grey;
  font-family: initial;
  color: #1b1b1b;
  font-size: 23px;
}
.better-router-link:hover .router-text {
  color: #000000;
}

.router-choose .router-text {
  color: #000000;
}
.router-choose::before {
  width: 100%;
}

.router-view-box {
  flex: 6; /* 占右边 70% */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

</style>
