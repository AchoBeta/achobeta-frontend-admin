export interface batchlistResponse {
  /**
   * 招新届数
   */
  batch?: number
  /**
   * 截止时间
   */
  deadline?: string
  /**
   * 招新批次 id
   */
  id?: number
  /**
   * 是否开始
   */
  isRun?: boolean
  /**
   * 招新批次标题
   */
  title?: string
  [property: string]: any
}

export interface CreateRecruitBatch {
  /**
   * 招新届数
   */
  batch: number
  /**
   * 截止时间
   */
  deadline: number
  /**
   * 招新批次标题
   */
  title: string
  [property: string]: any
}

/**
 * Request
 */
export interface UpdateRecruitBatch {
  /**
   * 招新批次 id
   */
  batchId: number
  deadline: number
  /**
   * 招新批次标题
   */
  title: string
  [property: string]: any
}

export interface RecruitBatchDetail {
  /**
   * 招新届数
   */
  batch: number
  /**
   * 截止时间
   */
  deadline: string
  /**
   * 招新批次 id
   */
  id: number
  /**
   * 是否开始
   */
  isRun: boolean
  /**
   * 标题
   */
  title: string
  [property: string]: any
}

export interface ResumeData {
  /**
   * 班级
   */
  className: string
  /**
   * 邮箱
   */
  email: string
  /**
   * 性别
   */
  gender: number
  /**
   * 年级
   */
  grade: number
  /**
   * 专业
   */
  major: string
  /**
   * 姓名
   */
  name: string
  /**
   * 简历 id
   */
  resumeId: number
  /**
   * 简历状态
   */
  status: number
  /**
   * 学号
   */
  studentId: string
  /**
   * 用户 id
   */
  userId: number
  /**
   * 用户名
   */
  username: string
  [property: string]: any
}
