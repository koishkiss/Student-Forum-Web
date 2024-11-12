<script lang="ts">
import PostPreview from './PostPreview.vue';
export default {
  name:'PostPreviewScrollList',  //组件名
  components:{
    PostPreview
  }
}
</script>

<template>
<div class="preview-post-list-box">

  <div v-if="!isFirstLoading" class="post-preview-list-box">
    <ul 
      v-infinite-scroll="loadMore" 
      :infinite-scroll-disabled="isLoadingMore || noMore" 
      class="post-preview-list" 
      style="overflow: auto"
    >
      <li v-for="post in previewPostList" :key="post.id" class="post-preview-item">
        <PostPreview v-bind=post />
      </li>
    </ul>
    <p v-if="isLoadingMore">Loading...</p>
    <p v-if="noMore && !isLoadingMore">No more</p>
  </div>
</div>
</template>


<script lang="ts" setup>
import { PostPreviewItemList } from '@/types';
import axios from 'axios';
import { onBeforeMount, reactive, ref } from 'vue';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';

const { ip_port } = useHttpStore();

let previewPostList = reactive<PostPreviewItemList>([]);
const isFirstLoading = ref(true);
const isEmpty = ref(false);
const lastData = ref(undefined);
const isLoadingMore = ref(false);
const noMore = ref(false);

//加载更多
async function loadMore() {
  isLoadingMore.value = true;
  await axios({
    method:"post",
    url:ip_port + "/post/get/recommend",
    data:{
      "lastData":lastData.value,
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
      previewPostList.push.apply(previewPostList,data.data.records)
      lastData.value = data.data.lastData;
      isLoadingMore.value = false;
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
    url:ip_port + "/post/get/recommend",      
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
      previewPostList = data.data.records;
      lastData.value = data.data.lastData;
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

.preview-post-list-box {
  background-color: var(--vt-c-white-soft);
}

.post-preview-list-box {
  border: solid 1px rgb(201, 201, 201);
  border-radius: 5px;
}

.post-preview-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.post-preview-item {
  background-color: #fff;
  padding: 5px;
}

</style>