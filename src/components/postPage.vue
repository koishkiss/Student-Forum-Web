<script lang="ts">
export default{
    name:'postPage',
}

</script>
<template>
    <div class="post">
        <img src=""  class="post-image">
        <button id ="left"><svg t="1729759946798" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6847" width="200" height="200"><path d="M671.968 912c-12.288 0-24.576-4.672-33.952-14.048L286.048 545.984c-18.752-18.72-18.752-49.12 0-67.872l351.968-352c18.752-18.752 49.12-18.752 67.872 0 18.752 18.72 18.752 49.12 0 67.872l-318.016 318.048 318.016 318.016c18.752 18.752 18.752 49.12 0 67.872C696.544 907.328 684.256 912 671.968 912z" p-id="6848"></path></svg></button>
        <button id="right"><svg t="1729758309058" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6700" width="200" height="200"><path d="M761.056 532.128c0.512-0.992 1.344-1.824 1.792-2.848 8.8-18.304 5.92-40.704-9.664-55.424L399.936 139.744c-19.264-18.208-49.632-17.344-67.872 1.888-18.208 19.264-17.376 49.632 1.888 67.872l316.96 299.84-315.712 304.288c-19.072 18.4-19.648 48.768-1.248 67.872 9.408 9.792 21.984 14.688 34.56 14.688 12 0 24-4.48 33.312-13.44l350.048-337.376c0.672-0.672 0.928-1.6 1.6-2.304 0.512-0.48 1.056-0.832 1.568-1.344C757.76 538.88 759.2 535.392 761.056 532.128z" p-id="6701"></path></svg></button>
        <div class="post-content">
            <div class="post-header">
                <img class ="avatar" src="">
                <div>
                    <div class="post-title">济南环联夜市首家年糕饺🥟！真的好大好好吃啊……</div>
                    <div class="post-author">芋圆啵啵</div>
                </div>
            </div>
            <div class="post-body">济南美食 #济南美食合集 #济南环联夜市 #济南合集 #济南小吃 #寻找风味小城 #我是美食活地图 #小城里的好味道 #甜品治愈一切 #被低估的宝藏小城 #去班味小城 #济南夜市 #国庆去哪儿 #夜市 #藏在美食里的中国红</div>
            <div class="post-likes">
                <button class ="like_button">点赞</button> 
                <svg t="1729774469985" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6458" width="200" height="200"><path d="M736 128c-65.952 0-128.576 25.024-176.384 70.464-4.576 4.32-28.672 28.736-47.328 47.68L464.96 199.04C417.12 153.216 354.272 128 288 128c-141.152 0-256 114.848-256 256 0 82.432 41.184 144.288 76.48 182.496l316.896 320.128C450.464 911.68 478.304 928 512 928c33.696 0 61.568-16.32 86.752-41.504l316.736-320 2.208-2.464C955.904 516.384 992 471.392 992 384 992 242.848 877.152 128 736 128z" p-id="6459" fill="#d81e06"></path></svg>
                <span class="likes">1000</span>
              </div>
            <!-- <div class="post-actions">
                <button>❤️ 423</button>
                <button>💬 评论</button>
            </div> -->
            <div class="comment" style="display: none;">
                <img src="" class="commenter_image">
                <div class="comment-body">
                  <strong id="commenter_name">评论者昵称：</strong>
                  <p id ="commenter_content">这是一条评论内容，可以包含对帖子的反馈或者个人的观点。</p>
                </div>
              </div>
            <div class="post-comments">
              <div class="empty">
                <p>还没有评论，赶紧来抢沙发吧</p>
              </div>
        </div>
        <div class="comment-form">
                <input type="text" id="commentInput" placeholder="输入你的评论..." required>
                <button type="submit" id="aaa">发送</button>
        </div>
    </div>
    </div>
</template>
<script>

</script>
<style>
        body {
            display: flex;
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .post {
            display: flex;
            flex-direction:row;
            width: 100%;
            overflow: hidden;
        }
        .post-image {
            width: 50%;
            height: 720px;
            position: relative;
        }
        .post-content {
            padding: 20px;
            width: 50%;
        }
        .post-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .post-header img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .post-title {
            font-size: 18px;
            font-weight: bold;
        }
        .post-author {
            font-size: 14px;
            color: #555;
        }
        .post-body {
            font-size: 16px;
            color: #333;
        }
        .empty{
            font-size: 16px;
            color: #333;
        }
        .post-comments {
            flex-grow: 1;
            overflow-y: auto;
            padding: 10px;
            background-color: #f9f9f9;
        }
        .comment {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .comment img {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 10px;
        }
        .comment-text {
            font-size: 14px;
            color: #555;
        }
        .post-actions {
            display: flex;
            justify-content: space-between;
            padding: 10px 20px;
            background-color: #f1f1f1;
        }
        .post-actions button {
            padding: 5px 10px;
            border: none;
            background-color: #007BFF;
            color: white;
            border-radius: 5px;
            cursor: pointer;
        }
        .post-likes {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 20px;
    border-top: 1px solid #eee;
  }
  .like_button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background-color: #007bff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .post-likes button:hover {
    background-color: #0056b3;
  }
  .shadow-active {
  background-color: #6b6a6a;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
}
  .icon{
    height: 30px;
    width: 30px;
    margin-left: auto;
  }
  .comment-form{
    position: fixed;
    bottom: 20px;
    box-sizing: border-box;
    width:700px;
    margin-right: 20px;
    padding: 20px;
    border-top: 1px solid #ccc;
    /* border-radius: 5px; */
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
  }
  .comment-form input[type="text"] {
            width:300px;
            padding: 10px;
            margin-bottom: 10px;
            border: 1px solid #ccc;
            border-radius: 20px;
            margin-right: 300px;
            transition: border-color 0.3s ease;
        }
        #aaa {
            width: 100px;
            padding: 10px;
            background-color:  #FF80AB;
            color: white;
            border: none;
            border-radius: 30px;
            cursor: pointer;
        }
        #aaa:hover {
            background-color: #ef3875;
        }
        #left {
            position:absolute;
            top:300px;
            background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
            padding: 20px;
            border-radius: 10px;
        }
        #left:hover{
            background-color: rgba(255, 255, 255, 0)
        }
        #right:hover{
            background-color: rgba(255, 255, 255, 0)
        }
        .icon2{
            height:20px;
            width:20px;
        }
        #right{
            position:absolute;
            top:300px;
            left:660px;
            background-color: rgba(255, 255, 255, 0.5); /* 半透明背景 */
            padding: 20px;
            border-radius: 10px;
        }
    </style>