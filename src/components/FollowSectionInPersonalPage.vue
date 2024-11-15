<script lang="ts" setup>
import { ref, onBeforeMount, reactive } from 'vue';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import { Edit } from "@element-plus/icons-vue";
import SectionIdentity from './SectionIdentity.vue';
import { SectionIdentityList } from '@/types';
import { dialogEmits } from 'element-plus';

// 使用HttpStore获取IP和端口配置
const { ip_port } = useHttpStore();

// 定义响应数据的状态
const isLoading = ref(true);
let sectionList = ref<SectionIdentityList>([]);

// 控制编辑对话框的显示状态
const showCancelButton = ref(false);
// 控制
const showConfirmDialog = ref(false);
const sectionToCancel = ref(null); 


// 初始化数据加载
onBeforeMount(() => {
  loadSectionList();
});

// 加载板块列表
function loadSectionList() {
  axios({
    method: "get",
    url: `${ip_port}/section/mine`,
    headers: {
      "Authorization": Cookies.get('Authorization'),
      "uid": Cookies.get('uid')
    }
  })
  .then((response) => {
    const { code, message, data } = response.data;
    if (code === 200) {
      sectionList.value = data;
    } else {
      console.log(message);
      sectionList.value = null
    }
  })
  .catch((error) => {
    console.error('请求错误:', error);
  })
  .finally(() => {
    isLoading.value = false;
  });
}

// 取消加入论坛板块
function cancelJoinSection(sectionId: number) {
  axios({
    method: "get",
    url: `${ip_port}/section/cancelJoin`,
    headers: {
      "Authorization": Cookies.get('Authorization'),
      "uid": Cookies.get('uid')
    },
    params: { sectionId }
  })
  .then((response) => {
    const { code, message } = response.data;
    if (code === 200) {
      console.log("成功取消加入:", message);
      loadSectionList(); // 重新加载列表，更新UI
    } else {
      console.log("取消加入失败:", message);
    }
  })
  .catch((error) => {
    console.error("取消加入请求错误:", error);
  });
}
</script>

<template>
  <div class="follow-section">
    <div class="management">
      <el-button type="primary" :icon="Edit" plain @click="showCancelButton = true">管理</el-button>
    </div>
    <div class="follow-list" v-if="!isLoading">
      <div v-for="identity in sectionList" :key="identity.sectionId" class="follow-item">
        <div>
          <el-popconfirm title="Are you sure to delete this?" @confirm="cancelJoinSection(identity.sectionId)">
            <template #reference>
              <el-button  v-if="showCancelButton" >XXXXX</el-button>
            </template>
          </el-popconfirm>
        </div>
        <SectionIdentity 
          :sectionId="identity.sectionId" 
          :iconURL="identity.iconURL"
          :name="identity.name"
        />
      </div>
    </div>
  </div>
</template>
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
  gap: 6px 5px;
}

/* 每个关注项的样式 */
.follow-item {
  align-self: start;
}
</style>
