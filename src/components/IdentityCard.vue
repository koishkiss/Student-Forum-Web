<script lang="ts">
  export default {
    name:'IdentityCard'  //组件名
  }
</script>

<template>
<div class="identity-card-box">
  <el-icon class="is-loading" v-if="isLoading">
    <Loading/>
  </el-icon>

  <div class="loading-finish" v-if="!isLoading">
    <div class="not-login" v-if="!hasLogin">
      <el-text class="not-login-text" size="large">
        欢迎登入学生论坛系统！
      </el-text>
      <el-button type="success" size="large" plain class="not-login-button" @click="toLoginPage">
        登入
      </el-button>
    </div>

    <div class="has-login" v-if="hasLogin">
      <el-text class="nickname-text">
        {{ user.nickname }}
      </el-text>

      <el-tag :type="user.auth.type" effect="dark" class="tag-item">
        {{ user.auth.label }}
      </el-tag>

      <div class="data-statistics">
        <div class="statistics-item">
          <span class="statistics-num">{{ user.likeNum }}</span> 
          <span class="statistics-describe">获赞</span>
        </div>
        <el-divider direction="vertical" class="column-divider" />
        <div class="statistics-item">
          <span class="statistics-num">{{ user.postNum }}</span> 
          <span class="statistics-describe">发帖</span>
        </div>
        <el-divider direction="vertical" class="column-divider" />
        <div class="statistics-item">
          <span class="statistics-num">{{ user.joinNum }}</span> 
          <span class="statistics-describe">加入</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { onBeforeMount, ref } from 'vue';
import { useUserInfoStore } from '@/store/UserInfo';
import { useHttpStore } from '@/store/Http';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Loading }  from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const {ip_port} = useHttpStore();
const user = useUserInfoStore();
const route = useRouter();

const isLoading = ref(true);
const hasLogin = ref(false);

async function toLoginPage() {
  route.push({path:'/login'});
}

//初始化
onBeforeMount(()=>{
  if (user.uid === -1 && Cookies.get("Authorization") === undefined) {
    isLoading.value = false;
  } else if (user.uid !== -1) {
    hasLogin.value = true;
    isLoading.value = false;
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
        hasLogin.value = true;
      } else {
        window.alert(data.message);
      }
      isLoading.value = false;
    })
    .catch(function (error) {
      console.log(error);
      isLoading.value = false;
    });
  }
})

</script>


<style scoped>

.identity-card-box {
  border-radius: 8px;
  height: 500px;
  position: absolute;
  background-color: var(--vt-c-white);
  min-width: 300px;
  padding: 12px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  display: flex;
  flex-direction: column;
}

.is-loading {
  font-size: 40px;
  color: rgb(155, 155, 155);
  align-self: center;
  top: 40%;
}

.loading-finish {
  align-self: center;
  padding: 5px;
  width: 100%;
  height: 100%;
}

.not-login {
  margin-top: 50%;
  display: flex;
  flex-direction: column;
  align-self: center;
  align-items: center;
}

.not-login-text {
  font-size: 25px;
  color: #010f00;
  font-weight: bolder;
}

.not-login-button {
  margin-top: 40px;
}

/* 登入后展示的 */

.has-login {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
}

.nickname-text {
  margin-top: 18px;
  font-size: 30px;
}

.tag-item {
  margin-top: 13px;
}

.data-statistics {
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.statistics-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.statistics-num {
  font-size: large;
  font-weight: bold;
}
.statistics-describe {
  font-size: smaller;
  color: #959595;
}
.column-divider {
  height: 25px;
  margin: 0 30px;
}

</style>
