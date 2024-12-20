<script lang="ts">
import { View } from "@element-plus/icons-vue";
import UserPreviewIdentityCard from "./UserPreviewIdentityCard.vue";
import EmptyLoveSVG from "./icon/EmptyLoveSVG.vue";
import FullLoveSVG from "./icon/FullLoveSVG.vue";
import EmptyMarkSVG from "./icon/EmptyMarkSVG.vue";
import FullMarkSVG from "./icon/FullMarkSVG.vue";
export default {
  name:'PostContentBox',
  components: {
    UserPreviewIdentityCard,EmptyLoveSVG,FullLoveSVG,EmptyMarkSVG,FullMarkSVG,View
  }
}
</script>

<template>
<div class="post-content">
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
      <el-text class="user-name" @click="toPersonalPageForVisitor">{{ nickname }}</el-text>
    </div>

    <div class="user-tag-box">
      <el-tag type="primary">
        楼主
      </el-tag>

      <el-tag v-if="isModerator" type="warning">
        版主
      </el-tag>
    </div>
  </div>
  
  <!-- 评论内容 -->
  <div class="comment-content-box">
    <div class="post-title">
      <el-text style="font-size: 23px; font-weight: bold;">
        {{ title }}
      </el-text>
    </div>

    <div class="comment-text-box">
      <el-text tag="p" class="comment-text">
        {{ content }}
      </el-text>

      <div class="post-cover-box" v-if="coverURL!=undefined">
        <el-image 
          :src="coverURL" 
          fit="cover" 
          class="post-cover" 
          lazy
          :preview-src-list="[coverURL]" 
          :initial-index="0"
        />
      </div>
    </div>
    
    <div class="comment-bottom-box">
      <el-text class="data-num-item" style="cursor: auto;">
        <el-icon class="non-operator-svg">
          <View />
        </el-icon>
        <span>{{ viewNum }}</span>
      </el-text>

      <el-text class="data-num-item" @click="loved?dislike():like()" >
        <el-icon class="operator-svg">
          <EmptyLoveSVG v-if="!loved" />
          <FullLoveSVG v-if="loved" />
        </el-icon>
        <span>{{ like_num }}</span>
      </el-text>

      <el-text class="data-num-item" @click="marked?dismark():mark()" >
        <el-icon class="operator-svg">
          <EmptyMarkSVG v-if="!marked" />
          <FullMarkSVG v-if="marked" />
        </el-icon>
        <span>{{ mark_num }}</span>
      </el-text>

      <el-text class="comment-time">
        {{ postTime }}
      </el-text>

      <el-text class="comment-floor-id">
        1楼
      </el-text>
    </div>
  </div>

</div>
</template>


<script lang="ts" setup>
import { ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import { useHttpStore } from "@/store/Http";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

const props = defineProps([
  "postId",
  "sectionId",
  "uid",
  "avatarURL",
  "nickname",
  "isModerator",
  "title",
  "coverURL",
  "content",
  "postTime",
  "viewNum",
  "likeNum",
  "bookmarkNum",
  "commentNum",
  "status",
  "isLiked",
  "isMarked"
]);

const { ip_port } = useHttpStore();
const router = useRouter();
const loved = ref(props.isLiked);
const like_num = ref(props.likeNum);
const marked = ref(props.isMarked);
const mark_num = ref(props.bookmarkNum);

const showUserIdentityCard = ref(false);
var timeId;
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
function toPersonalPageForVisitor(){
  if(props.uid == Cookies.get("uid")) router.push('personal/activity');
  else router.push(`/visit/other/person/${props.uid}/post`);
}
//喜欢帖子
function like() {
  axios({
    method:"get",
    url:ip_port + "/post/like?postId=" + props.postId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      loved.value = true;
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

//取消喜欢帖子
function dislike() {
  axios({
    method:"get",
    url:ip_port + "/post/disLike?postId=" + props.postId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      loved.value = false;
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

//标签帖子
function mark() {
  axios({
    method:"get",
    url:ip_port + "/post/mark?postId=" + props.postId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      marked.value = true;
      mark_num.value += 1;
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

//取消标签
function dismark() {
  axios({
    method:"get",
    url:ip_port + "/post/disMark?postId=" + props.postId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      marked.value = false;
      mark_num.value -= 1;
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
.post-title {
  margin: 0 0 10px 0;
}

.post-content {
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
  margin-left: 10px;
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
.non-operator-svg {
  width: 30px;
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

.post-cover-box {
  max-height: 400px;
  margin-top: 10px;
  display: flex;
}
.post-cover {
  border-radius: 5px;
  width: 100%;
}

.comment-floor-id {
  margin-left: 10px;
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
