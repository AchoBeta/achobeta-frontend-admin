export interface AdminMemInfoData {
  /**
   * 成员 id
   */
  id?: number
  /**
   * 管理员 id
   */
  managerId?: number
  /**
   * 创建者 id
   */
  parentId?: number
  /**
   * 简单简历信息
   */
  simpleStudentVO?: SimpleStudentVO
  /**
   * 用户信息
   */
  userVO?: UserVO
  [property: string]: any
}

/**
 * 简单简历信息
 */
export interface SimpleStudentVO {
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
   * 状态
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

/**
 * 用户信息
 */
export interface UserVO {
  avatar: null
  /**
   * 邮箱
   */
  email: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 手机号
   */
  phoneNumber: string
  /**
   * 用户名
   */
  username: string
  /**
   * 用户类别
   */
  userType: number
  [property: string]: any
}
