<script lang="ts">
export default {
  name:"MessagePage"
}
</script>

<template>
<div class="message-page-box">
  <div class="message-page-content">
    <div class="router-link-box">
      <RouterLink to="/message/like" class="router" active-class="router-choose">
        <div class="router-button">
          收到的赞
        </div>
      </RouterLink>
      <RouterLink to="/message/reply" class="router" active-class="router-choose">
        <div class="router-button">
          回复我的
        </div>
      </RouterLink>
      <RouterLink to="/message/notice" class="router" active-class="router-choose">
        <div class="router-button">
          我的通知
        </div>
      </RouterLink>
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

.message-page-box {
  padding: 150px 300px;
  margin-top: 20px;
  margin: 0 auto;
}

.message-page-content {
  flex: 7; /* 70% 宽度 */
  display: flex;
  flex-direction: row;
  padding: 20px;
  padding-top: 0;
}

.router-link-box {
  flex: 2; /* 占左边 30% */
  background-color: #F5F7FA;
  height: 500px;
  display: flex;
  flex-direction: column;
}

.router {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background-color: #c2c2c2;
}

.router-button {
  margin-right: 10px;
  font-size: 20px;
}

.router-view-box {
  flex: 5; /* 占右边 70% */
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

</style>
