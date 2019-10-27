import request from '@/utils/myrequest'
import CMSrequest from '@/utils/midrequest'
import qs from 'qs';

export function getDetail(params) {
  return request({
    // url: '/table/list',
    // method: 'get',
    url: '/service/articles/list',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}

export function getCategory(params) {
  return request({
    url: '/service/category/list',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}

export function postMsg(data) {
  return CMSrequest({
    url: '/CMS/setlog/',
    method: 'get',
    params: data
  })
}