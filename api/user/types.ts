export interface UserInfo {
  /**
   * 邮箱
   */
  email?: string
  /**
   * 昵称
   */
  nickname?: string
  /**
   * 手机号
   */
  phoneNumber?: string
  /**
   * 用户名
   */
  username?: string
  /**
   * 用户类别
   */
  userType?: number
  /**
   * 头像
   */
  avatar?: null | number
  [property: string]: any
}

enum UserType {
  User = 1,
  Admin = 2,
}

export interface PasswordParams {
  /**
   * 密码
   */
  password: string
  /**
   * 用户名
   */
  username: string
}

/**
 * Request
 */
export interface LWPassword {
  /**
   * 登录方式（password、email）
   */
  login_type: string
  password_params: PasswordParams
  [property: string]: any
}

export interface LoginResponse {
  /**
   * 登录令牌
   */
  access_token: string
  /**
   * 有效时间（/ms）
   */
  expires_in: number
  [property: string]: any
}

/**
 * Request
 */
export interface LWEmail {
  email_params: EmailParams
  /**
   * 登录方式
   */
  login_type: string
  [property: string]: any
}

export interface EmailParams {
  /**
   * 邮箱
   */
  email: string
  /**
   * 邮箱验证码
   */
  emailCode: string
  [property: string]: any
}

export interface UserTypeRes {
  name: string
  code: UserType
}
