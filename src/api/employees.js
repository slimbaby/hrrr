import request from '@/utils/request'
// 获取部门负责人的数据
export function getEmployeeSimple() {
  return request({
    url: '/sys/user/simple'
  })
}
