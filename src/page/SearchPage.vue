<script lang="ts">
import { Loading } from "@element-plus/icons-vue";
import PostPreview from '@/components/PostPreview.vue';
import ClassificationList from '@/components/ClassificationList.vue';
import SideBar from '@/components/SideBar.vue';
export default {
  name: "SearchPage",
  components: PostPreview,ClassificationList,SideBar,Loading
}
</script>

<template>
  <div class="search-page-box">
    <div class="search-page-flex-box">
      <div class="left-sidebar-box">
        <div class="section-classification-box">
          <ClassificationList />
        </div>
      </div>
      <div class="right-sidebar-box">
        <div class="public-trend-box">
          <div class="search-page-content-box" v-if="!isLoading">
            <div class="search-page-title">
              <el-text class="search-page-result" tag="p" v-if="hasData">
                共 {{ searchList.length }} 条搜索结果
              </el-text>
              <el-text class="search-page-result" tag="p" v-else>
                共 0 条搜索结果
              </el-text>
            </div>
            <template v-if="hasData">
              <div class="search-page-content" v-for="post in searchList" :key="post.id">
                <PostPreview v-bind="post" />
              </div>
            </template>
          </div>

          <div v-else class="load-classification-box">
            <Loading/>
          </div>

          <div class="search-no-data" v-if="!hasData && !isLoading">
            <el-empty description="没有找到相关的帖子哦"/>
          </div>
        </div>
        <div class="hot-issue-box">
          <SideBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHttpStore } from '@/store/Http';
import { reactive, ref } from 'vue';
import { PostPreviewItemList } from '@/types';
import { onBeforeMount } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

let searchList = reactive<PostPreviewItemList>([])
const { ip_port } = useHttpStore();
const isLoading = ref(true);
const route = useRoute();
const hasData = ref(true);

const fetchSearchResults = () => {
  hasData.value = true;
  isLoading.value = true;
  axios({  
    method: "get",  
    url: ip_port + "/post/get?search=" + route.query.searchQuery,  
    headers: {  
      "Authorization": Cookies.get("Authorization"),  
      "uid": Cookies.get("uid")  
    },  
  })  
  .then((response) => {  
    const data = response.data;  
    if (data.code === 200) {  
      searchList = data.data;
    } else if (data.code === 40010) {
      hasData.value = false;
    } else {   
      hasData.value = false;
      ElMessage.error(data.message);  
    }  
    isLoading.value = false; 
  })  
  .catch(function (error) {  
    console.log(error);  
    isLoading.value = false; 
  });  
};  

watch(() => route.query.searchQuery, () => {  
  fetchSearchResults();  
});  

onBeforeMount(() => {  
  fetchSearchResults();  
});  

</script>

<style scoped>
.search-page-box {
  padding: 150px 300px;
}

.search-page-flex-box {
  gap: 10px;
  display: flex;
}

.left-sidebar-box {
  gap: 10px;
  width: 32%;
  min-width: 300px;
  display: flex;
  flex-direction: column;
}

.section-classification-box {
  position: sticky;
  top: 60px;
}

.right-sidebar-box {
  display: flex;
  flex-direction: row;
  min-width: 600px;
  width: 68%;
  position: sticky;
  top: 60px;
}

.right-bottom-item-box {
  gap: 10px;
  display: flex;
  flex-direction: row;
}

.public-trend-box {
  display: flex;
  flex-direction: column;
  min-width: 70%;
  min-height: 600px;
  border-top: none;
  border: solid 1px rgb(201, 201, 201);
  border-radius: 5px;
  background-color: #fff;
}

.search-page-content-box {
  display: flex;
  flex-direction: column;
  font-size: 28px;
  font-weight: bold;
  border: thick double rgb(255, 255, 255);
  border-start-start-radius: 5px;
  border-start-end-radius: 5px;
  border-bottom: none;
  background-color: #efefef;
}

.search-page-result {
  margin: 5px 3px;
  font-size: 15px;
}

.load-classification-box {
  height: 30px;
  width: 30px;
  margin: auto;
}

.hot-issue-box {
  margin-left: 10px;
  min-width: 28%;
  min-height: 500px;
}
</style>