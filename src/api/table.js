import request from '@/utils/request';
// eslint-disable-next-line
export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params,
  });
}
