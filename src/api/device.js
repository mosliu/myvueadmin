import request from '@/utils/request';
// eslint-disable-next-line
export function deviceSearch(name) {
  return request({
    url: '/devices/list',
    method: 'post',
    params: { name },
  });
}

export function getDeviceById(id) {
  return request({
    url: '/devices/getDeviceById',
    method: 'get',
    params: { id },
  });
}
