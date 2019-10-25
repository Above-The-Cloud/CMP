import request from '@/utils/myrequest'
import qs from 'qs';
export function getList(params) {

  return request({
    // url: '/table/list',
    // method: 'get',
    url: '/service/articles/list',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}
