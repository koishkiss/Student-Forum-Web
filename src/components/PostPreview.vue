<script lang="ts">
import { View,ChatLineSquare } from "@element-plus/icons-vue"
import EmptyLoveSVG from "./icon/EmptyLoveSVG.vue";
import FullLoveSVG from "./icon/FullLoveSVG.vue";
import EmptyMarkSVG from "./icon/EmptyMarkSVG.vue";
import FullMarkSVG from "./icon/FullMarkSVG.vue";
export default {
  name:'PostPreview',  //组件名
  components:{
    View,ChatLineSquare,EmptyLoveSVG,FullLoveSVG,EmptyMarkSVG,FullMarkSVG
  }
}
</script>

<template>
<el-card class="post-preview-box" shadow="hover">
  <div class="preview-head-box">
    <div class="author-box">
      <el-avatar :src="avatarURL" fit="cover" class="author-avatar"/>
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
      <el-tag type="warning" v-if="status === 1" class="el-tag">精华</el-tag>
      <span class="title">{{ title }}</span>
    </el-text>

    <el-text class="post-preview-text" tag="p">
      {{ content }}
    </el-text>

    <div class="post-cover-box">
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
      <el-text class="data-num-item">
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
    </div>
  </div>
</el-card>
</template>


<script lang="ts" setup>
import { useHttpStore } from "@/store/Http";
import Cookies from "js-cookie";
import { onBeforeMount, ref } from "vue";
import axios from "axios";
import { ElNotification } from "element-plus";

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

const isLoved = ref(false);
const isMarked = ref(false);
const like_num = ref(props.likeNum);
const mark_num = ref(props.bookmarkNum);

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
      ElNotification({
        title: "请不要进行重复的操作!",
        duration:1000
      })
    } else {
      window.alert(data.message);
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
      ElNotification({
        title: "请不要进行重复的操作!",
        duration:1000
      })
    } else {
      window.alert(data.message);
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
      ElNotification({
        title: "请不要进行重复的操作!",
        duration:1000
      })
    } else {
      window.alert(data.message);
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
      ElNotification({
        title: "请不要进行重复的操作!",
        duration:1000
      })
    } else {
      window.alert(data.message);
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

.author-avatar {
  width: 30px;
  height: 30px;
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
  font-size: 20px;
  font-weight: bold;
  color: #000;
}
.el-tag {
  margin-right: 5px;
}

.post-preview-text {
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

</style>