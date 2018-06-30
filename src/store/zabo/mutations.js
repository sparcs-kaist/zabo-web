import * as types from '@/store/mutation-types';

const mutations = {
  [types.ZABOES_LIST](state, payload) {
    if (typeof state.zaboesObject[payload.category] === 'undefined') {
      state.zaboesObject[payload.category] = {};
    }
    state.zaboesObject[payload.category][payload.pagenum] = payload.result;
    const temp = [];
    const keys = Object.keys(state.zaboesObject[payload.category]);
    keys.sort((a, b) => a - b);
    for (let i = 0; i < keys.length; i += 1) {
      for (const j in state.zaboesObject[payload.category][keys[i]]) {
        temp.push(state.zaboesObject[payload.category][keys[i]][j]);
      }
    }
    state.zaboes[payload.category] = temp;
  },
  // [types.ZABO_CREATE](state, zabo) {
  //   state.zaboes.push(zabo);
  // },
  // [types.ZABO_UPDATE](state, zabo) {
  //   function func(x) {
  //     return x.pk.toString() === zabo.pk.toString();
  //   }
  //   state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1, zabo);
  // },
  // [types.ZABO_DELETE](state) {
  //   function func(x) {
  //     return x.pk.toString() === zabo.pk.toString();
  //   }
  //   state.zaboes.splice(state.zaboes.indexOf(state.zaboes.find(func)), 1);
  // },
  [types.ZABOES_PAGECOUNT](state, payload) {
    state.zaboesPageCount[payload.category] = payload.pageCount;
  },
  [types.DETAIL_PAGE_FROM](state, from) {
    state.from = from;
  },
};

export default mutations;
