<script lang="ts">
  export default {
    name:'LoginPage'  //组件名
  }
</script>

<template>
<div class="login-page-box">
  <!-- <el-image fit="fill" class="image" :src="imagrURL"/> -->

  <div class="shell">
    <div class="box wave"></div>
    <div class="box wave"></div>
    <div class="box wave"></div>
    <div class="text-wrapper">
      <div class="text-content">
          <span class="wave">welcome</span>
          <br>
          <span class="wave">to student</span>
      </div>
      <div class="text-author">
          <span class="wave">forum</span>
      </div>
    </div>
  </div>

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
      <el-tooltip
        class="box-item"
        effect="dark"
        content="使用用户名密码进行普通登入"
        placement="top"
      >
        <el-button type="primary" :loading="loading" @click="doNormalLogin">登入</el-button>
      </el-tooltip>
    </div>
    <el-text class="quick-login-text" v-if="false">快捷登入</el-text>
    <div class="quick-login-box" v-if="false">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="没有登入就是游客状态"
        placement="bottom"
      >
        <el-button disabled>游客</el-button>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="可以看帖、发帖、修改个人信息等"
        placement="bottom"
      >
        <el-button type="primary" plain @click="loginWithPrimary">
          普通成员
        </el-button>
      </el-tooltip>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="最高权限"
        placement="bottom"
      >
        <el-button type="warning" plain @click="loginWithModerator">
          版主
        </el-button>
      </el-tooltip>
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

const {ip_port, static_ip_port} = useHttpStore();
const user = useUserInfoStore();
const router = useRouter();

const sid = ref('')
const pwd = ref('')
const loading = ref(false);
const imagrURL = `${static_ip_port}/image/static/background3.jpg`

function loginWithPrimary() {
  doLogin("202051400514","654321");
}

function loginWithModerator() {
  doLogin("202000300514","123456");
}

function doNormalLogin() {
  doLogin(sid.value, pwd.value);
}

async function doLogin(theSid: string, thePwd: string) {
  loading.value = true;
  axios.post(ip_port+'/user/login', {
    sid: theSid,
    password: thePwd
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
@import url("https://fonts.googleapis.com/css2?family=Yeseva+One&display=swap");

.login-page-box {
  margin-top: 50px;
  display: flex;
  width: 100%;
  min-width: 1200px;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.shell {
  width: 670px;
  aspect-ratio: 1/1;
  display: flex;
  border-radius: 50%;
  overflow: hidden;
  text-align: center;
  filter: drop-shadow(-30px 30px 10px #006e9d);
  top: 100px;
  left: 70px;
}

.text-wrapper {
  font-size: 108px;
}

span.wave {
  background: -50% 0%/200% 100% linear-gradient(90deg, #32967048, #0a26ff, #32967048);
  color: transparent;
  background-clip: text;
  animation: flow 4s linear infinite;
  padding: 0 70px;
  font-family: "Yeseva One";
  cursor:default;
}

.text-author {
  font-size: 80px;
  text-align: right;
}

.box {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #fff;
}

.box:nth-of-type(1) {
  height: 35%;
  opacity: 0.6;
}

.box:nth-of-type(2) {
  height: 67%;
  opacity: 0.5;
}

.box:nth-of-type(3) {
  height: 93%;
  opacity: 0.4;
}

.wave {
  /* 创建两个径向渐变蒙版，模拟波浪的上下部分 */
  -webkit-mask: radial-gradient(46.6px at 50% calc(100% - (27px + 38px)),
          #fff 99%, #ffffff00 101%), radial-gradient(46.6px at 50% calc(100% + 38px),
          #ffffff00 99%, #fff 101%) repeat-x;
  /* 设置蒙版的大小，使波浪在水平上重复 */
  -webkit-mask-size: calc(4*27px) 100%;
  /* 设置蒙版的初始位置，调整波浪的位置 */
  -webkit-mask-position: calc(50% - 2*27px) 0, 50% calc(100% - 27px);
  animation: flow 5s linear infinite;
}

@keyframes flow {
  100% {
    /* 设置动画结束时的蒙版位置，使波浪看起来在移动 */
    -webkit-mask-position: calc(50% - 6*27px) 0, calc(50% - 4*27px) calc(200% - 27px);
  }
}

/* 登入表单 */

.input-form {
  z-index: 1;
  border-radius: 10px;
  /* background-color: var(--color-background-soft); */
  background-color:rgba(255, 255, 255, 0.8) ;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.input-form:hover {
  box-shadow: 0 6px 9px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;
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

.quick-login-text {
  margin-top: 10px;
  font-size: smaller;
}

.quick-login-box {
  margin-top: 10px;
}

</style>