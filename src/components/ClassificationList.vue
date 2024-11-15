<script lang="ts">
import { Refresh } from "@element-plus/icons-vue";
export default {
  name:'PostPreviewScrollList',  //组件名
  components:{
    Refresh
  }
}
</script>

<template>
  <el-collapse @change="load">
    <el-collapse-item
      v-for="(classification,index) in classificationList"
      :name="classification.id"
      :title="classification.name"

    >
    <div v-for="post in classificationPreviewList[index]" :key="post.classify" class="section-preview-item">
        <!-- <SectionIdentity :sectionId="post.classify" :iconURL="post.iconURL" :name="post.name"/> -->
      </div>
    </el-collapse-item>
  </el-collapse>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import { SectionIdentityList } from '@/types';
import SectionIdentity from './SectionIdentity.vue';

const { ip_port } = useHttpStore();
const isFirstLoading = ref(true)
const isEmpty = ref(false)
const lastData = ref(undefined)
const isLoadingMore = ref(false);
const noMore = ref(false);
let classificationList = reactive([]);
let classificationPreviewList = reactive<Array<SectionIdentityList>>([[],[]]);

//初始化
onBeforeMount(()=>{
  axios({
    method:"get",
    url:ip_port + "/classify",
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200){
      classificationList = data.data;
      console.log(data.data)
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
})

// 获取分类数据
async function load(){
  await axios({
    method:"get",
    url:ip_port + "/classify",
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      classificationList=data.data;
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
};

function getSectionList(classificationId) {
  axios({
    method:"get",
    url:ip_port + "/section/classify?classifyId=" + classificationId,
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200){
      classificationPreviewList = data.records;
    }
  })
}

</script>

<style scoped>
.el-collapse {
  margin: 20px;
}
</style>
