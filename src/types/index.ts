
export interface SectionIdentityItem {
  sectionId:number,
  iconURL:string,
  identity:number,
  name:string,
  memberNum:number,
  postNum:number,
  classify:number,
  classifyName:string,
  createTime:string
}

export type SectionIdentityList = Array<SectionIdentityItem>
export interface CommentPostItem{
  isModerator:number,
  avatarURL:string,
  isPoster:number,
  postId:number,
  // avatar:string,
  commentTime:string,
  content:string,
  likeNum:number,
  floorId:number,
  uid:number,
  authority:number,
  replyNum:number,
  nickname:string,
  id:number
}
export type CommentPostList =Array<CommentPostItem>

export interface PostPreviewItem {
  id: number,
  sectionId: number,
  uid: number,
  nickname: string,
  avatarURL: string,
  title: string,
  coverURL: string,
  content: string,
  postTime: string,
  like_time: string,
  mark_time:string,
  commentNum: number,
  viewNum: number,
  likeNum: number,
  bookmarkNum: number,
  status: number
}

export type PostPreviewItemList = Array<PostPreviewItem>


export interface UserInfo {
  uid:number,
  sid:string,
  authority:number,
  nickname:string,
  signature:string,
  registerTime:string,
  likeNum:number,
  bookmarkNum:number,
  postNum:number,
  joinNum:number,
  avatarURL:string
}

interface Admin {
  uid:number,
  avatarURL:string,
  nickname:string,
  identity:Number
}

export type AdminList = Array<Admin>

export interface SectionInfo {
  sectionId: number,
  name: string,
  iconURL: string,
  slogan: string,
  postNum: number,
  memberNum: number,
  createTime: string,
  classify: string,  //分类信息
  adminList: AdminList,  //管理员信息列表
  hasJoin: boolean,  //个人加入信息
  joinTime: string,  //个人加入时间
  identity: number  //个人身份信息
}