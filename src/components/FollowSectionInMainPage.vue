<script lang="ts">
import SectionIdentity from './SectionIdentity.vue';
import { Loading } from '@element-plus/icons-vue';
export default {
  name:"FollowSectionInMainPage",
  components: {
    SectionIdentity,Loading
  }
}
</script>

<template>
<div class="follow-section-display-box">
  <el-text class="follow-section-display-title">
    关注的版块
  </el-text>

  <div class="loading-identity-item-box" v-if="isLoadingList">
    <Loading/>
  </div>

  <div class="no-data-box" v-if="!hasData">
    <el-empty :image-size="100" :description="noDataText"/>
  </div>

  <div class="section-identity-item-box" v-if="!isLoadingList&&hasData">
    <div class="section-identity-item" v-for="identity in followedSectionList" :key="identity.sectionId">
      <SectionIdentity v-bind=identity />
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { onBeforeMount, reactive, ref } from 'vue';
import { useHttpStore } from '@/store/Http';
import axios from 'axios';
import Cookies from "js-cookie";
import { SectionIdentityList } from '@/types';

const { ip_port } = useHttpStore();

let followedSectionList = reactive<SectionIdentityList>([]);
const isLoadingList = ref(true);
const hasData = ref(true);
const noDataText = ref("你还没有加入过论坛哦");

//初始化
onBeforeMount(()=>{
  if (Cookies.get("uid") === undefined) {
    noDataText.value = "请登入后查看"
    hasData.value = false;
    isLoadingList.value = false;
  } else {
    axios({
      method:"get",
      url:ip_port + "/section/mine",
      headers:{
        "Authorization":Cookies.get("Authorization"),
        "uid":Cookies.get("uid")
      }
    })
    .then(function (response) {
      const data = response.data;
      if (data.code === 200) {
        followedSectionList = data.data;
        isLoadingList.value = false;
      } else if (data.code === 40010) {
        hasData.value = false;
        isLoadingList.value = false;
      } else {
        window.alert(data.message);
        hasData.value = false;
        isLoadingList.value = false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
})

</script>


<style scoped>

.follow-section-display-box {
  background-color: var(--vt-c-white-soft);
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
}

.follow-section-display-title {
  font-size: medium;
  font-weight: bold;
  align-self: start;
  margin-left: 10px;
}

.loading-identity-item-box {
  display: flex;
  flex-direction: row;
  align-self: center;
  align-items: center;
  width: 30px;
  height: 150px;
  color: rgb(155, 155, 155);
}

.section-identity-item-box {
  display: flex;
  flex-direction: row;
  align-items: start;
  flex-wrap: wrap;
  margin-top: 5px;
}

.section-identity-item {
  margin-bottom: 4px;
  margin-left: 30px;
  margin-right: 45px;
}

</style>