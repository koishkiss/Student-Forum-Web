<script lang="ts">
import { View,ChatLineSquare,CirclePlus } from "@element-plus/icons-vue";
import EmptyLoveSVG from "./icon/EmptyLoveSVG.vue";
import FullLoveSVG from "./icon/FullLoveSVG.vue";
import EmptyMarkSVG from "./icon/EmptyMarkSVG.vue";
import FullMarkSVG from "./icon/FullMarkSVG.vue";
import UserPreviewIdentityCard from "./UserPreviewIdentityCard.vue";
export default {
  name:'PostPreview',  //组件名
  components:{
    View,ChatLineSquare,EmptyLoveSVG,FullLoveSVG,EmptyMarkSVG,FullMarkSVG,UserPreviewIdentityCard,CirclePlus
  }
}
</script>

<template>
<el-card class="post-preview-box" shadow="hover">
  <div class="preview-head-box">
    <div class="author-box">
      <div class="avatar-container" 
        @mouseenter="userInfoCardEnter" 
        @mouseleave="userInfoCardDelayLeave"
        @click="toPersonalPageForVisitor"
      >
        <transition name="user-identity-card-content">
          <div class="identity-card-container" v-if="showUserIdentityCard">
            <UserPreviewIdentityCard :theUid="uid"/>
          </div>
        </transition>
        <el-avatar :src="avatarURL" fit="cover" class="author-avatar"/>
      </div>
      <el-divider direction="vertical" class="divider-between-name-avatar" />
      <el-text class="author-name">
        {{ nickname }}
      </el-text>
    </div>

    <el-text class="view-num">
      <el-icon><View /></el-icon>
      <span>{{ viewNum }}</span>
    </el-text>
  </div>

  <div class="post-content-box">
    <el-text class="post-title">
      <el-tag type="warning" v-if="isSelected" class="el-tag">精华</el-tag>
      <span class="title" @click="toPostPage">{{ title }}</span>
    </el-text>

    <el-text class="post-preview-text" tag="p" @click="toPostPage">
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

    <div class="post-time-box">
      <el-text class="post-time">发布于 {{ postTime }}</el-text>
    </div>
  </div>

  <el-divider style="margin:5px 0;" />

  <div class="post-data-box"> 
    <div class="post-data-num-box">
      <el-text class="data-num-item" @click="toPostPage">
        <el-icon class="operator-svg">
          <ChatLineSquare />
        </el-icon>
        <span>{{ commentNum }}</span>
      </el-text>
      <el-text class="data-num-item" @click="isLoved?dislike():like()" >
        <el-icon class="operator-svg">
          <EmptyLoveSVG v-if="!isLoved" />
          <FullLoveSVG v-if="isLoved" />
        </el-icon>
        <span>{{ like_num }}</span>
      </el-text>
      <el-text class="data-num-item" @click="isMarked?dismark():mark()" >
        <el-icon class="operator-svg">
          <EmptyMarkSVG v-if="!isMarked" />
          <FullMarkSVG v-if="isMarked" />
        </el-icon>
        <span>{{ mark_num }}</span>
      </el-text>
      <el-dropdown :show-timeout="0" :hide-timeout="70" v-if="user.authority >= 3" >
        <el-text class="data-num-item">
          <el-icon class="operator-svg"><CirclePlus /></el-icon>
        </el-text>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="unselectPost" v-if="isSelected">取消精华</el-dropdown-item>
            <el-dropdown-item @click="selectePost" v-else>设为精华</el-dropdown-item>
            <el-dropdown-item @click="deletePost">删除</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</el-card>
</template>


<script lang="ts" setup>
import { useUserInfoStore } from "@/store/UserInfo";
import { useHttpStore } from "@/store/Http";
import Cookies from "js-cookie";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { ElMessage,ElMessageBox } from "element-plus";
import { useRouter } from "vue-router";

let props = defineProps([
  "id",
  "sectionId",
  "title",
  "content",
  "coverURL",
  "postTime",
  "like_time",
  "mark_time",
  "commentNum",
  "viewNum",
  "likeNum",
  "bookmarkNum",
  "uid",
  "nickname",
  "avatarURL",
  "status"
])

