/**
 * Request
 */
export interface RecruitActivityRequest {
  /**
   * 招新批次 id
   */
  batchId: number
  /**
   * 截止时间
   */
  deadline: number
  /**
   * 活动说明
   */
  description: string
  /**
   * 面向的群体
   */
  target: Target
  /**
   * 活动标题
   */
  title: string
  [property: string]: any
}

/**
 * 面向的群体
 *
 * StudentGroup，面向的群体
 */
export interface Target {
  /**
   * null 代表不限制此条件，若非 null，则学生必须满足 allMatch 内的所有条件
   */
  allMatch: null | AllMatch
  /**
   * null 代表不限制此条件，若非 null，则学生必须满足 anyMatch 内至少一个条件
   */
  anyMatch: null | AnyMatch
  [property: string]: any
}

export interface AllMatch {
  /**
   * 允许的简历状态
   *
   * null 代表不限制此条件，若非 null，则学生必须是允许的简历状态
   */
  status: number[]
  [property: string]: any
}

export interface AnyMatch {
  /**
   * 允许的特定年级
   */
  grade: number[]
  /**
   * 允许的特定学生
   */
  uid: number[]
  /**
   * 允许的特定学生
   */
  userId: number[] | null
  [property: string]: any
}

export interface SetActivityPaper {
  /**
   * 活动 id
   */
  actId: number
  paperId: number
  [property: string]: any
}

export interface ActivityDetail {
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 截止时间
   */
  deadline: string
  /**
   * 活动描述
   */
  description: string
  /**
   * 招新活动 id
   */
  id: number
  /**
   * 是否开始
   */
  isRun: boolean
  /**
   * 试卷 id
   */
  paperId: number | null
  /**
   * 面向的人群
   */
  target: Target
  /**
   * 活动标题
   */
  title: string
  [property: string]: any
}

export interface ActivityTime {
  /**
   * 活动 id
   */
  actId: number
  endTime: number
  /**
   * 开始时间
   */
  startTime: number
  [property: string]: any
}

export interface ActivityModal {
  /**
   * 问题列表
   */
  questionVOS: QuestionVO[]
  /**
   * 活动详情
   */
  recruitmentActivityVO: RecruitmentActivityVO
  /**
   * 时间段列表
   */
  timePeriodVOS: TimePeriodVO[]
  [property: string]: any
}

export interface QuestionVO {
  /**
   * 问题 id
   */
  id: number
  /**
   * 问题标准答案
   */
  standard: string
  /**
   * 问题标题
   */
  title: string
  [property: string]: any
}

/**
 * 活动详情
 */
export interface RecruitmentActivityVO {
  /**
   * 活动创建时间
   */
  createTime: string
  /**
   * 活动截止时间
   */
  deadline: string
  /**
   * 活动说明
   */
  description: string
  /**
   * 活动 id
   */
  id: number
  /**
   * 是否开始
   */
  isRun: boolean
  /**
   * 活动试卷 id
   */
  paperId: number
  /**
   * 活动面向的群体
   */
  target: Target
  /**
   * 活动标题
   */
  title: string
  [property: string]: any
}

export interface TimePeriodVO {
  /**
   * 结束时间
   */
  endTime: string
  /**
   * 时间段 id
   */
  id: number
  /**
   * 开始时间
   */
  startTime: string
  [property: string]: any
}
