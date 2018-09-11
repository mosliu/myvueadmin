import request from '@/utils/request';
// eslint-disable-next-line
export function versionAdd(form) {
  console.log(form);
  return request({
    url: '/version/new',
    method: 'post',
    data: form,
  });
}
export function getList(params) {
  return request({
    url: '/version/list',
    method: 'get',
    params,
  });
}


export function getListByDevice(params) {
  return request({
    url: '/version/listByDevice',
    method: 'get',
    params,
  });
}

export function deleteVersion(id) {
  return request({
    url: '/version/deleteById',
    method: 'post',
    data: { id },
  });
}
