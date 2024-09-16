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
