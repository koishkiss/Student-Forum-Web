<script lang="ts">
  export default {
    name:'LoginPage'  //组件名
  }
</script>

<template>
<div class="login-page-box">
  <div class="input-form">
    <el-text class="mx-1" size="large" style="font-size: 25px; margin-top: 25px; margin-bottom: 5px;">
      欢迎登入学生论坛系统
    </el-text>
    <el-divider content-position="left">
      使用统一认证登入
    </el-divider>
    <span class="input-line">
      学号：
      <el-input 
        class="input-box"
        v-model="sid" 
        placeholder="请输入学号" 
      />
    </span>
    <span class="input-line">
      密码：
      <el-input
        class="input-box"
        v-model="pwd"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </span>
    <div class="submit-box">
      <el-button type="primary" :loading="loading" @click="doLogin">登入</el-button>
    </div>
  </div>
</div>
</template>

<script  lang="ts" setup>
import { useHttpStore } from '@/store/Http';
import { useUserInfoStore } from '@/store/UserInfo';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { ref } from 'vue';
import Cookies from 'js-cookie';

const {ip_port} = useHttpStore();
const user = useUserInfoStore();
const router = useRouter();

const sid = ref('')
const pwd = ref('')
const loading = ref(false);

async function doLogin() {
  loading.value = true;
  axios.post(ip_port+'/user/login', {
    sid: sid.value,
    password: pwd.value
  })
  .then(function (response) {
    const data = response.data;
    if (data.code == 200) {
      user.$patch(data.data.user);
      Cookies.set("Authorization",data.data.token,{ expires:7 });
      Cookies.set("uid",data.data.user.uid,{ expires:7 });
      window.alert("登入成功！");
      loading.value = false;
      router.push({path:"/main"});
    } else {
      window.alert(data.message);
      loading.value = false;
    }
  })
  .catch(function (error) {
    loading.value = false;
    console.log(error);
  });
}

// onBeforeMount(()=>{
//   if (user.uid !== -1) {
//     router.push("/main")
//   }
// })

</script>

<style scoped>
.login-page-box {
  padding: 150px 100px;
  display: flex;
  flex-direction: row-reverse;
}

.input-form {
  border-radius: 10px;
  background-color: var(--color-background-soft);
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  margin-right: 10%;
}

.input-line {
  margin-top: 20px;
  margin-bottom: 20px;
}

.input-box {
  width: 240px
}

.submit-box {
  margin-top: 20px;
}
</style>