import * as types from '@/store/mutation-types';

const mutations = {
  [types.ZABOES_LIST](state, zaboes) {
    state.zaboes = zaboes;
  },
  [types.ZABO_CREATE](state, zabo) {
    state.zaboes.push(zabo);
  },
  [types.ZABO_UPDATE](state, zabo) {
    function func(x) {
      return x.pk.toString() === zabo.pk.toString();
    }
    state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1, zabo);
  },
  [types.ZABO_DELETE](state) {
    function func(x) {
      return x.pk.toString() === zabo.pk.toString();
    }
    state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1);
  },
  [types.ZABOES_PAGECOUNT](state, pageCount) {
    state.zabosPageCount = pageCount;
  },
};

export default mutations;
