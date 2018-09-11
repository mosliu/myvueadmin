import request from '@/utils/request';
// eslint-disable-next-line
export function userAdd(form) {
  console.log(form);
  return request({
    url: '/user/new',
    method: 'post',
    data: form,
  });
}
export function userUpdate(form) {
  console.log(form);
  return request({
    url: '/user/update',
    method: 'post',
    data: form,
  });
}
export function getList(params) {
  return request({
    url: '/user/list',
    method: 'get',
    params,
  });
}


export function getListByDevice(params) {
  return request({
    url: '/user/listByDevice',
    method: 'get',
    params,
  });
}

export function deleteUser(id) {
  return request({
    url: '/user/deleteById',
    method: 'post',
    data: { id },
  });
}
