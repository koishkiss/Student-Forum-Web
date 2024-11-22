<script lang="ts">
    export default {
        name:'SideBar',
        components:{
        }
    }
</script>

<template>
    <div class="side-bar-box" v-if="!isLoading">
        <el-text tag="p" class="classify-list-title">
            热门帖子
        </el-text>
        <div class="side-bar">
            
            <ul>
                <li v-for="post in postList" :key="post.id">
                    <p @click="watchPosting(post.id)">{{post.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useHttpStore } from '@/store/Http';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { onBeforeMount } from 'vue';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ElMessageBox } from 'element-plus';

const { ip_port } = useHttpStore();
const isLoading = ref(true);
const postList = ref([]);
const router = useRouter();

onBeforeMount(()=>{
    axios({
        method:"get",
        url:ip_port + "/popular/active/12",
        headers:{
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
    .then(function(response){
        const data = response.data;
        if (data.code == 200) {
            postList.value = data.data;
            console.log(postList);
            isLoading.value = false;
        } else if (data.code === 40010) {
            isLoading.value = false;
        } else {
            isLoading.value = false;
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        }
    })
})

function watchPosting(id:number){
    router.push("/post?id=" + id);
}
</script>

<style scoped>
.side-bar-box {
  position: sticky;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-items: baseline;
  border-radius: 5px;
  border-end-start-radius: 0;
  background-color: rgb(232, 243, 244);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;
}
.side-bar-box:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.classify-list-title {
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
}

.side-bar {
  border-radius: 8px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
}

.side-bar p {
  font-size: 12px;
  font-weight: bold;
  color: #4a4a4a;
  margin-left: 15px;
}

.side-bar ul {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-top: 10px;
  margin-bottom: 0;
}

.side-bar li {
  font-size: 16px;
  height: 40px;
  border-left: 5px solid yellowgreen;
  margin-top: 1px;
  margin-bottom: 1px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
  cursor: pointer;
}
.side-bar li:nth-child(1) {
    border-left: 5px solid red;
}
.side-bar li:nth-child(2) {
    border-left: 5px solid orange;
}
.side-bar li:nth-child(3) {
    border-left: 5px solid #FFD83B;
}

.side-bar li:hover {
  background-color: #f3f4f6;
  padding-left: 20px;
}

.side-bar li::before {
  margin-right: 8px;
  font-size: 18px;
}
</style>