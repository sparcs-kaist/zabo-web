import Vue from 'vue';
import Vuex from 'vuex';
import Zabo from './zabo';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    zabo: Zabo,
  },
});
