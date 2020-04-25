import request from '@/utils/myrequest'
import PSYrequest from '@/utils/psyrequest'
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
export function getPagepaper(params) {
  return PSYrequest({
    // url: '/table/list',
    // method: 'get',
    url: '/psybot/getpagepaper/',
    method: 'get',
    data: qs.stringify(params),
    params
  })
}

export function setpaper(params) {
  return PSYrequest({
    // url: '/table/list',
    // method: 'get',
    url: '/psybot/setpaper/',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}

export function updatepaper(params) {
  return PSYrequest({
    // url: '/table/list',
    // method: 'get',
    url: '/psybot/updatepaper/',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}

export function deletepaper(params){
  return PSYrequest({
    // url: '/table/list',
    // method: 'get',
    url: '/psybot/deletepaper/',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}

export function uploadImg(params) {
  return PSYrequest({
    // url: '/table/list',
    // method: 'get',
    url: '/psybot/setpicture/',
    method: 'post',
    data: qs.stringify(params),
    params
  })
}