import Mock from 'mockjs'

const data = Mock.mock({
  'items|10': [{
    id: '@id',
    content_id: '1',
    cover_url: 'https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png',
    summary: '我是视频标题我是视频标题',
    orgin: '壹心理',
    author_id: '780101',
    author_name: '袁小猴',
    category: '分类：科普',
    operation: '',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    enter_time: '@datetime',
    pageviews: '@integer(300, 500)'
  }]
})

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
