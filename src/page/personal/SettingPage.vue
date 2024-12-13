
<template>
<div class="personal-setting-box" v-if="!isLoading">
  <el-text  class="page-title" tag="p" >设置</el-text>
  <div class="personal-info-setting-box">
    <el-text tag="p" class="personal-info-setting-title">
      个人信息设置
    </el-text>

    <div class="personal-info-setting-content">
      <div class="update-avatar">
        <el-avatar :src="user.avatarURL" fit="cover" shape="square" :size="150" class="avatar"/>
        <div class="avatar-can-upload" @click="updateAvatar">
          <span>修改头像</span>
        </div>
        <el-button type="success" class="update-avatar-button" @click="updateAvatar">
          上传
        </el-button>
      </div>

      <div class="update-other-info">
        <div class="uid">
          <el-text class="item">UID:</el-text>
          <el-text class="item" style="margin-left: 1px;">{{ user.uid }}</el-text>
        </div>

        <div class="update-nickname">
          <el-text class="item">昵称:</el-text>
          <el-input 
            v-model="nickname" 
            maxlength="20"
            show-word-limit
            class="nickname" 
            @keyup.enter="updateNickname"
          />
          <el-button type="primary" class="update-signature-button" @click="updateNickname">
            修改
          </el-button>
        </div>

        <div class="update-signature">
          <div class="signature-box">
            <el-text class="item" style="align-self: start;">简介:</el-text>
            <el-input 
              type="textarea" 
              v-model="signature" 
              maxlength="50"
              show-word-limit
              :autosize="{ minRows: 2, maxRows: 3 }" 
              class="signature"
            />
          </div>
          <div class="update-signature-button-box">
            <el-button type="primary" class="update-nickname-button" @click="updateSignature">
              保存
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <input type="file" accept=".jpg,.png,.bmp,.jpeg" @change="upload" ref="inputAvatar" hidden>
</div>
</template>


<script lang="ts" setup  name="Settings">
import { useHttpStore } from '@/store/Http';
import { useUserInfoStore } from '@/store/UserInfo';
import axios from 'axios';
import { ElMessage, ElMessageBox } from 'element-plus';
import Cookies from 'js-cookie';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const user = useUserInfoStore();
const { ip_port } = useHttpStore();
const router = useRouter();

const isLoading = ref(true);
const nickname = ref("");
const signature = ref("");

const inputAvatar = ref();

function updateAvatar() {
  inputAvatar.value.click();
}

async function upload() {
  await axios({  
    method: 'put',  
    url: `${ip_port}/user/update/avatar`,
    data: axios.toFormData({  
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
      ElMessage({message:"更新头像成功",type:"success"});
      user.avatarURL = data.data;
    } else {
      ElMessage({message:data.message,type:"error"});
    }
  })  
  .catch(function (error) {  
    console.error(error);
  });  
}

//更新用户昵称
function updateNickname() {
  var result = updateUserInfo({"nickname":nickname.value});
  if (result) {
    user.nickname = nickname.value;
  }
}

//更新用户简介
function updateSignature() {
  var result = updateUserInfo({"signature":signature.value});
  if (result) {
    user.signature = signature.value;
  }
}

//更新用户信息
async function updateUserInfo(newUserInfo): Promise<boolean> {
  await axios({
    method:"put",
    url:`${ip_port}/user/update/information`,
    data:axios.toFormData(newUserInfo),
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

//初始化
onMounted(()=>{
  if (user.uid !== -1) {
    isLoading.value = false;
    nickname.value = user.nickname;
    signature.value = user.signature;
  } else if (Cookies.get('uid') === undefined) {
    ElMessageBox.alert("请登录!", "", {confirmButtonText: 'OK'});
    router.push('/main');
  } else {
    axios({
      method: "get",
      url: ip_port + "/user/mine/info",
      headers: {
        "Authorization": Cookies.get("Authorization"),
        "uid": Cookies.get("uid")
      }
    })
    .then(function (response) {
      const data = response.data;
      if (data.code == 200) {
        user.$patch(data.data);
        nickname.value = user.nickname;
        signature.value = user.signature;
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
  }
});

</script>


<style scoped>

.personal-setting-box {
  padding: 0 20px;
}

.page-title {
  font-size: 34px;
  font-weight: bold;
  margin-left: 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.personal-info-setting-box {
  margin-top: 20px;
  border: 1px solid #b7b7b7;
  border-radius: 10px;
  padding: 2px;
  background-color: #f6f9f9;
}

.personal-info-setting-title {
  margin-left: 10px;
  font-weight: bold;
  font-size: 20px;
}

.personal-info-setting-content {
  display: flex;
  flex-direction: row;
}

.update-avatar {
  padding: 10px;
  display: flex;
  flex-direction: column;
}
.avatar-can-upload {
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
.avatar-can-upload:hover {
  opacity: 80%;
  transition: opacity 0.2s;
}
.avatar-can-upload span {
  color: #ffffff;
  font-size: large;
  font-weight: bold;
}
.avatar {
  border: 2px double #a1a1a1;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}
.update-avatar-button {
  align-self: center;
  margin-top: 10px;
  width: 60px;
  height: 25px;
}

.update-other-info {
  padding: 5px;
}

.item {
  font-size: 16px;
  min-width: 50px;
}

.uid {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
}

.update-nickname {
  margin-top: 18px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
}

.nickname {
  height: 30px;
  width: 200px;
  font-size: 15px;
  margin-right: 5px;
}

.update-nickname-button {
  font-size: 13px;
  width: 40px;
  height: 23px;
}

.update-signature {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.signature-box {
  display: flex;
  flex-direction: row;

}

.signature {
  width: 280px;
}

.update-signature-button-box {
  margin-top: 4px;
  align-self: flex-end;
}

.update-signature-button {
  font-size: 13px;
  width: 40px;
  height: 23px;
}

</style>