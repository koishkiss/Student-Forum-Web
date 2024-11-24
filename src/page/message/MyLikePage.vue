<script lang="ts">
export default {
  name:"MyLikePage"
}
</script>

<template>
<div v-if="!isFirstLoading" class="my-like-page-box">
  <ul 
    v-infinite-scroll="loadMore" 
    :infinite-scroll-disabled="isLoadingMore || noMore" 
    class="like-list" 
  >
    <li v-for="like in likeList" :key="like.id" class="like-item">
      <div v-if="like.type === 'comment'">
        <el-text tag="p" class="like-title">
          <span class="like-nickname">{{ like.nickname }}</span> 赞了你的评论
        </el-text>
        <el-text tag="p" class="like-content">{{ like.content }}</el-text>
        <el-text tag="p" class="like-time">{{ like.likeTime }}</el-text>
      </div>
      <div v-if="like.type === 'post'">
        <el-text tag="p" class="like-title">
          <span class="like-nickname">{{ like.nickname }}</span> 赞了你的帖子
        </el-text>
        <el-text tag="p" class="like-content">{{ like.content }}</el-text>
        <el-text tag="p" class="like-time">{{ like.likeTime }}</el-text>
      </div>
      <el-divider/>
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

//加载更多
async function loadMore() {
  isLoadingMore.value = true;
  await axios({
    method:"post",
    url:ip_port + "/user/mine/like",
    data:{
      "lastData":lastData,
      "pageSize":5
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
      "pageSize":5
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
.like-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.like-item {
  background-color: #fff;
  padding: 5px;
}

.like-title {
  font-size: 17px;
}
.like-nickname {
  color: #000;
  font-weight: bold;
}

.like-content {
  margin-top: 5px;
  color: #141414;
  font-size: 17px;
}

.like-time {
  margin-top: 8px;
  color: #474747;
  font-size: 12px;
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
</style>