const { ip_port } = useHttpStore();
const router = useRouter();
const user = useUserInfoStore();

const showUserIdentityCard = ref(false);
const isLoved = ref(false);
const isMarked = ref(false);
const like_num = ref(props.likeNum);
const mark_num = ref(props.bookmarkNum);
const isSelected = ref(false);

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

function toPostPage() {
  router.push(`/post?id=${props.id}`);
}
function toPersonalPageForVisitor(){
  // router.push({
  //   name:"visit-other-personal-page",
  //   params:{
  //     uid:props.uid,
  //   }
  // })
  if(props.uid != Cookies.get("uid") )
  router.push(`/visit/other/person/${props.uid}/post`);
}

//喜欢帖子
function like() {
  axios({
    method:"get",
    url:ip_port + "/post/like?postId=" + props.id,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
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

//取消喜欢帖子
function dislike() {
  axios({
    method:"get",
    url:ip_port + "/post/disLike?postId=" + props.id,
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

//标签帖子
function mark() {
  axios({
    method:"get",
    url:ip_port + "/post/mark?postId=" + props.id,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isMarked.value = true;
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
    url:ip_port + "/post/disMark?postId=" + props.id,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isMarked.value = false;
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

function deletePost() {
  ElMessage({message:"功能未实现!",type:"error"});
}

function selectePost() {
  axios({
    method:"get",
    url:ip_port + "/post/select?postId=" + props.id + "&sectionId=" + props.sectionId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isSelected.value = true;
      ElMessage({message:"加精成功！",type:"warning"});
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

function unselectPost() {
  axios({
    method:"get",
    url:ip_port + "/post/disSelect?postId=" + props.id + "&sectionId=" + props.sectionId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      isSelected.value = false;
      ElMessage({message:"取消加精成功！",type:"warning"});
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

//初始化
onBeforeMount(()=>{
  if (props.like_time !== undefined) {
    isLoved.value = true;
  }
  if (props.mark_time !== undefined) {
    isMarked.value = true;
  }
  if (props.status === 1) {
    isSelected.value = true;
  }
})

</script>


<style scoped>
.post-preview-box {
  display: flex;
  flex-direction: column;
}

.preview-head-box {
  display: flex;
  flex-direction: row;
}

.author-box {
  display: flex;
  flex-direction: row;
  align-self: flex-start;
}

.avatar-container {
  width: 30px;
  height: 30px;
}
.avatar-container:hover .author-avatar {
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
  transition: all 0.1s ease-in-out;
}
.author-avatar {
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: all 0.2s ease-in-out;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -55px;
}

.divider-between-name-avatar {
  top: 0;
  bottom: 0;
  margin: auto;
  margin-left: 6px;
  margin-right: 6px;
  height: 22px;
}

.author-name {
  font-size: 16px;
}

.view-num {
  display: flex;
  margin: auto;
  margin-right: 10px;
  flex-direction: row;
  align-items: center;
  justify-items: start;
  font-size: 14px;
}
.view-num span {
  margin-left: 3px;
}

.post-content-box {
  margin-top: 10px;
}

.post-title {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.post-title .title {
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: #000;
}
.el-tag {
  margin-right: 5px;
}

.post-preview-text {
  cursor: pointer;
  white-space: pre-line;
  margin-top: 5px;
}

.post-cover-box {
  max-height: 400px;
  margin-top: 5px;
  display: flex;
}
.post-cover {
  border-radius: 5px;
  width: 100%;
}

.post-preview-text + .post-time-box {
  margin-top: 10px;
}

.post-time-box {
  display: flex;
  flex-direction: row;
}
.post-time {
  margin: auto;
  margin-top: 7px;
  margin-bottom: 5px;
  margin-right: 8px;
  align-self: flex-end;
  font-size: 11px;
  color: #747474;
}

.post-data-box {
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  justify-items: center;
}

.post-data-num-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
  margin-left: 4px;
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