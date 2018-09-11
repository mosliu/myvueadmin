import Vue from 'vue';
import Router from 'vue-router';


/* Layout */
import Layout from '../views/layout/Layout';
// eslint-disable-next-line
const _import = require(`./_import_${process.env.NODE_ENV}`);

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router);

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
* */
export const constantRouterMap = [{
  path: '/login',
  component: () =>
      import('@/views/login/index'),
  hidden: true,
},
{
  path: '/404',
  component: () =>
      import('@/views/404'),
  hidden: true,
},


{
  path: '',
  component: Layout,
  redirect: '/dashboard',
  // name: 'Dashboard',
  // hidden: false,
  children: [{
    path: 'dashboard',
    component: () =>
        import('@/views/dashboard/index'),
    name: 'dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      noCache: true,
    },
  }],
},

// {
//   path: '/example',
//   component: Layout,
//   redirect: '/example/table',
//   name: 'Example',
//   meta: {
//     title: 'Example',
//     icon: 'example',
//   },
//   children: [{
//     path: 'table',
//     name: 'Table',
//     component: () =>
//           import('@/views/table/index'),
//     meta: {
//       title: 'Table',
//       icon: 'table',
//     },
//   },
//   {
//     path: 'tree',
//     name: 'Tree',
//     component: () =>
//           import('@/views/tree/index'),
//     meta: {
//       title: 'Tree',
//       icon: 'tree',
//     },
//   },
//   ],
// },

// {
//   path: '/form',
//   component: Layout,
//   children: [{
//     path: 'index',
//     name: 'Form',
//     component: () =>
//         import('@/views/form/index'),
//     meta: {
//       title: 'Form',
//       icon: 'form',
//     },
//   }],
// },


{
  path: '*',
  redirect: '/404',
  hidden: true,
},
];

export default new Router({
  // 支持办法：https://router.vuejs.org/guide/essentials/history-mode.html#example-server-configurations
  // TODO: https://www.cnblogs.com/fayin/p/7221619.html Vue 部署单页应用，刷新页面 404/502 报错

  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({
    y: 0,
  }),
  routes: constantRouterMap,
});


export const asyncRouterMap = [
  // 版本管理配置

  {
    path: '/version',
    component: Layout,
    redirect: 'noredirect',
    name: '版本情况',
    meta: {
      title: '版本管理',
      icon: 'tree',
      noCache: true,
    },
    children: [{
      path: 'new',
      component: _import('version-show/index'),
      name: 'versionNew',
      meta: {
        title: '新建版本',
        noCache: true,
        icon: 'form',
      },
    },
    {
      path: 'list',
      component: _import('version-show/list'),
      name: 'versionList',
      meta: {
        title: '版本列表',
        noCache: true,
        icon: 'table',
      },
    },
    {
      path: 'mychart',
      component: _import('charts/myChart'),
      name: 'versionChart',
      meta: {
        title: '版本图表',
        noCache: true,
        icon: 'chart',
      },
    },

    ],
  },
  // 用户管理
  {
    path: '/user',
    component: Layout,
    redirect: 'noredirect',
    name: '用户情况',
    meta: {
      title: '用户管理',
      icon: 'tree',
      noCache: true,
    },
    children: [{
      path: 'new',
      component: _import('usermanage/index'),
      name: 'userNew',
      meta: {
        title: '用户详情',
        noCache: true,
        icon: 'form',
      },
    },
    {
      path: 'list',
      component: _import('usermanage/list'),
      name: 'userList',
      meta: {
        title: '用户列表',
        noCache: true,
        icon: 'table',
      },
    },
    ],
  },
  // icons
  {
    path: '/icon',
    component: Layout,
    children: [{
      path: 'index',
      component: () =>
        import('@/views/svg-icons/index'),
      name: 'icons',
      meta: {
        title: 'icons',
        icon: 'icon',
        noCache: true,
      },
    }],
  },
  {
    path: '/charts',
    component: Layout,
    redirect: 'noredirect',
    name: 'charts',
    meta: {
      title: 'charts',
      icon: 'chart',
      noCache: true,
      roles: ['admin'],
    },
    children: [{
      path: 'keyboard',
      component: _import('charts/keyboard'),
      name: 'keyboardChart',
      meta: {
        title: 'keyboardChart',
        noCache: true,
      },
    },
    {
      path: 'line',
      component: _import('charts/line'),
      name: 'lineChart',
      meta: {
        title: 'lineChart',
        noCache: true,
      },
    },
    {
      path: 'mixchart',
      component: _import('charts/mixChart'),
      name: 'mixChart',
      meta: {
        title: 'mixChart',
        noCache: true,
      },
    },
    {
      path: 'mychart2',
      component: _import('charts/myChart2'),
      name: 'myChart2',
      meta: {
        title: 'myChart2',
        noCache: true,
      },
    },
    ],
  },

];
