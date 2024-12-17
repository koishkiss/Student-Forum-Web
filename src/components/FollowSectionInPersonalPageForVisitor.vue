<script lang="ts">
export default {
  name:'FollowSectionInPersonalPageForVisitor',
}

</script>

<template>
  <div class="no-data-box" v-if="!hasData">
    <el-empty :image-size="100" description="这个人还没有加入过论坛呢"/>
  </div>
  <div class="title-for-section-part">
    <el-text>ta关注的论坛</el-text>
  </div>
  <div class="follow-list" v-if="!isLoading&&hasData">
    <div v-for="identity in sectionList" :key="identity.sectionId" class="follow-item">
      <SectionIdentity 
      :sectionId="identity.sectionId" 
      :iconURL="identity.iconURL"
      :name="identity.name"
      class="section-identity"
    />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount, reactive } from 'vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import { Edit } from "@element-plus/icons-vue";
import SectionIdentity from './SectionIdentity.vue';
import { SectionIdentityList } from '@/types';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';

// 使用HttpStore获取IP和端口配置
const { ip_port } = useHttpStore();
const route = useRoute();
// 定义响应数据的状态
const isLoading = ref(true);
const hasData = ref(true);
let sectionList = reactive<SectionIdentityList>([]);

onBeforeMount(() => {
  loadSectionList();
});

function loadSectionList() {
  isLoading.value = true;
  axios({
    method: "get",
    url: `${ip_port}/section/other?uid=`+route.params.uid,
    headers: {
      "Authorization": Cookies.get('Authorization'),
      "uid": Cookies.get('uid')
    }
  })
  .then((response) => {
    const { code, message, data } = response.data;
    if (code === 200) {
      sectionList = data;
    } else if (code === 40010) {
      hasData.value = false;
    } else {
      ElMessage({message:message,type:"error"});
    }
  })
  .catch((error) => {
    console.error('请求错误:', error);
  })
  .finally(() => {
    isLoading.value = false;
  });
}

</script>

<style scoped>
.follow-section {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.management {
  margin-left: 15px;
}

/* 关注列表样式 */
.follow-list {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;
}

/* 每个关注项的样式 */
.follow-item {
  margin-left: 15px;
}

.exit-section-box {
  margin-top: 6px;
  margin-left: 79px;
  position: absolute;
  display: flex;
  z-index: 1;
}

.exit-section {
  padding: 0;
  width: 25px;
  height: 25px;
  font-size: 12px;
}
.title-for-section-part{
  text-align: center;
  font-size :2em;
}

/* 删除按钮动画 */
.exit-section-show-enter-active  {
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}
.exit-section-show-leave-active {
  transition: opacity 0.1s ease-out, transform 0.1s ease-out;
}
.exit-section-show-enter-from,
.exit-section-show-leave-to {
  opacity: 0;
}

</style>
