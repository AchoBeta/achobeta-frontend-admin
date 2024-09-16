export interface AdminMemInfoData {
  /**
   * 成员 id
   */
  id: number;
  /**
   * 管理员 id
   */
  managerId: number;
  /**
   * 创建者 id
   */
  parentId: number;
  /**
   * 创建者
   */
  parentManager: ParentManager;
  /**
   * 简历 id
   */
  resumeId: number;
  /**
   * 简历信息
   */
  stuResumeVO: StuResumeVO;
  [property: string]: any;
}

/**
* 创建者
*/
export interface ParentManager {
  avatar: null;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 手机号
   */
  phoneNumber: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户类型
   */
  userType: number;
  [property: string]: any;
}

/**
* 简历信息
*/
export interface StuResumeVO {
  /**
   * 附件列表
   */
  stuAttachmentVOList: StuAttachmentVOList[];
  stuSimpleResumeVO: StuSimpleResumeVO;
  [property: string]: any;
}

export interface StuAttachmentVOList {
  /**
   * 附件路径
   */
  attachment?: string;
  /**
   * 文件名
   */
  filename?: string;
  [property: string]: any;
}

export interface StuSimpleResumeVO {
  /**
   * 获奖经历
   */
  awards: string;
  /**
   * 招新批次 id
   */
  batchId: number;
  /**
   * 班级
   */
  className: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 经历
   */
  experience: string;
  /**
   * 性别
   */
  gender: number;
  /**
   * 年级
   */
  grade: number;
  /**
   * 证件照
   */
  image: string;
  /**
   * 简介
   */
  introduce: string;
  /**
   * 专业
   */
  major: string;
  /**
   * 姓名
   */
  name: string;
  /**
   * 手机号
   */
  phoneNumber: string;
  /**
   * 加入 AB 的理由
   */
  reason: string;
  /**
   * 备注
   */
  remark: string;
  /**
   * 学号
   */
  studentId: number;
  [property: string]: any;
}