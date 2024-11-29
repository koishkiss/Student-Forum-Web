<script lang="ts">
import PostPreview from '@/components/PostPreview.vue';
import ClassificationList from '@/components/ClassificationList.vue';
import SideBar from '@/components/SideBar.vue';
import { useRoute } from 'vue-router';
export default {
  name: "SearchPage",
  components: PostPreview
}
</script>

<template>
  <div class="search-page-box" v-if="!isLoading">
    <div class="search-page-flex-box">
      <div class="left-sidebar-box">
        <div class="section-classification-box">
          <ClassificationList />
        </div>
      </div>
      <div class="right-sidebar-box">
        <div class="right-bottom-item-box">
          <div class="public-trend-box">
            <div class="search-page-content-box">
              <div class="search-page-title">
                <span class="search-page-title-text">
                  搜索结果
                </span>
                <!-- <div class="search-page-result" v-if="hasData">
                  {{ searchList.length }} 条结果
                </div> -->
                <!-- <div class="search-page-result" v-else>
                  没有找到相关内容
                </div> -->
              </div>
              <div class="search-page-content" v-for="post in searchList" :key="post.id">
                <PostPreview v-bind="post" />
              </div>
            </div>
          </div>
          <div class="hot-issue-box">
            <SideBar />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useHttpStore } from '@/store/Http';
import { reactive, ref } from 'vue';
import { PostPreviewItemList } from '@/types';
import { onBeforeMount } from 'vue';
import { ElMessageBox } from 'element-plus';



let searchList = reactive<PostPreviewItemList>([])
const { ip_port } = useHttpStore();
const isLoading = ref(true);
const route = useRoute();
const hasData = ref(true);

onBeforeMount(() => {
  axios({
    method: "get",
    url: ip_port + "/post/get" + "?search=" + route.query.searchQuery,
    headers: {
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    },
  })
    .then((response) => {
      const data = response.data;
      console.log(data);
      if (data.code === 200) {
        searchList = data.data;
        isLoading.value = false;
      }
      else if (data.code === 40010) {
        isLoading.value = false;
        hasData.value = false;
      } else {
        isLoading.value = false;
        hasData.value = false;
        ElMessageBox.alert(data.message, "", { confirmButtonText: 'OK' });
      }
    })
    .catch(function (error) {
      console.log(error);
      isLoading.value = false;
    });
})

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
  background-color: aqua;
}

.right-sidebar-box {
  min-width: 600px;
  width: 68%;
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
  min-height: 700px;
  border-top: none;
  border: solid 1px rgb(201, 201, 201);
  border-radius: 5px;
  border-start-start-radius: 0;
  border-start-end-radius: 0;
}

.search-page-content-box {
  display: flex;
  flex-direction: column;
  height: 40px;
  font-size: 28px;
  font-weight: bold;
  border: thick double rgb(255, 255, 255);
  border-start-start-radius: 5px;
  border-start-end-radius: 5px;
  border-bottom: none;
  background-color: #efefef;
}

.hot-issue-box {
  min-width: 28%;
  min-height: 500px;
}
</style>