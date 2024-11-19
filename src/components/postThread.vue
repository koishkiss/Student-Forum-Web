<script lang="ts">
export default {
name:'postThread',
components: {

}
}
</script>

<template>
<div class="post-floor">
  <!-- 用户信息 -->
  <div class="user-info">
    <img :src="avatarURL" alt="用户头像" class="user-avatar">
    <div class="user-details">
      <span class="user-name">用户名</span>
      <span class="user-title">贴吧头衔</span>
      <span class="post-time">发帖时间：2024-11-17 12:00</span>
    </div>
  </div>
  
  <!-- 帖子内容 -->
  <div class="post-content">
    <h2 class="post-title">帖子标题</h2>
    <p class="post-text">这里是帖子的具体内容，可以包含文本、图片、视频等多媒体元素。</p>
  </div>
  
  <!-- 回复按钮 -->
  <div class="reply-section">
    <button class="reply-btn">回复</button>
  </div>
  
  <!-- 回复列表 -->
  <div class="replies">
    <div class="reply">
      <img src="" alt="回复用户头像" class="reply-avatar">
      <div class="reply-content">
        <span class="reply-user">回复用户名</span>
        <span class="reply-text">这是一条回复内容。</span>
        <span class="reply-time">回复时间：2024-11-17 12:05</span>
      </div>
    </div>
    <!-- 更多回复 -->
  </div>
</div>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router"
let props = defineProps([
  "isModerator",
  "avatarURL",
  "isPoster",
  "postId",
  "avatar",
  "commentTime",
  "content",
  "likeNum",
  "floorId",
  "uid",
  "authority",
  "replyNum",
  "nickname",
  "id"
])

</script>
<style scoped>
.post-floor {
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  /* width: 700px; */
}

.user-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.user-name, .user-title, .post-time {
  margin: 0;
  padding: 0;
}

.post-content {
  margin-bottom: 10px;
}

.post-title {
  font-size: 18px;
  margin: 0 0 5px 0;
}

.reply-section {
  text-align: right;
}

.reply-btn {
  padding: 5px 10px;
  cursor: pointer;
}

.replies {
  margin-top: 10px;
}

.reply {
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
}

.reply-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.reply-content {
  display: flex;
  flex-direction: column;
}

.reply-user, .reply-text, .reply-time {
  margin: 0;
  padding: 0;
}
</style>