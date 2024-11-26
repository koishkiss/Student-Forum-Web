<script lang="ts">
import UserPreviewIdentityCard from '@/components/UserPreviewIdentityCard.vue';
import { Loading } from '@element-plus/icons-vue';
export default {
  name:"MyReplyPage",
  components:{
    UserPreviewIdentityCard,Loading
  }
}
</script>

<template>
<div class="my-reply-page-box">
<el-text class="box-title" tag="p">
  回复我的
</el-text>

<div v-if="!isFirstLoading&&!isEmpty" class="my-reply-list-box">
  <ul 
    v-infinite-scroll="loadMore" 
    :infinite-scroll-disabled="isLoadingMore || noMore" 
    class="reply-list" 
  >
    <li v-for="(reply,index) in replyList" :key="index" class="reply-item">
      <div class="reply-item-box">
        <div class="reply-item-box-left">
          <el-text tag="p" class="reply-title">
            <span class="reply-nickname" 
              @mouseenter="userInfoCardEnter(index)" 
              @mouseleave="userInfoCardDelayLeave(index)"
            >
              <transition name="user-identity-card-content">
                <div class="identity-card-container" v-if="showUserIdentityCard[index]">
                  <UserPreviewIdentityCard :theUid="reply.uid"/>
                </div>
              </transition>
              {{ reply.nickname }}
            </span> 
            {{ types[reply.type] }}
          </el-text>
          <el-text tag="p" class="reply-content" @click="toThePost(reply.postId)">
            {{ reply.replyContent }}
          </el-text>
          <el-text tag="p" class="reply-time">{{ reply.releaseTime }}</el-text>
        </div>
        
        <div class="reply-item-box-right">
          <el-text class="reply-my-content" @click="toThePost(reply.postId)">
            {{ reply.myContent }}
          </el-text>
        </div>
      </div>

      <el-divider style="margin-top: 10px;margin-bottom: 10px;"/>
    </li>
  </ul>
  <div class="tail-control-box">
    <span v-if="isLoadingMore">加载中...</span>
    <span v-if="noMore && !isLoadingMore" @click="loadMore">
      再怎么翻也没有啦!
      <el-icon class="tail-control-icon"><Refresh /></el-icon>
    </span>
  </div>
</div>

<div class="loading-identity-item-box" v-if="isFirstLoading&&!isEmpty">
  <Loading/>
</div>

<div class="no-data-box" v-if="isEmpty">
  <el-empty :image-size="100" description="你还没有点过赞哦"/>
</div>

</div>
</template>


<script lang="ts" setup>
import { useHttpStore } from '@/store/Http';
import axios from 'axios';
import Cookies from 'js-cookie';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';


const { ip_port } = useHttpStore();
const router = useRouter();

let replyList = reactive([]);
const isFirstLoading = ref(true);
const isLoadingMore = ref(false);
let lastData = reactive(null);
const isEmpty = ref(false);
const noMore = ref(false);

const types = {
  "comment_post":"回复了你的帖子",
  "reply_comment":"回复了你的评论",
  "reply_reply":"回复了你"
}

const showUserIdentityCard = reactive<Array<boolean>>([]);
var timeId: any[] = [];
function userInfoCardEnter(id: number) {
  if (timeId[id] !== undefined) {
    clearTimeout(timeId[id]);
  } else {
    showUserIdentityCard[id] = true;
  }
}
function userInfoCardDelayLeave(id: number) {
  timeId[id] = setTimeout(()=>{
    showUserIdentityCard[id] = false;
    timeId[id] = undefined;
  },100)
}

function toThePost(id: number) {
  router.push("/post?id=" + id)
}

//加载更多
async function loadMore() {
  isLoadingMore.value = true;
  await axios({
    method:"post",
    url:ip_port + "/user/mine/message",
    data:{
      "lastData":lastData,
      "pageSize":10
    },
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      replyList.push.apply(replyList,data.data.records)
      lastData = data.data.lastData;
      isLoadingMore.value = false;
      noMore.value = false;
    } else if (data.code === 40006) {
      isLoadingMore.value = false;
      noMore.value = true;
    } else {
      window.alert(data.message);
      isLoadingMore.value = false;
      noMore.value = true;
    }
  })
  .catch(function (error) {
    console.log(error);
    isLoadingMore.value = false;
  });
}

//初始化
onBeforeMount(()=>{
  axios({
    method:"post",
    url:ip_port + "/user/mine/message",      
    data:{
      "pageSize":10
    },
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      replyList = data.data.records;
      lastData = data.data.lastData;
      isFirstLoading.value = false;
    } else if (data.code === 40010) {
      isEmpty.value = true;
      isFirstLoading.value = false;
    } else {
      console.log(data.message);
      window.alert(data.message);
      isEmpty.value = true;
      isFirstLoading.value = false;
    }
  })
  .catch(function (error) {
    console.log(error);
    isEmpty.value = true;
    isFirstLoading.value = false;
  });
})
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

.my-reply-list-box {
  margin-top: 10px;
}

.reply-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.reply-item {
  background-color: #fff;
  padding: 5px;
}

.reply-item-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
}
.reply-title {
  font-size: 17px;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -55px;
}
.reply-nickname {
  color: #000;
  font-weight: bold;
}

.reply-content {
  cursor: pointer;
  margin-top: 4px;
  color: #141414;
  font-size: 17px;
}

.reply-time {
  margin-top: 4px;
  color: #474747;
  font-size: 12px;
}

.reply-item-box-right {
  margin: auto;
  margin-right: 0;
  height: 70px;
  width: 70px;
}

.reply-my-content {
  cursor: pointer;
  color: #141414;
  font-size: 16px;
}

.tail-control-box {
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tail-control-box span {
  cursor: pointer;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 14px;
  color: grey;
}
.tail-control-icon {
  font-size: 14px;
  padding-top: 2px;
  margin-left: 5px;
}

.loading-identity-item-box {
  display: flex;
  flex-direction: row;
  align-self: center;
  width: 25px;
  height: 110px;
  color: rgb(155, 155, 155);
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
