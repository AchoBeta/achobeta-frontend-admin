export interface Interview {
  /**
   * 面试地址
   */
  address: string;
  /**
   * 面试说明
   */
  description: string;
  /**
   * 面试预约 id
   */
  scheduleId: number;
  /**
   * 面试标题
   */
  title: string;
  [property: string]: any;
}

export interface UpdataInterview {
  address: string;
  /**
   * 面试说明
   */
  description: string;
  /**
   * 面试 id
   */
  interviewId: number;
  /**
   * 面试标题
   */
  title: string;
  [property: string]: any;
}

export interface status {
  status: number;
  /**
   * 面试说明
   */
  description: string;
  [property: string]: any;
}

export interface InterviewPaper {
  /**
   * 面试 id
   */
  interviewId: number;
  paperId: number;
  [property: string]: any;
}

/**
 * Request，条件
 */
export interface GetInterview {
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

export interface InterviewResponse {
  /**
   * 面试 id
   */
  id?: number;
  /**
   * 面试预约
   */
  scheduleVO?: ScheduleVO;
  /**
   * 面试状态（0未开始、1进行中、2已结束）
   */
  status?: number;
  /**
   * 面试标题
   */
  title?: string;
  [property: string]: any;
}

/**
* 面试预约
*/
export interface ScheduleVO {
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 面试预约 id
   */
  id: number;
  /**
   * “活动参与” id
   */
  participationId: number;
  /**
   * 开始时间
   */
  startTime: string;
  [property: string]: any;
}

export interface InterviewDetail {
  /**
   * 面试地址
   */
  address: string;
  /**
   * 面试说明
   */
  description: string;
  /**
   * 面试 id
   */
  id: number;
  /**
   * 预约信息
   */
  scheduleVO: ScheduleVO;
  /**
   * 面试状态（0未开始、1进行中、2已结束）
   */
  status: number;
  /**
   * 用户 id
   */
  stuId: number;
  /**
   * 面试标题
   */
  title: string;
  [property: string]: any;
}
