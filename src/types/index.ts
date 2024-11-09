
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