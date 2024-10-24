export interface CreateQuestion {
  /**
   * 题目标准答案
   */
  standard: string
  /**
   * 题库 id 列表
   */
  libIds: number[]
  /**
   * 题目标题
   */
  title: string
  [property: string]: any
}

export interface QuestionRes {
  /**
   * 问题 id
   */
  id: number
  /**
   * 问题标答
   */
  standard: string
  /**
   * 问题标题
   */
  title: string
  [property: string]: any
}

export interface QuestionDetail {
  /**
   * 问题 id
   */
  id: number
  /**
   * 问题标答
   */
  standard: string
  /**
   * 问题标题
   */
  title: string
  /**
   * 问题类型列表
   */
  types: QeustionType[]
  [property: string]: any
}

export interface QeustionType {
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 题库 id
   */
  id: number
  /**
   * 题库类别
   */
  libType: string
  [property: string]: any
}

export interface SelectQuestionCondition {
  current: number
  pageSize: number
  libIds?: number[]
}

export interface selectResponse {
  /**
   * 结果集
   */
  list: List[]
  /**
   * 总页数
   */
  pages: number
  /**
   * 总条数
   */
  total: number
  [property: string]: any
}

export interface List {
  /**
   * 问题 id
   */
  id: number
  /**
   * 问题标答
   */
  standard: string
  /**
   * 问题标题
   */
  title: string
  [property: string]: any
}
