import Vue from 'vue';
import Vuex from 'vuex';
import Zabo from './zabo';
import Auth from './auth';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    zabo: Zabo,
    auto: Auth,
  },
});
