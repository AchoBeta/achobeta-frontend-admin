export interface scoreQuestion {
  /**
   * 面试 id
   */
  interviewId: number;
  /**
   * 问题 id
   */
  questionId: number;
  /**
   * 分数（0 - 10，-1 代表超纲）
   */
  score: number;
  [property: string]: any;
}

export interface InterviewQuestionDetail {
  /**
   * 试卷描述
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
   * 试卷类别列表
   */
  types: Type[];
  [property: string]: any;
}

export interface Question {
  /**
   * 问题历史平均得分
   */
  average?: number;
  /**
   * 问题 id
   */
  id?: number;
  /**
   * 分数（0 - 10，-1 代表超纲）
   */
  score?: number;
  /**
   * 问题标答
   */
  standard?: string;
  /**
   * 问题标题
   */
  title?: string;
  [property: string]: any;
}

export interface Type {
  /**
   * 创建时间
   */
  createTime?: string;
  /**
   * 试卷库 id
   */
  id?: number;
  /**
   * 试卷库类别
   */
  libType?: string;
  [property: string]: any;
}

export interface CreateCommentRequest {
  /**
   * 面试评论内容
   */
  content: string;
  /**
   * 面试 id
   */
  interviewId: number;
  [property: string]: any;
}

export interface CommentRequest {
  /**
   * 面试评论内容
   */
  content: string;
  /**
   * 面试 id
   */
  commentId: number;
  [property: string]: any;
}

/**
 * Request
 */
export interface InterviewSummaryRequest {
  /**
   * 基础能力
   */
  basis: number;
  /**
   * 编程能力
   */
  coding: number;
  /**
   * 面试总评
   */
  evaluate: string;
  /**
   * 表达能力
   */
  express: number;
  /**
   * 面试 id
   */
  interviewId: number;
  playback: string;
  /**
   * 建议
   */
  suggest: string;
  /**
   * 思维能力
   */
  thinking: number;
  [property: string]: any;
}

export interface InterviewSummaryResponse {
  /**
   * 基础能力
   */
  basis: number;
  /**
   * 编程能力
   */
  coding: number;
  /**
   * 总评
   */
  evaluate: string;
  /**
   * 表达能力
   */
  express: number;
  /**
   * 面试总结 id
   */
  id: number;
  /**
   * 面试 id
   */
  interviewId: number;
  /**
   * 回放
   */
  playback: string;
  /**
   * 建议
   */
  suggest: string;
  /**
   * 思维能力
   */
  thinking: number;
  [property: string]: any;
}

export interface InterviewSituationRequest {
  /**
   * 招新活动 id
   */
  actId: number | null;
  /**
   * 招新批次 id
   */
  batchId: number | null;
  [property: string]: any;
}


export interface InterviewSituationResponse {
  /**
   * 四项标准平均分
   */
  average: number | null;
  /**
   * 面试 id
   */
  interviewId: number;
  /**
   * 学生简单简历信息
   */
  simpleStudentVO: SimpleStudentVO;
  /**
   * 面试状态（0未开始、1进行中、2已结束）
   */
  status: number;
  /**
   * 面试总结 id
   */
  summaryId: number | null;
  /**
   * 面试标题
   */
  title: string;
  [property: string]: any;
}

/**
* 学生简单简历信息
*/
export interface SimpleStudentVO {
  /**
   * 班级
   */
  className: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 性别
   */
  gender: number;
  /**
   * 年级
   */
  grade: number;
  /**
   * 专业
   */
  major: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 简历 id
   */
  resumeId: number;
  /**
   * 简历状态
   */
  status: number;
  /**
   * 学号
   */
  studentId: string;
  /**
   * 用户 id
   */
  userId: number;
  /**
   * 昵称
   */
  username: string;
  [property: string]: any;
}
