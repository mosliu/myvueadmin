import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import { Message } from 'element-ui';
import { getToken } from '@/utils/auth'; // 验权

import router from './router';
import store from './store';

NProgress.configure({
  showSpinner: false,
}); // NProgress Configuration
// permissiom judge function
function hasPermission(roles, permissionRoles) {
  console.log('src/hasPermission');
  if (roles.indexOf('admin') >= 0) return true; // admin permission passed directly
  if (!permissionRoles) return true;
  return roles.some(role => permissionRoles.indexOf(role) >= 0);
}

const whiteList = ['/login']; // 不重定向白名单
router.beforeEach((to, from, next) => {
  // console.log('invoke beforeEach');
  NProgress.start();
  if (getToken()) {
    if (to.path === '/login') {
      next({
        path: '/',
      });
      NProgress.done(); // if current page is dashboard will not trigger afterEach hook, so manually handle it
    } else if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
      // eslint-disable-next-line
        store.dispatch('GetInfo').then((res) => { // 拉取用户信息
        // next();
        const roles = res.data.roles; // note: roles must be a array! such as: ['editor','develop']
        store.dispatch('GenerateRoutes', {
          roles,
        }).then(() => { // 根据roles权限生成可访问的路由表
          // console.log(store.getters.addRouters);
          // console.log(store.getters.permission_routers);
          router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
          next({ ...to,
            replace: true,
          }); // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
        });
      }).catch((err) => {
        store.dispatch('FedLogOut').then(() => {
          Message.error(err || 'Verification failed, please login again');
          next({
            path: '/',
          });
        });
      });
    } else {
      // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
      // eslint-disable-next-line
        if (hasPermission(store.getters.roles, to.meta.roles)) {
        next(); //
      } else {
        next({
          path: '/401',
          replace: true,
          query: {
            noGoBack: true,
          },
        });
      }
      // 可删 ↑
      // next();
    }
  } else {
    /* has no token */
    // eslint-disable-next-line
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next();
    } else {
      next('/login'); // 否则全部重定向到登录页
      NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
});

router.afterEach(() => {
  NProgress.done(); // 结束Progress
});
