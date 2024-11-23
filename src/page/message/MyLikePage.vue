<script lang="ts">
export default {
  name:"MyLikePage"
}
</script>

<template>
<div class="my-like-page-box">

</div>
</template>


<script lang="ts" setup>
import { useHttpStore } from '@/store/Http';
import axios from 'axios';
import Cookies from 'js-cookie';
import { onBeforeMount, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const { ip_port } = useHttpStore();
const router = useRouter();

let likeList = reactive([]);
const isFirstLoading = ref(true);
const isLoadingMore = ref(false);
let lastData = reactive(null);
const isEmpty = ref(false);
const noMore = ref(false);

//加载更多
async function loadMore() {
  isLoadingMore.value = true;
  await axios({
    method:"post",
    url:ip_port + "/user/mine/like",
    data:{
      "lastData":lastData,
      "pageSize":5
    },
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      likeList.push.apply(likeList,data.data.records)
      lastData = data.data.lastData;
      isLoadingMore.value = false;
      noMore.value = false;
    } else if (data.code === 40006) {
      isLoadingMore.value = false;
      noMore.value = true;
    } else {
      window.alert(data.message);
      isLoadingMore.value = false;
      noMore.value = true;
    }
  })
  .catch(function (error) {
    console.log(error);
    isLoadingMore.value = false;
  });
}

//初始化
onBeforeMount(()=>{
  axios({
    method:"post",
    url:ip_port + "/user/mine/like",      
    data:{
      "pageSize":5
    },
    headers:{
      "Authorization":Cookies.get("Authorization"),
      "uid":Cookies.get("uid")
    }
  })
  .then(function (response) {
    const data = response.data;
    if (data.code === 200) {
      likeList = data.data.records;
      lastData = data.data.lastData;
      isFirstLoading.value = false;
    } else if (data.code === 40010) {
      isEmpty.value = true;
      isFirstLoading.value = false;
    } else {
      console.log(data.message);
      window.alert(data.message);
      isEmpty.value = true;
      isFirstLoading.value = false;
    }
  })
  .catch(function (error) {
    console.log(error);
    isEmpty.value = true;
    isFirstLoading.value = false;
  });
})

</script>


<style scoped>

</style>
