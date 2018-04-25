import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Zabo from '@/pages/Zabo';
import ZaboDetail from '@/pages/ZaboDetail';
import ZaboUpdate from '@/pages/ZaboUpdate';
import ZaboUpload from '@/pages/ZaboUpload';
// import store from '../store';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/zabo',
      name: 'Zabo',
      component: Zabo,
    },
    {
      path: '/zabo/detail',
      name: 'ZaboDetail',
      component: ZaboDetail,
    },
    {
      path: '/zabo/update',
      name: 'ZaboUpdate',
      component: ZaboUpdate,
    },
    {
      path: '/zabo/upload',
      name: 'ZaboUpload',
      component: ZaboUpload,
    },
  ],
});