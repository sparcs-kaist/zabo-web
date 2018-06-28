import * as types from "@/store/mutation-types";

const mutations = {
  [types.ZABOES_LIST](state, payload) {
    state.zaboesObject[payload.pagenum] = payload.result;
    const temp = [];
    const keys = Object.keys(state.zaboesObject);
    keys.sort((a, b) => a - b);
    for (let i = 0; i < keys.length; i += 1) {
      for (const j in state.zaboesObject[keys[i]]) {
        temp.push(state.zaboesObject[keys[i]][j]);
      }
    }
    state.zaboes = temp;
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
  [types.ZABOES_PAGECOUNT](state, pageCount) {
    state.zaboesPageCount = pageCount;
  },
  [types.GET_PARTICIPATED_ZABOES](state, participatedZaboes) {
    state.participatedZaboes = participatedZaboes;
  },
  [types.SET_USER_NAME](state, payload) {
    // eslint-disable-nextline
    console.log(payload[0], payload[1]);
    state.currentUser.first_name = payload[0];
    state.currentUser.last_name = payload[1];
  }
};

export default mutations;
