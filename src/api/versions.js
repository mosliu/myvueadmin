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
