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
        url:ip_port + "/popular/active/10",
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
    background-color: rgb(210, 232, 233);
}

.classify-list-title {
  margin-top: 10px;
  font-size: large;
  font-weight: bold;
}

.side-bar {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #333;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
}

.side-bar:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
  margin-bottom: 0%;
}

.side-bar li {
  font-size: 16px;
  height: 40px;
  background-color: #ffffff;
  border-left: 5px solid #4f46e5;
  border-radius: 4px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
  cursor: pointer;
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