export interface userInfo {
  avatar: null | string;
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
   * 用户类别
   */
  userType: number;
  [property: string]: any;
}