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
  list: List[];
  /**
   * 总页数
   */
  pages: number;
  /**
   * 总条数
   */
  total: number;
  [property: string]: any;
}

export interface List {
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 试卷描述
   */
  description: string;
  /**
   * 试卷 id
   */
  id: number;
  /**
   * 试卷标题
   */
  title: string;
  /**
   * 更新时间
   */
  updateTime: string;
  [property: string]: any;
}