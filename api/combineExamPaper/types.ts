export interface addQuestion {
  /**
   * 试卷 id
   */
  paperId: number;
  /**
   * 问题 id 列表
   */
  questionIds: number[];
  [property: string]: any;
}

export interface ExamPageDetail {
  /**
   * 试卷说明
   */
  description: string;
  /**
   * 试卷 id
   */
  id: number;
  /**
   * 问题列表
   */
  questions: Question[];
  /**
   * 试卷标题
   */
  title: string;
  /**
   * 试卷类型列表
   */
  types: Type[];
  [property: string]: any;
}

export interface Question {
  /**
   * 问题 id
   */
  id: number;
  /**
   * 问题 标答
   */
  standard: string;
  /**
   * 问题标题
   */
  title: string;
  [property: string]: any;
}

export interface Type {
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 试卷库 id
   */
  id: number;
  /**
   * 试卷库类型
   */
  libType: string;
  [property: string]: any;
}
