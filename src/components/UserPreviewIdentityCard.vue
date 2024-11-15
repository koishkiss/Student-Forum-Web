<script lang="ts">
import { Loading } from '@element-plus/icons-vue';
export default {
  name:'UserPreviewInfoCard',  //组件名
  components:{
    Loading
  }
}
</script>

<template>
<div class="user-preview-info-box">

  <div class="loading-box" v-if="isLoading">
    <Loading/>
  </div>

  <div class="no-data-box" v-if="!hasUser">
    <el-empty :image-size="50" description="这位用户好像走丢了!"/>
  </div>

  <div v-if="!isLoading&&hasUser" class="user-preview-info-box">
    <div class="avatar-box">
      <el-avatar :src="theUser.avatarURL" fit="cover" shape="square" class="avatar"/>
    </div>

    <div class="info-box">
      <el-text class="nickname-box" tag="p">
        {{ theUser.nickname }}
        <el-tag :type="auth.type" effect="dark" class="tag">
          {{ auth.label }}
        </el-tag>
      </el-text>
      
      <div class="other-info">
        <el-text class="info-item">发帖：{{ theUser.postNum }}</el-text>
        <el-divider direction="vertical" />
        <el-text class="info-item">获赞：{{ theUser.likeNum }}</el-text>
      </div>

      <div class="signature-box">
        <el-text class="signature" tag="p">{{ theUser.signature }}</el-text>
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { useHttpStore } from '@/store/Http';
import { UserInfo } from '@/types';
import axios from 'axios';
import Cookies from 'js-cookie';
import { computed, onBeforeMount, reactive, ref } from 'vue';

const props = defineProps(["theUid"]);

const { ip_port } = useHttpStore();

let theUser = reactive<UserInfo>({
  uid:-1,
  sid:"",
  authority:1,
  nickname:"",
  signature:"",
  registerTime:"",
  likeNum:-1,
  bookmarkNum:-1,
  postNum:-1,
  joinNum:-1,
  avatarURL:"http://47.113.194.64:22222/image/default-avatar.png"
});

let auth = computed(()=>{
  if (theUser.authority === 0) {
    return { type: 'danger', label: '封禁中' }
  } else if (theUser.authority === 1) {
    return { type: 'primary', label: 'SDUer' }
  } else if (theUser.authority === 2) {
    return { type: 'success', label: '小版主' }
  } else {
    return { type: 'warning', label: '版主' }
  }
})

const isLoading = ref(true);
const hasUser = ref(true);

onBeforeMount(()=>{
  axios({
    method:"get",
    url:`${ip_port}/user/other/info?uid=${props.theUid}`,
    headers:{"Authorization":Cookies.get("Authorization"),"uid":Cookies.get("uid")}
  })
  .then(function (response) {
    const data = response.data;
      if (data.code === 200) {
        theUser = data.data;
        isLoading.value = false;
      } else {
        hasUser.value = false;
        isLoading.value = false;
      }
  })
  .catch(function (error) {
    console.log(error);
  });
})

</script>


<style scoped>

.user-preview-info-box {
  background-color: white;
  position: absolute;
  min-width: 350px;
  height: 150px;
  box-shadow: 2px 8px 16px 2px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  z-index: 1;
}

.loading-box {
  margin: auto;
  width: 25px;
  color: rgb(155, 155, 155);
}

.no-data-box {
  display: flex;
  margin: auto;
}

.avatar-box {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 150px;
}
.avatar {
  height: 115px;
  width: 115px;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
}
.avatar:hover {
  box-shadow: 0 0 7px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in-out;
}

.info-box {
  padding: 15px 0;
}

.nickname-box {
  cursor: pointer;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  display: flex;
  flex-direction: row;
  font-weight: bold;
  font-size: medium;
}
.tag {
  height: 20px;
  width: 40px;
  justify-self: center;
  align-self: center;
  margin-left: 7px;
}

.other-info {
  margin-left: 0;
  margin-top: 1px;
}

.signature-box {
  padding-top: 7px;
}
.signature {
  margin: auto;
  margin-left: 0;
  width: 175px;
  font-size: 12px;
}
</style>