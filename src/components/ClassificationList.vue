<script lang="ts">
import { Loading } from "@element-plus/icons-vue";
import SectionIdentity from './SectionIdentity.vue';
export default {
  name:'ClassificationList',  //组件名
  components:{
    Loading,SectionIdentity
  }
}
</script>

<template>
<div class="classify-list-box">
  <el-text tag="p" class="classify-list-title">
    板块分区
  </el-text>

  <div class="classify-list-content">
    <div v-if="isLoading" class="load-classification-box">
      <Loading/>
    </div>

    <el-collapse v-if="!isLoading" class="collapse-list">
      <el-collapse-item
        v-for="(classification,index) in classificationList"
        :name="classification.id"
        :key="index"
        class="collapse-item"
        @click="loadSectionList(classification.id, index)"
      >
        <template #title>
          <el-text class="collapse-item-title">
            {{ classification.name }}
          </el-text>
        </template>

        <div class="section-preview-list-box">
          <div v-if="!hasLoad[index]" class="load-section-list-box">
            <Loading/>
          </div>

          <template v-if="hasLoad[index]">
            <div v-for="section in sectionPreviewLists[index]" :key="section.classify" class="section-preview-item">
              <SectionIdentity :sectionId="section.sectionId" :iconURL="section.iconURL" :name="section.name"/>
            </div>
          </template>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import { SectionIdentityList } from '@/types';

const { ip_port } = useHttpStore();

const isLoading = ref(true);
let classificationList = reactive([]);
let sectionPreviewLists = reactive<Array<SectionIdentityList>>([]);
let hasLoad = reactive<Array<boolean>>([]);


function loadSectionList(classificationId: number, index: number) {
  if (!hasLoad[index]) {
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
        sectionPreviewLists[index] = data.data;
        hasLoad[index] = true;
      } else {
        window.alert(data.message);
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}

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
      isLoading.value = false;
    } else {
      window.alert(data.message);
      isLoading.value = false;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
})

</script>

<style scoped>

.classify-list-box {
  border-radius: 10px;
  background-color: #fff1f1;
  padding: 6px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}
.classify-list-box:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.classify-list-title {
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
}

.classify-list-content {
  padding: 15px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
}

.load-classification-box {
  width: 30px;
  height: 30px;
  margin: auto;
}

.collapse-list {
  display: flex;
  flex-direction: column;
  justify-content: baseline;
  padding: 15px 0;
}

.collapse-item {
  min-width: 260px;
  max-width: 275px;
  display: flex;
  flex-direction: column;
  border-left: 3px dashed #eea8da;
  margin-bottom: 10px;
  background-color: #ffc6f3;
  border-radius: 7px;
  transition: padding-left 0.3s ease;
}
.collapse-item:hover {
  padding-left: 3px;
}
.collapse-item:active {
  padding-left: 1px;
  transition: padding-left 0.2s ease;
}

.collapse-item-title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 15px;
}

.section-preview-list-box {
  align-self: flex-end;
  justify-self: flex-end;
  width: 260px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.load-section-list-box {
  width: 25px;
  height: 25px;
  margin: auto;
}

.section-preview-item {
  margin-right: 70px;
  margin-left: 10px;
  width: 50px;
}

</style>
