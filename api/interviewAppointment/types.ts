
export interface ActivityJoinSituation {
  /**
   * 时间段统计结果
   */
  timePeriodCountVOS: TimePeriodCountVO[];
  /**
   * 用户活动参与详情列表
   */
  userParticipationVOS: UserParticipationVO[];
  [property: string]: any;
}

export interface TimePeriodCountVO {
  /**
   * 被学生选择次数
   */
  count: number;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 时间段 id
   */
  id: number;
  /**
   * 开始时间
   */
  startTime: string;
  [property: string]: any;
}

export interface UserParticipationVO {
  /**
   * “活动参与” id
   */
  participationId: number;
  /**
   * 面试预约列表
   */
  scheduleVOS: ScheduleVO[];
  /**
   * 学生简单简历信息
   */
  simpleStudentVO: SimpleStudentVO;
  /**
   * 时间段列表
   */
  timePeriodVOS: TimePeriodVO[];
  [property: string]: any;
}

export interface ScheduleVO {
  /**
   * 结束时间
   */
  endTime?: string;
  /**
   * 面试预约 id
   */
  id?: number;
  /**
   * “活动参与” id
   */
  participationId?: null;
  /**
   * 开始时间
   */
  startTime?: string;
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
   * 用户名
   */
  username: string;
  [property: string]: any;
}

export interface TimePeriodVO {
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 时间段 id
   */
  id: number;
  /**
   * 开始时间
   */
  startTime: string;
  [property: string]: any;
}


export interface UserSituationsRes {
  /**
   * “活动参与” id
   */
  id: number;
  /**
   * 问题回答列表
   */
  questionAnswerVOS: QuestionAnswerVO[];
  /**
   * 面试预约列表
   */
  scheduleVOS: ScheduleVO[];
  /**
   * 学生简单简历信息
   */
  simpleStudentVO: SimpleStudentVO;
  /**
   * 时间段列表
   */
  timePeriodVOS: TimePeriodVO[];
  [property: string]: any;
}

export interface QuestionAnswerVO {
  /**
   * 问题答案
   */
  answer: string;
  /**
   * 问题 id
   */
  id: number;
  /**
   * 问题标题
   */
  title: string;
  [property: string]: any;
}