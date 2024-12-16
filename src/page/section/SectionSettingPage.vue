<script lang="ts">
import AdminIdentityList from '@/components/AdminIdentityList.vue';
export default {
  name:"SectionSettingPage",
  components:{
    AdminIdentityList
  }
}
</script>


<template>
<div class="section-setting-box">
  <div class="section-info-setting-box"  v-if="!isLoadingSection && !isLoadingClassifyList">
    <el-text tag="p" class="section-info-setting-title">
      版块信息设置
    </el-text>

    <div class="section-info-setting-content" style="display: flex; flex-direction: row;">
      <div class="update-icon">
        <el-avatar :src="iconURL" fit="cover" shape="square" :size="150" class="avatar"/>
        <div class="icon-can-upload" @click="updateIcon">
          <span>修改版头</span>
        </div>
        <el-button type="success" class="update-icon-button" @click="updateIcon">
          上传
        </el-button>
      </div>

      <div style="padding: 10px; flex: 1;">
        <div style="display: flex;">
          <el-text class="item">名称:</el-text>
          <el-text class="item" style="margin-left: 1px;">{{ section.name }}</el-text>
        </div>

        <div style="display: flex; margin-top: 10px;">
          <el-text class="item">分区:</el-text>
          <el-select 
            v-model="chooseClassifyId" 
            placeholder="分区" 
            class="classify-select" 
            @change="updateClassify"
            @blur="updateInfoInSection"
            ref="selectClassify"
          >
            <el-option 
              v-for="classify in classificationList" 
              :key="classify.id" 
              :label="classify.name" 
              :value="classify.id" 
            />
          </el-select>
        </div>

        <div style="display: flex; margin-top: 10px;">
          <el-text class="item" style="align-self: flex-start;">简介:</el-text>
          <el-input 
            type="textarea" 
            v-model="slogan" 
            maxlength="50"
            show-word-limit
            :autosize="{ minRows: 2, maxRows: 3 }" 
          />
        </div>

        <div style="margin-top: 5px; display: flex; flex-direction: row-reverse;" v-if="sloganHasChanged">
          <el-button 
            style="font-size: 13px; width: 40px; height: 23px;"
            type="primary"
            @click="updateSlogan"
          >
            修改
          </el-button>
        </div>
      </div>

    </div>
    <input type="file" accept=".jpg,.png,.bmp,.jpeg" @change="upload" ref="inputAvatar" hidden>
  </div>

    <div class="section-info-setting-box"  v-if="!isLoadingSection && !isLoadingClassifyList">
    <el-text tag="p" class="section-info-setting-title">
      管理员信息设置
    </el-text>
    <div class="admin-identity-list-content">
    <div v-for="(admin,index) in section.adminList" :key="index" class="admin-identity-item"> 
      <div class="item-box">
        <div class="avatar-container" 
          @mouseenter="userInfoCardEnter(index)" 
          @mouseleave="userInfoCardDelayLeave(index)"
        >
          <transition name="user-identity-card-content">
            <div class="identity-card-container" v-if="showUserIdentityCard[index]">
              <UserPreviewIdentityCard :theUid="admin.uid"/>
            </div>
          </transition>
          <el-avatar 
            :src="admin.avatarURL" 
            shape="square" 
            :size="90"
            fit="cover" 
            class="admin-avatar"
          />
        </div>

        <el-text class="admin-name">
          {{ admin.nickname }}
          <el-tag :type="admin.identity===1?'success':'warning'" class="identity">
            {{ admin.identity===1?'管理':'版主' }}
          </el-tag>
        </el-text>
      </div>
    </div>
    </div>
  </div>
