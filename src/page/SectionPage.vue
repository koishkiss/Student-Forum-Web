<script lang="ts">
import MyIdentityCardInSection from '@/components/MyIdentityCardInSection.vue';
import AdminIdentityList from '@/components/AdminIdentityList.vue';
import { useUserInfoStore } from '@/store/UserInfo';
export default {
  name:'SectionPage',  //组件名
  components:{
    MyIdentityCardInSection,AdminIdentityList
  }
}
</script>

<template>
<div class="section-page-box">
  <div class="section-page-content">
    <p v-if="isLoading">
      Loading...
    </p>

    <div class="profile" v-if="!isLoading">
      <div class="cover-icon-box">
        <el-image 
          :src="iconURL" 
          fit="cover" 
          class="avatar"
          :preview-src-list="[iconURL]" 
          :initial-index="0"
        />
      </div>
      <div class="section-info">    
        <el-text tag="p" class="section-name">
          {{ section.name }}
        </el-text>
        <div class="other-info">
          <el-text class="info-item">关注：{{ section.memberNum }}</el-text>
          <el-divider direction="vertical" />
          <el-text class="info-item">帖子：{{ section.postNum }}</el-text>
          <el-divider direction="vertical" />
          <el-text class="info-item">分区：{{ classify }}</el-text>
          <el-divider direction="vertical" />
          <el-text class="info-item">创建时间：{{ section.createTime }}</el-text>
        </div>
        <el-text tag="p" class="slogan">简介: {{ slogan }}</el-text>
      </div>
    </div>

    <div class="page-content-box">
      <div class="left-side">
        <nav class="nav-tabs">
          <RouterLink 
            :to="`/section/${section.sectionId}/post/all`" 
            class="router cta" 
            active-class="router-choose"
          >
            <span class="hover-underline-animation"> 看帖 </span>
          </RouterLink>

          <RouterLink 
            :to="`/section/${section.sectionId}/post/selected`" 
            class="router cta" 
            active-class="router-choose"
          >
            <span class="hover-underline-animation"> 精选 </span>
          </RouterLink>

          <RouterLink 
            :to="`/section/${section.sectionId}/setting`" 
            class="router cta" 
            active-class="router-choose" 
            v-if="!isLoading && (user.authority >= 3 || (user.authority >= 2 && hasJoin))"
          >
            <span class="hover-underline-animation"> 设置 </span>
          </RouterLink>
        </nav>
        <RouterView @update:sectionInfo="changeSectionData" :adminList="section.adminList" />
      </div>

      <div class="right-side">
        <div class="right-side-item">
          <div class="personal-info-in-section-box">
            <MyIdentityCardInSection 
              :hasJoin="hasJoin" 
              :joinTime="joinTime" 
              :identity="identity" 
              :sectionId="section.sectionId" 
              @join-section="joinSection" 
              @cancel-join-section="cancelJoinSection" 
            />
          </div>

          <el-divider style="margin-top: 10px;margin-bottom: 10px;"/>

          <div class="other-section-info-box">
            <AdminIdentityList :adminList="section.adminList" />
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { onBeforeMount, reactive, ref, toRef } from 'vue';
import { useHttpStore } from '@/store/Http';
import { useRoute, useRouter } from 'vue-router';
import { SectionInfo } from '@/types';
import Cookies from 'js-cookie';
import axios from 'axios';
import { ElMessageBox } from 'element-plus';

const route = useRoute();
const router = useRouter();
const user = useUserInfoStore();
const { ip_port } = useHttpStore();

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

let iconURL = toRef(section,"iconURL");
let slogan = toRef(section,"slogan");
let classify = toRef(section,"classify");
let hasJoin = toRef(section,"hasJoin");
let joinTime = toRef(section,"joinTime");
let identity = toRef(section,"identity");

const isLoading = ref(true);

function changeSectionData(theIconURL, theSlogan, theClassify) {
  if (theIconURL) {
    iconURL.value = theIconURL;
  } else if (theSlogan) {
    slogan.value = theSlogan;
  } else if (theClassify) {
    classify.value = theClassify;
  }
}

function joinSection() {
  axios({
    method: "get",
    url: `${ip_port}/section/info?sectionId=${section.sectionId}`,
    headers: {
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      hasJoin.value = data.data.hasJoin;
      joinTime.value =  data.data.joinTime;
      identity.value = data.data.identity;
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}

function cancelJoinSection() {
  hasJoin.value = false;
  joinTime.value = "";
  identity.value = 0;
}

//初始化
onBeforeMount(()=>{
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
      classify.value = section.classify;
      hasJoin.value = section.hasJoin;
      joinTime.value = section.joinTime;
      identity.value = section.identity;
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
      router.push('/main');
    }
  })
  .catch(function (error) {
    console.log(error);
  })
  .finally(()=>{
    isLoading.value = false;
  });
})

</script>


<style scoped>
@import "@/assets/cta-button.css";

.section-page-box {
  padding: 150px 300px;
  display: flex;
  margin-top: 20px;
  gap: 5%;
  margin: 0 auto;
}

.section-page-content {
  flex: 7; /* 70% 宽度 */
  background-color: #F5F7FA;
  padding: 20px;
  padding-top: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.profile {
  display: flex;
  align-items: center;
  padding: 10px;
  padding-top: 1px;
  margin: 0 auto;
}

.cover-icon-box {
  margin-top:-45px;
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.avatar {
  width: 125px;
  height: 125px;
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}
.avatar:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
}

.section-info {
  margin-left: 10px;
}
.section-name {
  display: flex;
  flex-direction: row;
  color: #000;
  font-size: 23px;
  font-weight: bold;
}
.tag {
  height: 20px;
  width: 40px;
  justify-self: center;
  align-self: center;
  margin-left: 7px;
}
.other-info {
  margin-top: 1px;
}
.slogan {
  margin-top: 6px;
}


.page-content-box {
  min-width: 900px;
  display: flex; /* 使用 Flexbox 布局 */
  gap: 5px; /* 两边内容的间距 */
  padding: 1px;
  background-color: #ffffffa2; /* 背景颜色 */
  border-radius: 10px; /* 圆角 */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* 添加阴影 */
}

.left-side {
  flex: 6; /* 占左边 70% */
  background-color: #ffffff; /* 白色背景 */
  padding: 20px;
  border-radius: 8px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
}

.nav-tabs {
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #eee;
}
.router {
  text-decoration: none;
  font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  text-shadow: 1px 1px 2px grey;
  margin-bottom: 10px;
}
.router-choose span {
  color: #0d4700;
}
.router-choose .hover-underline-animation::after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.right-side {
  flex: 4; /* 占右边 30% */
}

.right-side-item {
  position: sticky;
  top: 60px;
  padding: 5px;
}

.follow-section-box {
  background-color: #ffffff; /* 白色背景 */
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05); /* 轻微阴影 */
  position: sticky;
  top: 63px;
}

</style>