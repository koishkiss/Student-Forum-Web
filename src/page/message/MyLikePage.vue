<script lang="ts">
import UserPreviewIdentityCard from '@/components/UserPreviewIdentityCard.vue';
import { Loading } from '@element-plus/icons-vue';
export default {
  name:"MyLikePage",
  components:{
    UserPreviewIdentityCard,Loading
  }
}
</script>

<template>
<div class="my-like-page-box">
<el-text class="box-title" tag="p">
  收到的赞
</el-text>

<div v-if="!isFirstLoading&&!isEmpty" class="my-like-list-box">
  <ul 
    v-infinite-scroll="loadMore" 
    :infinite-scroll-disabled="isLoadingMore || noMore" 
    class="like-list" 
  >
    <li v-for="(like,index) in likeList" :key="index" class="like-item">
      <div class="like-item-box">
        <div class="like-item-box-left">
          <el-text tag="p" class="like-title">
            <span class="like-nickname" 
              @mouseenter="userInfoCardEnter(index)" 
              @mouseleave="userInfoCardDelayLeave(index)"
            >
              <transition name="user-identity-card-content">
                <div class="identity-card-container" v-if="showUserIdentityCard[index]">
                  <UserPreviewIdentityCard :theUid="like.uid"/>
                </div>
              </transition>
              {{ like.nickname }}
            </span> 
            赞了你的{{ types[like.type] }}
          </el-text>
          <el-text tag="p" class="like-time">{{ like.likeTime }}</el-text>
        </div>
        
        <div class="like-item-box-right">
          <el-text class="like-content" @click="toThePost(like.postId)">
            {{ like.content }}
          </el-text>
        </div>
      </div>

      <!-- <div v-if="like.type === 'post'" class="like-item-box">
        <el-text tag="p" class="like-title">
          <span class="like-nickname" 
            @mouseenter="userInfoCardEnter(index)" 
            @mouseleave="userInfoCardDelayLeave(index)"
          >
            <transition name="user-identity-card-content">
              <div class="identity-card-container" v-if="showUserIdentityCard[index]">
                <UserPreviewIdentityCard :theUid="like.uid"/>
              </div>
            </transition>
            {{ like.nickname }}
          </span>
          赞了你的帖子
        </el-text>
        <el-text tag="p" class="like-content" @click="toThePost(like.postId)">{{ like.content }}</el-text>
        <el-text tag="p" class="like-time">{{ like.likeTime }}</el-text>
      </div> -->
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

let likeList = reactive([]);
const isFirstLoading = ref(true);
const isLoadingMore = ref(false);
let lastData = reactive(null);
const isEmpty = ref(false);
const noMore = ref(false);

const types = {
  "comment":"评论",
  "post":"帖子"
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
    url:ip_port + "/user/mine/like",
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
      likeList.push.apply(likeList,data.data.records)
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
    url:ip_port + "/user/mine/like",      
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
      likeList = data.data.records;
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

.my-like-list-box {
  margin-top: 10px;
}

.like-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.like-item {
  background-color: #fff;
  padding: 5px;
}

.like-item-box {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-left: 10px;
}
.like-title {
  font-size: 17px;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -55px;
}
.like-nickname {
  color: #000;
  font-weight: bold;
}

.like-time {
  margin-top: 20px;
  color: #474747;
  font-size: 12px;
}

.like-item-box-right {
  margin: auto;
  margin-right: 0;
  height: 70px;
  width: 70px;
}

.like-content {
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
