<script lang="ts">
import { View,ChatLineSquare } from "@element-plus/icons-vue";
import UserPreviewIdentityCard from "./UserPreviewIdentityCard.vue";
import EmptyLoveSVG from "./icon/EmptyLoveSVG.vue";
import FullLoveSVG from "./icon/FullLoveSVG.vue";
import EmptyMarkSVG from "./icon/EmptyMarkSVG.vue";
import FullMarkSVG from "./icon/FullMarkSVG.vue";
export default {
  name:'PostContentBox',
  components: {
    UserPreviewIdentityCard,EmptyLoveSVG,FullLoveSVG,EmptyMarkSVG,FullMarkSVG,ChatLineSquare
  }
}
</script >

<template>
<div class="post-content" v-if="!isLoading">
  <!-- 用户信息 -->
  <div class="user-info">
    <div class="avatar-container" 
      @mouseenter="userInfoCardEnter" 
      @mouseleave="userInfoCardDelayLeave"
    >
      <transition name="user-identity-card-content">
        <div class="identity-card-container" v-if="showUserIdentityCard">
          <UserPreviewIdentityCard :theUid="content.uid"/>
        </div>
      </transition>
      <el-avatar :src="content.avatarURL" shape="square" fit="cover" class="author-avatar"/>
    </div>

    <div class="user-name-box">
      <el-text class="user-name">{{ content.nickname }}</el-text>
    </div>

    <div class="user-tag-box">
      <el-tag type="primary">
        楼主
      </el-tag>

      <el-tag v-if="content.isModerator" type="warning">
        版主
      </el-tag>
    </div>
  </div>
  
  <!-- 评论内容 -->
  <div class="comment-content-box">
    <div class="comment-text-box">
      <el-text tag="p" class="comment-text">
        {{ content.content }}
      </el-text>

      <div class="post-cover-box" v-if="content.coverURL!=undefined">
        <el-image 
          :src="content.coverURL" 
          fit="cover" 
          class="post-cover" 
          lazy
          :preview-src-list="[content.coverURL]" 
          :initial-index="0"
        />
      </div>
    </div>
    
    <div class="comment-bottom-box">
      <el-text class="data-num-item" @click="content.isLiked?dislike():like()" >
        <el-icon class="operator-svg">
          <EmptyLoveSVG v-if="!content.isLiked" />
          <FullLoveSVG v-if="content.isLiked" />
        </el-icon>
        <span>{{ content.likeNum }}</span>
      </el-text>

      <el-text class="data-num-item" @click="content.isMarked?dismark():mark()" >
        <el-icon class="operator-svg">
          <EmptyMarkSVG v-if="!content.isMarked" />
          <FullMarkSVG v-if="content.isMarked" />
        </el-icon>
        <span>{{ content.bookmarkNum }}</span>
      </el-text>

      <el-text class="comment-time">
        {{ content.postTime }}
      </el-text>

      <el-text class="comment-floor-id">
        1楼
      </el-text>
    </div>
  </div>

</div>
</template>


<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from "vue";
import Cookies from "js-cookie";
import axios from "axios";
import { useHttpStore } from "@/store/Http";
import { PostContent } from "@/types";
import { ElMessage, ElMessageBox } from "element-plus";

const props = defineProps(["id"]);

const isLoading = ref(true);
const { ip_port } = useHttpStore();

let content = reactive<PostContent>({
  postId: -1,
  sectionId: -1,
  uid: -1,
  avatarURL: "",
  nickname: "",
  isModerator: false,
  title: "",
  coverURL: "",
  content: "",
  postTime: "",
  viewNum: -1,
  likeNum: -1,
  bookmarkNum: -1,
  commentNum: -1,
  status: -1,
  isLiked: false,
  isMarked: false
});

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
      content.isLiked = true;
      content.likeNum += 1;
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
      content.isLiked = false;
      content.likeNum -= 1;
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
      content.isMarked = true;
      content.bookmarkNum += 1;
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
      content.isMarked = false;
      content.bookmarkNum -= 1;
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

onBeforeMount(()=>{
  axios({
    method:"get",
    url: `${ip_port}/post/view?postId=${props.id}`,
    headers: {
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      content = data.data;
      isLoading.value = false;
    } else {
      isLoading.value = false;
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
    isLoading.value = false;
  });
})

</script>


<style scoped>
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
  font-size: 16px;
  color: #000;
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

.post-cover-box {
  max-height: 400px;
  margin-top: 5px;
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
