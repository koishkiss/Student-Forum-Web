<script lang="ts">
import CommentBoxForComment from "./CommentBoxForComment.vue";
import UserPreviewIdentityCard from "./UserPreviewIdentityCard.vue";
import EmptyLoveSVG from "./icon/EmptyLoveSVG.vue";
import FullLoveSVG from "./icon/FullLoveSVG.vue";
export default {
  name:'postThread',
  components: {
    CommentBoxForComment,UserPreviewIdentityCard,EmptyLoveSVG,FullLoveSVG
  }
}
</script>

<template>
<div class="post-floor">
  <!-- 用户信息 -->
  <div class="user-info">
    <div class="avatar-container" 
      @mouseenter="userInfoCardEnter" 
      @mouseleave="userInfoCardDelayLeave"
    >
      <transition name="user-identity-card-content">
        <div class="identity-card-container" v-if="showUserIdentityCard">
          <UserPreviewIdentityCard :theUid="uid"/>
        </div>
      </transition>
      <el-avatar @click="toPersonalPageForVisitor" :src="avatarURL" shape="square" fit="cover" class="author-avatar"/>
    </div>

    <div class="user-name-box">
      <el-text @click="toPersonalPageForVisitor" class="user-name">{{ nickname }}</el-text>
    </div>

    <div class="user-tag-box">
      <el-tag v-if="isPoster" type="primary">
        楼主
      </el-tag>

      <el-tag v-if="isModerator" type="warning">
        版主
      </el-tag>
    </div>
  </div>
  
  <!-- 评论内容 -->
  <div class="comment-content-box">
    <div class="comment-text-box">
      <el-text tag="p" class="comment-text">
        {{ content }}
      </el-text>
    </div>
    
    <div class="comment-bottom-box">
      <el-text class="data-num-item" @click="isLoved?dislike():like()" >
        <el-icon class="operator-svg">
          <EmptyLoveSVG v-if="!isLoved" />
          <FullLoveSVG v-if="isLoved" />
        </el-icon>
        <span>{{ like_num }}</span>
      </el-text>

      <el-text class="comment-time">
        {{ commentTime }}
      </el-text>

      <el-text class="comment-floor-id">
        {{ floorId }}楼
      </el-text>

      <el-button class="reply-btn" @click="extend=!extend" text >
        {{ extend ? `收起(${replyNum})` : `回复(${replyNum})` }}
      </el-button>
    </div>

    <div v-if="extend" class="reply-list-box">
      <CommentBoxForComment :commentId="commentId"/>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import axios from "axios";
import { useHttpStore } from "@/store/Http";
import { ElMessage, ElMessageBox } from "element-plus";
import Cookies from "js-cookie";
import { ref } from "vue";
import { useRouter } from "vue-router";

const { ip_port } = useHttpStore();
const router = useRouter();
const extend = ref(false);

const props = defineProps([
  "isModerator",
  "isPoster",
  "nickname",
  "uid",
  "avatarURL",
  "content",
  "floorId",
  "commentTime",
  "commentId",
  "likeNum",
  "replyNum",
  "likeTime"
])

const like_num = ref(props.likeNum);
const isLoved = ref(props.likeTime !== undefined)

const showUserIdentityCard = ref(false);
var timeId;
function toPersonalPageForVisitor(){
  if(props.uid == Cookies.get("uid")) router.push('personal/activity');
  else router.push(`/visit/other/person/${props.uid}/post`);
}
function userInfoCardEnter() {
  if (timeId !== undefined) {
    clearTimeout(timeId);
  } else {
    showUserIdentityCard.value = true;
  }
}
function userInfoCardDelayLeave() {
  timeId = setTimeout(()=>{
    showUserIdentityCard.value=false;
    timeId = undefined;
  },100)
}

function like() {
  axios({
    method:"get",
    url:`${ip_port}/comment/like?commentId=${props.commentId}`,
    headers:{
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isLoved.value = true;
      like_num.value += 1;
    } else if (data.code === 40012) {
      ElMessage({message:"操作的太快了！休息一下吧",type:"error"});
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

function dislike() {
  axios({
    method:"get",
    url:`${ip_port}/comment/disLike?commentId=${props.commentId}`,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isLoved.value = false;
      like_num.value -= 1;
    } else if (data.code === 40012) {
      ElMessage({message:"操作的太快了！休息一下吧",type:"error"});
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

</script>


<style scoped>
.post-floor {
  border: solid 1px rgb(211, 211, 211);
  display: flex;
  flex-direction: row;
  min-height: 200px;
}

.user-info {
  padding: 20px;
  width: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ececec;
}

.avatar-container {
  width: 100px;
  height: 100px;
}
.avatar-container:hover .author-avatar {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease-in-out;
}
.author-avatar {
  border: double rgb(183, 183, 183);
  cursor: pointer;
  width: 100px;
  height: 100px;
  transition: all 0.2s ease-in-out;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -30px;
}

.user-name-box {
  margin-top: 10px;
}
.user-name {
  font-size: 13px;
}

.user-tag-box {
  margin-top: 10px;
}

.comment-content-box {
  flex: 1;
  padding: 15px;
  padding-bottom: 5px;
}

.comment-text-box {
  min-height: 145px;
}

.comment-text {
  line-height: 24px;
  white-space: pre-line;
  font-size: 14px;
  color: #252525;
}

.comment-bottom-box {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.data-num-item {
  width: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}
.operator-svg {
  width: 30px;
  transition: font-size 0.1s;
}
.data-num-item:hover .operator-svg {
  font-size: 18px;
  transition: font-size 0.1s;
}
.data-num-item:active .operator-svg {
  font-size: 16px;
  transition: font-size 0.1s;
}
.data-num-item span {
  width: 20px;
  margin-left: 0;
}

.comment-time {
  margin-left: 5px;
}

.comment-floor-id {
  margin-left: 10px;
}

.reply-btn {
  margin-left: 10px;
  width: 50px;
  height: 30px;
}

.reply-list-box {
  background-color: #f3f3f3;
  border-radius: 5px;
  padding: 10px 15px;
}



/* 发帖者身份卡片动画 */
.user-identity-card-content-enter-active  {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.user-identity-card-content-leave-active {
  transition: opacity 0.3s ease-out, transform 0.2s ease-out;
}
.user-identity-card-content-enter-from,
.user-identity-card-content-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>