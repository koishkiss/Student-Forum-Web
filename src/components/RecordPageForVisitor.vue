<script lang="ts">
import PostSimplePreview from './PostSimplePreview.vue';
  export default {
    name:"RecordPageForVisitor",
    components: {
      PostSimplePreview
    }
  }
</script>

<template>
  <div class="my-own-post-page-box">
    <el-text  class="page-title" tag="p" >ta的动态</el-text>
    <div v-if="loading" class="loading">
        加载中...
    </div>

    <div v-if="!hasData" class="no-data">
        <el-empty :image-size="100" description="这个人还什么都没有说哦"/>
    </div>

    <ul v-if="!loading && hasData">
        <li v-for="post in posts" :key="post.id" class="post-item">
            <PostSimplePreview v-bind="post"></PostSimplePreview>
            <el-divider class="divider"/>
        </li>
    </ul>

    <div  v-if="!loading && hasData" class="page-bottom">
        <el-text class="page-bottom-text">已经翻到底了哦</el-text>
    </div>
</div>
</template>

<script lang="ts" setup>

import { ref, reactive } from 'vue';
import { PostPreviewItemList } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessageBox } from 'element-plus';
import { useHttpStore } from '@/store/Http';
import { useRoute } from 'vue-router';
const route = useRoute();
const { ip_port } = useHttpStore();
const loading = ref(true);
const hasData = ref(true);
let posts = reactive<PostPreviewItemList>([]);
axios({
      method:"get",
      url: ip_port + "/post/get?uid="+route.params.uid,
      headers: {
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      }
    })
    .then(function (response){
      const data = response.data;
      if (data.code == 200) {
        posts = data.data;
        console.log(posts);
      } else {
        ElMessageBox.alert(data.message)
      }
    })
    .catch((error)=>{
      console.log(error);
      hasData.value = false;
    })
    .finally(()=>{
      loading.value = false;
      console.log(hasData.value)
      console.log(loading.value)
    })
</script>

<style scoped>
.my-own-post-page-box {
    padding: 0 20px;
}

.page-title {
    font-size: 34px;
    font-weight: bold;
    margin-left: 10px;
    margin-top: 20px;
    margin-bottom: 10px;
}

.loading {
    margin-left: 11px;
    color: #007bff;
}

ul {
    list-style: none;
    padding: 0;
}

.post-item {
    padding: 0 10px;
}

.divider {
    margin: 10px 0;
}

.page-bottom {
    margin-top: 0;
    margin-left: 11px;
    font-size: 13px;
    color: #666666;
}
</style>