<script lang="ts">
export default {
  components: { CommentBox, postThread },
    name:'postPage',
}
import commentBox from './CommentBox.vue';
import { ElMessageBox } from 'element-plus';
</script >


<template>
        <div class="post-list" v-if="!isLoading">
            <li v-for ="commentPost in commentPostList" :key="commentPost.commentId">
                <postThread v-bind=commentPost />
            </li>
        </div>
       
    <div class="page-select-item" v-if="hasData">
        <el-pagination
            v-model:current-page="currentPage" 
            v-model:page-size="pageSize" 
            layout="total, prev, pager, next, jumper"
            :page-count="maxPagination" 
            :total="recordsCount"
            @current-change="handleCurrentChange"
        />
    </div>
    <CommentBox :postId="route.query.id"/>
</template>

<script lang="ts" setup >
import postThread from './postThread.vue';
import {useRoute} from 'vue-router'
import Cookies from 'js-cookie';
import axios from 'axios';
import {onBeforeMount,reactive,ref} from 'vue';
import { useHttpStore } from '@/store/Http';
import { CommentPostList } from '@/types';
import CommentBox from './CommentBox.vue';
const { ip_port } = useHttpStore();
let route = useRoute();
let isLoading = ref(true);
let commentPostList = reactive<CommentPostList>([])
    const hasData = ref(true);

const maxPagination = ref(1);
const currentPage = ref(1);
const pageSize = ref(10);
const recordsCount = ref(0)
console.log(route);
console.log(route.query.id);
onBeforeMount(() => {
    axios({
        method: "post",
        url: ip_port + "/comment/get?postId=" + route.query.id ,
        data: {
            "pagination": 1,
            "pageSize": pageSize.value
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
    .then(function (response) {
        const data = response.data;
        if (data.code == 200) {
            commentPostList = data.data.records;
            recordsCount.value = data.data.totalRecordNum;
            maxPagination.value = data.data.maxPagination;
            isLoading.value = false;
        } else if (data.code === 40010) {
            isLoading.value = false;
            hasData.value = false;
        } else {
            isLoading.value = false;
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
            hasData.value = false;
        }
    })
    .catch(function (error) {
        console.log(error);
        isLoading.value = false;
    });
})



const handleCurrentChange = (val: number) => {
    axios({
        method: "post",
        url: ip_port + "/comment/get" ,
        params:{
        "postId":route.query.id
        },
        data: {
            "pagination": val,
            "pageSize": pageSize.value
        },
        headers: {
            "Authorization": Cookies.get("Authorization"),
            "uid": Cookies.get("uid")
        }
    })
    .then(function (response) {
        const data = response.data;
        if (data.code == 200) {
            isLoading.value = true;
            commentPostList = [];
            commentPostList = data.data.records;
            recordsCount.value = data.data.totalRecordNum;
            maxPagination.value = data.data.maxPagination;
            isLoading.value = false;
        } else {
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        }
    })
    .catch(function (error) {
        console.log(error);
        isLoading.value = false;
    });
}
</script>
<style scoped>

.post-list{
    width: 900px;
    display:flex;
    justify-content: center;
    justify-self: center;
    flex-direction: column;
    background-color: #ffffffa2;
    border-radius: 10px; /* 圆角 */
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
</style>

    
