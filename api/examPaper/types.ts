export interface createPaper {
  /**
   * 试卷说明
   */
  description: string;
  /**
   * 试卷库 id 列表
   */
  libIds: number[];
  /**
   * 试卷标题
   */
  title: string;
  [property: string]: any;
}

export interface EBankResData {
  id: number
  libType: string
  createTime: string
}