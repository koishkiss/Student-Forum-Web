
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