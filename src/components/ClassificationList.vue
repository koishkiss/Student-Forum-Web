<script lang="ts">
import { Loading, CirclePlus, Plus, Minus } from "@element-plus/icons-vue";
import SectionIdentity from './SectionIdentity.vue';
import CreateSection from './CreateSection.vue';
export default {
  name:'ClassificationList',  //组件名
  components:{
    Loading,SectionIdentity,CirclePlus,Plus,CreateSection,Minus
  }
}
</script>

<template>
<div class="classify-list-box">
  <div class="classify-list-top">
    <el-text tag="span" class="classify-list-title">
      板块分区
    </el-text>

    <el-popover placement="right" trigger="click" width="200" v-if="user.authority >= 3">
      <template #reference>
        <el-button type="info" link class="add-new-classify-button" title="添加新分区">
          <el-icon :size="25"><CirclePlus/></el-icon>
        </el-button>
      </template>
      <div style="display: flex;flex-direction: column; align-items: center;">
        <el-input v-model="newClassifyName" placeholder="请输入分区标题"></el-input>
        <el-button style="height: 25px; width: 45px; margin-top: 5px;" @click="addNewClassify">
          添加
        </el-button>
      </div>
    </el-popover>
  </div>

  <el-scrollbar max-height="688px">
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

              <el-tooltip
                class="box-item"
                effect="dark"
                content="在该分区下添加新版块"
                placement="bottom"
              >
                <div class="add-section" v-if="user.authority >= 2">
                  <el-button class="add-section-button" @click="addNewSectionInClassify(index)">
                    <el-icon :size="30" style="color: #b2b2b2;" v-if="!addNewSection[index]"><Plus/></el-icon>
                    <el-icon :size="30" style="color: #b2b2b2;" v-if="addNewSection[index]"><Minus/></el-icon>
                  </el-button>
                </div>
              </el-tooltip>
            </template>
          </div>

          <div v-if="addNewSection[index] && user.authority >= 2">
            <CreateSection 
              :classify="classification.id" 
              @newSectionAdd="newSectionHasAdd(classification.id,index)"
            />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </el-scrollbar>
</div>
</template>

<script lang="ts" setup>
import { ref, reactive, onBeforeMount } from 'vue';
import axios from 'axios';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import { useUserInfoStore } from '@/store/UserInfo';
import { ElMessage } from 'element-plus';
import { SectionIdentityList } from '@/types';

const { ip_port } = useHttpStore();
const user = useUserInfoStore();

const isLoading = ref(true);
let classificationList = reactive([]);
let sectionPreviewLists = reactive<Array<SectionIdentityList>>([]);
let hasLoad = reactive<Array<boolean>>([]);
const newClassifyName = ref("");
const addNewSection = reactive([]);

function addNewClassify() {
  axios({
    method:"post",
    url:ip_port + "/classify/add",
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    },
    data:{
      "name":newClassifyName.value
    }
  })
  .then(function (response) {
    newClassifyName.value = "";
    const data = response.data;
    if (data.code === 200) {
      ElMessage({message: '添加成功！',type: 'success',plain: true});
      loadClassifyList();
    } else {
      ElMessage({message: data.message,type: 'error',plain: true});
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

function addNewSectionInClassify(index: number) {
  addNewSection[index] = !addNewSection[index];
}

function newSectionHasAdd(classificationId: number, index: number) {
  hasLoad[index] = false;
  addNewSection[index] = false;
  loadSectionList(classificationId, index);
}

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
      } else if (data.code == 40010) {
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

function loadClassifyList() {
  isLoading.value = true;
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
    } else if (data.code == 40010) {
      isLoading.value = false;
    } else {
      window.alert(data.message);
      isLoading.value = false;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}

//初始化
onBeforeMount(()=>{
  loadClassifyList();
})

</script>

<style scoped>

.classify-list-box {
  border-radius: 10px;
  background-color: #f5f5f5;
  padding: 6px;
  min-height: 400px;
  /* overflow-y: auto; */
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}
.classify-list-box:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.classify-list-top {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;
}

.classify-list-title {
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
  padding: 15px 0;
}

.collapse-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  margin-bottom: 10px;
}

.collapse-item-title {
  font-size: 16px;
  font-weight: bold;
  margin-left: 15px;
}

.section-preview-list-box {
  padding: 0 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
}

.load-section-list-box {
  width: 25px;
  height: 25px;
  margin: auto;
}

.add-section {
  margin-top: 6px;
  height: 105px;
  width: 105px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-section-button {
  height: 100px;
  width: 100px;
  border-style: dashed;
}

</style>
