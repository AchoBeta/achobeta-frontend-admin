/**
 * 请求成功状态码
 */
type AxiosContentType = | 'application/json'
  | 'application/x-www-form-urlencoded'
  | 'multipart/form-data'
  | 'text/plain'

export const SUCCESS_CODE = 200

/**
 * 请求contentType
 */
export const CONTENT_TYPE: AxiosContentType = 'application/json'

/**
 * 请求超时时间, 开发环境下20s, 生产环境下10s
 */
export const REQUEST_TIMEOUT = process.env.NODE_ENV === 'development' ? 20000 : 10000

/**
 * 不重定向白名单
 */
export const NO_REDIRECT_WHITE_LIST = ['/login']

/**
 * 不重置路由白名单
 */
// export const NO_RESET_WHITE_LIST = ['Redirect', 'Login', 'NoFind', 'Root']

/**
 * 表格默认过滤列设置字段
 */
// export const DEFAULT_FILTER_COLUMN = ['expand', 'selection']

/**
 * 是否根据headers->content-type自动转换数据格式
 */
export const TRANSFORM_REQUEST_DATA = true

/**
 * 全局图标前缀
 */
// export const ICON_PREFIX = 'vi-'
