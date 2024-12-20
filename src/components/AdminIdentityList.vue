<script lang="ts">
import UserPreviewIdentityCard from './UserPreviewIdentityCard.vue';
export default {
  name:"AdminIdentityList",
  components:{
    UserPreviewIdentityCard
  }
}
</script>

<template>
<div class="admin-identity-list-box">
  <div class="admin-identity-list-title">
    <el-text tag="p" class="title">
      本版人员
    </el-text>
  </div>

  <div class="has-not-login-box" v-if="!hasPerson">
    <el-empty :image-size="100" description="这个板块还是片荒芜~"/>
  </div>

  <div class="admin-identity-list-content" v-if="hasPerson">
    <div v-for="(admin,index) in adminList" :key="index" class="admin-identity-item"> 
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
            @click="toPersonalPageForVisitor(admin.uid)"
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
</template>


<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { AdminList } from '@/types';
import Cookies from 'js-cookie';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  adminList:{
    type: Array  as () => AdminList
  }
});

const hasPerson = computed(()=>{
  return props.adminList.length === 0 ? false : true;
})

const showUserIdentityCard = reactive<Array<boolean>>([]);

var timeId: any[] = [];
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

function toPersonalPageForVisitor(uid){
  if(uid != Cookies.get("uid") )
  router.push(`/visit/other/person/${uid}/post`);
  else if(uid == Cookies.get("uid")) router.push('/personal/activity');
}

</script>


<style scoped>

.admin-identity-list-box {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 23px;
  font-weight: bold;
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
