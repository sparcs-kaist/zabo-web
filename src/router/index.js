import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/Home';
import Zabo from '@/pages/Zabo';
import ZaboDetail from '@/pages/ZaboDetail';
import ZaboUpdate from '@/pages/ZaboUpdate';
import ZaboUpload from '@/pages/ZaboUpload';
import ZaboList from '@/pages/ZaboList';
import ZaboUserprofile from '@/pages/Userprofile.vue';
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
      path: '/zabo/detail/:zabo_id',
      name: 'ZaboDetail',
      component: ZaboDetail,
    },
    {
      path: '/zabo/list',
      name: 'ZaboList',
      component: ZaboList,
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
    {
      path : '/zabo/user_profile',
      name: 'Zabouserprofile',
      component: ZaboUserprofile
    }
  ],
});
