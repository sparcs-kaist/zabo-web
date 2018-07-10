import * as types from "@/store/mutation-types";

const mutations = {
  [types.ZABOES_LIST](state, payload) {
    let filteredZaboes = payload.result.filter(zabo => {
      return zabo.posters.length >= 1;
    });
    for (let i = 0; i < filteredZaboes.length; i++) {
      console.log(payload.category);
      state.zaboes[payload.category].push(filteredZaboes[i]);
    }
  },
  [types.ZABOES_RESET](state, payload) {
    state.zaboes = {
      전체: [],
      리크루팅: [],
      퍼포먼스: [],
      경쟁: [],
      설명회: [],
      강의: [],
      전람회: []
    };
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
  [types.ZABOES_PAGECOUNT](state, payload) {
    state.zaboesPageCount[payload.category] = payload.result;
  },
  [types.GET_PARTICIPATED_ZABOES](state, payload) {
    state.participatedZaboes[payload.category] = payload.result;
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
  }
};

export default mutations;
