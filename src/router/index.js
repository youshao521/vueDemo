/*
 * 定义 path 的时候，不要出现大写字母，要用中划线分隔
 */
import Router from 'vue-router';

import Demo from '../views/Demo.vue';


export default function createRouter() {
  return new Router({
    mode: 'history',
    base: process.env.ROUTE_BASE,
    fallback: false,
    routes: [
      {
        path: '*',
        name: '404',
        component: Demo,
      },
    ],
  });
}