</div>
</template>
  
  
<script lang="ts" setup  name="Settings">
import { useHttpStore } from '@/store/Http';
import { SectionInfo } from '@/types';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import Cookies from 'js-cookie';
import { computed, onBeforeMount, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';

const emits = defineEmits(["update:sectionInfo"])

const { ip_port } = useHttpStore();
const route = useRoute();
const hasPerson = computed(()=>{
  return section.adminList.length === 0 ? false : true;
})

let section = reactive<SectionInfo>({
  sectionId: -1,
  name: "",
  iconURL: "",
  slogan: "这里还什么都没写哦",
  postNum: -1,
  memberNum: -1,
  createTime: "",
  classify: "",  //分类信息
  classifyId:-1,
  adminList: [],  //管理员列表
  hasJoin: false,  //个人加入信息
  joinTime: "",  //个人加入时间
  identity: 0  //个人身份信息
});

let classificationList = reactive([]);
const showUserIdentityCard = reactive<Array<boolean>>([]);
var timeId: any[] = [];

const isLoadingSection = ref(true);
const isLoadingClassifyList = ref(true);
const iconURL = ref('');
const slogan = ref('');
const chooseClassifyId = ref(-1);
const inputAvatar = ref();
const selectClassify = ref();
const sloganHasChanged = computed(()=>{
  return slogan.value !== section.slogan;
})

function updateIcon() {
  inputAvatar.value.click();
}

async function upload() {
  await axios({  
    method: 'post',  
    url: `${ip_port}/section/update/icon`,
    data: axios.toFormData({
      'sectionId':route.params.id,
      'image': inputAvatar.value.files[0]
    }),
    headers: {   
      'Authorization': Cookies.get("Authorization"),   
      'uid': Cookies.get("uid")  
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      ElMessage({message:"更新头图成功",type:"success"});
      iconURL.value = data.data;
      emits("update:sectionInfo",data.data,undefined,undefined);
    } else {
      ElMessage({message:data.message,type:"error"});
    }
  })  
  .catch(function (error) {  
    console.error(error);
  });  
}

function updateClassify() {
  var result = updateInfo({"sectionId":route.params.id,"classify":chooseClassifyId.value});
  if (result) {
    selectClassify.value.blur();
  }
}

function updateInfoInSection() {
  emits("update:sectionInfo",undefined,undefined,selectClassify.value.selectedLabel);
}

function updateSlogan() {
  var result = updateInfo({"sectionId":route.params.id,"slogan":slogan.value});
  if (result) {
    emits("update:sectionInfo",undefined,slogan.value,undefined);
    section.slogan = slogan.value;
  }
}

async function updateInfo(newSectionInfo): Promise<boolean> {
  await axios({
    method:"post",
    url:`${ip_port}/section/update/info`,
    data:axios.toFormData(newSectionInfo),
    headers:{
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      ElMessage({message:"修改成功!",type:"success"});
      return true;
    } else {
      ElMessage({message:data.message,type:"error"});
      return false;
    }
  })
  .catch(function (error) {
    console.log(error);
    return false;
  });
  return false;
}

function loadClassifyList() {
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
    } else if (data.code != 40010) {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .finally(()=>{
    isLoadingClassifyList.value = false;
  });
}

function loadSection() {
  axios({
    method: "get",
    url: `${ip_port}/section/info?sectionId=${route.params.id}`,
    headers: {
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      section = data.data;
      iconURL.value = section.iconURL;
      slogan.value = section.slogan;
      chooseClassifyId.value = section.classifyId;
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(()=>{
    isLoadingSection.value = false;
  });
}

onBeforeMount(()=>{
  loadClassifyList();
  loadSection();
})

function userInfoCardEnter(id: number) {
  if (timeId[id] !== undefined) {
    clearTimeout(timeId[id]);
  } else {
    showUserIdentityCard[id] = true;
  }
}
function userInfoCardDelayLeave(id: number) {
  timeId[id] = setTimeout(()=>{
    showUserIdentityCard[id] = false;
    timeId[id] = undefined;
  },100)
}
  
</script>
  
  
<style scoped>
  
.section-setting-box {
  padding: 0 20px;
}
  
.page-title {
  font-size: 34px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}
  
.section-info-setting-box {
  margin-top: 20px;
  border: 1px solid #b7b7b7;
  border-radius: 10px;
  padding: 2px;
  background-color: #f6f9f9;
  /* display: flex;
  flex-direction: column; */
}

.section-info-setting-title {
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
}

.update-icon {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.icon-can-upload {
  position: absolute;
  height: 150px;
  width: 150px;
  background-color: #2e2e2e;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}
.icon-can-upload:hover {
  opacity: 80%;
  transition: opacity 0.2s;
}
.icon-can-upload span {
  color: #ffffff;
  font-size: large;
  font-weight: bold;
}
.icon {
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.update-icon-button {
  align-self: center;
  margin-top: 10px;
  width: 60px;
  height: 25px;
}

.item {
  font-size: 16px;
  min-width: 50px;
}

.admin-identity-list-content {
  margin-top: 10px;
  gap: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.item-box {
  width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar-container {
  width: 100px;
  height: 100px;
}
.avatar-container:hover .admin-avatar {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.1s ease-in-out;
}
.admin-avatar {
  border: 2px double #a1a1a1;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  width: 90px;
  height: 90px;
  transition: all 0.2s ease-in-out;
}
.identity-card-container {
  position: absolute;
  margin-left: -355px;
  margin-top: -30px;
}

.admin-name {
  display: flex;
  flex-direction: row;
  font-size: 13px;
}

.identity {
  margin-left: 5px;
  height: 20px;
  width: 35px;
}


/* 管理员者身份卡片动画 */
.user-identity-card-content-enter-active  {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}
.user-identity-card-content-leave-active {
  transition: opacity 0.3s ease-out, transform 0.2s ease-out;
}
.user-identity-card-content-enter-from,
.user-identity-card-content-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

</style>