import request from '@/utils/request'

// 封装登录接口
export function login(data) {
  // 返回一个axios对象 => promise  // 返回了一个promise对象
  return request({
    url: '/sys/login', // 因为所有的接口都要跨域 表示所有的接口要带 /api
    method: 'post',
    data
  })
}
// 封装一个获取用户资料的方法
export function getUserInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
/** *
 *
 * 获取用户的基本信息  现在写它 完全是为了显示头像
 * **/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function getInfo(token) {

}

export function logout() {
}
