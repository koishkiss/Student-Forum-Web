<script lang="ts">
import postThread from '@/components/postThread.vue';
import CommentBox from '@/components/CommentBox.vue';
import PostContentBox from '@/components/PostContentBox.vue';
export default {
  name:'PostPage',
  components: { CommentBox, postThread,PostContentBox }
}
</script >


<template>
<div class="post-page-box">
    <div class="page-head-box">

    </div>

    <div class="post-page-bottom-box">
        <div class="post-comment-box">
            <div class="post-content-box" v-if="currentPage === 1 && !isLoadingContent">
                <PostContentBox v-bind="content"/>
            </div>
            
            <div class="no-data-box" v-if="!hasData">
                <el-empty :image-size="100" description="别让楼主寂寞太久哦"/>
            </div>

            <ul class="comment-list" v-if="!isLoading && hasData">
                <li v-for ="commentPost in commentPostList" :key="commentPost.commentId">
                    <postThread v-bind=commentPost />
                </li>
            </ul>
            
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

            <div class="comment-box">
                <CommentBox :postId="route.query.id"/>
            </div>
        </div>

        <div class="right-side">
            <div class="right-side-item">
                <div class="personal-info-in-section-box">
                <!-- <MyIdentityCardInSection 
                    :hasJoin="hasJoin" 
                    :joinTime="joinTime" 
                    :identity="identity" 
                    :sectionId="section.sectionId" 
                    @join-section="joinSection" 
                    @cancel-join-section="cancelJoinSection" 
                /> -->
                </div>
            </div>
        </div>
    </div>
</div>
</template>


<script lang="ts" setup >
import {useRoute} from 'vue-router'
import Cookies from 'js-cookie';
import axios from 'axios';
import {onBeforeMount,reactive,ref} from 'vue';
import { useHttpStore } from '@/store/Http';
import { CommentPostList, PostContent } from '@/types';
import { ElMessageBox } from 'element-plus';

const { ip_port } = useHttpStore();
let route = useRoute();

const hasData = ref(true);
const isLoading = ref(true);
const isLoadingContent = ref(true);

let commentPostList = reactive<CommentPostList>([]);
let content = reactive<PostContent>({
  postId: -1,
  sectionId: -1,
  uid: -1,
  avatarURL: "",
  nickname: "",
  isModerator: false,
  title: "",
  coverURL: "",
  content: "",
  postTime: "",
  viewNum: -1,
  likeNum: -1,
  bookmarkNum: -1,
  commentNum: -1,
  status: -1,
  isLiked: false,
  isMarked: false
});

const maxPagination = ref(1);
const currentPage = ref(1);
const pageSize = ref(10);
const recordsCount = ref(0);

const handleCurrentChange = (val: number) => {
    if (currentPage.value === 1) {
        getFirstFloor();
    }

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
            scrollTo(0,0);
        } else {
            ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
        }
    })
    .catch(function (error) {
        console.log(error);
        isLoading.value = false;
    });
}

async function getFirstFloor() {
    isLoadingContent.value = true;
    if (currentPage.value === 1) {
        axios({
            method:"get",
            url: `${ip_port}/post/view?postId=${route.query.id}`,
            headers: {
                "Authorization": Cookies.get("Authorization"),
                "uid": Cookies.get("uid")
            }
        })
        .then(function (response) {
            const data = response.data;
            if (data.code === 200) {
                isLoadingContent.value = false;
                content = data.data;
            } else {
                ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}

onBeforeMount(() => {
    getFirstFloor();

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
            scrollTo(0,0);
        } else if (data.code === 40010) {
            isLoading.value = false;
            hasData.value = false;
            scrollTo(0,0);
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
</script>


<style scoped>
.post-page-box {
  flex: 8; /* 70% 宽度 */
  padding: 150px 340px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  gap: 10px;
  margin: 0 auto;
}

.post-page-bottom-box {
  display: flex;
  flex-direction: row;
}

.post-comment-box {
  flex: 6;
  display: flex;
  flex-direction: column;
}

.post-content-box {
  padding: 0;
  margin: 0;
  /* border: solid 1px rgb(211, 211, 211);
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center; */
}

.no-data-box {
  border: solid 1px rgb(211, 211, 211);
  border-bottom: none;
}

.comment-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.page-select-item {
  border: solid 1px rgb(211, 211, 211);
  border-top: none;
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.comment-box {
  border: solid 1px rgb(211, 211, 211);
  border-top: none;
  padding: 10px 20px;
}

.right-side {
  background-color: #d6d6d6;
  flex: 2;
}

.right-side-item {
  position: sticky;
  top: 60px;
  padding: 5px;
}
</style>

    
