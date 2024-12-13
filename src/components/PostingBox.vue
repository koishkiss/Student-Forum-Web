<script lang="ts">
import { Minus, Plus } from "@element-plus/icons-vue"
import { useHttpStore } from '@/store/Http';
export default {
  name:"PostingBox",
  components:{
    Plus,Minus
  }
}
</script>

<template>
<div class="posting-box">
  <el-text class="box-title" tag="p">
    发表
  </el-text>

  <div class="input-box">
    <div class="title-input-box">
      <el-input 
        v-model="title" 
        placeholder="请填写标题" 
        clearable 
        maxlength="50" 
        show-word-limit 
        type="text" 
        class="title-input" 
      />
    </div>

    <div class="content-input-box">
      <el-input 
        v-model="content" 
        placeholder="请填写内容" 
        :autosize="{ minRows: 9, maxRows: 12 }" 
        maxlength="1000" 
        show-word-limit 
        type="textarea" 
        class="content-input" 
      />
    </div>

    <div class="cover-input-box" v-if="addCover">
      <el-upload 
        ref="upload"
        class="cover-uploader" 
        :action="ip_port+'/upload/photo'" 
        :headers="{
          Authorization: Cookies.get('Authorization'),
          uid: Cookies.get('uid')
        }" 
        name="photo" 
        :show-file-list="false"
        :limit="1"
        :multiple="false"
        :on-exceed="handleExceed"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeCoverUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="cover" fit="cover" />
        <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>

    <div class="operator-box">
      <div class="add-cover-box">
        <el-button class="add-cover" type="primary" plain @click="uploadCover">
          添加封面
          <el-icon class="el-icon--right">
            <Plus v-if="!addCover" /><Minus v-if="addCover" />
          </el-icon>
        </el-button>
      </div>
      <div class="submit-box">
        <el-button class="submit" type="primary" plain @click="uploadPost">
          提交
        </el-button>
      </div>
    </div>
  </div>
</div>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessageBox, genFileId } from 'element-plus';
import { ElMessage, UploadProps, UploadRawFile } from 'element-plus';
import axios from 'axios';
import Cookies from 'js-cookie';

const props = defineProps(["sectionId"]);
const { ip_port } = useHttpStore();

const upload = ref();

const title = ref('');
const content = ref('');
const addCover = ref(false);
const imageUrl = ref('');
const imageName = ref('');

function uploadCover() {
  if (addCover.value) {
    imageUrl.value = '';
    imageName.value = '';
    addCover.value = false;
  } else {
    addCover.value = true;
  }
}

function uploadPost() {
axios({
  method:"post",
  url:`${ip_port}/post/post`,
  headers: {
    "Authorization": Cookies.get("Authorization"),
    "uid": Cookies.get("uid")
  },
  data: {
    "sectionId":props.sectionId,
    "title":title.value,
    "content":content.value,
    "cover":imageName.value?imageName.value:null
  }
})
.then(function (response) {
  const data = response.data;
  if (data.code == 200) {
    title.value = '';
    content.value = '';
    imageUrl.value = '';
    imageName.value = '';
    addCover.value = false;
    ElMessage({message:"发布成功",type:"success"});
  } else {
    ElMessageBox.alert(data.message, "", {confirmButtonText: 'OK'});
  }
})
.catch(function (error) {
  console.log(error);
});

}

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
  upload.value!.submit();
}

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response
) => {
  console.log(response)
  if (response.code === 200) {
    imageUrl.value = response.data.iconURL;
    imageName.value = response.data.icon;
  } else {
    ElMessage.error(response.message)
  }
}

const beforeCoverUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/png' && 
      rawFile.type !== 'image/jpg' && 
      rawFile.type !== 'image/bmp' && 
      rawFile.type !== 'image/jpeg') {
    ElMessage.error('不允许的图片格式!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 5) {
    ElMessage.error('图片大小不可超过5MB!')
    return false
  }
  return true
}

</script>


<style scoped>

.posting-box {
  padding: 2px;
}

.box-title {
  font-size: 30px;
  font-weight: bold;
}

.input-box {
  margin-top: 5px;
}

.content-input-box {
  margin-top: 5px;
}

.cover-uploader {
  margin-top: 5px;
  height: 178px;
  width: 178px;
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.cover-uploader:hover {
  border-color: var(--el-color-primary);
}
.cover {
  height: 178px;
}
.el-icon.cover-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

.operator-box {
  display: flex;
  flex-direction: row;
  margin-top: 5px;
}

.add-cover {
  width: 90px;
  height: 25px;
}

.submit-box {
  margin: auto;
  margin-right: 0;
}
.submit {
  height: 25px;
  width: 40px;
}

</style>