import * as types from "@/store/mutation-types";

const mutations = {
  // [types.ZABOES_LIST](state, payload) {
  //   state.zaboesObject[payload.pagenum] = payload.result;
  //   const temp = [];
  //   const keys = Object.keys(state.zaboesObject);
  //   keys.sort((a, b) => a - b);
  //   for (let i = 0; i < keys.length; i += 1) {
  //     for (const j in state.zaboesObject[keys[i]]) {
  //       temp.push(state.zaboesObject[keys[i]][j]);
  //     }
  //   }
  //   state.zaboes = temp;
  // },
  [types.ZABOES_LIST](state, payload) {
    // for (let i = 0; i < payload.pagenum; i++) {
    //   if (payload.result[i].posters[0].image) {
    //   state.zaboes.push(payload.result[i]);
    //   }
    // }
    let filteredZaboes = payload.result.filter(zabo => {
      return zabo.posters.length >= 1;
    });
    for (let i = 0; i < filteredZaboes.length; i++) {
      state.zaboes.push(filteredZaboes[i]);
    }
  },
  [types.ZABOES_RESET](state, payload) {
    state.zaboes = [];
  },
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
  [types.SET_CURRENT_USER](state, payload) {
    state.currentUser = payload;
  },
  [types.GOT_RESPONSE](state) {
    state.getResponse = true;
  },
  [types.START_AJAX](state) {
    state.getResponse = false;
  },
  [types.LOGIN](state, payload) {
    if (localStorage.getItem("token")) {
      state.loggedInState = true;
    }
    state.currentUser = payload;
  },
  [types.LOGOUT](state, payload) {
    state.loggedInState = false;
    state.currentUser = {};
    localStorage.removeItem("token");
  },
  [types.MAIN_ZABO_SEEN](state, payload) {
    state.mainZaboSeen = true;
  }
};

export default mutations;
