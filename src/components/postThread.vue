<script lang="ts">
import PostingBoxforComment from "./PostingBoxforComment.vue";
import CommentBoxForComment from "./CommentBoxForComment.vue";
import { ref } from "vue";
export default {
name:'postThread',
components: {
CommentBoxForComment

}
}
</script>

<template>
<div class="post-floor">
  <!-- 用户信息 -->
  <div class="user-info">
    <img :src="avatarURL" alt="用户头像" class="user-avatar">
    <div class="user-details">
      <span class="user-name">{{ nickname }}</span>
      <!-- <span class="user-title">贴吧头衔</span> -->
      <!-- <span class="post-time">发帖时间：{{ commentTime }}</span> -->
    </div>
  </div>
  
  <!-- 帖子内容 -->
  <div class="post-content">
    <!-- <h2 class="post-title">帖子标题</h2> -->
    <p class="post-text">{{ content }}</p>
  </div>
  
  <!-- 回复按钮 -->
  <div class="reply-section">
    <span class="post-time">{{ commentTime }}</span>
    <el-button class="reply-btn" @click="extend=!extend" >回复</el-button>
  </div>
  <div v-if="extend">
    <CommentBoxForComment :commentId="props.commentId"/>
    <div>
      <PostingBoxforComment :commentId="props.commentId"/>
    </div>
  </div>
  
</div>
</template>
<script lang="ts" setup>
import {useRouter} from "vue-router"
import Cookies from 'js-cookie';
import { useHttpStore } from '@/store/Http';
const { ip_port } = useHttpStore();
const extend=ref(false)
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
  "commentId"
])

// function relypost{

// }

// axios({
//   method:"get",
//   url:ip_port+"/reply/get",
//   params:{
//     commentId:"id",
//   },
//   headers:{
//         "Authorization":Cookies.get("Authorization"),
//         "uid":Cookies.get("uid")
//     },
// })
// .then((response)=> {
//   const data = response.data;
//   if(data.code === 200){
    
//   }
// })
console.log(props.commentId)
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
.reply-box{
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
  flex-direction: rows;
}

.reply-user, .reply-text {
  margin: 0;
  padding: 0;
}
.reply-time{
  margin: 0;
  padding: 0;
}
</style>