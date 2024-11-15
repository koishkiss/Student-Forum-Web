<script lang="ts">
import { Edit } from "@element-plus/icons-vue";
import SectionIdentity from './SectionIdentity.vue';
export default {
  name:"FollowSection",
  components: {
    SectionIdentity,Edit
  }
}
</script>

<template>
<div class="follow-section">
  <div class="management">
    <el-button type="primary" :icon="Edit" plain>管理</el-button>
  </div>
  <div class="follow-list" v-if="!isLoading">
    <div v-for="identity in sectionList" :key="identity.sectionId" class="follow-item">
      <SectionIdentity 
        :sectionId="identity.sectionId" 
        :iconURL="identity.iconURL"
        :name="identity.name"
      />
    </div>
  </div>
</div>
</template>
  
<script lang="ts" setup>
import Cookies from 'js-cookie';
import { ref, onBeforeMount, reactive } from 'vue';
import { useHttpStore } from '@/store/Http';
import axios from 'axios';
import { SectionIdentityList } from '@/types';

// 使用HttpStore获取IP和端口配置
const { ip_port } = useHttpStore();

// 定义响应数据的状态
const isLoading = ref(true);
let sectionList = reactive<SectionIdentityList>([]);

//初始化
onBeforeMount(() => {
  axios({
    method:"get",
    url:`${ip_port}/section/mine`,
    headers:{
      "Authorization":Cookies.get('Authorization'),
      "uid":Cookies.get('uid')
    }
  })
  .then((response) => {
    const { code, message, data } = response.data;
    if (code === 200) {
      // 将后端返回的数据赋值到Vue状态中
      sectionList = data
    } else {
      console.log(message);
    }
  })
  .catch((error) => {
    console.error('请求错误:', error);
  })
  .finally(() => {
    isLoading.value = false;
  });
});

</script>
  
<style scoped>

.follow-section {
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-left: 33px;
  padding-right: 32px;
}

/* 关注列表样式 */
.follow-list {
  margin-top: 15px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap:6px 5px;
}

/* 每个关注项的样式 */
.follow-item {
  align-self: start;
}

</style>
