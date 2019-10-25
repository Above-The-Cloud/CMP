import request from '@/utils/midrequest'
import qs from 'qs';
export function login(data) {
  return request({
    url: '/CMS/register/',
    method: 'get',
    params: data,
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
