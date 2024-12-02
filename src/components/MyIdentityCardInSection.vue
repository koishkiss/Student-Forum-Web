<script lang="ts">
import { Check } from '@element-plus/icons-vue';
export default {
  name:"MyIdentityCardInSection",
  components:{
    Check
  }
}
</script>

<template>
<div class="identity-card-in-section-box">
  <div class="identity-card-in-section-title">
    <el-text tag="p" class="title">
      我在本版
    </el-text>
  </div>

  <div class="has-not-login-box" v-if="!hasLogin">
    <el-empty :image-size="100" description="请登入后查看"/>
  </div>

  <div :class="['identity-card-in-section-content', flexDirection === 'column' ? 'identity-card-in-section-content-column' : 'identity-card-in-section-content-row']" v-if="hasLogin">
    <el-avatar 
      :src="user.avatarURL" 
      shape="square" 
      :size="125" 
      class="avatar" 
      @click="toPersonalPage"
    />
    
    <div class="identity-card-in-section-info-box">
      <el-text class="nickname">
        {{ user.nickname }}
      </el-text>

      <div class="follow-button-and-identity">
        <el-popconfirm title="确定要取消关注该板块?" @confirm="unfollowTheSection">
          <template #reference>
            <el-button type="primary" class="follow-button" v-if="hasJoin">
              已关注<el-icon class="el-icon--right"><Check /></el-icon>
            </el-button>
          </template>
        </el-popconfirm>

        <el-button type="info" class="un-follow-button" v-if="!hasJoin" @click="followTheSection">
          未关注
        </el-button>

        <el-tag :type="identityTag.type" class="identity" v-if="hasJoin">
          {{ identityTag.label }}
        </el-tag>
      </div>

      <el-text class="join-time" v-if="hasJoin">
        于{{ joinTime }}成为该板块中的一员
      </el-text>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { useUserInfoStore } from '@/store/UserInfo';
import { useHttpStore } from '@/store/Http';
import { ElMessageBox, ElMessage } from 'element-plus';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import Cookies from 'js-cookie';
import axios from 'axios';

const props = defineProps(["hasJoin","joinTime","identity","sectionId","flexDirection"]);
const emit = defineEmits(["joinSection","cancelJoinSection"]);

const user = useUserInfoStore();
const router = useRouter();
const { ip_port } = useHttpStore();

const hasLogin = computed(()=>{
  return user.uid !== -1;
})

let identityTag = computed(()=>{
  if (props.identity === 0) {
    return { type: 'primary', label: '成员' }
  } else if (props.identity === 1) {
    return { type: 'success', label: '管理' }
  } else {
    return { type: 'warning', label: '版主' }
  }
})

function toPersonalPage() {
  router.push("/personal/activity")
}

function followTheSection() {
  axios({
    method:"get",
    url:`${ip_port}/section/join?sectionId=${props.sectionId}`,
    headers:{
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      emit('joinSection');
      ElMessage({message:"关注成功!",type:"success"});
    } else if (data.code === 40012) {
      ElMessage({message:"操作的太快了！休息一下吧",type:"error"});
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}

function unfollowTheSection() {
  axios({
    method:"get",
    url:`${ip_port}/section/cancelJoin?sectionId=${props.sectionId}`,
    headers:{
      "Authorization": Cookies.get("Authorization"),
      "uid": Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      emit('cancelJoinSection');
      ElMessage({message:"取消关注成功!",type:"success"});
    } else if (data.code === 40012) {
      ElMessage({message:"操作的太快了！休息一下吧",type:"error"});
    } else {
      ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
    }
  })
  .catch(function (error) {
    console.log(error);
  })
}

</script>


<style scoped>

.identity-card-in-section-box {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 23px;
  font-weight: bold;
}

.identity-card-in-section-content-row {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}
.identity-card-in-section-content-column {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
}

.avatar {
  border: 2px double #a1a1a1;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.avatar:hover {
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in-out;
}

.identity-card-in-section-info-box {
  margin-top: 1px;
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-left: 10px;
  gap: 10px
}

.nickname {
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  margin-bottom: 0;
  font-size: 18px;
  font-weight: bold;
}

.follow-button-and-identity {
  display: flex;
  flex-direction: row;
}

.follow-button {
  height: 24px;
  width: 70px;
  border-radius: 3px;
  font-size: smaller;
}
.el-icon--right {
  margin: auto;
  margin-left: 3px;
  height: 13px;
  width: 13px;
}

.un-follow-button {
  height: 24px;
  width: 50px;
  border-radius: 3px;
  font-size: smaller;
}

.identity {
  margin-left: 10px;
}

.join-time {
  font-size: 11px;
}

</style>
